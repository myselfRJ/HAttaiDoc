import {createSlice} from '@reduxjs/toolkit';

const initialState = [{symptom: '', days: '', severity: ''}];

const symptomsSlice = createSlice({
  name: 'symptoms',
  initialState,
  reducers: {
    addSymptom: (state, action) => {
      state.push({symptom: '', days: '', severity: ''});
    },
    deleteSymptom: (state, action) => {
      state.splice(action.payload, 1);
    },
    updateSymptom: (state, action) => {
      const {index, field, value} = action.payload;
      state[index][field] = value;
    },
  },
});

export const {addSymptom, deleteSymptom, updateSymptom} = symptomsSlice.actions;

export const getSymptom = state => state.symptoms.symptom;
export const getDays = state => state.symptoms.days;
export const getSeverity = state => state.symptoms.severity;

export default symptomsSlice.reducer;
