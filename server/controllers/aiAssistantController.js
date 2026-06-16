const Complaint =
  require("../models/Complaint");

const {
  askGroq,
} = require(
  "../services/groqService"
);

const {
  generateEmbedding,
} = require(
  "../services/embeddingService"
);

const {
  searchComplaints,
} = require(
  "../services/vectorSearch"
);

const isAnalyticsQuestion =
  (question) => {

    const analyticsKeywords = [
      "how many",
      "count",
      "total",
      "statistics",
      "stats",
      "most common",
      "highest",
      "resolution rate",
      "percentage",
      "workload",
      "trend",
      "distribution",
      "priority cases",
      "resolved",
      "pending",
      "in progress",
    ];

    const q =
      question.toLowerCase();

    return analyticsKeywords.some(
      (keyword) =>
        q.includes(keyword)
    );
  };

const askAssistant =
  async (req, res) => {
    try {

      const { question } =
        req.body;

      if (!question) {
        return res.status(400).json({
          message:
            "Question is required",
        });
      }

      const q =
        question.toLowerCase();

      // =====================================
      // ANALYTICS QUESTIONS
      // =====================================

      if (
        isAnalyticsQuestion(
          question
        )
      ) {

        // High Priority Count

        if (
          q.includes(
            "high priority"
          )
        ) {

          const count =
            await Complaint.countDocuments({
              priority:
                "High",
            });

          return res.json({
            answer:
              `There are ${count} high-priority complaints currently in the system.`,
          });
        }

        // Resolution Rate

        if (
          q.includes(
            "resolution rate"
          )
        ) {

          const total =
            await Complaint.countDocuments();

          const resolved =
            await Complaint.countDocuments({
              status:
                "Resolved",
            });

          const rate =
            total === 0
              ? 0
              : Math.round(
                  (resolved /
                    total) *
                    100
                );

          return res.json({
            answer:
              `The current resolution rate is ${rate}%. (${resolved} resolved out of ${total} total complaints)`,
          });
        }

        // Department Workload

        if (
          q.includes(
            "workload"
          ) ||
          q.includes(
            "highest workload"
          )
        ) {

          const result =
            await Complaint.aggregate([
              {
                $group: {
                  _id:
                    "$department",
                  count: {
                    $sum: 1,
                  },
                },
              },
              {
                $sort: {
                  count: -1,
                },
              },
            ]);

          if (
            result.length === 0
          ) {
            return res.json({
              answer:
                "No complaint data available.",
            });
          }

          return res.json({
            answer:
              `${result[0]._id} currently has the highest workload with ${result[0].count} complaints.`,
          });
        }

        if (
  q.includes("location") ||
  q.includes("city") ||
  q.includes("area")
) {

  const result =
    await Complaint.aggregate([
      {
        $group: {
          _id: "$location",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

  if (
    result.length === 0
  ) {
    return res.json({
      answer:
        "No complaint data available.",
    });
  }

  return res.json({
    answer:
      `${result[0]._id} has the highest number of complaints (${result[0].count}).`,
  });
}

if (
  q.includes("top locations") ||
  q.includes("hotspots")
) {

  const result =
    await Complaint.aggregate([
      {
        $group: {
          _id: "$location",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 3,
      },
    ]);

  const response =
    result.map(
      (r, index) =>
        `${index + 1}. ${r._id} (${r.count} complaints)`
    )
    .join("\n");

  return res.json({
    answer: response,
  });
}

        // Most Common Category

        if (
          q.includes(
            "most common"
          ) ||
          q.includes(
            "top categor"
          )
        ) {

          const result =
            await Complaint.aggregate([
              {
                $group: {
                  _id:
                    "$category",
                  count: {
                    $sum: 1,
                  },
                },
              },
              {
                $sort: {
                  count: -1,
                },
              },
            ]);

          if (
            result.length === 0
          ) {
            return res.json({
              answer:
                "No complaint data available.",
            });
          }

          return res.json({
            answer:
              `The most common complaint category is "${result[0]._id}" with ${result[0].count} complaints.`,
          });
        }

        // Pending Count

        if (
          q.includes(
            "pending"
          )
        ) {

          const count =
            await Complaint.countDocuments({
              status:
                "Pending",
            });

          return res.json({
            answer:
              `There are ${count} pending complaints awaiting resolution.`,
          });
        }

        if (
  q.includes("unresolved") ||
  q.includes("pending")
) {

  const result =
    await Complaint.aggregate([
      {
        $match: {
          status: {
            $ne: "Resolved"
          }
        }
      },
      {
        $group: {
          _id:
            "$department",
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          count: -1
        }
      }
    ]);

  if (
    result.length === 0
  ) {
    return res.json({
      answer:
        "No unresolved complaints found."
    });
  }

  return res.json({
    answer:
      `${result[0]._id} has the highest number of unresolved complaints (${result[0].count}).`
  });
}

        if (
          q.includes(
            "resolved"
          )
        ) {

          const count =
            await Complaint.countDocuments({
              status:
                "Resolved",
            });

          return res.json({
            answer:
              `There are ${count} resolved complaints.`,
          });
        }
      }

      // =====================================
      // RAG SEARCH QUESTIONS
      // =====================================

      const queryEmbedding =
        await generateEmbedding(
          question
        );

      const complaints =
        await searchComplaints(
          queryEmbedding,
          5
        );

      console.log(
        "Retrieved Complaints:",
        complaints.length
      );

      const uniqueComplaints =
        [
          ...new Map(
            complaints.map(
              (c) => [
                c.title,
                c,
              ]
            )
          ).values(),
        ];

      const context =
        uniqueComplaints
          .map(
            (c) => `
Title: ${c.title}
Ticket ID: ${c.ticketId}
Location: ${c.location}
Category: ${c.category}
Priority: ${c.priority}
Status: ${c.status}

Description:
${c.description}
`
          )
          .join("\n");

      const prompt = `
You are an AI Administrative Assistant for a Public Grievance Intelligence Platform.

Use ONLY the complaint information provided below.

Rules:

- Answer naturally and professionally.
- Be concise.
- Do not invent information.
- Mention complaint titles when relevant.
- Mention ticket IDs when useful.
- If the answer is not present in the complaints, clearly say so.
- Think like a city operations analyst.

Formatting Rules:

- Never write large paragraphs.
- Use bullet points for lists.
- Use numbered steps for recommendations.
- Keep answers easy to scan.
- Put important values on separate lines.

Relevant Complaints:

${context}

Administrator Question:

${question}
`;

      console.log(
        "Sending prompt to Groq..."
      );

      const answer =
        await askGroq(
          prompt
        );

      console.log(
        "Groq responded"
      );

      return res.json({
        answer:
          answer
            .replace(
              /\*\*/g,
              ""
            )
            .replace(
              /#/g,
              ""
            )
            .trim(),
      });

    } catch (error) {

      console.error(
        "AI Assistant Error:"
      );

      console.error(
        error
      );

      return res.status(200).json({
        answer:
          "AI Assistant is temporarily unavailable. Please try again later.",
      });
    }
  };

module.exports = {
  askAssistant,
};