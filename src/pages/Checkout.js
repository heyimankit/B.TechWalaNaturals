import React, { useContext, useState } from 'react';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty 🛒</h2>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!email) {
      toast.warning("Please enter your email address to receive order confirmation.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          total: parseFloat(total.toFixed(2)),
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        clearCart();
        toast.success('✅ Order placed!');
        setTimeout(() => {
          navigate('/summary', { state: { total, cartItems, orderId: data.orderId } });
        }, 1500);
      } else {
        toast.error('❌ Order failed: ' + data.error);
      }
    } catch (error) {
      console.error('Order error:', error);
      toast.error('⚠️ Failed to place order');
    }
  };

  return (
    <div className="checkout-page">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{item.price * item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="invoice">
        <h3>Invoice Preview</h3>
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>GST (5%): ₹{tax.toFixed(2)}</p>
        <h4>Total: ₹{total.toFixed(2)}</h4>

        <label htmlFor="email" style={{ display: 'block', marginTop: '20px' }}>
          Email for confirmation:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            width: '100%',
            maxWidth: '400px',
            marginTop: '8px',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />

        <button onClick={handlePlaceOrder} style={{ marginTop: '20px' }}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
