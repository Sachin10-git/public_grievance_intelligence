const mongoose =
  require("mongoose");

const knowledgeBaseSchema =
  new mongoose.Schema(
    {
      title: String,

      category: String,

      priority: String,

      department: String,

      description: String,

      recommendedAction:
        String,

      embedding: [Number],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "KnowledgeBase",
    knowledgeBaseSchema
  );