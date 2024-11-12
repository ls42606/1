import { openDB } from 'idb';
import bcrypt from 'bcryptjs';
import zxcvbn from 'zxcvbn';

interface AuthDB {
  settings: {
    key: string;
    value: any;
  };
}

const AUTH_DB_NAME = 'auth-db';
const AUTH_DB_VERSION = 1;
const SALT_ROUNDS = 12;

export async function initAuthDB() {
  return openDB<AuthDB>(AUTH_DB_NAME, AUTH_DB_VERSION, {
    upgrade(db) {
      db.createObjectStore('settings');
    },
  });
}

export async function isFirstTimeSetup(): Promise<boolean> {
  const db = await initAuthDB();
  const passwordHash = await db.get('settings', 'passwordHash');
  return !passwordHash;
}

export async function setupMasterPassword(password: string): Promise<{ success: boolean; error?: string }> {
  const strength = zxcvbn(password);
  
  if (strength.score < 3) {
    return {
      success: false,
      error: 'Password is too weak. Please use a stronger password with a mix of letters, numbers, and symbols.',
    };
  }

  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const db = await initAuthDB();
    await db.put('settings', hash, 'passwordHash');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to set up master password. Please try again.',
    };
  }
}

export async function verifyPassword(password: string): Promise<boolean> {
  try {
    const db = await initAuthDB();
    const hash = await db.get('settings', 'passwordHash');
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

export async function updatePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  const isValid = await verifyPassword(currentPassword);
  if (!isValid) {
    return {
      success: false,
      error: 'Current password is incorrect.',
    };
  }

  const strength = zxcvbn(newPassword);
  if (strength.score < 3) {
    return {
      success: false,
      error: 'New password is too weak. Please use a stronger password.',
    };
  }

  try {
    const hash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    const db = await initAuthDB();
    await db.put('settings', hash, 'passwordHash');
    return { success: true };
  } catch {
    return {
      success: false,
      error: 'Failed to update password. Please try again.',
    };
  }
}

// Session management
const SESSION_DURATION = 12 * 60 * 60 * 1000; // 12 hours

export async function createSession(): Promise<void> {
  const db = await initAuthDB();
  const expiresAt = Date.now() + SESSION_DURATION;
  await db.put('settings', expiresAt, 'sessionExpiry');
}

export async function checkSession(): Promise<boolean> {
  try {
    const db = await initAuthDB();
    const expiresAt = await db.get('settings', 'sessionExpiry');
    return expiresAt && Date.now() < expiresAt;
  } catch {
    return false;
  }
}

export async function clearSession(): Promise<void> {
  const db = await initAuthDB();
  await db.delete('settings', 'sessionExpiry');
}