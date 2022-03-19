const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  lid: {
    type: Number,
    required: "License no. is required",
    unique: true,
  },
  uid: {
    type: String,
    required: "Aadhaar uid is required",
    unique: true,
  },
});

doctorSchema.path("uid").validate(function (uid) {
  return uid && uid.length === 12;
}, "aadhaar uid must be 12 characters");

doctorSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Aadhaar uid address already exists"));
  } else {
    next();
  }
});

module.exports = mongoose.model("Doctor", doctorSchema);
