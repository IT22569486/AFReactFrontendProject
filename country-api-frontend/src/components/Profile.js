import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/auth';

function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          setUser(res.data);
          setFormData({
            username: res.data.username,
            email: res.data.email,
            password: '',
          });
        })
        .catch(() => setMessage('Failed to load profile'));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`${API_BASE_URL}/me`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setUser(res.data);
        setMessage('Profile updated successfully!');
      })
      .catch(err => setMessage(err.response?.data.message || 'Update failed'));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="auth-form">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="New Password (optional)"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Update Profile</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Profile;