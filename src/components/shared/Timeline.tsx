import React from 'react';
import { MessageSquare, Mail, Phone, FileText, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface TimelineEvent {
  id: string;
  type: 'note' | 'email' | 'call' | 'document' | 'meeting';
  title: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
    avatar?: string;
  };
}

interface TimelineProps {
  clientId: string;
}

export function Timeline({ clientId }: TimelineProps) {
  // Mock timeline data - replace with actual data fetch
  const events: TimelineEvent[] = [
    {
      id: '1',
      type: 'note',
      title: 'Client Meeting Notes',
      description: 'Discussed property requirements and budget constraints.',
      timestamp: '2024-02-28T14:30:00',
      user: {
        name: 'Sarah Wilson'
      }
    },
    {
      id: '2',
      type: 'email',
      title: 'Pre-approval Letter Sent',
      description: 'Sent pre-approval letter to client and realtor.',
      timestamp: '2024-02-27T10:15:00',
      user: {
        name: 'Mike Johnson'
      }
    },
    {
      id: '3',
      type: 'document',
      title: 'Income Verification Uploaded',
      description: 'Client uploaded T4 slips and NOA.',
      timestamp: '2024-02-26T16:45:00',
      user: {
        name: 'System'
      }
    }
  ];

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'note':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'email':
        return <Mail className="h-5 w-5 text-green-500" />;
      case 'call':
        return <Phone className="h-5 w-5 text-purple-500" />;
      case 'document':
        return <FileText className="h-5 w-5 text-yellow-500" />;
      case 'meeting':
        return <Calendar className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                    {getEventIcon(event.type)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="mt-1 text-sm text-gray-500">{event.description}</p>
                    <p className="mt-1 text-xs text-gray-400">By {event.user.name}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    {format(new Date(event.timestamp), 'MMM d, yyyy h:mm a')}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}