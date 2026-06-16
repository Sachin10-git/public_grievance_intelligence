import axios from "axios";

export const askAssistant =
  async (question) => {

    const response =
      await axios.post(
        "http://localhost:5000/api/assistant/ask",
        { question }
      );

    return response.data;
  };