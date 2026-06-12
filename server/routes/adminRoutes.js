const express = require("express");
const router = express.Router();

const Complaint = require("../models/Complaint");

router.get(
  "/complaints",
  async (req, res) => {
    try {
      const complaints =
        await Complaint.find()
        .sort({ createdAt: -1 });

      res.json(complaints);

    } catch (error) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

router.put(
  "/complaints/:id",
  async (req, res) => {
    try {

      const complaint =
        await Complaint.findById(
          req.params.id
        );

      if (!complaint) {
        return res.status(404).json({
          message: "Complaint not found",
        });
      }

      complaint.status =
        req.body.status;

      await complaint.save();

      res.json(complaint);

    } catch (error) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

module.exports = router;