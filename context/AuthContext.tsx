"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: () => boolean;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check for admin credentials
    if (email === "admin@example.com" && password === "admin123") {
      const adminData: User = {
        id: "admin-001",
        name: "Admin",
        email: email,
        profilePicture: `https://ui-avatars.com/api/?name=Admin&background=06b6d4&color=fff`,
        isAdmin: true
      };

      setUser(adminData);
      localStorage.setItem("user", JSON.stringify(adminData));
      setIsLoading(false);
      return true;
    }

    // Mock login validation for regular users
    if (email && password.length >= 6) {
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email: email,
        profilePicture: `https://ui-avatars.com/api/?name=${email.split("@")[0]}&background=06b6d4&color=fff`,
        isAdmin: false
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock registration validation
    if (name && email && password.length >= 6) {
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
        profilePicture: `https://ui-avatars.com/api/?name=${name}&background=06b6d4&color=fff`
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAdmin = () => {
    return user?.isAdmin === true;
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, isAdmin, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Return a safe default during SSR when context is not available
    if (typeof window === 'undefined') {
      return {
        user: null,
        login: async () => false,
        register: async () => false,
        logout: () => {},
        isLoading: false,
        isAdmin: () => false,
        updateUser: () => {},
      };
    }
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}