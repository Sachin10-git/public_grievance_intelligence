import { useState } from "react";
import "../styles/auth.css";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(formData);

      console.log(data);

      setError("");
      setMessage("Registration Successful!");

      // Clear form after successful registration
      setFormData({
        name: "",
        email: "",
        password: "",
      });

    } catch (error) {
      console.error(error);

      setMessage("");

      setError(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="logo">
            PGIP
        </div>

        <h1>Create Account</h1>

        <p className="subtitle">
          Register to submit grievances
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Register
          </button>

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
            <p className="auth-switch">
                Already a user?{" "}
                <Link to="/">
                    Sign In
                </Link>
            </p>
        </form>

      </div>
    </div>
  );
}

export default Register;