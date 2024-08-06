import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
    setAdmin(null);
  };

  const logoutUser = () => {
    setUser(null);
  };

  const loginAdmin = (adminData) => {
    setAdmin(adminData);
    setUser(null);
  };

  const logoutAdmin = () => {
    setAdmin(null);
  };

  const logout = () => {
    if (user) {
      logoutUser();
    }
    if (admin) {
      logoutAdmin();
    }
  };

  return (
    <AuthContext.Provider value={{ user, admin, loginUser, logout, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};