import React, { useEffect } from 'react';
import { TaskPriority } from '../components/dashboard/TaskPriority';
import { PerformanceMetrics } from '../components/dashboard/PerformanceMetrics';
import { SmartNotifications } from '../components/dashboard/SmartNotifications';
import { COINetwork } from '../components/dashboard/COINetwork';

export function Dashboard() {
  // Initialize IndexedDB connection and load data
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // IndexedDB initialization and data loading will be implemented here
      } catch (error) {
        console.error('Failed to initialize dashboard:', error);
      }
    };

    initializeDashboard();
  }, []);

  return (
    <div className="space-y-6">
      {/* Performance Metrics Section */}
      <PerformanceMetrics />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <TaskPriority />
          <COINetwork />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <SmartNotifications />
        </div>
      </div>
    </div>
  );
}