const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dToRSupplySchema = new mongoose.Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
    unique: true,
  },
  distributer: {
    type: Schema.Types.ObjectId,
    ref: "Distributer",
    required: true,
  },
  retailer: {
    type: Schema.Types.ObjectId,
    ref: "Retailer",
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  dispatch_date: {
    type: Date,
    required: Date.now(),
  },
  clear: {
    type: Boolean,
    default: false,
    required: true,
  },
  clear_date: {
    type: Date,
    required: null,
  },
});

module.exports = mongoose.model("dToRSupply", dToRSupplySchema);
