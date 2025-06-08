import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('500g');
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('allProducts') || '[]');
    const matchedProduct = storedProducts.find(p => p.id === parseInt(id));
    setProduct(matchedProduct);
  }, [id]);

  if (!product) return <h2>Product not found</h2>;

  const price = product?.prices?.[selectedSize] || 0;

  const handleAddToCart = () => {
    const item = {
      ...product,
      price,
      size: selectedSize,
      quantity
    };
    addToCart(item);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleBuyNow = () => {
    const item = {
      ...product,
      price,
      size: selectedSize,
      quantity
    };
    addToCart(item);
    navigate('/checkout');
  };

  return (
    <div className="product-details">
      <div className="details-container">
        <img src={product.image} alt={product.name} className="main-image" />

        <div className="info">
          <h2>{product.name}</h2>
          <p className="price">₹{price}</p>
          <p className={`stock ${product.stock ? 'in' : 'out'}`}>
            {product.stock ? 'In Stock ✅' : 'Out of Stock ❌'}
          </p>

          <div className="size-selector">
            <span>Select Size:</span>
            {product.prices && Object.keys(product.prices).map(size => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
            <span className="selected-size">Selected: {selectedSize}</span>
          </div>

          <label>Quantity:
            <select value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
              {[1, 2, 3, 4, 5].map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </label>

          <div className="buttons">
            <button onClick={handleAddToCart} disabled={!product.stock}>Add to Cart</button>
            <button onClick={handleBuyNow} disabled={!product.stock}>Buy Now</button>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="description-block">
        <h3>Description</h3>
        {product.description?.split('\n').map((line, index) => (
          <p key={index}>{line.trim()}</p>
        ))}
        <p className="disclaimer">
          Note: All product info is provided to the best of our knowledge. Variations may occur in texture, taste or color.
        </p>
      </div>

      {/* Reviews */}
      <div className="reviews">
        <h4>Customer Reviews</h4>
        {(product.reviews || []).map((review, index) => (
          <div key={index} className="review">
            <strong>{review.user}</strong> — {'⭐'.repeat(review.stars)}
            <p>{review.comment}</p>
          </div>
        ))}
        {(!product.reviews || product.reviews.length === 0) && (
          <p>No reviews yet.</p>
        )}
      </div>

      {showToast && (
        <div className="toast">✅ Added to cart</div>
      )}
    </div>
  );
};

export default ProductDetails;
