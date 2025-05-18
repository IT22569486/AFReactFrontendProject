import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import CountryList from "./components/CountryList";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import CountryDetails from "./components/CountryDetails";
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import FavoritesPage from './components/FavoritesPage';
function App() {
  return (
    <>
    <AuthProvider>
    <FavoritesProvider>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <FeatureSection />
                <Pricing />
                <Testimonials />
              </>
            }
          />
          <Route path="/countries" element={<PrivateRoute component={CountryList} />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute component={Profile} />} />
          <Route path="/country/:code" element={<PrivateRoute component={CountryDetails} /> } />
        </Routes>
        <Footer />
      </div>
      </FavoritesProvider>
      </AuthProvider>
    </>
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
