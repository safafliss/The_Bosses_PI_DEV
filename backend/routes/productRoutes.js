var express = require("express");
const {
  createProduct,
  uploadImageProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  updatePicture,
  getAllProducts,
  getAllProductsFilter
} = require("../controllers/productController");
var router = express.Router();

//get user products
router.get("/getProducts/:idUser", getProducts);

//get all products
router.get("/getAllProducts", getAllProducts);

//get Filtered products
router.get("/getAllProductsFilter", getAllProductsFilter);

//Post a new product
router.post("/addProduct", createProduct);

//Post a new product picture
router.post("/uploadImageProduct", uploadImageProduct);

//delete a product
router.delete("/deleteProduct/:id", deleteProduct);

//get single product
router.get("/getSingleProduct/:id", getSingleProduct);

//update product
router.put("/updateProduct/:id", updateProduct);

//updatePicture
router.put("/updatePicture/:id", updatePicture);

module.exports = router;
