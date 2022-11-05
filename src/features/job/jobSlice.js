import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getAllJobs } from "../allJobs/allJobsSlice";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  statusOptions: ["interview", "declined", "pending"],
  currentStatus: "pending",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  currentJobType: "remote",
  isEditing: false,
  editJobId: "",
};

export const addJobRequest = createAsyncThunk(
  "job/createJob",
  async (jobData, thunkAPI) => {
    try {
      const res = await customFetch.post("/jobs", jobData);
      // After add, clear field
      thunkAPI.dispatch(jobSlice.actions.clearValueHandler());
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteJobsRequest = createAsyncThunk(
  "job/deleteJobs",
  async (id, thunkAPI) => {
    try {
      const res = await customFetch.delete(`/jobs/${id}`);
      thunkAPI.dispatch(getAllJobs());
      thunkAPI.fulfillWithValue(res.data.msg);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateJobsRequest = createAsyncThunk(
  "job/updateJobs",
  async (jobData, thunkAPI) => {
    try {
      const res = await customFetch.patch(
        `/jobs/${jobData.editJobId}`,
        jobData
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    changeHandler: (state, { payload }) => {
      console.log(payload);
      const key = Object.keys(payload)[0];
      const val = Object.values(payload)[0];
      state[key] = val;
    },
    clearValueHandler: () => {
      return initialState;
    },
    setEditJobData: (state, { payload }) => {
      console.log(payload);
      // Catch current data of _id from payload to State
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: {
    // STAGE # : addJobRequest
    [addJobRequest.pending]: (state) => {
      state.isLoading = true;
      toast.info("Progress ...");
    },
    [addJobRequest.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job Created");
    },
    [addJobRequest.rejected]: (state, { payload }) => {
      state.isLoading = false;
      // Catch from 'throw-rejectwithValue'
      toast.error(payload);
    },
    // STAGE # : deleteJobsRequest
    [deleteJobsRequest.fulfilled]: (state, { payload }) => {
      // Catch from 'throw-rejectwithValue'
      console.log(payload);
      toast.success(payload.msg);
    },
    [deleteJobsRequest.rejected]: (state, { payload }) => {
      // Catch from 'throw-rejectwithValue'
      toast.error(payload);
    },
    // STAGE # : updateJobsRequest
    [updateJobsRequest.pending]: (state) => {
      state.isLoading = true;
      toast.info("Processing ...");
    },
    [updateJobsRequest.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job Updated");
    },
    [updateJobsRequest.rejected]: (state, { payload }) => {
      state.isLoading = false;
      // Catch from 'throw-rejectwithValue'
      toast.error(payload);
    },
  },
});

export const jobReducer = jobSlice.reducer;
export const jobAction = jobSlice.actions;
