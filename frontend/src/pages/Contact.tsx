import React, { useState, useEffect } from 'react';
import { inquiriesAPI, settingsAPI } from '../api';

interface Settings {
    company_phone?: string;
    company_email?: string;
    company_address?: string;
    company_whatsapp?: string;
    working_hours?: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        requirement: ''
    });
    const [settings, setSettings] = useState<Settings>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            await inquiriesAPI.submit(formData);
            setMessage({ type: 'success', text: 'Your inquiry has been submitted successfully! We will contact you soon.' });
            setFormData({ name: '', email: '', phone: '', requirement: '' });
        } catch (error) {
            console.error('Error submitting inquiry:', error);
            setMessage({ type: 'error', text: 'Failed to submit inquiry. Please try again or contact us directly.' });
        } finally {
            setLoading(false);
        }
    };

    const whatsappNumber = settings.company_whatsapp || '918599999394';

    return (
        <div>
            <div className="page-header">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>Get in touch with us for any inquiries</p>
                </div>
            </div>

            <section className="contact-section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <div className="contact-info">
                            <h3>Get In Touch</h3>

                            <div className="contact-item">
                                <div className="icon">📍</div>
                                <div className="contact-item-content">
                                    <h4>Our Location</h4>
                                    <p>{settings.company_address || 'Loading...'}</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="icon">📞</div>
                                <div className="contact-item-content">
                                    <h4>Phone Number</h4>
                                    <p>{settings.company_phone || 'Loading...'}</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="icon">✉️</div>
                                <div className="contact-item-content">
                                    <h4>Email Address</h4>
                                    <p>{settings.company_email || 'Loading...'}</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="icon">🕐</div>
                                <div className="contact-item-content">
                                    <h4>Working Hours</h4>
                                    <p>{settings.working_hours || 'Loading...'}</p>
                                </div>
                            </div>

                            <div style={{ marginTop: '30px' }}>
                                <h4 style={{ marginBottom: '15px' }}>Quick Contact via WhatsApp</h4>
                                <a
                                    href={`https://wa.me/${whatsappNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    💬 Chat on WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form">
                            <h3>Send Us a Message</h3>

                            {message && (
                                <div className={`alert alert-${message.type}`}>
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Your Requirement *</label>
                                    <textarea
                                        name="requirement"
                                        value={formData.requirement}
                                        onChange={handleChange}
                                        placeholder="Describe your requirement..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{ width: '100%' }}
                                    disabled={loading}
                                >
                                    {loading ? 'Submitting...' : 'Submit Inquiry'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
