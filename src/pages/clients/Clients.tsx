import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ClientList } from '../../components/clients/ClientList';
import { ClientForm } from '../../components/clients/ClientForm';
import { ClientDetails } from '../../components/clients/ClientDetails';

export function Clients() {
  return (
    <Routes>
      <Route index element={<ClientList />} />
      <Route path="new" element={<ClientForm />} />
      <Route path=":id" element={<ClientDetails />} />
    </Routes>
  );
}