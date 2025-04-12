import React, { useContext } from 'react';
import { BsGrid1X2Fill, BsPersonCircle } from 'react-icons/bs';
import { FaFlagUsa, FaRegistered } from 'react-icons/fa';
import { RiLoginBoxFill } from 'react-icons/ri';
import { AuthContext } from '../../context/AuthContext';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <FaFlagUsa className="icon_header" /> Countries
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        {user ? (
          <>
            <li className="sidebar-list-item">
              <a href="/">
                <BsGrid1X2Fill className="icon" /> Dashboard
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="/profile">
                <BsPersonCircle className="icon" /> Profile
              </a>
            </li>
            <li className="sidebar-list-item">
              <button className="btn btn-primary" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="sidebar-list-item">
              <a href="/register">
                <FaRegistered className="icon" /> Register
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="/login">
                <RiLoginBoxFill className="icon" /> Login
              </a>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;