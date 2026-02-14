import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenSquare, LogOut, Menu, X, Home, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  return (
    <motion.nav 
      className="navbar"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="logo-text">Blogverse</span>
            <span className="logo-dot">.</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/blogs" className="nav-link">
            <BookOpen size={18} />
            <span>Explore</span>
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <Link to="/create">
                <motion.button 
                  className="btn-create"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PenSquare size={18} />
                  <span>Create</span>
                </motion.button>
              </Link>
              <motion.button 
                className="btn-logout"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={18} />
              </motion.button>
            </>
          ) : (
            <>
              <Link to="/login">
                <motion.button 
                  className="btn-login"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button 
                  className="btn-register"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Link to="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/blogs" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
            <BookOpen size={20} />
            <span>Explore</span>
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/create" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                <PenSquare size={20} />
                <span>Create Post</span>
              </Link>
              <button className="mobile-link" onClick={handleLogout}>
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
