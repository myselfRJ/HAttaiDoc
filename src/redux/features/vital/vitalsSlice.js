import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  vitalsData: [
    { pulse_rate: '', weight: '', height: '', temp: '', rate: '', bmi: '', diastolic_bp: '', systolic_bp: '', lmp_edd: '', us_edd: '' }
  ]
};
const vitalsSlice = createSlice({
  name: 'vitals',
  initialState,
  reducers: {
    updatePulseRate: (state, action) => {
      const { index, text } = action.payload;
      state.vitalsData[index].pulse_rate = text;
    },
    updateWeight: (state, action) => {
      const { index, text } = action.payload;
      state.vitalsData[index].weight = text;
    },
    updateHeight: (state, action) => {
      const { index, text } = action.payload;
      state.vitalsData[index].height = text;
    },
    updateTemp: (state, action) => {
      const { index, text } = action.payload;
      state.vitalsData[index].temp = text;
    },
    updateRate: (state, action) => {
      const { index, text } = action.payload;
      state.vitalsData[index].rate = text;
    },
    updateBMI: (state, action) => {
      const { index, text } = action.payload;
      state.vitalsData[index].bmi = text;
    },
    updateDiastolicBP: (state, action) => {
      const { index, text } = action.payload;
      state.vitalsData[index].diastolic_bp = text;
    },
    updateSystolicBP: (state, action) => {
      const { index, text } = action.payload;
      state.vitalsData[index].systolic_bp = text;
    },
    updateLMPEdd: (state, action) => {
      const { index, text } = action.payload;
      state.vitalsData[index].lmp_edd = text;
    },
    updateUSEdd: (state, action) => {
      const { index, text } = action.payload;
      state.vitalsData[index].us_edd = text;
    },
  },
});

export const {
  updatePulseRate,
  updateWeight,
  updateHeight,
  updateTemp,
  updateRate,
  updateBMI,
  updateDiastolicBP,
  updateSystolicBP,
  updateLMPEdd,
  updateUSEdd,
} = vitalsSlice.actions;
export const selectVitalsData = state => state.vitals;

export default vitalsSlice.reducer;
