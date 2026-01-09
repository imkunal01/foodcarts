import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { settingsAPI } from '../api';

interface Settings {
    stats_customers?: string;
    stats_cities?: string;
    stats_experience?: string;
    stats_products?: string;
    year_founded?: string;
    company_whatsapp?: string;
}

const About: React.FC = () => {
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

    const whatsappNumber = settings.company_whatsapp || '918599999394';

    return (
        <div>
            <div className="page-header">
                <div className="container">
                    <h1>About Us</h1>
                    <p>Learn more about Shreeyadunandan</p>
                </div>
            </div>

            <section className="about-section">
                <div className="container">
                    <div className="about-content">
                        <h2>Our Story</h2>
                        <p>
                            Founded in {settings.year_founded || '1988'}, Shreeyadunandan has grown to become India's largest manufacturer
                            and retailer of custom food carts, kiosks, trailers, and kitchen accessories.
                            With over {settings.stats_experience || '35'} years of experience, we have served more than {settings.stats_customers || '6,500'} satisfied customers
                            across {settings.stats_cities || '500'}+ cities in India.
                        </p>

                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to empower entrepreneurs and small business owners by providing
                            high-quality, affordable food carts and equipment. We believe that everyone
                            deserves the opportunity to start their own food business, and we are committed
                            to making that dream a reality.
                        </p>

                        <h2>What We Offer</h2>
                        <p>
                            We offer a wide range of products including:
                        </p>
                        <ul style={{ marginLeft: '20px', marginBottom: '20px', color: '#6c757d' }}>
                            <li>• Custom-built food carts and cabins</li>
                            <li>• Pre-owned/used carts in excellent condition</li>
                            <li>• Kitchen equipment and accessories</li>
                            <li>• Fast food counters and kiosks</li>
                            <li>• Mobile food trucks and trailers</li>
                        </ul>

                        <h2>Why Choose Us?</h2>
                        <p>
                            <strong>Quality Assurance:</strong> All our products are manufactured using
                            premium materials and undergo strict quality checks.
                        </p>
                        <p>
                            <strong>Customization:</strong> We offer complete customization based on your
                            specific requirements and business needs.
                        </p>
                        <p>
                            <strong>Pan-India Delivery:</strong> We deliver to all major cities across India
                            with safe and secure transportation.
                        </p>
                        <p>
                            <strong>After-Sales Support:</strong> Our dedicated support team is always
                            available to assist you with any queries or issues.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            Ready to start your food business? Get in touch with us today and let us help
                            you find the perfect cart for your needs.
                        </p>
                        <div style={{ marginTop: '30px' }}>
                            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                            <a
                                href={`https://wa.me/${whatsappNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                                style={{ marginLeft: '15px' }}
                            >
                                WhatsApp Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="stats">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <h3>{settings.year_founded || '1988'}</h3>
                            <p>Year Founded</p>
                        </div>
                        <div className="stat-item">
                            <h3>{settings.stats_customers || '0'}+</h3>
                            <p>Happy Customers</p>
                        </div>
                        <div className="stat-item">
                            <h3>{settings.stats_cities || '0'}+</h3>
                            <p>Cities Served</p>
                        </div>
                        <div className="stat-item">
                            <h3>{settings.stats_experience || '0'}+</h3>
                            <p>Years Experience</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
