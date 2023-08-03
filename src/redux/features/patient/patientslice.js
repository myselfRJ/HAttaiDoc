import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    name: '',
    gender: '',
    phone_number: '',
    birth_date: '',
    image: '',
  };
  
  const patientDataSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
      addPatient: (state, action) => {
        state.patient= action.payload;
      },
    },
  });
  
  export const addPatient = patientDataSlice.actions;
  
  export const patientDataReducer = patientDataSlice.reducer;