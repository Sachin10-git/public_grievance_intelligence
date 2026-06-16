const KnowledgeBase =
  require("../models/KnowledgeBase");

const cosineSimilarity =
  (a, b) => {

    let dot = 0;
    let normA = 0;
    let normB = 0;

    for (
      let i = 0;
      i < a.length;
      i++
    ) {

      dot += a[i] * b[i];

      normA +=
        a[i] * a[i];

      normB +=
        b[i] * b[i];
    }

    return (
      dot /
      (
        Math.sqrt(normA) *
        Math.sqrt(normB)
      )
    );
  };

const searchKnowledgeBase =
  async (
    queryEmbedding,
    topK = 1
  ) => {

    const articles =
      await KnowledgeBase.find({
        embedding: {
          $exists: true,
          $ne: []
        }
      });

    const scored =
      articles.map(
        (article) => ({

          article,

          score:
            cosineSimilarity(
              queryEmbedding,
              article.embedding
            ),
        })
      );

    scored.sort(
      (a, b) =>
        b.score - a.score
    );

    return scored
  .slice(0, topK)
  .map(
    (item) => ({
      title:
        item.article.title,

      category:
        item.article.category,

      department:
        item.article.department,

      priority:
        item.article.priority,

      description:
        item.article.description,

      recommendedAction:
        item.article.recommendedAction,

      score:
        item.score
    })
  );
  };

module.exports = {
  searchKnowledgeBase,
};