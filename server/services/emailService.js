const nodemailer = require("nodemailer");

const transporter =
  nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const sendStatusUpdateEmail = async (
  userEmail,
  complaint
) => {
  try {
    let statusColor = "#2563eb";
    let statusEmoji = "🔵";

    if (
      complaint.status === "Resolved"
    ) {
      statusColor = "#16a34a";
      statusEmoji = "🟢";
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: userEmail,

      subject: `Complaint Status Updated - ${complaint.ticketId}`,

      html: `
      <div style="
      max-width:700px;
      margin:auto;
      font-family:Arial,sans-serif;
      background:#ffffff;
      border-radius:12px;
      overflow:hidden;
      box-shadow:0 4px 12px rgba(0,0,0,0.1);
      ">

      <div style="
      background:${statusColor};
      padding:25px;
      text-align:center;
      color:white;
      ">
      <h1>PGIP</h1>
      <p>
      Public Grievance Intelligence Platform
      </p>
      </div>

      <div style="padding:30px">

      <h2 style="color:${statusColor}">
      ${statusEmoji} Complaint Status Updated
      </h2>

      <p>
      Your complaint status has been updated.
      </p>

      <hr>

      <p>
      <strong>🎫 Reference ID:</strong>
      ${complaint.ticketId}
      </p>

      <p>
      <strong>📌 Title:</strong>
      ${complaint.title}
      </p>

      <p>
      <strong>📋 New Status:</strong>
      ${complaint.status}
      </p>

      <p>
      <strong>🏢 Department:</strong>
      ${complaint.department}
      </p>

      ${
        complaint.status === "Resolved"
          ? `
      <p style="
      color:#16a34a;
      font-weight:bold;
      ">
      Your complaint has been resolved successfully.
      </p>
      `
          : `
      <p style="
      color:#2563eb;
      font-weight:bold;
      ">
      Your complaint is currently being processed.
      </p>
      `
      }

      </div>

      <div style="
      background:#f8fafc;
      padding:20px;
      text-align:center;
      color:#64748b;
      font-size:14px;
      ">
      Thank you for using PGIP
      </div>

      </div>
      `,
    });

    console.log(
      "Status update email sent"
    );
  } catch (error) {
    console.log(
      "Status Email Error:",
      error.message
    );
  }
};

const sendComplaintEmail =
  async (
    userEmail,
    complaint
  ) => {
    try {

      await transporter.sendMail({
        from:
          process.env.EMAIL_USER,

        to: userEmail,

        subject:
          "Complaint Submitted Successfully",

        html: `
                <div style="
                max-width:700px;
                margin:auto;
                font-family:Arial,sans-serif;
                background:#ffffff;
                border-radius:12px;
                overflow:hidden;
                box-shadow:0 4px 12px rgba(0,0,0,0.1);
                ">

                <div style="
                background:#2563eb;
                padding:25px;
                text-align:center;
                color:white;
                ">
                <h1>PGIP</h1>
                <p>
                Public Grievance Intelligence Platform
                </p>
                </div>

                <div style="padding:30px">

                <h2 style="color:#16a34a">
                ✅ Complaint Submitted Successfully
                </h2>

                <p>
                Your complaint has been registered
                and forwarded for review.
                </p>

                <hr>

                <p><strong>📌 Title:</strong>
                ${complaint.title}</p>

                <p><strong>🎫 Reference ID:</strong>
                ${complaint.ticketId}</p>

                <p><strong>🏷 Category:</strong>
                ${complaint.category}</p>

                <p><strong>⚡ Priority:</strong>
                ${complaint.priority}</p>

                <p><strong>🏢 Department:</strong>
                ${complaint.department}</p>

                <p><strong>📋 Status:</strong>
                ${complaint.status}</p>

                <p><strong>🤖 AI Summary:</strong>
                ${complaint.aiSummary}</p>

                <hr>

                <h3>
                What happens next?
                </h3>

                <ul>
                <li>Department review</li>
                <li>Status tracking</li>
                <li>Email notifications</li>
                <li>Resolution update</li>
                </ul>

                </div>

                <div style="
                background:#f8fafc;
                padding:20px;
                text-align:center;
                color:#64748b;
                font-size:14px;
                ">
                PGIP • Empowering Citizens Through Intelligent Grievance Resolution
                </div>

                </div>
                `,
      });

      console.log(
        "Complaint email sent"
      );

    } catch (error) {

      console.error(
        "Email Error:",
        error.message
      );

    }
  };

module.exports = {
  sendComplaintEmail,
  sendStatusUpdateEmail,
};