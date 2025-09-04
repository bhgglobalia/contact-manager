import React from "react";
import "./Navbar.css";

interface NavbarProps {
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <img src="/images/logo.png" alt="Contact Manager Logo" className="logo-img" />
          <h1 className="logo-text">Contact Manager</h1>
        </div>

        <div className="nav-links">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
