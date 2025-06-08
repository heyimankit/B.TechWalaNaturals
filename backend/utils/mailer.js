const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderConfirmation = (order) => {
  const itemsHTML = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd;" align="center">${item.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd;" align="center">₹${item.price}</td>
        <td style="padding: 8px; border: 1px solid #ddd;" align="center">₹${item.price * item.quantity}</td>
      </tr>`
    )
    .join('');

  const html = `
    <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #fffbe6; border-radius: 10px; border: 1px solid #f1e5c5; max-width: 600px; margin: auto;">
      <h2 style="color: #e76f51;">🍯 B. Tech Wala – Order Confirmation</h2>
      <p>Hi there,</p>
      <p>Thank you for your order! Your order ID is <strong>#${order.id}</strong>.</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px; border-collapse: collapse;">
        <thead style="background: #ffe4c4;">
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd;" align="left">Product</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Qty</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <h3 style="margin-top: 20px;">Total Paid: ₹${order.total}</h3>

      <p style="margin-top: 30px;">We'll notify you once your honey is on its way 🐝</p>
      <p>Warm regards,<br><strong>B. Tech Wala</strong></p>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: [order.email, process.env.ADMIN_EMAIL], // send to both customer & admin
    subject: `🧾 Order #${order.id} Confirmation – B. Tech Wala`,
    html,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOrderConfirmation };
