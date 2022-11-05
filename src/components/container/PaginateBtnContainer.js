import React from "react";
import Wrapper from "../../assets/wrappers/PageBtnContainer";
import {
  MdKeyboardArrowLeft as LeftIcon,
  MdKeyboardArrowRight as RightIcon,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { allJobsAction, getAllJobs } from "../../features/allJobs/allJobsSlice";
const PaginateBtnContainer = () => {
  // Initial
  const dispatch = useDispatch();
  const { numOfPages, page: currPage } = useSelector(
    (state) => state.currentJobsSlice
  );
  const pagesArr = Array.from({ length: numOfPages }, (_, index) => index + 1);
  // FUNC
  const prevBtnHandler = () => {
    if (currPage === 1) return;
    dispatch(allJobsAction.changePage(currPage - 1));
    dispatch(getAllJobs());
  };
  const nextBtnHandler = () => {
    if (currPage === numOfPages) return;
    dispatch(allJobsAction.changePage(currPage + 1));
    dispatch(getAllJobs());
  };

  // MAIN
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevBtnHandler}>
        <LeftIcon />
        Previous
      </button>
      <div className="btn-container">
        {pagesArr.map((pageNum) => {
          return (
            <button
              type="button"
              key={pageNum}
              className={pageNum === currPage ? "pageBtn active" : "pageBtn"}
              onClick={() => {
                dispatch(allJobsAction.changePage(pageNum));
                dispatch(getAllJobs());
              }}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextBtnHandler}>
        Next
        <RightIcon />
      </button>
    </Wrapper>
  );
};

export default PaginateBtnContainer;
