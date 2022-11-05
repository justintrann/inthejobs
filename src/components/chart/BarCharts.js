import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const BarCharts = (props) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={props.data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" name="Applicants" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
