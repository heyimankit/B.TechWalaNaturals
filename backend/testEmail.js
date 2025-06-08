const { sendOrderConfirmation } = require('./utils/mailer');

sendOrderConfirmation({
  id: 123,
  items: [
    { name: 'Wild Forest Honey', quantity: 2, price: 299 },
    { name: 'Jamun Honey', quantity: 1, price: 399 }
  ],
  total: 997,
  email: 'your_email@gmail.com'
})
.then(() => console.log('✅ Email sent successfully'))
.catch(err => console.error('❌ Email failed:', err));
