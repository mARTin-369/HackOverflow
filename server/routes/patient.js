const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = express.Router();
const Aadhaar = require("../models/aadhaar");
const Patient = require("../models/patient");
const { authenticateToken, userAuth, ROLES } = require("../middleware");

router.get("/", async (req, res) => {
  const patients = await Patient.find().populate("prescriptions");
  res.json(patients);
});

router.get("/:id", async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate(
    "prescriptions"
  );
  res.json(patient);
});

// POST create a book
router.post("/add", async (req, res) => {
  // console.log(req.body)
  const patient = new Patient(req.body);

  try {
    const new_patient = await patient.save();
    res.status(201).json(new_patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Aadhaar.findOne({
      uid: req.body.uid,
      phone: req.body.phone,
    });
    // console.log(user)
    if (user != null) {
      const patient = await Patient.findOne({
        uid: req.body.uid,
      });

      const accessToken = jwt.sign(
        {
          id: patient._id,
          role: ROLES.PATIENT,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 60 * 60 }
      );
      res.json({ token: accessToken, message: "Login successful" });
    } else {
      res.status(400).json({ message: "No user found with given details" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
