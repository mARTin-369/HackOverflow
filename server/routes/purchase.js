const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
const Purchase = require("../models/purchase");
const Prescription = require("../models/prescription");
const { authenticateToken, userAuth, ROLES } = require("../middleware");

router.get("/", async (req, res) => {
  const purchases = await Purchase.find()
    .select("-__v")
    .populate({
      path: "item",
      select: "-__v",
      populate: {
        path: "drug",
        select: "name",
      },
    })
    .populate({
      path: "patient",
      select: "-_id uid",
    })
    .populate({
      path: "prescription",
      select: "doctor",
    })
    .populate({
      path: "retailer",
      select: "-__v",
    });
  res.json(purchases);
});

router.get("/:id", async (req, res) => {
  const patient = await Purchase.findById(req.params.id)
    .select("-__v")
    .populate({
      path: "item",
      select: "-__v",
      populate: {
        path: "drug",
        select: "name",
      },
    })
    .populate({
      path: "patient",
      select: "-_id uid",
    })
    .populate({
      path: "prescription",
      select: "doctor",
    })
    .populate({
      path: "retailer",
      select: "-__v",
    });
  res.json(patient);
});

router.post(
  "/add",
  authenticateToken,
  userAuth([ROLES.RETAILER]),
  async (req, res) => {
    // console.log(req.body)
    const purchase = new Purchase({ ...req.body, retailer: req.user.id });

    const prescription = await Prescription.findById(req.body.prescription);
    if (prescription != null && prescription.active == true) {
      try {
        const newPurchase = await purchase.save();
        prescription.purchases.push(newPurchase._id);
        await prescription.save();
        res.status(201).json(newPurchase);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    } else {
      res.json("Prescription not found or is inactive");
    }
  }
);

module.exports = router;
