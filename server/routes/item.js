const express = require("express");
const router = express.Router();
const Item = require("../models/item");
const { authenticateToken } = require("../middleware");

router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// router.get("/:id", async (req, res) => {
//   const patient = await Patient.findById(req.params.id);
//   res.json(patient);
// });

// POST create a book
router.post("/add", async (req, res) => {
  // console.log(req.body)
  const item = new Item(req.body);

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
