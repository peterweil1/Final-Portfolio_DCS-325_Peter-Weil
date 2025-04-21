import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Todo from '../components/Todo';

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      <p className="mb-4">Welcome, {currentUser.email}</p>
      
      <Todo />
    </div>
  );
} 