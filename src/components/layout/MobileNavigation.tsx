import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus,
  CheckSquare,
  PieChart,
  Handshake,
  Settings as SettingsIcon,
  LucideIcon
} from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Leads', href: '/leads', icon: UserPlus },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Pipeline', href: '/pipeline', icon: PieChart },
  { name: 'COIs', href: '/cois', icon: Handshake },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
];

export function MobileNavigation({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="px-2 pb-3 pt-2">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          onClick={onNavigate}
          className={({ isActive }) => `
            group flex items-center rounded-md px-3 py-2 text-base font-medium
            ${isActive 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }
          `}
        >
          <item.icon
            className="mr-4 h-6 w-6 flex-shrink-0"
            aria-hidden="true"
          />
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}