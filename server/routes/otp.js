const express = require("express");
const router = express.Router();
const Otp = require("../models/otp");
const Aadhaar = require("../models/aadhaar");
const { authenticateToken } = require("../middleware");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

function generateOTP(otpLength) {
  var digits = "0123456789";
  var otpLength = otpLength;
  var otp = "";

  for (let i = 1; i <= otpLength; i++) {
    var index = Math.floor(Math.random() * digits.length);
    otp = otp + digits[index];
  }

  return otp;
}

router.post("/send", async (req, res) => {
  // console.log(req.body);
  const user = await Aadhaar.findOne({ uid: req.body.uid });
  // Random otp
  const otp = generateOTP(4);
  // Store otp
  const newOtp = new Otp({ uid: req.body.uid, otp });
  await newOtp.save();

  // console.log(user.phone);
  // console.log(otp);
  // Send otp
  try {
    await client.messages.create({
      body: `Your OTP for Aadhaar number verification is ${otp}`,
      from: "+17316668108",
      to: `+91${user.phone}`,
    });

    res
      .status(201)
      .json({ result: "Success", message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ result: "Failed", message: "OTP sending failed" });
  }
});

// POST create a book
router.post("/verify", async (req, res) => {
  // console.log(req.body)
  const data = await Otp.findOne({ uid: req.body.uid });
  if (data && data.otp == req.body.otp) {
    await Otp.deleteOne({ uid: req.body.uid });
    res
      .status(201)
      .json({ result: "Success", message: "Verification successful" });
  } else {
    res.status(201).json({ result: "Failed", message: "Verification failed" });
  }
});

module.exports = router;
