import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { settingsAPI } from '../api';

interface Settings {
    company_phone?: string;
    working_hours?: string;
    company_whatsapp?: string;
}

const Navbar: React.FC = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const [settings, setSettings] = useState<Settings>({});

    const isActive = (path: string) => location.pathname === path ? 'active' : '';

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await settingsAPI.getAll();
            setSettings(response.data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    const whatsappNumber = settings.company_whatsapp || '918599999394';

    return (
        <header>
            {/* Top Bar */}
            <div className="top-bar">
                <div className="container">
                    <div className="top-bar-left">
                        <span>Welcome to Shreeyadunandan</span>
                        <a href={`tel:${settings.company_phone?.replace(/\s/g, '') || '+918599999394'}`}>
                            📞 {settings.company_phone || '+91 85999 99394'}
                        </a>
                        <span>🕐 {settings.working_hours || 'Mon - Sat: 9:00 AM - 7:00 PM'}</span>
                    </div>
                    <div className="top-bar-right">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">FB</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
                        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">WA</a>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="navbar">
                <div className="container">
                    <Link to="/" className="logo">
                        Shreeyadunandan
                    </Link>
                    <ul className="nav-links">
                        <li><Link to="/" className={isActive('/')}>Home</Link></li>
                        <li><Link to="/reseller" className={isActive('/reseller')}>Re-Seller</Link></li>
                        <li><Link to="/accessories" className={isActive('/accessories')}>Accessories</Link></li>
                        <li><Link to="/new" className={isActive('/new')}>For New</Link></li>
                        <li><Link to="/certificates" className={isActive('/certificates')}>Certificate</Link></li>
                        <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
                        <li><Link to="/about" className={isActive('/about')}>About</Link></li>
                        {user ? (
                            <>
                                <li><span style={{ color: '#B89551' }}>Hi, {user.name}</span></li>
                                <li><button onClick={logout} className="btn btn-outline" style={{ padding: '8px 16px' }}>Logout</button></li>
                            </>
                        ) : (
                            <li><Link to="/login" className="btn btn-primary" style={{ padding: '8px 16px' }}>Login</Link></li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
