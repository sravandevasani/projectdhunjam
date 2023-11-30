import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const Graph = (props) => {
  const { price, category7, category8, category9, category10 } = props;
  const data = [
    { name: "Custom", Amount: price },
    { name: "Category 1", Amount: category7 },
    { name: "Category 2", Amount: category8 },
    { name: "Category 3", Amount: category9 },
    { name: "Category 4", Amount: category10 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`${payload[0].name}: ₹${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis tick={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={() => null} />
        <Bar
          dataKey="Amount"
          fill="#F0C3F1"
          radius={[5, 5, 0, 0]}
          barSize={35}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Graph;
