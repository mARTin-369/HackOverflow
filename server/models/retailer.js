const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const retailerSchema = new mongoose.Schema({
  reg: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Retailer", retailerSchema);
