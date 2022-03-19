const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new mongoose.Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  image: {
    type: String,
    required: "prescription image is required",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
  purchases: [{ type: Schema.Types.ObjectId, ref: "Purchase", default: [] }],
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
