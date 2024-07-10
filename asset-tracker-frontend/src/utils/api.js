// src/utils/api.js

const API_BASE_URL = 'http://localhost:3000';

// Helper function to get the token from local storage
const getToken = () => localStorage.getItem('token');

// Helper function to set headers with token
const setHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };
};

// Auth API
export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const register = async (data) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// User API
export const createUser = async (data) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: setHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
};

// Asset API
export const getAssets = async () => {
  const response = await fetch(`${API_BASE_URL}/assets`, {
    method: 'GET',
    headers: setHeaders(),
  });
  return response.json();
};

export const createAsset = async (data) => {
  const response = await fetch(`${API_BASE_URL}/assets`, {
    method: 'POST',
    headers: setHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateAsset = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
    method: 'PUT',
    headers: setHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteAsset = async (id) => {
  const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
    method: 'DELETE',
    headers: setHeaders(),
  });
  return response.json();
};

// Other APIs
export const getStats = async () => {
  const response = await fetch(`${API_BASE_URL}/stats`, {
    method: 'GET',
    headers: setHeaders(),
  });
  return response.json();
};
