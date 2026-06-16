const Groq =
  require("groq-sdk");

const groq =
  new Groq({
    apiKey:
      process.env.GROQ_API_KEY,
  });

const askGroq =
  async (prompt) => {

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        model:
          "llama-3.3-70b-versatile",

        temperature: 0.3,
      });

    return completion
      .choices[0]
      .message.content;
  };

module.exports = {
  askGroq,
};