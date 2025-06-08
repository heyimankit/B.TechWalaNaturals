import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : 'at-top'}`}>
      <div className="logo-container">
        <Link to="/">
          <img src="/assets/logo.png" alt="B. Tech Wala" className="logo-img" />
        </Link>
      </div>

      <div
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" onClick={toggleMenu}>Home</Link>
        </li>
        <li>
          <Link to="/shop" onClick={toggleMenu}>Shop</Link>
        </li>
        <li>
          <a href="#about" onClick={toggleMenu}>About</a>
        </li>
        <li>
          <Link to="/checkout" onClick={toggleMenu}>
             Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </li>
      </ul>

    </nav>
  );
};

export default Navbar;
