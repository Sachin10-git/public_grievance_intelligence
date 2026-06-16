const Complaint =
  require("../models/Complaint");

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

const searchComplaints =
  async (
    queryEmbedding,
    topK = 1
  ) => {

    const complaints =
      await Complaint.find({
        embedding: {
          $exists: true,
          $ne: []
        }
      });

    const scored =
      complaints.map(
        (complaint) => ({

          complaint,

          score:
            cosineSimilarity(
              queryEmbedding,
              complaint.embedding
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
        (item) =>
          item.complaint
      );
  };

module.exports = {
  searchComplaints,
};