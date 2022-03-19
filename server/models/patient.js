const mongoose = require("mongoose");
const prescriptionSchema = require("../models/prescription");
const Schema = mongoose.Schema;

const patientSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: "Aadhaar uid is required",
    unique: true,
  },

  prescriptions: [
    { type: Schema.Types.ObjectId, ref: "Prescription", default: [] },
  ],
});

patientSchema.path("uid").validate(function (uid) {
  return uid && uid.length === 12;
}, "aadhaar uid must be 12 characters");

patientSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Aadhaar uid address already exists"));
  } else {
    next();
  }
});

module.exports = mongoose.model("Patient", patientSchema);
