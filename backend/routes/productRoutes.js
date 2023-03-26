var express = require('express');
const {createProduct, uploadImageProduct, getProducts} = require("../controllers/productController")
var router = express.Router();

//get all products
router.get('/getProducts', getProducts);

//Post a new product
router.post('/addProduct', createProduct);

//Post a new product picture
router.post('/uploadImageProduct', uploadImageProduct)

module.exports = router;