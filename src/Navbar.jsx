import { useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">Dryp</Link>
                <div className="menu-icon" onClick={toggleMenu}>
                    <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <Link to="/" className="nav-item" onClick={toggleMenu}>Home</Link>
                    <Link to="/About" className="nav-item" onClick={toggleMenu}>About</Link>
                    <Link to="/MedicineTracker" className="nav-item" onClick={toggleMenu}>MedicineTracker</Link>
                    <Link to="/Blog" className="nav-item" onClick={toggleMenu}>Blog</Link>
                </div>
                <div className="navbar-actions">
                    <span className="navbar-hotline">Hotline: <a href="tel:+1234567890">+1234567890</a></span>
                    <Link to="/RegistrationForm" className="navbar-RegistrationForm" onClick={toggleMenu}>Register</Link>
                    <Link to="/UserProfile" i className="fa-regular fa-circle-user" onClick={toggleMenu}></Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;