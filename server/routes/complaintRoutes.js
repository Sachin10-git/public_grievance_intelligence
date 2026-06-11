const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");

router.post("/", protect, createComplaint);

router.get("/my", protect, getMyComplaints);

router.put("/:id", protect, updateComplaintStatus);

router.get("/", protect, getAllComplaints);

module.exports = router;