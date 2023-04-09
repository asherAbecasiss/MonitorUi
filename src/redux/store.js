import { configureStore } from "@reduxjs/toolkit";

import loremSlice from "./reducers/loremSlice";
import IpSlice from "./reducers/IpSlice";
import MemorySlice from "./reducers/MemorySlice";
import HostInfoSlice from "./reducers/HostInfoSlice";
import PsSlice from "./reducers/PsSlice";
import DockerStatsSlice from "./reducers/DockerStatsSlice";
import FsSlice from "./reducers/FsSlice";
const store = configureStore({
  reducer: {
    // lorem: loremSlice.reducer,
    // ip: IpSlice.reducer,
    // memory: MemorySlice.reducer,
    info: HostInfoSlice.reducer,
    ps: PsSlice.reducer,
    stats: DockerStatsSlice.reducer,
    fs: FsSlice.reducer,
  },
});

export default store;
