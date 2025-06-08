const db = require('./db');

const sampleProducts = [
  { name: 'Wild Forest Honey', price: 299, image: '/assets/honey1.jpg' },
  { name: 'Organic Tulsi Honey', price: 349, image: '/assets/honey2.jpg' },
  { name: 'Raw Jamun Honey', price: 399, image: '/assets/honey3.jpg' },
  { name: 'Multiflora Himalayan Honey', price: 279, image: '/assets/honey4.jpg' }
];

sampleProducts.forEach((product) => {
  const query = 'SELECT * FROM products WHERE name = ?';
  db.query(query, [product.name], (err, results) => {
    if (err) {
      console.error('Error checking product:', err);
      return;
    }

    if (results.length === 0) {
      db.query(
        'INSERT INTO products (name, price, image) VALUES (?, ?, ?)',
        [product.name, product.price, product.image],
        (err, result) => {
          if (err) {
            console.error('Error inserting product:', err);
          } else {
            console.log(`✅ Inserted: ${product.name}`);
          }
        }
      );
    } else {
      console.log(`⚠️ Already exists: ${product.name}`);
    }
  });
});
