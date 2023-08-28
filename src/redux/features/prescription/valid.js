import {createSlice} from '@reduxjs/toolkit';

const dateTime = createSlice({
  name: 'date',
  initialState: {
    valid: '',
  },
  reducers: {
    addValid: (state, action) => {
      state.valid = action.payload;
    },
    updateValid: (state, action) => {
      state.valid = action.payload;
    },
  },
});

export const {addValid, updateValid} = dateTime.actions;

export const validityReducer = dateTime.reducer;
