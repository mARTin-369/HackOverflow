const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
const Prescription = require("../models/prescription");
const { authenticateToken, userAuth, ROLES } = require("../middleware");

router.get(
  "/",
  authenticateToken,
  userAuth([ROLES.ADMIN, ROLES.PATIENT]),
  async (req, res) => {
    prescriptions = [];
    if (req.user.role === ROLES.PATIENT) {
      // console.log(req.user);
      prescriptions = await Patient.findById(req.user.id)
        .select("prescriptions -_id")
        .populate({
          path: "prescriptions",
          select: "-__v",
          populate: [
            { path: "doctor", select: "lid -_id" },
            {
              path: "purchases",
              select: "item date -_id",
              populate: {
                path: "item",
                select: "drug -_id",
                populate: { path: "drug", select: "name -_id" },
              },
            },
          ],
        });
    } else {
      prescriptions = await Prescription.find().populate("doctor");
    }
    res.json(prescriptions);
  }
);

router.post(
  "/",
  authenticateToken,
  userAuth([ROLES.RETAILER]),
  async (req, res) => {
    const patient = await Patient.findOne({ uid: req.body.patient })
      .select("-__v")
      .populate({
        path: "prescriptions",
        select: "active doctor date",
        populate: [{ path: "doctor", select: "lid -_id" }],
      });

    res.json(patient);
  }
);

router.get("/:id", async (req, res) => {
  const prescription = await Prescription.findById(req.params.id)
    .select("-__v")
    .populate({
      path: "doctor",
      select: "lid -_id",
    })
    .populate({
      path: "purchases",
      select: "item date -_id",
      populate: {
        path: "item",
        select: "drug -_id",
        populate: { path: "drug", select: "name -_id" },
      },
    });
  res.json(prescription);
});

// POST create a prescription
router.post(
  "/create",
  authenticateToken,
  userAuth([ROLES.DOCTOR]),
  async (req, res) => {
    //   console.log(req.body);
    const prescription = new Prescription({
      doctor: req.user.id,
      image: req.body.image,
    });

    const patient = await Patient.findOne({ uid: req.body.patient });
    if (patient != null) {
      try {
        const new_prescription = await prescription.save();
        patient.prescriptions.push(new_prescription._id);
        await patient.save();
        res.status(201).json(new_prescription);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    } else {
      res.json("No patient found");
    }
  }
);

router.put("/:id/deactivate", async (req, res) => {
  const prescription = await Prescription.findOneAndUpdate(
    { _id: req.params.id },
    { active: false },
    { new: true }
  );
  res.json(prescription);
});

module.exports = router;
