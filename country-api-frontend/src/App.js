import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import Sidebar from './components/UIs/Sidebar';
import Header from './components/UIs/Header';
import '../src/Home.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Handle login
  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem('user', username); // Persist user in localStorage
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user from localStorage
  };

    const [countries, setCountries] = useState([]);
    
      useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
          .then((response) => response.json())
          .then((data) => setCountries(data));
      }, []);
    
      const handleSearch = (data) => setCountries(data);
      const handleFilter = (data) => setCountries(data);
    
      const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    
      const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
      }

  return (
    <div className="container">
      <h1 className="text-center my-4">REST Countries Explorer</h1>
      {user ? (
        <div className="mb-3">
          <p>Welcome, {user}! <button className="btn btn-danger" onClick={handleLogout}>Logout</button></p>
            <Router>
                <div className="grid-container">
                <Header/>
                <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
                <div className="main-container">
                    <SearchBar onSearch={handleSearch} />
                    <Filter onFilter={handleFilter} />
                    <Routes>
                    <Route path="/" element={<CountryList countries={countries} />} />
                    <Route path="/country/:code" element={<CountryDetails />} />
                    </Routes>
                </div>
                </div>
            </Router>
        </div>
        

      ) : (
        <div className="mb-3">
          <button className="btn btn-primary" onClick={() => handleLogin('TestUser')}>
            Login as TestUser
          </button>
        </div>
      )}
      <p>{user ? 'You are logged in!' : 'Please log in to explore countries.'}</p>
    </div>
  );
}

export default App;