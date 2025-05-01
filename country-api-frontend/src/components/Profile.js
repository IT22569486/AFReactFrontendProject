import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000/api/auth';

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${API_BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => setMessage('Failed to load profile'));
    }
  }, []);

  const handleEditClick = () => {
    navigate('/edit-user/' + user._id);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-4">User Profile</h2>
        <div>
          <div className="mb-3">
            <label className="form-label fw-bold">First Name</label>
            <p>{user.firstName || 'Not provided'}</p>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Last Name</label>
            <p>{user.lastName || 'Not provided'}</p>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Username</label>
            <p>{user.username}</p>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <p>{user.email}</p>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Phone Number</label>
            <p>{user.phoneNumber || 'Not provided'}</p>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Created At</label>
            <p>{new Date(user.createdAt).toLocaleString()}</p>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Updated At</label>
            <p>{new Date(user.updatedAt).toLocaleString()}</p>
          </div>
          <button className="btn btn-primary w-100" onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
        {message && (
          <div className="alert alert-danger mt-3" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;