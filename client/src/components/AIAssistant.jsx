import { useState } from "react";

import {
  askAssistant,
} from "../services/assistantService";

import "../styles/aiAssistant.css";

import {
  useNavigate
} from "react-router-dom";

export default function AIAssistant() {

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

    const navigate =
    useNavigate();
  const handleAsk =
    async () => {

      if (!question.trim())
        return;

      const currentQuestion =
        question;

      setMessages(prev => [
        ...prev,
        {
          role: "user",
          content:
            currentQuestion,
        },
      ]);

      setQuestion("");

      try {

        setLoading(true);

        const data =
          await askAssistant(
            currentQuestion
          );

        setMessages(prev => [
          ...prev,
          {
            role:
              "assistant",
            content:
              data.answer,
          },
        ]);

      } catch (error) {

        console.error(error);

        setMessages(prev => [
          ...prev,
          {
            role:
              "assistant",
            content:
              "Failed to generate response.",
          },
        ]);

      } finally {

        setLoading(false);

      }
    };

    const handleRefresh =
  async () => {

    if (
      messages.length === 0
    ) {
      return;
    }

    try {

      await fetch(
        "http://localhost:5000/api/chat-history/save",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({
              messages,
            }),
        }
      );

      setMessages([]);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="assistant-card">

      <div className="assistant-header">

        <h2>
          🤖 AI Administrative Assistant
        </h2>

        <p>
          Ask questions about complaints,
          departments, trends and
          priorities.
        </p>

      </div>

      <div className="assistant-input">

        <input
          type="text"
          placeholder="Ask something like: Which department has the highest workload?"
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (
              e.key === "Enter"
            ) {

              handleAsk();

            }
          }}
        />

        <button
          onClick={handleAsk}
          disabled={loading}
        >
          {loading
            ? "Analyzing..."
            : "Analyze"}
        </button>

              <button
                onClick={handleRefresh}
                className="refresh-btn"
              >
                🔄 New Chat
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/ai-history"
                  )
                }
                className="history-btn"
              >
                📜 History
              </button>

      </div>

      <div className="assistant-suggestions">

        <button
          onClick={() =>
            setQuestion(
              "What are the most common complaint categories?"
            )
          }
        >
          Top Categories
        </button>

        <button
          onClick={() =>
            setQuestion(
              "Which department has the highest workload?"
            )
          }
        >
          Workload
        </button>

        <button
          onClick={() =>
            setQuestion(
              "Summarize unresolved complaints."
            )
          }
        >
          Pending Cases
        </button>

      </div>

      {messages.length === 0 && (

        <div className="assistant-placeholder">

          Ask a question to analyze
          complaint trends and
          workload.

        </div>

      )}

      <div className="chat-container">

        {messages.map(
          (
            message,
            index
          ) => (

            <div
              key={index}
              className={
                message.role ===
                "user"
                  ? "user-message"
                  : "assistant-message"
              }
            >

              <strong>

                {message.role ===
                "user"
                  ? "👤 You"
                  : "🤖 Assistant"}

              </strong>

              <p>
                {message.content}
              </p>

            </div>

          )
        )}

        {loading && (

          <div className="assistant-message">

            <strong>
              🤖 Assistant
            </strong>

            <p>
              Thinking...
            </p>

          </div>

        )}

      </div>

    </div>
  );
}