import { configureStore } from '@reduxjs/toolkit';
import postSlice from './Slice/postSlice';
import snackbarReducer from './Slice/snackbar';
import toggleSlice from './Slice/toggleMenu';

const store = configureStore({
  reducer: {
    toggleSlice,
    postSlice,
    snackbar: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
