import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  adult: [],
};
const AdultSlice = createSlice({
  name: 'Adult',
  initialState,
  reducers: {
    addAdult: (state, action) => {
      state.adult = action.payload;
    },
    updateAdult: (state, action) => {
      state.adult = action.payload;
    },
  },
});
export const {addAdult, updateAdult} = AdultSlice.actions;
export const AdultReducer = AdultSlice.reducer;
