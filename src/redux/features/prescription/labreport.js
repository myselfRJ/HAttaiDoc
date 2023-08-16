import {createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../../utility/constant';

const initialState = {
  labReport: [],
};

const labReportSlice = createSlice({
  name: 'labReport',
  initialState,
  reducers: {
    addLabReport: (state, action) => {
      state.labReport = action.payload;
      console.log('action.payload',action.payload);
    },
    updateLabReport: (state, action) => {
        state.labReport = action.payload;
      },
  },
});

export const {addLabReport,updateLabReport}=labReportSlice.actions;

export const labReportReducer =labReportSlice.reducer;
