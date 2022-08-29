import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  snackbarOpen?: boolean;
  snackbarType?: string;
  snackbarMessage?: string;
}

const initialState: IInitialState = {
  snackbarOpen: false,
  snackbarType: 'success',
  snackbarMessage: '',
};

export const snackmenu = createSlice({
  name: 'Snackbar',
  initialState,
  reducers: {
    setSnackbar: (
      state,
      {
        payload,
      }: PayloadAction<{
        snackbarOpen?: boolean;
        snackbarType?: string;
        snackbarMessage?: string;
      }>,
    ) => {
      state.snackbarOpen = payload.snackbarOpen;
      state.snackbarType = payload.snackbarType;
      state.snackbarMessage = payload.snackbarMessage;
    },
  },
});

export const { setSnackbar } = snackmenu.actions;

export default snackmenu.reducer;
