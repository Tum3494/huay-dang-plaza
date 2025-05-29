
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for development
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    isActive: true,
    createdAt: new Date()
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Admin login
    if (username === 'admin' && password === '3494') {
      const adminUser = mockUsers.find(u => u.username === 'admin');
      if (adminUser) {
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        return true;
      }
    }
    
    // Mock member login
    if (username && password) {
      const memberUser: User = {
        id: Date.now().toString(),
        username,
        email: `${username}@example.com`,
        role: 'member',
        isActive: true,
        createdAt: new Date()
      };
      setUser(memberUser);
      localStorage.setItem('user', JSON.stringify(memberUser));
      return true;
    }
    
    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    if (username && email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        role: 'member',
        isActive: true,
        createdAt: new Date()
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
