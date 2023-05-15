const express = require("express");
const ProductRouter = express.Router();
const Product = require("../models/Product");
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkCreateProducts,
} = require("../controllers/Product");

// Get all products
ProductRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products });
})
  // Get single product
  .get("/:id", getProduct)
  // Get product by store id
  .get("/store-product/:storeid", async (req, res) => {
    try {
      const products = await Product.find({ storeId: req.params.storeid });
      res.status(200).json({
        products,
      });
    } catch (error) {
      console.log(error);
    }
  })
  // Create new product
  .post("/", createProduct)
  // Update product
  .put("/:id", updateProduct)
  // Delete product
  .delete("/:id", deleteProduct)
  // Bulk create products
  .post("/bulk", bulkCreateProducts)
  // Bulk delete products
  .post("/bulk-delete", async (req, res) => {
    await Product.deleteMany({ _id: { $in: req.body.ids } });
    res.status(200).json({
      message: "Products deleted",
    });
  });

module.exports = ProductRouter;
