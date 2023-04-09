const ProductModal = require("../models/productModel");

async function automaticUpdateProduct() {
  try {
    const today = new Date();
    today.setDate(today.getDate() + 5);
    const expiredProducts = await ProductModal.find({
      expiry_date: {
        $lte: today,
        $gt: new Date(),
      },
    });
    if (expiredProducts.length !== 0) {
      expiredProducts.forEach(async (product) => {
        await ProductModal.findByIdAndUpdate(product._id, { isValid: true });
      });
    }
    // Find all non-expired products and update their isValid property to false
    await ProductModal.updateMany(
      { _id: { $nin: expiredProducts.map((p) => p._id) } },
      { isValid: false }
    );
  } catch (error) {
    return false;
  }
  return true;
}

module.exports = automaticUpdateProduct;
