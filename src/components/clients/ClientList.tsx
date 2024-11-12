import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, Search, Filter, MoreVertical, Users, 
  ArrowUpDown, Tag, Calendar, AlertCircle 
} from 'lucide-react';
import { format, isBefore, addDays } from 'date-fns';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  fileNumber: string;
  status: 'active' | 'pending' | 'completed' | 'inactive';
  coiName?: string;
  tags: string[];
  financingDate?: string;
  fundsDate: string;
  lastContact: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    fileNumber: 'MF2024-001',
    status: 'active',
    coiName: 'Robert Chen',
    tags: ['Purchase', 'First-Time'],
    financingDate: '2024-03-15',
    fundsDate: '2024-04-01',
    lastContact: '2024-02-28'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 987-6543',
    fileNumber: 'MF2024-002',
    status: 'pending',
    tags: ['Refinance'],
    fundsDate: '2024-03-30',
    lastContact: '2024-02-25'
  },
  {
    id: '3',
    name: 'Michael Chang',
    email: 'michael.c@email.com',
    phone: '(555) 456-7890',
    fileNumber: 'MF2024-003',
    status: 'completed',
    coiName: 'Lisa Thompson',
    tags: ['Purchase', 'Investment'],
    financingDate: '2024-03-10',
    fundsDate: '2024-03-25',
    lastContact: '2024-02-20'
  }
];

export function ClientList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getDeadlineStatus = (financingDate?: string, fundsDate?: string) => {
    const today = new Date();
    const warningDays = 7;

    if (financingDate && isBefore(new Date(financingDate), addDays(today, warningDays))) {
      return 'financing-warning';
    }
    if (fundsDate && isBefore(new Date(fundsDate), addDays(today, warningDays))) {
      return 'funds-warning';
    }
    return 'normal';
  };

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
        <button
          onClick={() => navigate('new')}
          className="btn-primary flex items-center space-x-2"
        >
          <UserPlus className="h-5 w-5" />
          <span>Add Client</span>
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    COI
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Critical Dates
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockClients.map((client) => {
                  const deadlineStatus = getDeadlineStatus(client.financingDate, client.fundsDate);
                  
                  return (
                    <tr 
                      key={client.id}
                      className={`hover:bg-gray-50 transition-colors
                        ${deadlineStatus === 'funds-warning' ? 'bg-red-50' : 
                          deadlineStatus === 'financing-warning' ? 'bg-yellow-50' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{client.name}</div>
                            <div className="text-sm text-gray-500">{client.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.fileNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.coiName || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-2">
                          {client.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          {client.financingDate && (
                            <div className="flex items-center text-sm">
                              <Calendar className="h-4 w-4 mr-1 text-yellow-500" />
                              <span className="text-gray-600">Financing: {client.financingDate}</span>
                            </div>
                          )}
                          <div className="flex items-center text-sm">
                            <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
                            <span className="text-gray-900 font-medium">
                              Funds: {client.fundsDate}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          onClick={() => navigate(`/clients/${client.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}