import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/JobsContainer";
import notAvailImg from "../../assets/images/not-available.svg";
import { getAllJobs } from "../../features/allJobs/allJobsSlice";
import Job from "../Job";
import { PaginateBtnContainer } from "..";
const JobsContainer = () => {
  // Initial
  const isLoading = useSelector((state) => state.currentJobsSlice.isLoading);
  const jobsArr = useSelector((state) => state.currentJobsSlice.jobs);
  const { totalJobs, numOfPages } = useSelector(
    (state) => state.currentJobsSlice
  );
  const dispatch = useDispatch();

  // FUNC
  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);
  // FLAG : Return
  if (isLoading) {
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  if (jobsArr.length === 0) {
    return (
      <Wrapper>
        <div className="not-found">
          <h2>Not Available</h2>
          <img src={notAvailImg} alt="notAvail" placeholder="not-available" />
          <h5>Aliens have taken our jobs. Please come back later!</h5>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h3>{totalJobs} jobs found</h3>
      <div className="jobs">
        {jobsArr.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PaginateBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
