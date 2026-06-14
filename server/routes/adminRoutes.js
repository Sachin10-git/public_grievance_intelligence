const express = require("express");
const router = express.Router();
const { sendStatusUpdateEmail,} = require("../services/emailService");
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
        ).populate(
          "createdBy",
          "name email"
        );

      if (!complaint) {
        return res.status(404).json({
          message: "Complaint not found",
        });
      }

      complaint.status =
        req.body.status;

      await complaint.save();
      
      console.log(
        "Sending status email to:",
        complaint.createdBy.email
      );

      await sendStatusUpdateEmail(
        complaint.createdBy.email,
        complaint
      );

      res.json(complaint);

    } catch (error) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

module.exports = router;