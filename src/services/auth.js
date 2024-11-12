// src/services/auth.js
import axios from "axios";

const API_URL = "https://backend-8co5.onrender.com/api/users";

// Signup
export const signup = (userData) => axios.post(`${API_URL}/register`, userData);

// Login
export const login = (email, password) =>
  axios.post(`${API_URL}/login`, { email, password });

// Get Profile
export const getProfile = (token) =>
  axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteAccount = (email, token) =>
  axios.delete(`${API_URL}/delete`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { email },
  });
// Update Profile Info
export const updateProfileInfo = (data, token) =>
  axios.put(`${API_URL}/update-profile`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Update Password
export const updatePassword = (passwordData, token) =>
  axios.put(`${API_URL}/update-password`, passwordData, {
    headers: { Authorization: `Bearer ${token}` },
  });
