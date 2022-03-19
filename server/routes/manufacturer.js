const express = require("express");
const router = express.Router();
const Manufacturer = require("../models/manufacturer");
const MToDSupply = require("../models/mtod_supply");
const { authenticateToken } = require("../middleware");

router.get("/", async (req, res) => {
  const manufacturers = await Manufacturer.find();
  res.json(manufacturers);
});

// router.get("/:id", async (req, res) => {
//   const patient = await Patient.findById(req.params.id);
//   res.json(patient);
// });

// POST create a book
router.post("/add", async (req, res) => {
  // console.log(req.body)
  const manufacturer = new Manufacturer(req.body);

  try {
    const newManufacturer = await item.save();
    res.status(201).json(newManufacturer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/dispatch", async (req, res) => {
  // console.log(req.body)
  const mToDSupply = new MToDSupply({ ...req.body, manufacturer: req.user.id });

  try {
    const newMToDSupply = await mToDSupply.save();
    res.status(201).json(newMToDSupply);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
