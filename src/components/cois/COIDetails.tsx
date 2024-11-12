import React from 'react';
import { useParams } from 'react-router-dom';

export function COIDetails() {
  const { id } = useParams();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">COI Details</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <p className="text-gray-500">COI details for ID: {id} will be implemented here</p>
        </div>
      </div>
    </div>
  );
}