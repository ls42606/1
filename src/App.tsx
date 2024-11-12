import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/auth/Login';
import { NotFound } from './pages/NotFound';
import { Dashboard } from './pages/Dashboard';
import { Clients } from './pages/clients/Clients';
import { Leads } from './pages/leads/Leads';
import { Tasks } from './pages/tasks/Tasks';
import { Pipeline } from './pages/Pipeline';
import { COIs } from './pages/cois/COIs';
import { Settings } from './pages/Settings';

function App() {
  const { initialize, isLoading } = useAuth();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <AuthGuard type="public">
            <Login />
          </AuthGuard>
        } />
        
        <Route path="/" element={
          <AuthGuard type="private">
            <Layout />
          </AuthGuard>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients/*" element={<Clients />} />
          <Route path="leads/*" element={<Leads />} />
          <Route path="tasks/*" element={<Tasks />} />
          <Route path="pipeline/*" element={<Pipeline />} />
          <Route path="cois/*" element={<COIs />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function AuthGuard({ children, type }: { children: React.ReactNode, type: 'public' | 'private' }) {
  const { isAuthenticated, isFirstTime } = useAuth();

  if (type === 'public' && isAuthenticated && !isFirstTime) {
    return <Navigate to="/dashboard" replace />;
  }

  if (type === 'private' && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default App;