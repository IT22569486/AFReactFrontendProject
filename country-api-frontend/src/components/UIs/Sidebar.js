import React, { useContext } from 'react';
import { BsGrid1X2Fill, BsPersonCircle } from 'react-icons/bs';
import { FaFlagUsa, FaRegistered } from 'react-icons/fa';
import { RiLoginBoxFill } from 'react-icons/ri';
import { AuthContext } from '../../context/AuthContext';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <aside
      id="sidebar"
      className={`bg-light border-end p-3 vh-100 position-fixed ${openSidebarToggle ? 'd-block' : 'd-none d-md-block'}`}
      style={{ width: '250px', transition: 'all 0.3s ease-in-out', zIndex: 1000 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="d-flex align-items-center mb-0">
          <FaFlagUsa className="me-2 text-primary" /> Countries
        </h4>
        <button className="btn btn-sm btn-outline-danger d-md-none" onClick={OpenSidebar}>
          X
        </button>
      </div>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <a href="/" className="nav-link text-dark d-flex align-items-center">
            <BsGrid1X2Fill className="me-2" /> Dashboard
          </a>
        </li>

        {user ? (
          <>
            <li className="nav-item mb-2">
              <a href="/countries" className="nav-link text-dark d-flex align-items-center">
                <FaFlagUsa className="me-2" /> Countries
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="/profile" className="nav-link text-dark d-flex align-items-center">
                <BsPersonCircle className="me-2" /> Profile
              </a>
            </li>
            <li className="nav-item mt-3">
              <button className="btn btn-outline-primary w-100" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item mb-2">
              <a href="/register" className="nav-link text-dark d-flex align-items-center">
                <FaRegistered className="me-2" /> Register
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="/login" className="nav-link text-dark d-flex align-items-center">
                <RiLoginBoxFill className="me-2" /> Login
              </a>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
