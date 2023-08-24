import {createSlice} from '@reduxjs/toolkit';

const dateTime = createSlice({
  name: 'date',
  initialState: {
    date: '',
  },
  reducers: {
    addValid: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const {addValid} = dateTime.actions;

export const validityReducer = dateTime.reducer;
