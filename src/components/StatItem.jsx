import React from "react";

import Wrapper from "../assets/wrappers/StatItem";

// To father: color, background, count, icon, title
const StatItem = (props) => {
  return (
    <Wrapper color={props.color} background={props.background}>
      <header>
        <span className="count">{props.count}</span>
        <span className="icon">{props.icon}</span>
      </header>
      <h5 className="title">{props.title}</h5>
    </Wrapper>
  );
};

export default StatItem;
