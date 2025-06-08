import React from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const products = JSON.parse(localStorage.getItem('allProducts')) || [];

  const saved = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="wishlist-page">
      <h2>My Wishlist</h2>
      {saved.length === 0 ? (
        <p>You haven’t added anything to your wishlist yet.</p>
      ) : (
        <div className="wishlist-grid">
          {saved.map(item => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <Link to={`/product/${item.id}`}>View</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
