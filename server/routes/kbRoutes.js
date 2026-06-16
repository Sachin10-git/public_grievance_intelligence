const express =
  require("express");

const router =
  express.Router();

const {
  testKB,
} = require(
  "../controllers/kbController"
);

router.post(
  "/search",
  testKB
);

module.exports =
  router;