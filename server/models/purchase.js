const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new mongoose.Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    unique: "An item can only be purchased over one prescription",
    required: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  prescription: {
    type: Schema.Types.ObjectId,
    ref: "Prescription",
    required: true,
  },
  retailer: {
    type: Schema.Types.ObjectId,
    ref: "Retailer",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Purchase", purchaseSchema);
