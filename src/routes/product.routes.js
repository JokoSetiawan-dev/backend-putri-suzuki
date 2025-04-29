const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const { authenticate } = require('../middlewares/auth.middleware'); 

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', authenticate,ProductController.createProduct);
router.put('/:id', authenticate,ProductController.updateProduct);
router.delete('/:id', authenticate,ProductController.deleteProduct);

module.exports = router;
