import { Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import logo from "../assets/world.png";
import { navItems } from "../constants";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Navbar must be used within an AuthProvider");
  }

  const { user, logout } = context;

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">SeeWorld</span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex ml-14 space-x-12 items-center">
            <li className="nav-item">
              <a href="/" className="nav-link text-dark d-flex align-items-center">
                Dashboard
              </a>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <a href="/countries" className="nav-link text-dark d-flex align-items-center">
                    Countries
                  </a>
                </li>
               <li to="/favorites" className="nav-item">
                  <a href="/favorites" className="nav-link text-dark d-flex align-items-center">
                    Favorites
                  </a>
              </li>
                <li className="nav-item">
                  <a href="/profile" className="nav-link text-dark d-flex align-items-center">
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <button
                    className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a href="/login" className="py-2 px-3 border rounded-md">
                    Sign In
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/register"
                    className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                  >
                    Create an account
                  </a>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul className="py-4">
              <li className="py-4">
                <a href="/">Dashboard</a>
              </li>
              {user ? (
                <>
                  <li className="py-4">
                    <a href="/countries">Countries</a>
                  </li>
                  <li className="py-4">
                    <a href="/profile">Profile</a>
                  </li>
                  <li className="py-4">
                    <button
                      className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="py-4">
                    <a href="/login">Sign In</a>
                  </li>
                  <li className="py-4">
                    <a href="/register">Create an account</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;