import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LeadList } from '../../components/leads/LeadList';
import { LeadForm } from '../../components/leads/LeadForm';
import { LeadDetails } from '../../components/leads/LeadDetails';

export function Leads() {
  return (
    <Routes>
      <Route index element={<LeadList />} />
      <Route path="new" element={<LeadForm />} />
      <Route path=":id" element={<LeadDetails />} />
    </Routes>
  );
}