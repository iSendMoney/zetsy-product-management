const mongoose = require("mongoose");
const schemaReturnType = require("../configs/SchemaReturnType");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: schemaReturnType(String, true),
  description: schemaReturnType(String, true),
  regularPrice: schemaReturnType(Number, true, 0),
  salesPrice: schemaReturnType(Number, true, 0),
  includesTax: schemaReturnType(Boolean, true),
  quantity: schemaReturnType(Number, true, 0),
  productCode: schemaReturnType(String, true),
  productSku: schemaReturnType(String, true),
  category: schemaReturnType(String, true),
  image: schemaReturnType(Array, true),
  tags: schemaReturnType(Array, true),
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
