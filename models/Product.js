const mongoose = require("mongoose");
const schemaReturnType = require("../configs/SchemaReturnType");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: schemaReturnType(String, true),
  description: {
    productInfo: schemaReturnType(String, true),
    quantity: schemaReturnType(Number, true, 0),
    tags: schemaReturnType(Array, true),
    category: schemaReturnType(String, true),
    productCode: schemaReturnType(String, true),
    productSku: schemaReturnType(String, true),
    numberOfSales: schemaReturnType(Number, true, 0)
  },
  priceInformation: {
    regularPrice: schemaReturnType(Number, true, 0),
    salesPrice: schemaReturnType(Number, true, 0),
    includesTax: schemaReturnType(Boolean, true),
  },
  images: {
    bannerImage: schemaReturnType(String, true),
    image: schemaReturnType(Array, true),
  },
  reviews: [
    {
      reviewScore: schemaReturnType(Number, false, 0),
      reviewDescription: schemaReturnType(String, false)
    }
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", productSchema);
