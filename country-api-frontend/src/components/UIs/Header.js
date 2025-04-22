import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import SearchBar from '../SearchBar';

const API_BASE_URL = 'http://localhost:3000/api/auth';

function Header({ OpenSidebar }) {
  const [countries, setCountries] = useState([]);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${API_BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
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

  const handleSearch = (data) => setCountries(data);
  const handleFilter = (data) => setCountries(data);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4 py-2">
      <div className="d-flex align-items-center me-3">
        <button className="btn btn-outline-secondary me-3" onClick={OpenSidebar}>
          <BsJustify size={20} />
        </button>
        <div className="d-flex align-items-center">
          <BsSearch className="me-2 text-muted" />
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="ms-auto d-flex align-items-center">
        <span className="me-4 text-muted">
          Welcome, <strong>{formData.email || 'Guest'}</strong>!
        </span>
        <div className="d-flex gap-3">
          <BsFillBellFill className="text-secondary" size={20} />
          <BsFillEnvelopeFill className="text-secondary" size={20} />
          <BsPersonCircle className="text-secondary" size={24} />
        </div>
      </div>
    </nav>
  );
}

export default Header;
