require("dotenv").config();

const express =
  require("express");

const cors =
  require("cors");

const path =
  require("path");

const connectDB =
  require("./config/db");

const {
  protect,
} = require(
  "./middleware/authMiddleware"
);

const {
  checkEscalations,
} = require(
  "./services/escalationService"
);

// Routes

const authRoutes =
  require(
    "./routes/authRoutes"
  );

const complaintRoutes =
  require(
    "./routes/complaintRoutes"
  );

const adminRoutes =
  require(
    "./routes/adminRoutes"
  );

const kbRoutes =
  require(
    "./routes/kbRoutes"
  );

const vectorSearchRoutes =
  require(
    "./routes/vectorSearchRoutes"
  );

const aiAssistantRoutes =
  require(
    "./routes/aiAssistantRoutes"
  );

const chatHistoryRoutes =
  require(
    "./routes/chatHistoryRoutes"
  );

// Database

connectDB();

// App

const app =
  express();

// Middleware

app.use(cors());

app.use(
  express.json()
);

// Static Files

app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "uploads"
    )
  )
);

//  Routes

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/complaints",
  complaintRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/assistant",
  aiAssistantRoutes
);

app.use(
  "/api/vector",
  vectorSearchRoutes
);

app.use(
  "/api/kb",
  kbRoutes
);

app.use(
  "/api/chat-history",
  chatHistoryRoutes
);
// Health Check

app.get(
  "/",
  (req, res) => {
    res.send(
      "Public Grievance API Running..."
    );
  }
);

// Protected Test Route

app.get(
  "/api/protected",
  protect,
  (req, res) => {

    res.json({
      message:
        "Protected Route Accessed",

      user:
        req.user,
    });

  }
);

// Server

const PORT =
  process.env.PORT ||
  5000;

app.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }
);

// Escalation Scheduler

setInterval(
  checkEscalations,
  60 * 1000
);