import React from "react";
import { Link } from "react-router-dom";
import notFoundImg from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";
const Error = () => {
  return (
    <Wrapper>
      <div>
        <h3>Oops</h3>
        <img src={notFoundImg} alt="NotFound-img" />
        <p>Looks like we lost this page</p>
        <Link to="/">Return Home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
