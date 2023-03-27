var express = require("express");
const {
  createProduct,
  uploadImageProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/productController");
var router = express.Router();

//get all products
router.get("/getProducts", getProducts);

//Post a new product
router.post("/addProduct", createProduct);

//Post a new product picture
router.post("/uploadImageProduct", uploadImageProduct);

//delete a product
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
