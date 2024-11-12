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
  description?: string;
}

const navigation: NavigationItem[] = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard,
    description: 'Overview of your mortgage business'
  },
  { 
    name: 'Clients', 
    href: '/clients', 
    icon: Users,
    description: 'Manage your active mortgage clients'
  },
  { 
    name: 'Leads', 
    href: '/leads', 
    icon: UserPlus,
    description: 'Track and convert potential clients'
  },
  { 
    name: 'Tasks', 
    href: '/tasks', 
    icon: CheckSquare,
    description: 'Manage your daily activities'
  },
  { 
    name: 'Pipeline', 
    href: '/pipeline', 
    icon: PieChart,
    description: 'Track deals in progress'
  },
  { 
    name: 'COIs', 
    href: '/cois', 
    icon: Handshake,
    description: 'Manage Centers of Influence'
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: SettingsIcon,
    description: 'Configure your preferences'
  }
];

export function Navigation() {
  return (
    <nav className="space-y-1 px-2">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) => `
            group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg
            transition duration-150 ease-in-out
            ${isActive 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }
          `}
        >
          {({ isActive }) => (
            <>
              <item.icon 
                className={`
                  mr-3 h-5 w-5 flex-shrink-0
                  ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}
                `}
                aria-hidden="true"
              />
              <span className="flex-1">{item.name}</span>
              {item.description && (
                <span className="sr-only">{item.description}</span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}