import {createSlice} from '@reduxjs/toolkit';

const dateTimeSlice = createSlice({
  name: 'dateTime',
  initialState: {
    date: new Date().toISOString(),
    open: false,
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const {setDate, setOpen} = dateTimeSlice.actions;

export const getDate = state => state.dateTime.date;
export default dateTimeSlice.reducer;
