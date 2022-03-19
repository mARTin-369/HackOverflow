const mongoose = require("mongoose");

const manufacturerSchema = new mongoose.Schema({
  reg_no: {
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

module.exports = mongoose.model("Manufacturer", manufacturerSchema);
