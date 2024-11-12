import React from 'react';
import { Users, ArrowUpRight, Star, Calendar } from 'lucide-react';

interface COI {
  id: string;
  name: string;
  role: string;
  company: string;
  lastInteraction: string;
  nextMeeting?: string;
  relationshipScore: number;
  recentReferrals: number;
}

const cois: COI[] = [
  {
    id: '1',
    name: 'Robert Chen',
    role: 'Real Estate Agent',
    company: 'Premier Realty',
    lastInteraction: '2 days ago',
    nextMeeting: 'Tomorrow 2:00 PM',
    relationshipScore: 9.2,
    recentReferrals: 5,
  },
  {
    id: '2',
    name: 'Lisa Thompson',
    role: 'Financial Advisor',
    company: 'Wealth Partners',
    lastInteraction: '1 week ago',
    relationshipScore: 8.5,
    recentReferrals: 3,
  },
  {
    id: '3',
    name: 'Michael Wong',
    role: 'Insurance Agent',
    company: 'Secure Life',
    lastInteraction: '3 days ago',
    nextMeeting: 'Next Tuesday 11:00 AM',
    relationshipScore: 7.8,
    recentReferrals: 2,
  },
];

export function COINetwork() {
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600';
    if (score >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">COI Network</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
      </div>

      <div className="space-y-6">
        {cois.map((coi) => (
          <div key={coi.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{coi.name}</h3>
                  <p className="text-sm text-gray-500">
                    {coi.role} at {coi.company}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className={`text-sm font-medium ${getScoreColor(coi.relationshipScore)}`}>
                    {coi.relationshipScore}
                  </span>
                </div>
              </div>
              
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <span>Last contact: {coi.lastInteraction}</span>
                <span>•</span>
                <span>{coi.recentReferrals} recent referrals</span>
              </div>
              
              {coi.nextMeeting && (
                <div className="mt-2 flex items-center text-sm text-blue-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  Next meeting: {coi.nextMeeting}
                </div>
              )}
            </div>

            <button className="flex-shrink-0 text-blue-600 hover:text-blue-800">
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}