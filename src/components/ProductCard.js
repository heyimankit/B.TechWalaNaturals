import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, wishlist, toggleWishlist }) => {
  const isWishlisted = wishlist.includes(product.id);
  const basePrice = product.prices?.['500g'] || 0;

  return (
    <div className="product-card">
      <div
        className={`wishlist-icon ${isWishlisted ? 'active' : ''}`}
        onClick={() => toggleWishlist(product.id)}
      >
        {isWishlisted ? '❤️' : '♡'}
      </div>

      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>

      <div className="price-row">
        <span className="price">From ₹{basePrice.toFixed(2)}</span>
      </div>

      <Link to={`/product/${product.id}`}>
        <button className="view-options-btn">View options</button>
      </Link>
    </div>
  );
};

export default ProductCard;
