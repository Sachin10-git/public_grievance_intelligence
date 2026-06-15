const Complaint = require("../models/Complaint");

const checkEscalations = async () => {
  try {

    const threeDaysAgo = new Date(
      Date.now() - 1 * 60 * 1000
    );

    const complaints =
      await Complaint.find({
        priority: "High",
        status: "Pending",
        escalated: false,
        createdAt: {
          $lte: threeDaysAgo,
        },
      });

    for (const complaint of complaints) {

      complaint.escalated = true;

      const diffMs =
  Date.now() -
  complaint.createdAt.getTime();

const days =
  Math.floor(
    diffMs /
    (1000 * 60 * 60 * 24)
  );

const hours =
  Math.floor(
    (
      diffMs %
      (1000 * 60 * 60 * 24)
    ) /
    (1000 * 60 * 60)
  );

const minutes =
  Math.floor(
    (
      diffMs %
      (1000 * 60 * 60)
    ) /
    (1000 * 60)
  );

if (days > 0) {
  complaint.escalationReason =
    `Escalated after ${days} day(s) ${hours} hour(s) of inactivity`;
}
else if (hours > 0) {
  complaint.escalationReason =
    `Escalated after ${hours} hour(s) ${minutes} minute(s) of inactivity`;
}
else {
  complaint.escalationReason =
    `Escalated after ${minutes} minute(s) of inactivity`;
}

      await complaint.save();

      console.log(
        `🚨 Escalated: ${complaint.ticketId}`
      );
    }

  } catch (error) {
    console.error(
      "Escalation Error:",
      error
    );
  }
};

module.exports = {
  checkEscalations,
};