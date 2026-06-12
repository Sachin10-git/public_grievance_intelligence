import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminLogin.css";

function AdminLogin() {
const navigate = useNavigate();

const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

const [error, setError] =
  useState("");

const handleSubmit = (e) => {
e.preventDefault();
if (
email.trim() === "admin@pgip.com" &&
password.trim() === "admin123"
) {
setError("");

// Remove citizen session
localStorage.removeItem("token");
localStorage.removeItem("user");

// Create admin session
localStorage.setItem(
"admin",
"true"
);

navigate("/admin");
} else {
setError(
"Invalid admin credentials. Please try again."
);
}


};

return ( <div className="admin-login-page"> <div className="admin-login-card">
    <div className="admin-logo">
      PGIP
    </div>

    <h1>
      Administrator Portal
    </h1>

    <p className="admin-subtitle">
      Secure access for grievance
      management
    </p>

    <form onSubmit={handleSubmit}>

      <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => {
        setEmail(e.target.value);
        setError("");
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
        setPassword(e.target.value);
        setError("");
        }}
      />

      <button type="submit">
        Login to Dashboard
      </button>

        {error && (
        <div className="login-error">
            {error}
        </div>
        )}

    </form>

    <div className="security-note">
      Authorized Personnel Only
    </div>

  </div>
</div>
);
}

export default AdminLogin;
