import React from 'react';

import { useAuth } from '../hooks/useAuth';

const UnauthenticatedApp = () => {
  const { login } = useAuth();
  return (
    <>
      <button onClick={login}>Login with Google</button>
    </>
  );
};
export default UnauthenticatedApp;
