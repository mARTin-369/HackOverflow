const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = express.Router();
const Doctor = require("../models/doctor");
const Aadhaar = require("../models/aadhaar");
const { authenticateToken, userAuth, ROLES } = require("../middleware");
const Patient = require("../models/patient");

router.get("/", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

// POST create a Doctor
router.post("/add", async (req, res) => {
  const doctor = new Doctor(req.body);

  try {
    const new_doctor = await doctor.save();
    res.status(201).json(new_doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      lid: req.body.lid,
    });

    const user = await Aadhaar.findOne({
      uid: doctor.uid,
      phone: req.body.phone,
    });
    // console.log(user)
    if (user != null) {
      const accessToken = jwt.sign(
        {
          id: doctor._id,
          role: ROLES.DOCTOR,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 60 * 60 }
      );
      res.json({ token: accessToken, message: "Login successful" });
    } else {
      res.status(400).json({ message: "No doctor found with given details" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
