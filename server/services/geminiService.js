const { GoogleGenAI } = require("@google/genai");

async function testGemini() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Reply with: Gemini is working",
    });

    console.log(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
  }
}

module.exports = { testGemini };