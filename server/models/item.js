const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  drug: {
    type: Schema.Types.ObjectId,
    ref: "Drug",
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
