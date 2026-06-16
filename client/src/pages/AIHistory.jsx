import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import "../styles/aiHistory.css";

export default function AIHistory() {

    const navigate =
    useNavigate();

  const [history,
    setHistory] =
    useState([]);

  useEffect(() => {

    fetch(
      "http://localhost:5000/api/chat-history/all"
    )
      .then(
        res => res.json()
      )
      .then(
        data => setHistory(data)
      );

  }, []);

  return (

    <div className="history-page">

      <div className="history-header">

  <button
    className="back-btn"
    onClick={() =>
      navigate(
        "/admin"
      )
    }
  >
    Back
  </button>

  <h2>
    🤖 AI Chat History
  </h2>

</div>

      {history.length === 0 && (

        <p>
          No chat history found.
        </p>

      )}

      {history.map(chat => (

        <div
          key={chat._id}
          className="history-card"
        >

          <h4>

            {
              new Date(
  chat.createdAt
).toLocaleString(
  "en-GB",
  {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }
)
            }

          </h4>

          {chat.messages.map(
            (
              msg,
              index
            ) => (

              <div
                key={index}
                className={
                  msg.role === "user"
                    ? "user-message"
                    : "assistant-message"
                }
              >

                <strong>

                  {
                    msg.role === "user"
                      ? "👤 You"
                      : "🤖 Assistant"
                  }

                </strong>

                <p>
                  {msg.content}
                </p>

              </div>

            )
          )}

        </div>

      ))}

    </div>

  );
}