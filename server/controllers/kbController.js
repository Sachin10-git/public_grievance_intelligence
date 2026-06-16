const {
  generateEmbedding
} = require(
  "../services/embeddingService"
);

const {
  searchKnowledgeBase
} = require(
  "../services/kbSearch"
);

const testKB =
  async (req, res) => {

    const { query } =
      req.body;

    const embedding =
      await generateEmbedding(
        query
      );

    const results =
      await searchKnowledgeBase(
        embedding
      );

    res.json(results);
  };

module.exports = {
  testKB
};