import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function TrendChart({
  complaints,
}) {

  const groupedData = {};

  complaints.forEach((c) => {

    const date =
      new Date(
        c.createdAt
      ).toLocaleDateString(
        "en-GB"
      );

    groupedData[date] =
      (groupedData[date] || 0) + 1;
  });

  const chartData = Object.entries(
  groupedData
)
  .map(([date, count]) => ({
    date,
    complaints: count,
    sortDate: new Date(
      date.split("/").reverse().join("-")
    ),
  }))
  .sort(
    (a, b) =>
      a.sortDate - b.sortDate
  )
  .map(
    ({ date, complaints }) => ({
      date,
      complaints,
    })
  );

  return (
    <div className="chart-card trend-chart">

      <h2>
        Complaint Trends
      </h2>

      <p className="chart-subtitle">
        Daily complaint volume
      </p>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart
          data={chartData}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="complaints"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
            />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default TrendChart;