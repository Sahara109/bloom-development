import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// AuthContext Provider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    token: null,
    user: null,
  });

  // Fetch auth state from localStorage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    try {
      if (storedToken && storedUser) {
        setAuth({
          isLoggedIn: true,
          token: storedToken,
          user: JSON.parse(storedUser), // Ensure this is valid JSON
        });
      }
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }, []);

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
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};