import React from "react";
import Wrapper from "../assets/wrappers/Job";
import {
  MdLocationOn as LocationIcon,
  MdCalendarToday as DateIcon,
  MdWork as WorkIcon,
} from "react-icons/md";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { deleteJobsRequest, jobAction } from "../features/job/jobSlice";

// NEED: company,position,status
const Job = (props) => {
  const dispatch = useDispatch();

  const editJobHandler = () => {
    console.log(props);
    dispatch(
      jobAction.setEditJobData({
        editJobId: props._id,
        position: props.position,
        company: props.company,
        jobLocation: props.jobLocation,
        currentJobType: props.jobType,
        currentStatus: props.status,
      })
    );
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(deleteJobsRequest(props._id));
  };
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{props.company.charAt(0)}</div>
        <div className="info">
          <h5>{props.position}</h5>
          <p>{props.company}</p>
        </div>
      </header>

      <div className="content">
        <div className="content-center">
          <div className="job-info">
            <span className="icon">
              <LocationIcon />
            </span>
            <span className="text">{props.jobLocation}</span>
          </div>

          <div className="job-info">
            <span className="icon">
              <WorkIcon />
            </span>
            <span className="text">{props.jobType}</span>
          </div>

          <div className="job-info">
            <span className="icon">
              <DateIcon />
            </span>

            <span className="text">
              {moment(props.createdAt).format("MMM Do YY")}
            </span>
          </div>

          <div className={`status ${props.status}`}>{props.status}</div>
        </div>

        <footer>
          <div className="actions">
            <Link
              to={`/main/edit-jobs/${props._id}`}
              className="btn edit-btn"
              onClick={editJobHandler}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={deleteHandler}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
