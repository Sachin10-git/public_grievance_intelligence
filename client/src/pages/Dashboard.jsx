import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { getMyComplaints } from "../services/complaintService";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
  });

  const [recentComplaints, setRecentComplaints] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const complaints = await getMyComplaints();

      const total = complaints.length;

      const pending = complaints.filter(
        (c) => c.status === "Pending"
      ).length;

      const resolved = complaints.filter(
        (c) => c.status === "Resolved"
      ).length;

      setStats({
        total,
        pending,
        resolved,
      });

      const sortedComplaints = [...complaints].sort(
  (a, b) =>
    new Date(b.createdAt) -
    new Date(a.createdAt)
);

setRecentComplaints(
  sortedComplaints.slice(0, 3)
);

    } catch (error) {
      console.error(error);
    }
  };

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
            PUBLIC GRIEVANCE INTELLIGENCE PLATFORM
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
          Track, manage and monitor your public
          grievances from one centralized platform.
        </p>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Complaints</p>
        </div>

        <div className="stat-card">
          <h3>{stats.pending}</h3>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <h3>{stats.resolved}</h3>
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

        <h2>Recent Activity</h2>

        <div className="recent-card">

          {recentComplaints.length === 0 ? (

            <p className="no-activity">
              No complaints submitted yet.
            </p>

          ) : (

            recentComplaints.map((complaint) => (

              <div
                key={complaint._id}
                className="activity-item"
              >

                <div>

                  <h4>
                    {complaint.title}
                  </h4>

                  <p>
                    {new Date(
                      complaint.createdAt
                    ).toLocaleDateString("en-GB")}
                  </p>

                </div>

                <span
                  className={`activity-status ${complaint.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {complaint.status}
                </span>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;