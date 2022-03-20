const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Otp", otpSchema);
