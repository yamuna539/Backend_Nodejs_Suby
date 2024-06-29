const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/add-product/:firmId', productController.addProduct);
//based on firm_id we get the product
router.get('/:firmId/products', productController.getProductByFirm);

router.get('/uploads/:imageName', (req, res) =>{
    //to get the imageName from the database
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname, '..' , 'uploads',imageName))
});

router.delete('/:productId', productController.deleteProductById);

module.exports = router;