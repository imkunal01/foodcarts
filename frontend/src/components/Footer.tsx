import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { settingsAPI } from '../api';

interface Settings {
    company_phone?: string;
    company_email?: string;
    company_address?: string;
    working_hours?: string;
}

const Footer: React.FC = () => {
    const [settings, setSettings] = useState<Settings>({});

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

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-section">
                        <h4>Shreeyadunandan</h4>
                        <p>India's largest manufacturer and retailer of custom food carts, kiosks, and trailers.</p>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <Link to="/">Home</Link>
                        <Link to="/reseller">Re-Seller</Link>
                        <Link to="/accessories">Accessories</Link>
                        <Link to="/new">For New</Link>
                        <Link to="/about">About Us</Link>
                    </div>
                    <div className="footer-section">
                        <h4>Contact Info</h4>
                        <p>📍 {settings.company_address || 'Loading...'}</p>
                        <p>📞 {settings.company_phone || 'Loading...'}</p>
                        <p>✉️ {settings.company_email || 'Loading...'}</p>
                    </div>
                    <div className="footer-section">
                        <h4>Business Hours</h4>
                        <p>{settings.working_hours || 'Loading...'}</p>
                        <p>Sunday: Closed</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Shreeyadunandan. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
