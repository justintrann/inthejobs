import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";
import FormRowSelect from "../../components/FormRowSelect";
import {
  addJobRequest,
  jobAction,
  updateJobsRequest,
} from "../../features/job/jobSlice";
const AddJob = () => {
  // Initial
  const { id } = useParams();

  // Redux Stage
  const jobRedux = useSelector((state) => state.jobSlice);
  const dispatch = useDispatch();
  const {
    position,
    company,
    jobLocation,
    currentJobType,
    currentStatus,
    isEditing,
    editJobId,
  } = jobRedux;

  // FUNC
  const changeHandler = (e) => {
    const obj = e.target.id;
    const val = e.target.value;
    dispatch(jobAction.changeHandler({ [obj]: val }));
  };
  const navigate = useNavigate();
  function newJobHandler() {
    dispatch(jobAction.clearValueHandler());
    navigate("/main/add-jobs");
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const dataSubmit = {
      position,
      company,
      jobLocation,
      jobType: currentJobType,
      status: currentStatus,
    };
    const dataUpdate = {
      position,
      company,
      jobLocation,
      jobType: currentJobType,
      status: currentStatus,
      editJobId,
    };

    const isValid = (value) => {
      return value.trim() === "" ? false : true;
    };

    if (isValid(position) && isValid(company) && isValid(jobLocation)) {
      if (isEditing) {
        dispatch(updateJobsRequest(dataUpdate));
      } else {
        console.log(dataSubmit);
        dispatch(addJobRequest({ ...dataSubmit }));
      }
    } else toast.warning("Please fill out all field");
  };

  // Run-behind
  useEffect(() => {
    if (!id || !isEditing) {
      newJobHandler();
    }
  }, [id, isEditing]);

  // FLAG Main
  return (
    <Wrapper>
      {/* <h1>{id}</h1> */}
      <form className="form" onSubmit={submitHandler}>
        <h2>{jobRedux.isEditing ? "Edit Job" : "Add Job"}</h2>
        <div className="form-center">
          {/* // need: name , labelText, value, type, onChangeHandler,id */}
          <FormRow
            name="position"
            labelText="Position"
            value={jobRedux.position}
            onChangeHandler={changeHandler}
          />
          <FormRow
            name="company"
            labelText="Company"
            value={jobRedux.company}
            onChangeHandler={changeHandler}
          />
          <FormRow
            name="jobLocation"
            labelText="Location"
            value={jobRedux.jobLocation}
            onChangeHandler={changeHandler}
          />
          {/* select option STATUS */}
          {/* // NEED: name , currValue, arrValue */}
          <FormRowSelect
            name="currentStatus"
            labelText="Status"
            currValue={jobRedux.currentStatus}
            arrValue={jobRedux.statusOptions}
            onChangeHandler={changeHandler}
          />
          {/* select option Job Type*/}
          <FormRowSelect
            name="currentJobType"
            labelText="Job Type"
            currValue={jobRedux.currentJobType}
            arrValue={jobRedux.jobTypeOptions}
            onChangeHandler={changeHandler}
          />
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn btn-block clear-btn"
            onClick={newJobHandler}
          >
            Add New Job
          </button>
          <button className="btn btn-block submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
