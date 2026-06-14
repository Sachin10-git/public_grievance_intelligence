const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");

const upload = require("../middleware/uploadMiddleware");

router.post("/", protect, upload.single("image"), createComplaint);

router.get("/my", protect, getMyComplaints);

router.put("/:id", protect, updateComplaintStatus);

router.get("/", protect, getAllComplaints);

module.exports = router;