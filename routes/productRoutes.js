const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProduct); 
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);  
router.delete('/:id?', productController.deleteProducts);  

module.exports = router;
