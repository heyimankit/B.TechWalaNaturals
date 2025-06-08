import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
  });

  const categories = [
    'Organic Tulsi', 'Wild Forest', 'Raw Jamun', 'Himalayan Honey',
    'Yemen Origin', 'Eucalyptus Flower', 'Raw Mustard Flower', 'Kashmir',
    'Raw Acacia', 'Neem Blossom'
  ];

  const prices = [
    { label: '₹0 – ₹349', range: [0, 349] },
    { label: '₹301 – ₹500', range: [301, 500] },
    { label: '₹501+', range: [501, Infinity] },
  ];

  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        const transformed = data.map(p => ({
          ...p,
          prices: {
            '500g': parseFloat(p.price_500g),
            '1kg': parseFloat(p.price_1kg)
          },
          reviews: p.reviews_json
        }));
        setProducts(transformed);
        localStorage.setItem('allProducts', JSON.stringify(transformed));
      })
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);


  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleCategoryChange = (value) => {
    setCategoryFilter(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handlePriceChange = (value) => {
    setPriceFilter(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleClearFilters = () => {
    setCategoryFilter([]);
    setPriceFilter([]);
    setSearchTerm('');
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const matchesPrice = (price) => {
    if (priceFilter.length === 0) return true;
    return priceFilter.some(label => {
      const [min, max] = prices.find(p => p.label === label).range;
      return price >= min && price <= max;
    });
  };

  // Filter products
  let filtered = products.filter(p => {
    const price500g = p?.prices?.['500g'] || 0;
    const nameMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = categoryFilter.length === 0 || categoryFilter.some(c =>
      p.name.toLowerCase().includes(c.toLowerCase())
    );
    const priceMatch = matchesPrice(price500g);
    return nameMatch && categoryMatch && priceMatch;
  });

  // Sort products
  if (sortOption === 'price-low') {
    filtered.sort((a, b) => (a.prices?.['500g'] || 0) - (b.prices?.['500g'] || 0));
  } else if (sortOption === 'price-high') {
    filtered.sort((a, b) => (b.prices?.['500g'] || 0) - (a.prices?.['500g'] || 0));
  } else if (sortOption === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="shop-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3>Catalog</h3>
          <button className="clear-filters" onClick={handleClearFilters}>
            Clear All
          </button>
        </div>

        <div className="filters">
          {/* Category Filters */}
          <div className="filter-section">
            <strong>Category</strong>
            {categories.map(cat => (
              <label key={cat}>
                <input
                  type="checkbox"
                  value={cat}
                  checked={categoryFilter.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          {/* Price Filters */}
          <div className="filter-section">
            <strong>Price</strong>
            {prices.map(p => (
              <label key={p.label}>
                <input
                  type="checkbox"
                  value={p.label}
                  checked={priceFilter.includes(p.label)}
                  onChange={() => handlePriceChange(p.label)}
                />
                {p.label}
              </label>
            ))}
          </div>

          {/* Static Filters (placeholders) */}
          <div className="filter-section">
            <strong>Harvest Month</strong>
            <label><input type="checkbox" /> March</label>
            <label><input type="checkbox" /> April</label>
            <label><input type="checkbox" /> May</label>
            <label><input type="checkbox" /> June</label>
          </div>

          <div className="filter-section">
            <strong>Bee Species</strong>
            <label><input type="checkbox" /> Apis cerana</label>
            <label><input type="checkbox" /> Apis dorsata</label>
            <label><input type="checkbox" /> Apis mellifera</label>
          </div>

          <div className="filter-section">
            <strong>Region</strong>
            <label><input type="checkbox" /> Sundarbans</label>
            <label><input type="checkbox" /> Himalayas</label>
            <label><input type="checkbox" /> Kashmir</label>
            <label><input type="checkbox" /> Punjab</label>
          </div>

          <div className="filter-section">
            <strong>Taste Profile</strong>
            <label><input type="checkbox" /> Fruity</label>
            <label><input type="checkbox" /> Floral</label>
            <label><input type="checkbox" /> Woody</label>
            <label><input type="checkbox" /> Mild</label>
            <label><input type="checkbox" /> Strong</label>
          </div>

          <div className="filter-section">
            <strong>Certifications</strong>
            <label><input type="checkbox" /> FSSAI Certified</label>
            <label><input type="checkbox" /> Organic</label>
            <label><input type="checkbox" /> Raw</label>
            <label><input type="checkbox" /> Lab-tested</label>
          </div>

          <div className="filter-section">
            <strong>Weight</strong>
            <label><input type="checkbox" /> 250g</label>
            <label><input type="checkbox" /> 500g</label>
            <label><input type="checkbox" /> 1kg</label>
          </div>
        </div>
      </aside>

      <main className="product-section">
        <div className="product-controls">
          <div>Showing {filtered.length} product(s)</div>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            className="sort-dropdown"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name A–Z</option>
          </select>
        </div>

        <div className="product-grid">
          {filtered.length > 0 ? (
            filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Shop;
