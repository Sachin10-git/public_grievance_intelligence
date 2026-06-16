const express =
  require("express");

const router =
  express.Router();
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

const testSearch =
  async (req, res) => {

    try {

      const { query } =
        req.body;

      const embedding =
        await generateEmbedding(
          query
        );

      const results =
        await searchComplaints(
          embedding,
          5
        );

      res.json(
  results.map(r => ({
    title: r.title,
    description: r.description,
    category: r.category,
    similarity: r.score
  }))
);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  testSearch,
};