const express =
  require("express");

const router =
  express.Router();

const {
  testSearch,
} = require(
  "../controllers/vectorSearchController"
);

router.post(
  "/search",
  testSearch
);

module.exports =
  router;