const express = require("express");
const router = express.Router();
const MToDSupply = require("../models/mtod_supply");
const DToRSupply = require("../models/dtor_supply");
const Item = require("../models/item");
const Purchase = require("../models/purchase");
const { authenticateToken } = require("../middleware");

router.post("/", async (req, res) => {
  // console.log(req.body)
  const item = Item.findById(req.body.item).populate("drug");
  const mToDSupply = MToDSupply.findOne({ item: req.body.item }).select(
    "-item -batch -__v"
  );
  const dToRSupply = DToRSupply.findOne({ item: req.body.item }).select(
    "-item -batch -__v"
  );
  const purchase = Purchase.findOne({ item: req.body.item }).select(
    "-patient -prescription -retailer"
  );

  const track = {
    item,
    mToDSupply,
    dToRSupply,
    purchase,
  };
  try {
    res.status(201).json(track);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
