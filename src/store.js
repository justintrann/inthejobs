import { configureStore } from "@reduxjs/toolkit";
import { allJobsReducer } from "./features/allJobs/allJobsSlice";
import { jobReducer } from "./features/job/jobSlice";
import { userReducer } from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    userSlice: userReducer,
    jobSlice: jobReducer,
    currentJobsSlice: allJobsReducer,
  },
});

export default store;
