import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, Calendar, Tag, Edit2, Trash2, 
  MessageSquare, FileText, Clock, ArrowLeft, Star,
  UserCheck, Building2, Users
} from 'lucide-react';
import { Timeline } from '../shared/Timeline';
import { RichTextEditor } from '../shared/RichTextEditor';

export function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock lead data - will be replaced with IndexedDB fetch
  const lead = {
    id,
    name: 'Michael Brown',
    email: 'michael.b@email.com',
    phone: '(555) 123-4567',
    status: 'new',
    source: 'Website',
    coiName: 'Robert Chen',
    score: 85,
    tags: ['First-Time Buyer', 'Pre-Approval'],
    createdAt: '2024-02-28',
    lastContact: '2024-02-28',
    notes: 'Interested in downtown condos, budget range $400k-500k.',
    documents: [
      { name: 'Pre-qualification Form.pdf', date: '2024-02-28' },
      { name: 'Credit Report.pdf', date: '2024-02-28' }
    ],
    activities: [
      { type: 'note', content: 'Initial consultation completed', date: '2024-02-28' },
      { type: 'email', content: 'Sent follow-up information', date: '2024-02-28' }
    ]
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      lost: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.new;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleConvertToClient = () => {
    // Implement conversion logic
    navigate('/clients/new');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/leads')}
            className="p-2 text-gray-400 hover:text-gray-500"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Lead Details</h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleConvertToClient}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <UserCheck className="h-5 w-5 mr-2" />
            Convert to Client
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Edit2 className="h-5 w-5" />
            <span>Edit</span>
          </button>
          <button className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 flex items-center space-x-2">
            <Trash2 className="h-5 w-5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{lead.name}</h2>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                      <div className="flex items-center">
                        <Star className={`h-4 w-4 mr-1 ${getScoreColor(lead.score)}`} />
                        <span className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-500">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>{lead.email}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>{lead.phone}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Source</label>
                  <div className="mt-1 flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="text-gray-900">{lead.source}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">COI Reference</label>
                  <div className="mt-1 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="text-gray-900">{lead.coiName || 'None'}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <div className="mt-1 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="text-gray-900">{lead.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {lead.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    <Tag className="h-4 w-4 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Notes</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">Add Note</button>
            </div>
            <RichTextEditor
              initialValue={lead.notes}
              onChange={() => {}}
              placeholder="Add notes about the lead..."
            />
          </div>

          {/* Documents */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Documents</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">Upload New</button>
            </div>
            <div className="space-y-3">
              {lead.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.date}</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800">View</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Activity Timeline</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">Add Note</button>
            </div>
            
            <Timeline clientId={id || ''} />
          </div>
        </div>
      </div>
    </div>
  );
}