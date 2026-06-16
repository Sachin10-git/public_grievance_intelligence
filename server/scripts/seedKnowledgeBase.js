const mongoose =
  require("mongoose");

const dotenv =
  require("dotenv");

dotenv.config();

const connectDB =
  require("../config/db");

const KnowledgeBase =
  require("../models/KnowledgeBase");

const data =
  require("../data/knowledgeBaseData");

const {
  generateEmbedding,
} = require(
  "../services/embeddingService"
);

const seedKB =
  async () => {

    try {

      await connectDB();

      await KnowledgeBase.deleteMany();

      for (const article of data) {

  try {

    const embedding =
      await generateEmbedding(
        `
${article.title}

${article.description}
`
      );

    await KnowledgeBase.create({
      ...article,
      embedding,
    });

    console.log(
      `Seeded: ${article.title}`
    );

  } catch (error) {

    console.log(
      `Failed: ${article.title}`
    );

    console.log(
      error.message
    );
  }
}
      console.log(
        "Knowledge Base Seeded"
      );

      process.exit(0);

    } catch (error) {

      console.error(error);

      process.exit(1);
    }
  };

seedKB();