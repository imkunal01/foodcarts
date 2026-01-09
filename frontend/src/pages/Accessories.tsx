import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../api';

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

const Accessories: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params: any = { category: 'accessories' };
            if (search) params.search = search;
            if (minPrice) params.minPrice = Number(minPrice);
            if (maxPrice) params.maxPrice = Number(maxPrice);

            const response = await productsAPI.getAll(params);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        fetchProducts();
    };

    const clearFilters = () => {
        setSearch('');
        setMinPrice('');
        setMaxPrice('');
        setTimeout(fetchProducts, 0);
    };

    return (
        <div>
            <div className="page-header">
                <div className="container">
                    <h1>Accessories</h1>
                    <p>Kitchen equipment and cart add-ons</p>
                </div>
            </div>

            <div className="container">
                <div className="shop-layout">
                    {/* Filter Sidebar */}
                    <aside className="filter-sidebar">
                        <h3>Filter Products</h3>
                        <form onSubmit={handleFilter}>
                            <div className="filter-group">
                                <label>Search</label>
                                <input
                                    type="text"
                                    placeholder="Search accessories..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <div className="filter-group">
                                <label>Price Range</label>
                                <div className="price-range">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '10px' }}>
                                Apply Filters
                            </button>
                            <button type="button" className="btn btn-outline" style={{ width: '100%' }} onClick={clearFilters}>
                                Clear Filters
                            </button>
                        </form>
                    </aside>

                    {/* Products Grid */}
                    <main>
                        {loading ? (
                            <div className="loading">Loading products...</div>
                        ) : products.length === 0 ? (
                            <div className="loading">No accessories available. Check back later or contact us.</div>
                        ) : (
                            <div className="products-grid">
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Accessories;
