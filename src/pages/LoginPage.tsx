import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';
import {jwtDecode}   from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  type DecodedToken = {
    email: string;
    role: 'EMPLOYEE' | 'ADMIN';
    _id: string;
    iat?: number; // optional: issued at
    exp?: number; // optional: expiry
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
      const token = response.data.token;
      const decoded: DecodedToken = jwtDecode(token);
      const user = {
        email: decoded.email,
        role: decoded.role,
      };

      // Save token and user info to Redux
      localStorage.setItem('token', token);
      dispatch(loginSuccess({ token, user }));

      // Redirect user based on role
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Login failed: ' + error.message);
      } else if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        alert('Login failed: ' + (axiosError.response?.data?.message || 'Unknown error'));
      } else {
        alert('Login failed: Unknown error');
      }
    }
    
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
