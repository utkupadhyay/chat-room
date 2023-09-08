import { createContext, FunctionComponent, ReactNode, useState } from 'react';

import { loginWithGoogle } from '../services/firebase';

interface User {
  uid: string;
  displayName: string | null;
}

interface AuthContextType {
  user: User | null;
  login: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async () => {
    const user = await loginWithGoogle();

    if (!user) {
      // TODO: Handle failed login
    }

    setUser(user);
  };

  const value = { user, login };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
