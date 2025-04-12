import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000/api/auth';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData); // Log what’s being sent
    axios.post(`${API_BASE_URL}/login`, formData)
      .then(res => {
        console.log('Response:', res.data); // Log the response
        localStorage.setItem('token', res.data.token);
        setMessage('Login successful!');
        setTimeout(() => navigate('/'), 1000);
      })
      .catch(err => {
        console.error('Error:', err.response ? err.response.data : err.message); // Log detailed error
        setMessage(err.response?.data.message || 'Login failed');
      });
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;