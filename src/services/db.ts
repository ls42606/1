import { openDB, DBSchema } from 'idb';

interface MortgageCRMDB extends DBSchema {
  contacts: {
    key: string;
    value: {
      id: string;
      type: 'client' | 'lead' | 'coi';
      name: string;
      email: string;
      phone: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    };
    indexes: { 'by-type': string; 'by-status': string };
  };
  deals: {
    key: string;
    value: {
      id: string;
      contactId: string;
      amount: number;
      status: string;
      expectedCloseDate: Date;
      createdAt: Date;
      updatedAt: Date;
    };
    indexes: { 'by-contact': string; 'by-status': string };
  };
}

const DB_NAME = 'mortgage-crm';
const DB_VERSION = 1;

export async function initDB() {
  const db = await openDB<MortgageCRMDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const contactStore = db.createObjectStore('contacts', { keyPath: 'id' });
      contactStore.createIndex('by-type', 'type');
      contactStore.createIndex('by-status', 'status');

      const dealsStore = db.createObjectStore('deals', { keyPath: 'id' });
      dealsStore.createIndex('by-contact', 'contactId');
      dealsStore.createIndex('by-status', 'status');
    },
  });

  return db;
}

export const db = initDB();