import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../api/api';
import { router } from 'expo-router';

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'mahasiswa' | 'dosen' | null;
  login: (type: 'mahasiswa' | 'dosen') => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'mahasiswa' | 'dosen' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('auth_token');
      const type = await AsyncStorage.getItem('user_type') as 'mahasiswa' | 'dosen' | null;
      
      if (token && type) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuthenticated(true);
        setUserType(type);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (type: 'mahasiswa' | 'dosen') => {
    await AsyncStorage.setItem('user_type', type);
    setIsAuthenticated(true);
    setUserType(type);
  };

  const logout = async () => {
  try {
    await axios.get('/logout');
  } catch (err) {
    console.error('Logout error:', err);
  } finally {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user_type');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUserType(null);
    router.replace('/auth/login');
  }
};

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};