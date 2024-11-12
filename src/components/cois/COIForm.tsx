import React from 'react';
import { useNavigate } from 'react-router-dom';

export function COIForm() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">New COI</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <p className="text-gray-500">COI form will be implemented here</p>
        </div>
      </div>
    </div>
  );
}