import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useUserAuth } from '../context/UserAuthContext';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { getItemCount } = useCart();
  const { isAdmin } = useAuth();
  const { isLoggedIn, user } = useUserAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">ArtGallery</span>
        </Link>

        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/gallery" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Gallery
          </Link>
          {isAdmin && (
            <Link to="/admin" className="nav-link admin-link" onClick={() => setIsMenuOpen(false)}>
              🎨 Admin
            </Link>
          )}
          <Link to="/cart" className="nav-link cart-link" onClick={() => setIsMenuOpen(false)}>
            <span className="cart-icon">🛒</span>
            Cart
            {getItemCount() > 0 && (
              <span className="cart-badge">{getItemCount()}</span>
            )}
          </Link>
          {isLoggedIn ? (
            <Link to="/account" className="nav-link user-link" onClick={() => setIsMenuOpen(false)}>
              <span className="user-avatar">{user?.name.charAt(0).toUpperCase()}</span>
              <span className="user-name">{user?.name.split(' ')[0]}</span>
            </Link>
          ) : (
            <Link to="/login" className="nav-link login-link" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

