import React from "react";
import {
  MdPendingActions as PendingIcon,
  MdAssignmentTurnedIn as InterviewIcon,
  MdDangerous as DeclineIcon,
} from "react-icons/md";
import StatItem from "../../components/StatItem";
import { useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  // Initial
  const { stats } = useSelector((state) => state.currentJobsSlice);

  // FUNC
  const summaryData = [
    {
      title: "Pending",
      count: stats.pending,
      icon: <PendingIcon />,
      background: "#FFF9E3",
      color: "#FFD639",
    },
    {
      title: "Interview Scheduled",
      count: stats.interview,
      icon: <InterviewIcon />,
      background: "#B5EAFF",
      color: "#009DDC",
    },
    {
      title: "Declined",
      count: stats.declined,
      icon: <DeclineIcon />,
      background: "#FFC4B0",
      color: "#FE5D26",
    },
  ];

  // MAIN

  return (
    <Wrapper>
      {summaryData.map((val, index) => {
        return <StatItem key={index} {...val} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
