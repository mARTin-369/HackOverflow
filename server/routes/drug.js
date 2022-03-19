const express = require("express");
const router = express.Router();
const Drug = require("../models/drug");
const { authenticateToken } = require("../middleware");

router.get("/", async (req, res) => {
  const drugs = await Drug.find();
  res.json(drugs);
});

// router.get("/:id", async (req, res) => {
//   const patient = await Patient.findById(req.params.id);
//   res.json(patient);
// });

// POST create a book
router.post("/add", async (req, res) => {
  // console.log(req.body)
  const drug = new Drug(req.body);

  try {
    const newDrug = await drug.save();
    res.status(201).json(newDrug);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
