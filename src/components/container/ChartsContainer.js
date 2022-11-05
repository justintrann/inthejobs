import React from "react";
import { useState } from "react";
import Wrapper from "../../assets/wrappers/ChartsContainer";
import BarCharts from "../chart/BarCharts";
import AreaCharts from "../chart/AreaCharts";
import { useSelector } from "react-redux";
import img from "../../assets/images/growth.svg";
const ChartsContainer = () => {
  // Initial
  const [activeBarChart, setActiveBarChart] = useState(true);
  const [activeAreaChart, setActiveAreaChart] = useState(false);
  const { monthlyApplications: monthlyData } = useSelector(
    (state) => state.currentJobsSlice
  );
  // FUNC
  const toggleChart = (cond) => {
    if (cond === "bar") {
      setActiveBarChart(true);
      setActiveAreaChart(false);
    } else if (cond === "area") {
      setActiveBarChart(false);
      setActiveAreaChart(true);
    }
  };
  if (monthlyData.length === 0)
    return (
      <Wrapper>
        <div className="lengthZero">
          <h1> Ready for remarkable talents</h1>
          <img src={img} alt="growthChart" placeholder="growthChart" />;
        </div>
      </Wrapper>
    );

  // MAIN
  return (
    <Wrapper>
      <h4>Monthly Application</h4>
      <button
        type="button"
        onClick={toggleChart.bind(this, "bar")}
        className={activeBarChart ? "btn-active" : ""}
      >
        Bar Chart
      </button>
      <button
        type="button"
        onClick={toggleChart.bind(this, "area")}
        className={activeAreaChart ? "btn-active" : ""}
      >
        Area Chart
      </button>
      {activeBarChart ? (
        <BarCharts data={monthlyData} />
      ) : (
        <AreaCharts data={monthlyData} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
