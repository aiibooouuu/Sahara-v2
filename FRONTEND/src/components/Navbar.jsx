import React from 'react';
import './Navbar.css';

function Navbar() {
return (
    <nav className="navbar">
    <div className="navbar-left">
        <a href="/" className="navbar-home-link">
        <img src="/logo-clean.png" alt="Sahara Logo" className="logo" />
        {/* <span className="brand">SAHARA</span> */}
        </a>
    </div>
    <div className="navbar-right">
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
    </div>
    </nav>
);
}

export default Navbar;
