const express = require("express");
const router = express.Router();
const Distributer = require("../models/distributer");
const MToDSupply = require("../models/mtod_supply");
const DToRSupply = require("../models/dtor_supply");
const { authenticateToken } = require("../middleware");

router.get("/", async (req, res) => {
  const distributers = await Distributer.find();
  res.json(distributers);
});

// router.get("/:id", async (req, res) => {
//   const patient = await Patient.findById(req.params.id);
//   res.json(patient);
// });

// POST create a book
router.post("/add", async (req, res) => {
  // console.log(req.body)
  const distributer = new Distributer(req.body);

  try {
    const newDistributer = await distributer.save();
    res.status(201).json(newDistributer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/dispatch", async (req, res) => {
  // console.log(req.body)
  const dToRSupply = new DToRSupply({ ...req.body, distributer: req.user.id });

  try {
    const newDToRSupply = await dToRSupply.save();
    res.status(201).json(newDToRSupply);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/clear", async (req, res) => {
  // console.log(req.body)
  const mToDSupply = new MToDSupply.findOne({ item: req.body.item });
  mToDSupply.clear = true;
  mToDSupply.clear_data = Date.now();
  try {
    const newMToDSupply = await mToDSupply.save();
    res.status(201).json(newMToDSupply);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
