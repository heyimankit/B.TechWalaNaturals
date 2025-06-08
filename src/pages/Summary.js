import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './Checkout.css';

const Summary = () => {
  const { width, height } = useWindowSize();
  const location = useLocation();
  const { cartItems, total, orderId } = location.state || {};

 const generateInvoice = () => {
  const doc = new jsPDF();

  const logo = new Image();
  logo.src = '/assets/logo.png';

  logo.onload = () => {
    doc.addImage(logo, 'PNG', 150, 10, 40, 15); 

    doc.setFontSize(16);
    doc.text(`B. Tech Wala Invoice – Order #${orderId}`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Thank you for your order!`, 14, 30);

    autoTable(doc, {
      startY: 40,
      head: [['Product', 'Qty', 'Price', 'Total']],
      body: cartItems.map((item) => [
        item.name,
        item.quantity,
        `₹${item.price}`,
        `₹${item.price * item.quantity}`
      ]),
    });

    doc.text(`Total Paid: ₹${total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`invoice_order_${orderId}.pdf`);
  };
};


  return (
    <div className="checkout-page">
      <Confetti width={width} height={height} />
      <h2>🎉 Order Confirmed!</h2>
      <p>🧾 Your order <strong>#{orderId}</strong> has been placed successfully.</p>

      <div className="cart-list">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <h3>Total Paid: ₹{total.toFixed(2)}</h3>

      <button onClick={generateInvoice} style={{ marginBottom: '15px' }}>
        📄 Download Invoice
      </button>

      <Link to="/shop">
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
};

export default Summary;
