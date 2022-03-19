const express = require("express");
const router = express.Router();
const Aadhaar = require("../models/aadhaar");
const axios = require("axios");
const { authenticateToken } = require("../middleware");

router.get("/", async (req, res) => {
  const aadhaar = await Aadhaar.find();
  res.json(aadhaar);
});

// POST create a book
router.post("/add", async (req, res) => {
  const aadhaar = new Aadhaar(req.body);

  try {
    const newAadhaar = await aadhaar.save();
    res.status(201).json(newAadhaar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/verify", async (req, res) => {
  if (req.body.uid) {
    try {
      const axres = await axios.post("http://localhost:5000/verify", req.body);
      res.status(200).json(axres.data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "uid required" });
  }
});

module.exports = router;
