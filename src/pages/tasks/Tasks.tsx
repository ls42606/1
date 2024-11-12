import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TaskList } from '../../components/tasks/TaskList';
import { TaskForm } from '../../components/tasks/TaskForm';

export function Tasks() {
  return (
    <Routes>
      <Route index element={<TaskList />} />
      <Route path="new" element={<TaskForm />} />
    </Routes>
  );
}