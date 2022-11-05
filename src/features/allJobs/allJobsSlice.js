import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, thunkAPI) => {
    const { page, search, searchStatus, searchType, sort } =
      thunkAPI.getState().currentJobsSlice;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    try {
      const res = await customFetch.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// get count of jobStatus + monthly
export const getStats = createAsyncThunk(
  "allJobs/getStats",
  async (_, thunkAPI) => {
    try {
      const res = await customFetch.get("/jobs/stats");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    changeHandler: (state, { payload }) => {
      const obj = Object.keys(payload)[0];
      const val = Object.values(payload)[0];
      state[obj] = val;
      state.page = 1;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      if (payload > 0 && payload <= state.numOfPages) {
        state.page = payload;
      }
    },
    clearAllJobsState: () => initialState,
  },
  extraReducers: {
    // STAGE #: getAllJobs
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
      // toast.info("Wait ...");
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
      state.totalJobs = payload.totalJobs;
      state.numOfPages = payload.numOfPages;
      // toast.success("Get Jobs OK");
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    // STAGE #: getStats
    [getStats.pending]: (state) => {
      state.isLoading = true;
      // toast.info("Wait ...");
    },
    [getStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
      // toast.success("Get Stats OK");
    },
    [getStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const allJobsAction = allJobsSlice.actions;
export const allJobsReducer = allJobsSlice.reducer;
