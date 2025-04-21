import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="text-center">
      <h1 className="mb-4">Firebase Todo App Demo</h1>
      <p className="lead mb-4">
        This is a simple demonstration of Firebase Authentication and Firestore Database.
      </p>
      
      {currentUser ? (
        <div>
          <p>You are logged in as {currentUser.email}</p>
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div>
          <p>Please login or register to use the app</p>
          <div className="d-flex justify-content-center gap-2">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-primary">
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 