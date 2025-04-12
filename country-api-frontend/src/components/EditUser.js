import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000/api/auth';

function EditUser() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: '' });
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Check if user is admin and fetch user data
    axios.get(`${API_BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.data.role === 'admin') {
          setIsAdmin(true);
          fetchUserData(token, id);
        } else {
          setMessage('Access denied: Admins only');
          setTimeout(() => navigate('/'), 2000);
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate, id]);

  const fetchUserData = (token, userId) => {
    axios.get(`${API_BASE_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setFormData({
          username: res.data.username,
          email: res.data.email,
          password: '', // Leave blank for optional update
          role: res.data.role,
        });
      })
      .catch(err => setMessage(err.response?.data.message || 'Failed to fetch user data'));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`${API_BASE_URL}/users/${id}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setMessage('User updated successfully!');
        setTimeout(() => navigate('/users'), 1000);
      })
      .catch(err => setMessage(err.response?.data.message || 'Update failed'));
  };

  if (!isAdmin) {
    return <div className="auth-form"><p>{message}</p></div>;
  }

  return (
    <div className="auth-form">
      <h2>Edit User</h2>
      <h2>{formData.username}</h2>
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
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Update User</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default EditUser;