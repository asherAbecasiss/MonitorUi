import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getIp = createAsyncThunk(
  "getIp",
  async (object, { getState, rejectWithValue }) => {
    console.log(getState());
    
    try {
      const { data } = await axios.get(
        "http://10.100.102.85:8081/getLocalIp"
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const IpSlice = createSlice({
  name: "ip",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [getIp.pending]: (state, action) => {
      state.loading = true;
    },
    [getIp.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getIp.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default IpSlice;