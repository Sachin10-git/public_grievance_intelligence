const express =
  require("express");

const router =
  express.Router();

const {
  saveChat,
  getHistory,
} = require(
  "../controllers/chatHistoryController"
);

router.post(
  "/save",
  saveChat
);

router.get(
  "/all",
  getHistory
);

module.exports =
  router;