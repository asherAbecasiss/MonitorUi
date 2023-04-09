import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPs = createAsyncThunk(
  "getPs",
  async (object, { getState, rejectWithValue }) => {
    console.log(getState());
    
    try {
      const { data } = await axios.get(
        "http://localhost:8081/getPs"
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const PsSlice = createSlice({
  name: "ps",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [getPs.pending]: (state, action) => {
      state.loading = true;
    },
    [getPs.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getPs.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default PsSlice;