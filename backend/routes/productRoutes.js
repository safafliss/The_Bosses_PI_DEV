var express = require('express');
const passport = require('passport');
const { ROLES, inRole } = require('../security/RoleMiddleware');
const {
  createProduct,
  uploadImageProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  updatePicture,
  getAllProducts,
  getAllProductsFilter,
  getAllProductsSortedByPrice,
  getAllProductsSortedByDate,
  getProductsById,
  getPromoProducts,
  get_Products,
  getProductById,
} = require('../controllers/productController');
var router = express.Router();

//get user products
router.get('/getProducts/:idUser', getProducts);

//get product by id
router.get('/getProductsById/:id', getProductsById);

//get all products
router.get('/getAllProducts', getAllProducts);

//get Filtered products
router.get('/getAllProductsFilter', getAllProductsFilter);

//get Sorted products by price
router.get('/getAllProductsSortedByPrice', getAllProductsSortedByPrice);

//get Sorted products by expiry date
router.get('/getAllProductsSortedByDate', getAllProductsSortedByDate);

//get promo products
router.get('/getPromoProducts', getPromoProducts);

//Post a new product
router.post('/addProduct', createProduct);

//Post a new product picture
router.post('/uploadImageProduct', uploadImageProduct);

//delete a product
router.delete('/deleteProduct/:id', deleteProduct);

//get single product
router.get('/getSingleProduct/:id', getSingleProduct);

//update product
router.put('/updateProduct/:id', updateProduct);

//updatePicture
router.put('/updatePicture/:id', updatePicture);

// --------------- SKANDER routes
router.get(
  '/products',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const products = await get_Products();
      res.send(products);
    } catch (error) {
      res.status(500).send();
    }
  }
);

router.get(
  '/products/:id',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.USER.PARTICULIER),
  async (req, res) => {
    try {
      const product = await getProductById(req.params.id);
      if (!product) {
        return res.status(404).send();
      }
      res.send(product);
    } catch (error) {
      res.status(500).send();
    }
  }
);

module.exports = router;
