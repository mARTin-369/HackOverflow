const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = express.Router();
const Retailer = require("../models/retailer");
const DToRSupply = require("../models/dtor_supply");
const { authenticateToken, userAuth, ROLES } = require("../middleware");

router.get("/", async (req, res) => {
  const retailers = await Retailer.find();
  res.json(retailers);
});

// router.get("/:id", async (req, res) => {
//   const patient = await Patient.findById(req.params.id);
//   res.json(patient);
// });

// POST create a book
router.post("/add", async (req, res) => {
  // console.log(req.body)
  const retailer = new Retailer(req.body);

  try {
    const newRetailer = await retailer.save();
    res.status(201).json(newRetailer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /retailer/login:
 *  post:
 *    description: Login route for retailes
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/login", async (req, res) => {
  try {
    const retailer = await Retailer.findOne({
      reg: req.body.reg,
    });
    // console.log(user)
    if (retailer != null) {
      const accessToken = jwt.sign(
        {
          id: retailer._id,
          role: ROLES.RETAILER,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 60 * 60 }
      );
      res.json({ token: accessToken, message: "Login successful" });
    } else {
      res.status(400).json({ message: "No retailer found with given details" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/clear", async (req, res) => {
  // console.log(req.body)
  const dToRSupply = new DToRSupply.findOne({ item: req.body.item });
  dToRSupply.clear = true;
  dToRSupply.clear_data = Date.now();
  try {
    const newDToRSupply = await dToRSupply.save();
    res.status(201).json(newDToRSupply);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
