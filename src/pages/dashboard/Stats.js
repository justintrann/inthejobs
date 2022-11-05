import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartsContainer, StatsContainer } from "../../components";
import { getStats } from "../../features/allJobs/allJobsSlice";

const Stats = () => {
  // INITIAL
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.currentJobsSlice);

  // useEffect
  useEffect(() => {
    dispatch(getStats());
  }, []);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <StatsContainer />
      <ChartsContainer />
    </>
  );
};

export default Stats;
