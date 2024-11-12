import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { COIList } from '../../components/cois/COIList';
import { COIForm } from '../../components/cois/COIForm';
import { COIDetails } from '../../components/cois/COIDetails';

export function COIs() {
  return (
    <Routes>
      <Route index element={<COIList />} />
      <Route path="new" element={<COIForm />} />
      <Route path=":id" element={<COIDetails />} />
    </Routes>
  );
}