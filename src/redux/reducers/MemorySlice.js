import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMemory = createAsyncThunk(
  "getMemory",
  async (object, { getState, rejectWithValue }) => {
    console.log(getState());
    
    try {
      const { data } = await axios.get(
        "http://10.100.102.85:8081/getMemoryUsage"
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const MemorySlice = createSlice({
  name: "memory",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [getMemory.pending]: (state, action) => {
      state.loading = true;
    },
    [getMemory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getMemory.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default MemorySlice;