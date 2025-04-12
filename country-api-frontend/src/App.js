import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import Sidebar from './components/UIs/Sidebar';
import Header from './components/UIs/Header';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import EditUser from './components/EditUser';
import './Home.css';

function App() {
  const [countries, setCountries] = React.useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = React.useState(false);

  React.useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const handleSearch = (data) => setCountries(data);
  const handleFilter = (data) => setCountries(data);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <AuthProvider>
        <div className="container">
          <h1 className="text-center my-4">REST Countries Explorer</h1>
          <div className="mb-3">
            <div className="grid-container">
              <Header />
              <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
              <div className="main-container">
                <SearchBar onSearch={handleSearch} />
                <Filter onFilter={handleFilter} />
                <Routes>
                  <Route path="/" element={<CountryList countries={countries} />} />
                  <Route path="/country/:code" element={<CountryDetails />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<PrivateRoute component={Profile} />} />
                  <Route path="/edit-user/:id" element={<PrivateRoute component={EditUser} />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

// PrivateRoute component to protect routes
function PrivateRoute({ component: Component }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Component /> : <Navigate to="/login" />;
}

export default App;