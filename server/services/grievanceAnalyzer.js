const { GoogleGenAI } = require("@google/genai");
const JSON5 = require("json5");
async function analyzeComplaint(title, description) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
You are an AI assistant for a Public Grievance Platform.

Analyze the complaint and return ONLY a valid JSON object.

Complaint Title:
${title}

Complaint Description:
${description}

Priority Classification Rules:

HIGH:
- Road accidents
- Dangerous potholes
- Flooding
- Water pipeline bursts
- Fire hazards
- Electrical hazards
- Public health risks
- Severe sanitation issues
- Garbage accumulation for several days
- Unsafe public infrastructure

MEDIUM:
- Streetlights not working
- Water supply interruptions
- Traffic signal issues
- Service delays
- Moderate sanitation problems
- Public inconvenience

LOW:
- Park maintenance
- Painting requests
- Cosmetic issues
- Minor repairs
- Suggestions and feedback

Rules:
- category should be a short category name.
- priority must be exactly one of: Low, Medium, High.
- department should be the responsible government department.
- summary should be a concise one-line summary.
- Do not return markdown.
- Do not return explanations.
- Do not return code blocks.

Return format:

{
  "category": "",
  "priority": "Low | Medium | High",
  "department": "",
  "summary": "",
}

Return ONLY the JSON object.
Do not include any text before or after the JSON.

Example:

{
  "category": "Road Infrastructure",
  "priority": "High",
  "department": "Public Works Department",
  "summary": "Large pothole causing accidents near a major junction.",
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    // Remove markdown if Gemini returns it
    const cleaned = text
  .replace(/```json/gi, "")
  .replace(/```/g, "")
  .trim();

const parsed = JSON5.parse(cleaned);

const validPriorities = [
  "Low",
  "Medium",
  "High",
];

return {
  category:
    parsed.category || "Uncategorized",

  priority:
    validPriorities.includes(
      parsed.priority
    )
      ? parsed.priority
      : "Low",

  department:
    parsed.department || "Unassigned",

  summary:
    parsed.summary || "",

};
  } catch (error) {
    console.error("\nAI ANALYSIS ERROR:");
    console.error(error);

    return {
      category: "Uncategorized",
      priority: "Low",
      department: "Unassigned",
      summary: "",
    };
  }
}

module.exports = { analyzeComplaint };