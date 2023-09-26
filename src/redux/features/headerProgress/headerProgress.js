import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  status: [
    {progressname: 'Profile', status: false},
    {progressname: 'Add Clinic', status: false},
    {progressname: 'Add User', status: false},
  ],
};

const hedaerSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    headerStatus: (state, action) => {
      state.status[action.payload.index].status = action.payload.status;
    },
    updateheaderStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {headerStatus, updateheaderStatus} = hedaerSlice.actions;

export const headerDataReducer = hedaerSlice.reducer;
