import {createSlice} from '@reduxjs/toolkit';

let RefreshApiVariable = createSlice({
  name: 'refresh',
  initialState: {
    appointment: '',
  },
  reducers: {
    refreshAppointment: (state, action) => {
      state.appointment = action.payload;
    },
  },
});

export let {refreshAppointment} = RefreshApiVariable.actions;

export let refreshReducer = RefreshApiVariable.reducer;
