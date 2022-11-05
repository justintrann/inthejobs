import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import {
  addUserInfo,
  getUserInfo,
  removeUserInfo,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  sidebarShow: false,
  user: getUserInfo(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const res = await customFetch.post("/auth/register", user);
      return res.data;
    } catch (error) {
      const tmp = thunkAPI.rejectWithValue(error.response.data.msg);
      console.log(tmp);
      return tmp;
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const res = await customFetch.post("/auth/login", user);
      // console.log(thunkAPI.getState().userSlice.user.token);
      return res.data;
    } catch (error) {
      // throw our error message to payload
      const tmp = thunkAPI.rejectWithValue(error.response.data.msg);
      console.log(tmp);
      return tmp;
      //   console.log(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const res = await customFetch.patch("/auth/updateUser", user);
      console.log(res);
      return res.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(userSlice.actions.logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
      }
      console.log(error.response);
      thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// FLAG : Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarShow = !state.sidebarShow;
    },
    logoutUser: (state) => {
      removeUserInfo();
      state.user = null;
    },
  },
  extraReducers: {
    // STAGE # REGISTER
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      toast.info("Wait for a second ...");
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const user = payload.user;
      state.user = user;
      addUserInfo(user);
      toast.success("Hello " + state.user.name);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.warning(payload);
    },
    // STAGE # LOGIN
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      toast.info("Wait for a second ...", { closeOnClick: true });
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const user = payload.user;
      state.user = user;
      addUserInfo(user);
      toast.success("Great to see you again, " + state.user.name);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.warning(payload);
    },
    // STAGE # : Update Data user
    [updateUser.pending]: (state) => {
      state.isLoading = true;
      toast.info("Wait for a second ...");
    },
    [updateUser.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const updatedUser = payload.payload.user;
      console.log(payload);
      state.user = updatedUser;
      addUserInfo(updatedUser);
      toast.success("Successfully");
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
      toast.warning(payload);
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
