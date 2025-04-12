import axios from 'axios';
import React, { useEffect, useState } from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
import { useLocation } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000/api/auth';

function Header({OpenSidebar}) {
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

  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <p>Welcome, {formData.email}!</p>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <BsPersonCircle className='icon'/>
        </div>
    </header>
  )
}

export default Header