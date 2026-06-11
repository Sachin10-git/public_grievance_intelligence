import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">

        <div>
          <h1 className="platform-title">
            PUBLIC GRIEVANCES INTELLIGENCE PLATFORM
          </h1>

          <p className="platform-subtitle">
            Citizen Grievance Management Portal
          </p>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      <div className="welcome-section">

        <h2>
          Welcome, {user?.name}
        </h2>

        <p>
          Track, manage and monitor your public grievances
          from one centralized platform.
        </p>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>--</h3>
          <p>Total Complaints</p>
        </div>

        <div className="stat-card">
          <h3>--</h3>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <h3>--</h3>
          <p>Resolved</p>
        </div>

      </div>

      <div className="action-grid">

        <div
          className="action-card"
          onClick={() =>
            navigate("/submit")
          }
        >
          <h3>Submit Complaint</h3>

          <p>
            Report public issues and grievances.
          </p>
        </div>

        <div
          className="action-card"
          onClick={() =>
            navigate("/my-complaints")
          }
        >
          <h3>My Complaints</h3>

          <p>
            Track complaint progress and status.
          </p>
        </div>

      </div>

      <div className="recent-section">

        <h2>Quick Access</h2>

        <div className="quick-info">
          Use the options above to submit new
          complaints or monitor existing grievances.
        </div>

      </div>

    </div>
  );
}

export default Dashboard;