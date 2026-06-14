import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";

function PriorityChart({ complaints }) {

  const data = [
    {
      name: "High",
      value: complaints.filter(
        (c) => c.priority === "High"
      ).length,
    },
    {
      name: "Medium",
      value: complaints.filter(
        (c) => c.priority === "Medium"
      ).length,
    },
    {
      name: "Low",
      value: complaints.filter(
        (c) => c.priority === "Low"
      ).length,
    },
  ];

  const COLORS = [
    "#ef4444",
    "#f97316",
    "#22c55e",
  ];

  const totalComplaints =
  data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (

        <div className="chart-card">
        <h2>
        Complaints by Priority
        </h2>

        <p className="chart-subtitle">
        Total Complaints: {totalComplaints}
        </p>

        <ResponsiveContainer
        width="100%"
        height={300}
        >
        <PieChart>

            <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            >
            <Label
                value={totalComplaints}
                position="center"
                fontSize={34}
                fontWeight="bold"
            />

            {data.map(
                (entry, index) => (
                <Cell
                    key={index}
                    fill={
                    COLORS[index]
                    }
                />
                )
            )}
            </Pie>

            <Tooltip />

            <Legend
            formatter={(value) => {
                const item = data.find(
                (d) => d.name === value
                );

                return `${value} (${item?.value || 0})`;
            }}
            />

        </PieChart>
        </ResponsiveContainer>

        </div>
);

}

export default PriorityChart;