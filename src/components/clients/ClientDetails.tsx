import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, Calendar, Tag, Edit2, Trash2, 
  MessageSquare, FileText, Clock, ArrowLeft 
} from 'lucide-react';

export function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock client data - will be replaced with IndexedDB fetch
  const client = {
    id,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    fileNumber: 'MF2024-001',
    status: 'active',
    coiName: 'Robert Chen',
    tags: ['Purchase', 'First-Time'],
    deadline: '2024-03-15',
    lastContact: '2024-02-28',
    notes: 'First-time homebuyer looking for a property in the downtown area.',
    documents: [
      { name: 'Income Verification.pdf', date: '2024-02-20' },
      { name: 'Credit Report.pdf', date: '2024-02-22' }
    ],
    activities: [
      { type: 'note', content: 'Discussed property requirements', date: '2024-02-28' },
      { type: 'email', content: 'Sent pre-approval letter', date: '2024-02-25' }
    ]
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.inactive;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/clients')}
            className="p-2 text-gray-400 hover:text-gray-500"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Client Details</h1>
        </div>
        <div className="flex space-x-4">
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
                    <h2 className="text-xl font-semibold text-gray-900">{client.name}</h2>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-500">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>{client.phone}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">File Number</label>
                  <p className="mt-1 text-gray-900">{client.fileNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">COI Reference</label>
                  <p className="mt-1 text-gray-900">{client.coiName || 'None'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Deadline</label>
                  <div className="mt-1 flex items-center text-gray-900">
                    <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                    {client.deadline}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {client.tags.map((tag, index) => (
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
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
            <p className="text-gray-600">{client.notes}</p>
          </div>

          {/* Documents */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Documents</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">Upload New</button>
            </div>
            <div className="space-y-3">
              {client.documents.map((doc, index) => (
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
              ))} </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Activity Timeline</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">Add Note</button>
            </div>
            
            <div className="flow-root">
              <ul className="-mb-8">
                {client.activities.map((activity, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== client.activities.length - 1 && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            {activity.type === 'note' ? (
                              <MessageSquare className="h-4 w-4 text-blue-600" />
                            ) : (
                              <Mail className="h-4 w-4 text-blue-600" />
                            )}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-900">
                            {activity.content}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {activity.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}