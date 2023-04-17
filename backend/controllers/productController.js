const Product = require('../models/Product');

// Create a new product
const createProduct = async (productData) => {
  const product = new Product(productData);
  await product.save();
  return product;
};

// Get all products
const getProducts = async () => {
  const products = await Product.find({});
  return products;
};

// Get a single product by ID
const getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

// Update a product by ID
const updateProductById = async (id, updates) => {
  const allowedUpdates = ['name', 'price', 'description', 'image'];
  const isValidUpdate = Object.keys(updates).every(update => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    throw new Error('Invalid updates!');
  }

  const product = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

// Delete a product by ID
const deleteProductById = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};