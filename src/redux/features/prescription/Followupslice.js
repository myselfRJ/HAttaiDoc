import {createSlice} from '@reduxjs/toolkit';

const dateTimeSlice = createSlice({
  name: 'date',
  initialState: {
    date: [],
  },
  reducers: {
    addDate: (state, action) => {
      state.date = action.payload;
    },
    updateDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const {addDate, updateDate} = dateTimeSlice.actions;

export const followUpReducer = dateTimeSlice.reducer;
