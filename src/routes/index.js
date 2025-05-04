const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes')
const productRoutes = require('./product.routes')
const mailRoutes = require('./mail.routes')
// Mount routes
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/mail', mailRoutes);
router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is working' });
});

module.exports = router;