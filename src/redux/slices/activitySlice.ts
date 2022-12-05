import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Saving } from "../../types/saving";

export type LoggedStatus = "loggedIn" | "loggedOut";

export interface ActivityState {
  inactivityTimeStamp?: number;
}

let initState: ActivityState = {};
export const activitySlice = createSlice({
  name: "activity",
  initialState: initState,

  reducers: {
    setTime: (state) => {
      return {
        ...state,
        inactivityTimeStamp: Date.now(),
      };
    },

    clearTime: (state) => {
      return {
        ...state,
        inactivityTimeStamp: undefined,
      };
    },
  },
});

export const { setTime, clearTime } = activitySlice.actions;

const activityReducer = activitySlice.reducer;

export default activityReducer;
