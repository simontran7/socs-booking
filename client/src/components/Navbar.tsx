import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-left">
        <img src="/mcgill-logo.png" alt="McGill logo" className="navbar-logo" />
        <span className="navbar-title">| SOCS Connect</span>
      </Link>

      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/login">Sign In</Link>
        <Link to="/register">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Navbar;
