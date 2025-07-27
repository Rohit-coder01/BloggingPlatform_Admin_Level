import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Newspaper, LogIn, LogOut, UserCircle, Menu, X } from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, isAdmin, user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/70 shadow-md backdrop-blur-md text-black'
          : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo - Left aligned */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold hover:scale-105 transition-transform"
          >
            <Newspaper className="w-7 h-7" />
            MyBlog
          </Link>
        </div>

        {/* Navigation - Right aligned */}
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
           <nav className="hidden md:flex items-center gap-6 text-base font-medium ml-auto">
            <Link to="/" className="hover:text-blue-300 transition">
              Home
            </Link>

            {isAuthenticated && isAdmin && (
              <Link
                to="/admin/dashboard"
                className="hover:text-blue-300 transition"
              >
                Dashboard
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center gap-2 hover:text-blue-300"
                >
                  {user?.name || 'User'}
                  <UserCircle size={20} />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-xl shadow-lg ring-1 ring-gray-200 animate-slide-down z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/my-posts"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        My Posts
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1 hover:text-blue-300"
                >
                  <LogIn size={18} />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 transition"
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white bg-blue-600 p-2 rounded hover:bg-blue-700 transition"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-black shadow-lg transition-all duration-300 px-4 py-4 rounded-b-lg animate-slide-down">
          <div className="flex flex-col space-y-3 text-base font-medium">
            <Link
              to="/"
              className="hover:bg-gray-100 px-3 py-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className="hover:bg-gray-100 px-3 py-2 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/posts"
                      className="hover:bg-gray-100 px-3 py-2 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Manage Posts
                    </Link>
                  </>
                )}
                <Link
                  to="/profile"
                  className="hover:bg-gray-100 px-3 py-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link
                    to="/my-posts"
                    className="hover:bg-gray-100 px-3 py-2 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Posts
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-left hover:bg-gray-100 px-3 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:bg-gray-100 px-3 py-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600  hover:bg-blue-700 transition hover:bg-blue-700 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
