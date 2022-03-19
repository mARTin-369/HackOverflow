const mongoose = require("mongoose");

const mToDSupplySchema = new mongoose.Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
    unique: true,
  },
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: "Manufacturer",
    required: true,
  },
  distributer: {
    type: Schema.Types.ObjectId,
    ref: "Distributer",
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

module.exports = mongoose.model("mToDSupply", mToDSupplySchema);
