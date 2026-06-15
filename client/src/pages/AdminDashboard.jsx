import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllComplaints,
  updateComplaintStatus,
} from "../services/adminService";
import "../styles/adminDashboard.css";
import StatusChart
from "../components/charts/StatusChart";
import PriorityChart
from "../components/charts/PriorityChart";
import CategoryChart
from "../components/charts/CategoryChart";
import AIInsights
from "../components/charts/AIInsights";
import TrendChart from "../components/TrendChart";

function AdminDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("All");

  const [filterPriority, setFilterPriority] =
    useState("All");

  const [filterCategory, setFilterCategory] =
  useState("All");
  
  const [filterDepartment, setFilterDepartment] =
  useState("All");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data =
        await getAllComplaints();

      setComplaints(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");

    navigate("/admin-login");
  };

  const handleStatusChange =
    async (id, status) => {
      try {
        await updateComplaintStatus(
          id,
          status
        );

        fetchComplaints();
      } catch (error) {
        console.error(error);
      }
    };

  const total =
    complaints.length;

  const pending =
    complaints.filter(
      (c) => c.status === "Pending"
    ).length;

  const inProgress =
    complaints.filter(
      (c) =>
        c.status === "In Progress"
    ).length;

    const escalated =
    complaints.filter(
      (c) => c.escalated
    ).length;

  const resolved =
    complaints.filter(
      (c) => c.status === "Resolved"
    ).length;
    const highPriority =
  complaints.filter(
    (c) => c.priority === "High"
  ).length;

const mediumPriority =
  complaints.filter(
    (c) => c.priority === "Medium"
  ).length;

const lowPriority =
  complaints.filter(
    (c) => c.priority === "Low"
  ).length;

  const categories = [
  ...new Set(
    complaints
      .map((c) => c.category)
      .filter(Boolean)
  ),
];

const departments = [
  ...new Set(
    complaints
      .map((c) => c.department)
      .filter(Boolean)
  ),
];

  const filteredComplaints =
    complaints.filter(
      (complaint) => {
        const matchesSearch =
          complaint.title
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchesStatus =
  filterStatus === "All"
    ? true
    : complaint.status ===
      filterStatus;

        const matchesPriority =
          filterPriority === "All"
            ? true
            : complaint.priority ===
              filterPriority;
            const matchesCategory =
              filterCategory === "All"
                ? true
                : complaint.category ===
                  filterCategory;
            const matchesDepartment =
              filterDepartment === "All"
                ? true
                : complaint.department ===
                  filterDepartment;
        return (
          matchesSearch &&
          matchesStatus &&
          matchesPriority &&
          matchesCategory &&
          matchesDepartment
        );
      }
    );

  if (loading) {
    return (
      <div className="admin-loading">
        Loading complaints...
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>
            Administrator Dashboard
          </h1>

          <p>
            Monitor and manage citizen
            grievances
          </p>
        </div>

        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card total">
          <h2>{total}</h2>
          <p>Total</p>
        </div>

        <div className="admin-stat-card pending">
          <h2>{pending}</h2>
          <p>Pending</p>
        </div>

        <div className="admin-stat-card progress">
          <h2>{inProgress}</h2>
          <p>In Progress</p>
        </div>

        <div className="admin-stat-card resolved">
          <h2>{resolved}</h2>
          <p>Resolved</p>
        </div>
        <div className="admin-stat-card escalated">
          <h2>{escalated}</h2>
          <p>Escalated</p>
        </div>
        <div className="admin-stat-card high-priority">
          <h2>{highPriority}</h2>
          <p>High Priority</p>
        </div>

        <div className="admin-stat-card medium-priority">
          <h2>{mediumPriority}</h2>
          <p>Medium Priority</p>
        </div>

        <div className="admin-stat-card low-priority">
          <h2>{lowPriority}</h2>
          <p>Low Priority</p>
        </div>
      </div>

      <div className="charts-section">
        <StatusChart
          complaints={complaints}
        />

        <PriorityChart
          complaints={complaints}
        />

        <CategoryChart
          complaints={complaints}
        />

        <TrendChart
          complaints={complaints}
        />

      </div>

      <AIInsights complaints={complaints} />

      <div className="admin-controls">
        <input
          type="text"
          placeholder="Search complaints..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value
            )
          }
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>
            In Progress
          </option>
          <option>Resolved</option>
        </select>

        <select
          value={filterPriority}
          onChange={(e) =>
            setFilterPriority(
              e.target.value
            )
          }
        >
          <option>All Priorities</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(
              e.target.value
            )
          }
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={filterDepartment}
          onChange={(e) =>
            setFilterDepartment(
              e.target.value
            )
          }
        >
          <option value="All">All Departments</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      <div className="complaints-list">
        {filteredComplaints.map(
          (complaint) => (
            <div
                className={`admin-card ${
                  complaint.priority === "High"
                    ? "high-priority-card"
                    : ""
                }`}
                key={complaint._id}
              >
              <div className="card-top">
                <div>
                  <h3>
                    {complaint.title}
                  </h3>

                    <p className="ticket-id">
                      🎫 {complaint.ticketId}
                    </p>
                    
                    {complaint.escalated && (
                      <>
                        <span className="escalated-badge">
                          🚨 Escalated
                        </span>

                        <p className="escalation-reason">
                          {complaint.escalationReason}
                        </p>
                      </>
                    )}

                  <p className="location">
                    📍{" "}
                    {
                      complaint.location
                    }
                  </p>

                  <p className="date">
                    📅{" "}
                    {new Date(
                      complaint.createdAt
                    ).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>
                </div>

                <span
                  className={`status-badge ${complaint.status
                    .toLowerCase()
                    .replace(
                      " ",
                      "-"
                    )}`}
                >
                  {complaint.status}
                </span>
              </div>

              <p className="description">
                {
                  complaint.description
                }
              </p>

                {complaint.image && (
                  <div className="complaint-image">
                    <img
                      src={`http://localhost:5000${complaint.image}`}
                      alt="Complaint"
                    />
                  </div>
                )}

              <div className="ai-details">

                <p>
                  <strong>🏷 Category:</strong>{" "}
                  {complaint.category}
                </p>

                <p>
                  <strong>🏢 Department:</strong>{" "}
                  {complaint.department}
                </p>

                <p>
                  <strong>⚡ Priority:</strong>{" "}

                  <span
                    className={`priority-badge ${complaint.priority?.toLowerCase()}`}
                  >
                    {complaint.priority}
                  </span>
                </p>

                {complaint.aiSummary && (
                  <div className="ai-summary">
                    <strong>🤖 AI Summary:</strong>
                    <p>{complaint.aiSummary}</p>
                  </div>
                )}

                {complaint.recommendedAction && (
                  <div className="ai-summary">
                    <strong>
                      🤖 Recommended Action:
                    </strong>

                    <p>
                      {complaint.recommendedAction}
                    </p>
                  </div>
                )}

              </div>

              <div className="status-update">
                <label>
                  Change Status
                </label>

                <select
                  value={
                    complaint.status
                  }
                  onChange={(e) =>
                    handleStatusChange(
                      complaint._id,
                      e.target.value
                    )
                  }
                >
                  <option>
                    Pending
                  </option>

                  <option>
                    In Progress
                  </option>

                  <option>
                    Resolved
                  </option>
                </select>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;