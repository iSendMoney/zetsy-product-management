const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  subdomain: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    no_of_emp: {
      type: Number,
      required: true,
    },
    estimated_revenue: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Food", "Clothing", "Electronics", "Beauty", "Home", "Fashion", "Other"],
    },
    target_location: {
      type: String,
      required: true,
    },
    target_age_group: {
      type: String,
      required: true,
    },
    target_gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Non-binary", "Other"],
    },
    target_audience: {
      type: String,
      required: true,
    },
  },
  socials: {
    facebook: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

storeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("store", storeSchema);
