import React, { useState, useEffect } from 'react';
import { certificatesAPI } from '../api';

interface Certificate {
    _id: string;
    name: string;
    type: string;
    registrationNumber: string;
    imageUrl: string;
    downloadUrl?: string;
}

const Certificates: React.FC = () => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await certificatesAPI.getAll();
                setCertificates(response.data);
            } catch (error) {
                console.error('Error fetching certificates:', error);
                setCertificates([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'gst': return 'GST Registration';
            case 'iec': return 'Import Export Code';
            case 'udyam': return 'Udyam Registration';
            default: return 'Other';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'gst': return '📋';
            case 'iec': return '🌍';
            case 'udyam': return '🏭';
            default: return '📄';
        }
    };

    const handleView = (cert: Certificate) => {
        if (cert.imageUrl) {
            window.open(cert.imageUrl, '_blank');
        } else {
            alert('Certificate image not available');
        }
    };

    const handleDownload = (cert: Certificate) => {
        const url = cert.downloadUrl || cert.imageUrl;
        if (url) {
            const link = document.createElement('a');
            link.href = url;
            link.download = `${cert.name}.pdf`;
            link.click();
        } else {
            alert('Download not available');
        }
    };

    return (
        <div>
            <div className="page-header">
                <div className="container">
                    <h1>Our Certificates</h1>
                    <p>Business compliance and registration documents</p>
                </div>
            </div>

            <div className="container">
                {loading ? (
                    <div className="loading" style={{ padding: '80px 0' }}>Loading certificates...</div>
                ) : certificates.length === 0 ? (
                    <div className="loading" style={{ padding: '80px 0' }}>No certificates available.</div>
                ) : (
                    <div className="certificates-grid">
                        {certificates.map((cert) => (
                            <div key={cert._id} className="certificate-card">
                                <div className="certificate-image">
                                    {cert.imageUrl ? (
                                        <img src={cert.imageUrl} alt={cert.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <span style={{ fontSize: '64px' }}>{getTypeIcon(cert.type)}</span>
                                    )}
                                </div>
                                <div className="certificate-content">
                                    <h3>{cert.name}</h3>
                                    <p><strong>{getTypeLabel(cert.type)}</strong></p>
                                    <p style={{ fontSize: '14px' }}>Registration No: {cert.registrationNumber}</p>
                                    <div className="certificate-actions">
                                        <button className="btn btn-primary" onClick={() => handleView(cert)}>
                                            View
                                        </button>
                                        <button className="btn btn-outline" onClick={() => handleDownload(cert)}>
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Certificates;
