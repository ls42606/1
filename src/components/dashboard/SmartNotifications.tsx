import React from 'react';
import { BrainCircuit, Calendar, Bell, X, AlertCircle } from 'lucide-react';
import { format, isBefore, addDays } from 'date-fns';

interface Notification {
  id: string;
  type: 'ai' | 'deadline' | 'meeting' | 'financing' | 'funds';
  title: string;
  description: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  clientId?: string;
  clientName?: string;
}

// Mock notifications with new deadline types
const notifications: Notification[] = [
  {
    id: '1',
    type: 'financing',
    title: 'Financing Condition Deadline',
    description: 'Financing condition expires for John Smith',
    time: 'Tomorrow',
    priority: 'high',
    clientId: '1',
    clientName: 'John Smith'
  },
  {
    id: '2',
    type: 'funds',
    title: 'Funds Required Soon',
    description: 'Funds required in 3 days for Sarah Johnson',
    time: '3 days',
    priority: 'high',
    clientId: '2',
    clientName: 'Sarah Johnson'
  },
  {
    id: '3',
    type: 'ai',
    title: 'Lead Follow-up Recommended',
    description: 'Contact Sarah Johnson - showed high interest in refinancing',
    time: '2 hours ago',
    priority: 'medium'
  },
  {
    id: '4',
    type: 'meeting',
    title: 'Client Meeting',
    description: 'Virtual meeting with John Davis to discuss loan options',
    time: 'Today 3:00 PM',
    priority: 'medium'
  }
];

export function SmartNotifications() {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'financing':
        return <Calendar className="h-5 w-5 text-yellow-500" />;
      case 'funds':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'ai':
        return <BrainCircuit className="h-5 w-5 text-purple-500" />;
      case 'deadline':
        return <Bell className="h-5 w-5 text-red-500" />;
      case 'meeting':
        return <Calendar className="h-5 w-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority'], type: Notification['type']) => {
    if (type === 'funds') return 'border-l-4 border-red-500';
    if (type === 'financing') return 'border-l-4 border-yellow-500';
    
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500';
      case 'medium':
        return 'border-l-4 border-yellow-500';
      default:
        return 'border-l-4 border-green-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Smart Notifications</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start space-x-4 p-4 bg-white rounded-lg ${getPriorityColor(
              notification.priority,
              notification.type
            )} shadow-sm`}
          >
            <div className="flex-shrink-0">{getIcon(notification.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {notification.description}
                  </p>
                </div>
                <button className="ml-4 text-gray-400 hover:text-gray-500">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2">
                <span className="text-xs text-gray-500">{notification.time}</span>
                {notification.clientId && (
                  <button 
                    className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                    onClick={() => window.location.href = `/clients/${notification.clientId}`}
                  >
                    View Client
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}