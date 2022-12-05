import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import activityReducer from './slices/activitySlice';
import authReducer from './slices/authSlice';
import confirmReducer from './slices/confirmSlice';
import loanReducer from './slices/loanSlice';
import receiptReducer from './slices/receiptSlice';
import shareReducer from './slices/shareSlice';
import thirdPartyReducer from './slices/thirdPartySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    confirm: confirmReducer,
    thirdParty: thirdPartyReducer,
    receipt: receiptReducer,
    share: shareReducer,
    activity: activityReducer,
    loan: loanReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
