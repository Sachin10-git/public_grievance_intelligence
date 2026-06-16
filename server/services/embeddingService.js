const { GoogleGenAI } =
  require("@google/genai");

const ai =
  new GoogleGenAI({
    apiKey:
      process.env.GEMINI_API_KEY,
  });

const generateEmbedding =
  async (text) => {

    const result =
      await ai.models.embedContent({
        model:
          "gemini-embedding-001",
        contents: text,
      });

    console.log(
  "Embedding Generated"
);

    return result.embeddings[0].values;
  };

module.exports = {
  generateEmbedding,
};