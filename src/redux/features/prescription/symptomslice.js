import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  symptom: [{symptom: '', days: '', severity: '', uuid: '0001'}],
};

const symptomsSlice = createSlice({
  name: 'symptoms',
  initialState,
  reducers: {
    addSymptom: (state, action) => {
      console.log(action.payload, '===redux');
      state.symptom = action.payload;
    },
    deleteSymptom: state => {
      state.symptom.splice(state.symptom.length - 1, 1);
    },
    updateSymptom: (state, action) => {
      const {index, field, value} = action.payload;
      state.symptom[index][field] = value;
    },
  },
});

export const {addSymptom, deleteSymptom, updateSymptom} = symptomsSlice.actions;

export const getSymptom = state => state.symptoms.symptom;
export const getDays = state => state.symptoms.days;
export const getSeverity = state => state.symptoms.severity;

export default symptomsSlice.reducer;
