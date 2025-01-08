import React, { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// AuthContext Provider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    token: null,
    user: null,
  });

  const login = (token, user) => {
    setAuth({ isLoggedIn: true, token, user });
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, token: null, user: null });
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
