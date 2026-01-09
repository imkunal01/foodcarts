import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productsAPI, testimonialsAPI, settingsAPI } from '../api';

interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    condition?: string;
    images: string[];
    inStock: boolean;
}

interface Testimonial {
    _id: string;
    customerName: string;
    location: string;
    content: string;
    rating: number;
}

interface Settings {
    stats_customers?: string;
    stats_cities?: string;
    stats_experience?: string;
    stats_products?: string;
    company_whatsapp?: string;
    year_founded?: string;
}

const Home: React.FC = () => {
    const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [settings, setSettings] = useState<Settings>({});
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingTestimonials, setLoadingTestimonials] = useState(true);

    useEffect(() => {
        fetchProducts();
        fetchTestimonials();
        fetchSettings();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await productsAPI.getAll();
            setTrendingProducts(response.data.slice(0, 6));
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoadingProducts(false);
        }
    };

    const fetchTestimonials = async () => {
        try {
            const response = await testimonialsAPI.getApproved();
            setTestimonials(response.data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoadingTestimonials(false);
        }
    };

    const fetchSettings = async () => {
        try {
            const response = await settingsAPI.getAll();
            setSettings(response.data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h1>Largest Variety of Food Carts in India</h1>
                    <p>Manufacturing custom food carts, kiosks, and trailers since {settings.year_founded || '1988'}</p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Link to="/new" className="btn btn-primary">Explore New Carts</Link>
                        <Link to="/reseller" className="btn btn-outline">Used Carts</Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats">
                <div className="container">
                    <div className="stats-grid">
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
                        <div className="stat-item">
                            <h3>{settings.stats_products || '0'}+</h3>
                            <p>Products</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Section */}
            <section className="category-section">
                <div className="container">
                    <div className="section-title">
                        <h2>Browse Our Categories</h2>
                        <p>Find the perfect cart for your business</p>
                    </div>
                    <div className="category-grid">
                        <Link to="/reseller" className="category-card">
                            <h3>🔄 Used Carts</h3>
                            <p>Quality pre-owned carts at great prices</p>
                            <span className="btn btn-outline">Explore</span>
                        </Link>
                        <Link to="/new" className="category-card">
                            <h3>✨ New Carts</h3>
                            <p>Custom built food cabins and carts</p>
                            <span className="btn btn-outline">Explore</span>
                        </Link>
                        <Link to="/accessories" className="category-card">
                            <h3>🔧 Accessories</h3>
                            <p>Kitchen equipment and add-ons</p>
                            <span className="btn btn-outline">Explore</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trending Products */}
            <section className="products-section">
                <div className="container">
                    <div className="section-title">
                        <h2>Trending Carts</h2>
                        <p>Most popular products from our collection</p>
                    </div>
                    {loadingProducts ? (
                        <div className="loading">Loading products...</div>
                    ) : trendingProducts.length === 0 ? (
                        <div className="loading">No products available. Add products from admin panel.</div>
                    ) : (
                        <div className="products-grid">
                            {trendingProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials">
                <div className="container">
                    <div className="section-title">
                        <h2>Happy Customers</h2>
                        <p>What our customers say about us</p>
                    </div>
                    {loadingTestimonials ? (
                        <div className="loading">Loading testimonials...</div>
                    ) : testimonials.length === 0 ? (
                        <div className="loading" style={{ background: 'transparent' }}>
                            No testimonials yet. Be the first to share your experience!
                        </div>
                    ) : (
                        <div className="testimonials-grid">
                            {testimonials.map((testimonial) => (
                                <div key={testimonial._id} className="testimonial-card">
                                    <div className="testimonial-content">
                                        "{testimonial.content}"
                                    </div>
                                    <div className="testimonial-author">
                                        <div className="author-avatar">
                                            {testimonial.customerName.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="author-name">{testimonial.customerName}</div>
                                            <div className="author-location">{testimonial.location}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
