import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyComplaints } from "../services/complaintService";
import "../styles/myComplaints.css";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getMyComplaints();
      setComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="complaints-container">
        <div className="loading-state">
          <h2>Loading complaints...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="complaints-container">

      <div className="page-header">

  <Link
    to="/dashboard"
    className="back-button"
  >
    Back to Dashboard
  </Link>

  <h1>My Complaints</h1>

  <div className="header-spacer"></div>

</div>

      {complaints.length === 0 ? (

        <div className="empty-state">
          <h3>No complaints submitted yet</h3>

          <p>
            Submit your first grievance to start
            tracking issues and resolutions.
          </p>
        </div>

      ) : (

        complaints.map((complaint) => (
          <div
            className="complaint-card"
            key={complaint._id}
          >

            <div className="card-header">

              <h3>{complaint.title}</h3>

              <span
                className={`status ${complaint.status
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {complaint.status}
              </span>

            </div>

            <p className="description">
              {complaint.description}
            </p>

            <div className="card-footer">

              <p>
                <strong>📍 Location:</strong>{" "}
                {complaint.location}
              </p>

              <p className="complaint-date">
                <strong>📅 Submitted:</strong>{" "}
                {complaint.createdAt
                  ? new Date(
                      complaint.createdAt
                    ).toLocaleDateString("en-GB")
                  : "N/A"}
              </p>

            </div>

          </div>
        ))

      )}
    </div>
  );
}

export default MyComplaints;