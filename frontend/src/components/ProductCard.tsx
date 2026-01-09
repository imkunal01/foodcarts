import React from 'react';

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

interface ProductCardProps {
    product: Product;
    onInquiry?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onInquiry }) => {
    const handleInquiry = () => {
        if (onInquiry) {
            onInquiry(product);
        } else {
            // Open WhatsApp with pre-filled message
            const message = encodeURIComponent(`Hi, I'm interested in: ${product.name} (Price: ₹${product.price.toLocaleString()})`);
            window.open(`https://wa.me/918599999394?text=${message}`, '_blank');
        }
    };

    return (
        <div className="product-card">
            <div className="product-image">
                {product.images && product.images.length > 0 ? (
                    <img src={product.images[0]} alt={product.name} />
                ) : (
                    <span style={{ fontSize: '48px' }}>🛒</span>
                )}
                {product.discount && product.discount > 0 && (
                    <span className="discount-badge">{product.discount}% OFF</span>
                )}
                {product.condition && (
                    <span className="condition-badge">{product.condition}</span>
                )}
            </div>
            <div className="product-content">
                <h3>{product.name}</h3>
                <div className="product-price">
                    <span className="current-price">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                        <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                </div>
                <button className="btn btn-primary" onClick={handleInquiry}>
                    Inquiry Now
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
