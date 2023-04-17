const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ROLES, inRole } = require('../security/RoleMiddleware');

const {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('../controllers/productController');

// Create a new product
router.post(
  '/products',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const product = await createProduct(req.body);
      res.status(201).send(product);
    } catch (error) {
      res.status(400).send('error' , error);
    }
  }
);

// Get all products
router.get(
  '/products',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const products = await getProducts();
      res.send(products);
    } catch (error) {
      res.status(500).send();
    }
  }
);

// Get a single product by ID
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

// Update a product by ID
router.patch(
  '/products/:id',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.USER.PARTICULIER),
  async (req, res) => {
    const updates = req.body;

    try {
      const product = await updateProductById(req.params.id, updates);
      res.send(product);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Delete a product by ID
router.delete(
  '/products/:id',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.USER.PARTICULIER),
  async (req, res) => {
    try {
      const product = await deleteProductById(req.params.id);
      res.send(product);
    } catch (error) {
      res.status(500).send();
    }
  }
);

module.exports = router;
