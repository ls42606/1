import React from 'react';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  dueDate: Date;
  status: 'pending' | 'overdue' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

const tasks: Task[] = [
  {
    id: '1',
    title: 'Review John Smith\'s mortgage application',
    dueDate: new Date(),
    status: 'pending',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Follow up with Sarah Johnson about property valuation',
    dueDate: new Date(Date.now() - 86400000),
    status: 'overdue',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Schedule meeting with new real estate partner',
    dueDate: new Date(),
    status: 'pending',
    priority: 'medium',
  },
];

export function TaskPriority() {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'overdue': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Priority Tasks</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
      </div>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className={`mt-0.5 ${getStatusColor(task.status)}`}>
              {task.status === 'completed' ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : task.status === 'overdue' ? (
                <AlertCircle className="h-5 w-5" />
              ) : (
                <Clock className="h-5 w-5" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{task.title}</p>
              <div className="mt-1 flex items-center space-x-2">
                <span className="text-xs text-gray-500">
                  Due: {format(task.dueDate, 'MMM d, yyyy')}
                </span>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            </div>

            <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
              Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}