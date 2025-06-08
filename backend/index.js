const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('🧪 API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
