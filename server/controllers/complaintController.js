const Complaint = require("../models/Complaint");
const { analyzeComplaint } = require("../services/grievanceAnalyzer");
const { sendComplaintEmail,} = require("../services/emailService");
const { sendStatusUpdateEmail,} = require("../services/emailService");
const createComplaint = async (req, res) => {
  try {
    const { title, description, location } =
      req.body;

    if (
      !title ||
      !description ||
      !location
    ) {
      return res.status(400).json({
        message:
          "All fields are required",
      });
    }

    const aiAnalysis =
      await analyzeComplaint(
        title,
        description
      );

    const imagePath = req.file
      ? `/uploads/${req.file.filename}`
      : "";

      const ticketId =
      `PGIP-${Date.now()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;

    const complaint =
      await Complaint.create({
        title,
        description,
        location,
        ticketId,
        image: imagePath,

        category:
          aiAnalysis.category,

        priority:
          aiAnalysis.priority,

        department:
          aiAnalysis.department,

        aiSummary:
          aiAnalysis.summary,

        createdBy:
          req.user._id,
      });

    await sendComplaintEmail(req.user.email, complaint);

    res.status(201).json({
      message:
        "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateComplaintStatus = async (req, res) => {
  console.log("UPDATE STATUS API HIT");
  try {
    const { status } = req.body;

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

    complaint.status = status;

    await complaint.save();

    await sendStatusUpdateEmail(
    complaint.createdBy.email,
    complaint);

    res.status(200).json({
      message: "Complaint status updated",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
};