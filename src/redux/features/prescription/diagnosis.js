import {createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../../utility/constant';

const initialState = {
  DiagnosisItems: [],
};

const diagnosisSlice = createSlice({
  name: 'Disgnosis',
  initialState,
  reducers: {
    addDiagnosis: (state, action) => {
      state.DiagnosisItems = action.payload;
      console.log('action.payload',action.payload);
    },
    updateDiagnosis: (state, action) => {
        state.DiagnosisItems = action.payload;
      },
  },
});

export const {addDiagnosis,updateDiagnosis}=diagnosisSlice.actions;

export const diagnosisReducer = diagnosisSlice.reducer;
