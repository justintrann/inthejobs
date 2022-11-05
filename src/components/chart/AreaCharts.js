import React from "react";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AreaCharts = (props) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={props.data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area dataKey="count" name="Applicants" fill="#3b82f6" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaCharts;
