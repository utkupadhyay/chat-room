import React from 'react';

import AuthenticatedApp from './components/AuthenticatedApp';
import UnauthenticatedApp from './components/UnauthenciatedApp';
import { useAuth } from './hooks/useAuth';

import './App.css';

function App() {
  const { user } = useAuth();
  return user ? (
    <div>
      <AuthenticatedApp />
    </div>
  ) : (
    <UnauthenticatedApp />
  );
}

export default App;
