import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getInfo = createAsyncThunk(
  "getInfo",
  async (object, { getState, rejectWithValue }) => {
    console.log(getState());
    
    try {
      const { data } = await axios.get(
        "http://localhost:8089/GetAgents"
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const HostInfoSlice = createSlice({
  name: "info",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [getInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [getInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getInfo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default HostInfoSlice;