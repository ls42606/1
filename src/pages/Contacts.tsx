import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ContactList } from '../components/contacts/ContactList';
import { ContactForm } from '../components/contacts/ContactForm';

export function Contacts() {
  return (
    <div className="space-y-6">
      <Routes>
        <Route path="/" element={
          <>
            <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
            <ContactList />
          </>
        } />
        <Route path="/new" element={
          <>
            <h1 className="text-2xl font-semibold text-gray-900">New Contact</h1>
            <ContactForm />
          </>
        } />
      </Routes>
    </div>
  );
}