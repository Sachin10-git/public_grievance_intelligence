import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllComplaints,
  updateComplaintStatus,
} from "../services/adminService";
import "../styles/adminDashboard.css";

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

  const resolved =
    complaints.filter(
      (c) => c.status === "Resolved"
    ).length;

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

        return (
          matchesSearch &&
          matchesStatus
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
      </div>

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
          <option>All</option>
          <option>Pending</option>
          <option>
            In Progress
          </option>
          <option>Resolved</option>
        </select>
      </div>

      <div className="complaints-list">
        {filteredComplaints.map(
          (complaint) => (
            <div
              className="admin-card"
              key={complaint._id}
            >
              <div className="card-top">
                <div>
                  <h3>
                    {complaint.title}
                  </h3>

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