import React from 'react';

export function Pipeline() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Pipeline</h1>
        <button className="btn-primary">New Deal</button>
      </div>
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <p className="text-gray-500">Deal pipeline will be implemented here</p>
        </div>
      </div>
    </div>
  );
}