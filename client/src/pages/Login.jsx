import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const data = await loginUser(formData);

      console.log(data);

      setError("");
      setMessage("Login Successful!");

      // Save JWT Token
      localStorage.setItem("token", data.token);

      // Save User Details
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Clear Form
      setFormData({
        email: "",
        password: "",
      });

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      console.error(error);

      setMessage("");

      setError(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="logo">
          PGIP
        </div>

        <h1>
          Public Grievance
          <br />
          Intelligence Platform
        </h1>

        <p className="subtitle">
          Sign in to manage and track public grievances
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
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
            Login
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
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Login;