const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aadhaarSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: "Aadhaar uid is required",
    unique: true,
  },
  phone: {
    type: Number,
    required: "phone no. is required",
  },
});

aadhaarSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("aadhaar already exists"));
  } else {
    next();
  }
});

module.exports = mongoose.model("Customer", aadhaarSchema);
