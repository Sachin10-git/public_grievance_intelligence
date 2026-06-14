function AIInsights({ complaints }) {

  const totalComplaints =
    complaints.length;

  const highPriority =
    complaints.filter(
      (c) => c.priority === "High"
    ).length;

  const resolved =
    complaints.filter(
      (c) => c.status === "Resolved"
    ).length;

  const resolutionRate =
    totalComplaints > 0
      ? Math.round(
          (resolved /
            totalComplaints) *
            100
        )
      : 0;

  const categoryCount = {};

  const departmentCount = {};

  complaints.forEach(
    (complaint) => {

      const category =
        complaint.category ||
        "Uncategorized";

      const department =
        complaint.department ||
        "Unassigned";

      categoryCount[category] =
        (categoryCount[
          category
        ] || 0) + 1;

      departmentCount[
        department
      ] =
        (departmentCount[
          department
        ] || 0) + 1;
    }
  );

  const mostCommonCategory =
    Object.entries(
      categoryCount
    ).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "N/A";

  const mostAffectedDepartment =
    Object.entries(
      departmentCount
    ).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "N/A";

  return (
    <div className="ai-insights-card">

      <h2>
        AI Insights
      </h2>

      <div className="insight-grid">

        <div className="insight-item">
          <h3>
            Most Common Category
          </h3>

          <p>
            {
              mostCommonCategory
            }
          </p>
        </div>

        <div className="insight-item">
          <h3>
            Most Affected Department
          </h3>

          <p>
            {
              mostAffectedDepartment
            }
          </p>
        </div>

        <div className="insight-item">
          <h3>
            High Priority Cases
          </h3>

          <p>
            {highPriority}
          </p>
        </div>

        <div className="insight-item">
          <h3>
            Resolution Rate
          </h3>

          <p>
            {resolutionRate}%
          </p>
        </div>

      </div>

    </div>
  );
}

export default AIInsights;