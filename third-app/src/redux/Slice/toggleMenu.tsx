import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  toggle: boolean;
}

const initialState: IInitialState = {
  toggle: true,
};

export const toggleMenu = createSlice({
  name: 'Menu',
  initialState,
  reducers: {
    setToggleChange: (
      state,
      {
        payload,
      }: PayloadAction<{
        toggle: boolean;
      }>,
    ) => {
      state.toggle = payload.toggle;
    },
  },
});

export const { setToggleChange } = toggleMenu.actions;

export default toggleMenu.reducer;
