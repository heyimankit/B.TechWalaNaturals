const express = require('express');
const router = express.Router();
const db = require('../db');
const { sendOrderConfirmation } = require('../utils/mailer');

// POST /api/orders
router.post('/', (req, res) => {
  const { items, total, email } = req.body;

  // Basic validation
  if (!items || items.length === 0 || !total || !email) {
    return res.status(400).json({ error: 'Invalid order data' });
  }

  const orderData = JSON.stringify(items);

  // Save order to MySQL
  db.query(
    'INSERT INTO orders (items, total, email) VALUES (?, ?, ?)',
    [orderData, total, email],
    (err, result) => {
      if (err) {
        console.error('MySQL error:', err);
        return res.status(500).json({ error: err.message });
      }

      const orderId = result.insertId;

      // Send email confirmation
      sendOrderConfirmation({
        id: orderId,
        items,
        total,
        email,
      }).catch((err) => {
        console.error('Email failed:', err);
      });

      res.status(201).json({
        message: 'Order placed successfully',
        orderId,
      });
    }
  );
});

module.exports = router;
