import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000/api/auth';

function Sidebar({openSidebarToggle, OpenSidebar}) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
  
    // Function to fetch user data
    const fetchUser = (token) => {
      axios.get(`${API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    };
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        fetchUser(token);
      } else {
        setUser(null);
      }
    }, [location.pathname]);
  
    const handleLogout = () => {
      const token = localStorage.getItem('token');
      axios.post(`${API_BASE_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          localStorage.removeItem('token');
          setUser(null);
          navigate('/');
        })
        .catch(err => {
          console.error('Logout error:', err);
          localStorage.removeItem('token');
          setUser(null);
          navigate('/');
        });
    };
  
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> Countries
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
        {user ? (
            <>
            <li className='sidebar-list-item'>
                <a href="/">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/profile">
                    <BsListCheck className='icon'/> Profile
                </a>
            </li>
        </>
    ):(<>
            <li className='sidebar-list-item'>
                <a href="/register">
                    <BsMenuButtonWideFill className='icon'/> Register
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/login">
                    <BsFillGearFill className='icon'/> Login
                </a>
            </li> 
            </>
        )}
        </ul>
    </aside>
  )
}

export default Sidebar