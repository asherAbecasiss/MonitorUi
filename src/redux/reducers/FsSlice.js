import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getFs = createAsyncThunk(
  "getFs",
  async (object, { getState, rejectWithValue }) => {
    console.log("--->>>");
    const json = JSON.stringify({
      username: "s",
      ip: "23.123",
      pass: "123",
      path :object.path,
      isDir: object.isDir,
    });
    try {
      const { data } = await axios.post(
        "http://localhost:8089/PostFileSystem",
        json,
        {}
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const FsSlice = createSlice({
  name: "fs",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [getFs.pending]: (state, action) => {
      state.loading = true;
    },
    [getFs.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getFs.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default FsSlice;
