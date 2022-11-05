import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/SearchContainer";
import { allJobsAction, getAllJobs } from "../../features/allJobs/allJobsSlice";
import FormRow from "../FormRow";
import FormRowSelect from "../FormRowSelect";
const SearchContainer = () => {
  // Initial
  const { search, searchStatus, searchType, sort, sortOptions } = useSelector(
    (state) => state.currentJobsSlice
  );
  const { statusOptions, jobTypeOptions } = useSelector(
    (state) => state.jobSlice
  );
  const dispatch = useDispatch();
  // Func
  const changeHandler = (e) => {
    const obj = e.target.id;
    const val = e.target.value;
    dispatch(allJobsAction.changeHandler({ [obj]: val }));
  };

  // Tmp stage
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllJobs());
  };

  // MAIN
  return (
    <Wrapper>
      <form className="form">
        <h4>Let's dive somthing</h4>
        <div className="form-center">
          {/* need: name , labelText, value, type, onChangeHandler */}
          <FormRow
            name="search"
            labelText="Search"
            value={search}
            type="text"
            onChangeHandler={changeHandler}
          />
          {/*name , labelText, currValue, arrValue, onChangeHandler  */}
          <FormRowSelect
            name="searchStatus"
            labelText="Status of Job"
            currValue={searchStatus}
            arrValue={["all", ...statusOptions]}
            onChangeHandler={changeHandler}
          />
          <FormRowSelect
            name="searchType"
            labelText="Type of Job"
            currValue={searchType}
            arrValue={["all", ...jobTypeOptions]}
            onChangeHandler={changeHandler}
          />
          <FormRowSelect
            name="sort"
            labelText="Sort By Job"
            currValue={sort}
            arrValue={sortOptions}
            onChangeHandler={changeHandler}
          />
        </div>
        <div className="btn-block">
          <button
            className="btn btn-danger"
            onClick={(e) => {
              e.preventDefault();
              dispatch(allJobsAction.clearFilters());
            }}
          >
            CLEAR
          </button>
          <button className="btn" onClick={submitHandler}>
            SEARCH
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
