import { configureStore } from '@reduxjs/toolkit';
import groupReducer from './slices/groupSlice';
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    group: groupReducer,
    auth: authReducer,
    modal: modalReducer
  },
});

export type StoreType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
