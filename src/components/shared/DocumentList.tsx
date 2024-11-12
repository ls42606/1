import React, { useState } from 'react';
import { FileText, Upload, Download, Trash2, Eye } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface DocumentListProps {
  clientId: string;
}

export function DocumentList({ clientId }: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Income_Verification.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedAt: '2024-02-28',
      status: 'approved'
    },
    {
      id: '2',
      name: 'Bank_Statements.pdf',
      type: 'PDF',
      size: '3.1 MB',
      uploadedAt: '2024-02-27',
      status: 'pending'
    }
  ]);

  const getStatusColor = (status: Document['status']) => {
    const colors = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-sm">
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            <Upload className="h-5 w-5 mr-2 text-gray-500" />
            Upload Document
          </label>
          <input
            id="file-upload"
            type="file"
            className="sr-only"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {documents.map((doc) => (
            <li key={doc.id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-blue-600 hover:text-blue-800">
                        {doc.name}
                      </p>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span>{doc.type}</span>
                        <span className="mx-2">•</span>
                        <span>{doc.size}</span>
                        <span className="mx-2">•</span>
                        <span>Uploaded {doc.uploadedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-4 sm:mt-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-500">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-500">
                        <Download className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-500">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}