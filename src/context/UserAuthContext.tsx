import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { authAPI } from '../services/api';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  isAdmin?: boolean;
}

interface UserAuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string) => Promise<void>;
  loading: boolean;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export const UserAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('apiUser');
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        id: parsed._id,
        email: parsed.email,
        name: parsed.name,
        createdAt: parsed.createdAt,
        isAdmin: parsed.isAdmin,
      };
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const data = await authAPI.register(name, email, password);
      const newUser: User = {
        id: data._id,
        email: data.email,
        name: data.name,
        createdAt: new Date().toISOString(),
        isAdmin: data.isAdmin,
      };
      setUser(newUser);
      localStorage.setItem('apiUser', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const data = await authAPI.login(email, password);
      const loggedInUser: User = {
        id: data._id,
        email: data.email,
        name: data.name,
        createdAt: new Date().toISOString(),
        isAdmin: data.isAdmin,
      };
      setUser(loggedInUser);
      localStorage.setItem('apiUser', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('apiUser');
  };

  const updateProfile = async (name: string) => {
    if (user) {
      setLoading(true);
      try {
        const data = await authAPI.updateProfile(name);
        const updatedUser: User = {
          id: data._id,
          email: data.email,
          name: data.name,
          createdAt: user.createdAt,
          isAdmin: data.isAdmin,
        };
        setUser(updatedUser);
        localStorage.setItem('apiUser', JSON.stringify(data));
      } catch (error) {
        console.error('Update profile error:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
        updateProfile,
        loading,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};

