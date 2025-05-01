import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import Sidebar from './components/UIs/Sidebar';
import Header from './components/UIs/Header';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import EditUser from './components/EditUser';
import Home from './components/Home';
import './Home.css';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => setOpenSidebarToggle(!openSidebarToggle);

  return (
    <Router>
      <AuthProvider>
        <div className="container-fluid bg-light min-vh-100 p-0">
          <div className="row g-0">
            <div className={`col-md-3 col-lg-2 bg-white border-end ${openSidebarToggle ? '' : 'd-none d-md-block'}`}>
              <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            </div>
            <div className="col-md-9 col-lg-10 px-4 py-3">
            <Header OpenSidebar={OpenSidebar} />
              <h2 className="text-center text-primary mb-4">Countries Explorer</h2>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/countries" element={<CountryList  />} />
                <Route path="/country/:code" element={<CountryDetails />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<PrivateRoute component={Profile} />} />
                <Route path="/edit-user/:id" element={<PrivateRoute component={EditUser} />} />
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

function PrivateRoute({ component: Component }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return user ? <Component /> : <Navigate to="/login" />;
}

export default App;
