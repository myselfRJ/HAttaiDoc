import {createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../../utility/constant';

const initialState = {
  prescribeItems: [
    {
      modes: CONSTANTS.modes,
      medicine: null,
      mode: null,
      selectedMedicine: null,
      dose_quantity: null,
      timing: null,
      frequency: null,
      dose_number: '',
      recommdations: CONSTANTS.medicine_recomendation,
      mg: CONSTANTS.dose,
      timings: CONSTANTS.timing,
      frequencys: CONSTANTS.frequency,
      total_quantity: '100',
      duration: '',
    },
  ],
};

const prescribeSlice = createSlice({
  name: 'prescribe',
  initialState,
  reducers: {
    addPrescribe: (state, action) => {
      // state.prescribeItems.push(action.payload);
      state.prescribeItems = action.payload;
    },
    deletePrescribe: state => {
      state.prescribeItems.splice(state.prescribeItems.length - 1, 1);
    },
    updatePrescribe: (state, action) => {
      const {index, field, value} = action.payload;
      state.prescribeItems[index][field] = value;
    },
    setMode: (state, action) => {
      state.prescribeItems[0].mode = action.payload;
    },
    setMedicine: (state, action) => {
      state.prescribeItems[0].medicine = action.payload;
    },
    setSelectedMedicine: (state, action) => {
      state.prescribeItems[0].selectedMedicine = action.payload;
    },
    setSelectedMg: (state, action) => {
      state.prescribeItems[0].dose_quantity = action.payload;
    },
    setSelectedTime: (state, action) => {
      state.prescribeItems[0].timing = action.payload;
    },
    toggleFrequency: (state, action) => {
      const index = state.prescribeItems[0].frequency.indexOf(action.payload);
      if (index !== -1) {
        state.prescribeItems[0].frequency.splice(index, 1);
      } else {
        state.prescribeItems[0].frequency.push(action.payload);
      }
      state.prescribeItems[0].frequency =
        state.prescribeItems[0].frequency.join(',');
    },
    setTab: (state, action) => {
      state.prescribeItems[0].dose_number = action.payload;
    },
    setDuration: (state, action) => {
      state.prescribeItems[0].duration = action.payload;
    },
  },
});

export const {
  addPrescribe,
  updatePrescribe,
  deletePrescribe,
  setMode,
  setMedicine,
  setSelectedMedicine,
  setSelectedMg,
  setSelectedTime,
  toggleFrequency,
  setTab,
  setDuration,
} = prescribeSlice.actions;

export const mode = state => state.prescribe.prescribeItems[0].mode;
export const medicine = state => state.prescribe.prescribeItems[0].medicine;
export const dose_number = state =>
  state.prescribe.prescribeItems[0].dose_number;
export const dose_quantity = state =>
  state.prescribe.prescribeItems[0].dose_quantity;
export const timing = state => state.prescribe.prescribeItems[0].timing;
export const frequency = state => state.prescribe.prescribeItems[0].frequency;
export const duration = state => state.prescribe.prescribeItems[0].duration;
export const total_quantity = state =>
  state.prescribe.prescribeItems[0].total_quantity;

export default prescribeSlice.reducer;
