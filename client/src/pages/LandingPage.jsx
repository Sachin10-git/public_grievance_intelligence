import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/landingPage.css";

function LandingPage() {

const features = [
  "🤖 AI Complaint Categorization",
  "⚡ Priority Detection",
  "🏢 Department Routing",
  "📝 AI Complaint Summaries",
];

const [text, setText] = useState("");
const [featureIndex, setFeatureIndex] =
  useState(0);
const [charIndex, setCharIndex] =
  useState(0);

useEffect(() => {
  const currentText =
    features[featureIndex];

  if (
    charIndex < currentText.length
  ) {
    const timeout = setTimeout(() => {
      setText(
        currentText.substring(
          0,
          charIndex + 1
        )
      );

      setCharIndex(
        (prev) => prev + 1
      );
    }, 80);

    return () => clearTimeout(timeout);
  }

  const pause = setTimeout(() => {
    setText("");
    setCharIndex(0);

    setFeatureIndex(
      (prev) =>
        (prev + 1) %
        features.length
    );
  }, 2000);

  return () => clearTimeout(pause);

}, [charIndex, featureIndex]);

return ( <div className="landing-container">

  <div className="landing-card">

    <div className="logo">
      PGIP
    </div>

    <h1>
      Public Grievance Platform
    </h1>

    <p className="landing-subtitle">
      AI-Powered Citizen Complaint
      Management System
    </p>

    <div className="feature-slider">
    {text}
    <span className="cursor">|</span>
    </div>

    <div className="landing-buttons">

      <Link
        to="/login"
        className="citizen-btn"
      >
        Citizen Login
      </Link>

      <Link
        to="/admin-login"
        className="admin-btn"
      >
        Admin Login
      </Link>

    </div>

    <p className="tech-stack">
      Empowering Citizens Through Intelligent Grievance Resolution
    </p>

  </div>

</div>

);
}

export default LandingPage;
