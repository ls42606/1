import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  User, Mail, Phone, Calendar, Tag, Edit2, 
  FileText, MessageSquare, DollarSign, CheckSquare,
  Clock, AlertCircle, Handshake, BarChart
} from 'lucide-react';
import { RichTextEditor } from '../shared/RichTextEditor';
import { DocumentList } from '../shared/DocumentList';
import { TaskList } from '../tasks/TaskList';
import { Timeline } from '../shared/Timeline';
import { FinancialMetrics } from './FinancialMetrics';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'notes', label: 'Notes', icon: <MessageSquare className="h-5 w-5" /> },
  { id: 'documents', label: 'Documents', icon: <FileText className="h-5 w-5" /> },
  { id: 'tasks', label: 'Tasks', icon: <CheckSquare className="h-5 w-5" /> },
  { id: 'timeline', label: 'Timeline', icon: <Clock className="h-5 w-5" /> },
  { id: 'financials', label: 'Financials', icon: <DollarSign className="h-5 w-5" /> },
];

interface ClientProfileProps {
  clientId: string;
}

export function ClientProfile({ clientId }: ClientProfileProps) {
  const [activeTab, setActiveTab] = useState('notes');
  const [isEditing, setIsEditing] = useState(false);

  // Mock client data - replace with actual DB fetch
  const client = {
    id: clientId,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    fileNumber: 'MF2024-001',
    status: 'active',
    coi: {
      id: '1',
      name: 'Robert Chen',
      company: 'Premier Realty',
      relationshipScore: 9.2
    },
    tags: ['Purchase', 'First-Time Buyer'],
    deadlines: {
      financing: '2024-03-15',
      closing: '2024-04-01'
    },
    progress: 75,
    metrics: {
      loanAmount: 450000,
      downPayment: 90000,
      rate: 4.5,
      term: 30,
      monthlyPayment: 2280.27
    }
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'notes':
        return (
          <div className="space-y-4">
            <RichTextEditor
              initialValue=""
              onChange={(content) => console.log('Note updated:', content)}
              placeholder="Add notes about the client..."
            />
          </div>
        );
      case 'documents':
        return <DocumentList clientId={clientId} />;
      case 'tasks':
        return <TaskList clientId={clientId} />;
      case 'timeline':
        return <Timeline clientId={clientId} />;
      case 'financials':
        return <FinancialMetrics metrics={client.metrics} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Application Progress</h3>
          <span className="text-sm text-gray-500">{client.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${client.progress}%` }}
          />
        </div>
      </div>

      {/* Client Overview Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{client.name}</h2>
              <div className="mt-1 flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
                <span className="text-sm text-gray-500">#{client.fileNumber}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <Edit2 className="h-4 w-4" />
            <span>Edit</span>
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Mail className="h-5 w-5 mr-2" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="h-5 w-5 mr-2" />
              <span>{client.phone}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2 text-yellow-500" />
              <span>Financing: {format(new Date(client.deadlines.financing), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              <span>Closing: {format(new Date(client.deadlines.closing), 'MMM d, yyyy')}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
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

        {/* COI Information */}
        {client.coi && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Handshake className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Center of Influence</h3>
                  <p className="text-sm text-gray-500">{client.coi.name} - {client.coi.company}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  {client.coi.relationshipScore} Score
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabbed Content */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}