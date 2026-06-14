import { useState } from "react";
import { createComplaint } from "../services/complaintService";
import { Link } from "react-router-dom";
import "../styles/auth.css";

function SubmitComplaint() {
  const [formData, setFormData] = useState({
  title: "",
  description: "",
  location: "",
  });

  const [image, setImage] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e) => {
  setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    const complaintData =
      new FormData();

    complaintData.append(
      "title",
      formData.title
    );

    complaintData.append(
      "description",
      formData.description
    );

    complaintData.append(
      "location",
      formData.location
    );

    if (image) {
      complaintData.append(
        "image",
        image
      );
    }

    const data =
      await createComplaint(
        complaintData
      );

    console.log(data);

    setError("");
    setMessage(
      "Complaint submitted successfully!"
    );

    setFormData({
      title: "",
      description: "",
      location: "",
    });

    setImage(null);

  } catch (error) {
    console.error(error);

    setMessage("");

    setError(
      error.response?.data?.message ||
      "Failed to submit complaint"
    );
  } finally {
    setSubmitting(false);
  }
};
  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="logo">
          PGIP
        </div>

        <h1>Submit Complaint</h1>

        <p className="subtitle">
          Report a public grievance
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="title"
            placeholder="Complaint Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Describe the issue"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Submitting Complaint..."
              : "Submit Complaint"}
          </button>

            {submitting && (
              <p
                style={{
                  marginTop: "12px",
                  color: "#2563eb",
                  fontWeight: "600",
                }}
              >
                ⏳ Submitting complaint and
                generating ticket...
              </p>
            )}

          {message && (
            <p className="success-message">
              {message}
            </p>
          )}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

            <Link
  to="/dashboard"
  className="dashboard-link-btn"
>
  Back to Dashboard
</Link>
        </form>

      </div>
    </div>
  );
}

export default SubmitComplaint;