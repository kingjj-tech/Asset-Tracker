import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // You'll need to implement a function to verify the token
      // and get the user data. For now, I'll leave a placeholder:
      verifyTokenAndGetUser(storedToken)
        .then(userData => {
          setUser(userData);
          setToken(storedToken);
        })
        .catch(error => {
          console.error('Failed to authenticate token', error);
          navigate('/');
        });
    }
    setLoading(false);
  }, [navigate]);

  const login = async (credentials) => {
    const response = await apiLogin(credentials);
    localStorage.setItem('token', response.token);
    setUser(response.user);
    setToken(response.token);
    return response.user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

// Placeholder function - you need to implement this
async function verifyTokenAndGetUser(token) {
  // This should make a request to your backend to verify the token
  // and return the user data
  // For now, it just returns a dummy user
  return { id: 1, name: 'John Doe' };
}