const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drugSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Drug", drugSchema);
