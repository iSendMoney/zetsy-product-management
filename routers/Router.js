const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get all products
router
  .get("/", async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ products });
  })
  // Get single product
  .get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) res.status(200).json({ product });
    else
      res.status(401).json({
        message: "No products found with that ID!",
      });
  })
  // Create new product
  .post("/", async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(200).json({ product });
  })
  // Update product
  .put("/:id", async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ product });
  })
  // Delete product
  .delete("/:id", async (req, res) => {
    await Product.findByIdAndRemove(req.params.id);
    res.status(200).json({
      message: "Product deleted",
    });
  })
  // Bulk create products
  .post("/bulk", async (req, res) => {
    await Product.insertMany(req.body.products);
    res.status(200).json({
      message: "Products created",
    });
  })
  // Bulk delete products
  .post("/bulk-delete", async (req, res) => {
    await Product.deleteMany({ _id: { $in: req.body.ids } });
    res.status(200).json({
      message: "Products deleted",
    });
  });

module.exports = router;
