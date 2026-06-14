import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function StatusChart({ complaints }) {

  const data = [
    {
      status: "Pending",
      count: complaints.filter(
        (c) => c.status === "Pending"
      ).length,
    },
    {
      status: "In Progress",
      count: complaints.filter(
        (c) =>
          c.status === "In Progress"
      ).length,
    },
    {
      status: "Resolved",
      count: complaints.filter(
        (c) => c.status === "Resolved"
      ).length,
    },
  ];

  return (
    <div className="chart-card">

      <h2>
        Complaints by Status
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="status" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#2563eb"
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default StatusChart;