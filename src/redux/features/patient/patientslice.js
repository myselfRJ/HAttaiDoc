import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    patient_data:{}
  };
  
  const patientDataSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
      addPatient: (state, action) => {
        state.patient_data= action.payload;
      },
    },
  });
  
  export const addPatient = patientDataSlice.actions;
  
  export const patientDataReducer = patientDataSlice.reducer;