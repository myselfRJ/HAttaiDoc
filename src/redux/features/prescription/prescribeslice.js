import {createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../../utility/constant';

const initialState = {
  prescribeItems: [
    {
      modes: CONSTANTS.modes,
      medicine: null,
      selectedMode: null,
      selectedMedicine: null,
      selectedMg: null,
      selectedTime: null,
      selectedFrequency: [],
      tab: '',
      recommdations: CONSTANTS.medicine_recomendation,
      mg: CONSTANTS.dose,
      timing: CONSTANTS.timing,
      frequency: CONSTANTS.frequency,
      quantity: '100',
      duration: '',
      index: '',
    },
  ],
};

const prescribeSlice = createSlice({
  name: 'prescribe',
  initialState,
  reducers: {
    addPrescribe: (state, action) => {
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
      state.prescribeItems[0].selectedMode = action.payload;
    },
    setMedicine: (state, action) => {
      state.prescribeItems[0].medicine = action.payload;
    },
    setSelectedMedicine: (state, action) => {
      state.prescribeItems[0].medicine = action.payload;
    },
    setSelectedMg: (state, action) => {
      state.prescribeItems[0].selectedMg = action.payload;
    },
    setSelectedTime: (state, action) => {
      state.prescribeItems[0].selectedTime = action.payload;
    },
    toggleFrequency: (state, action) => {
      const index = state.prescribeItems[0].selectedFrequency.indexOf(
        action.payload,
      );
      if (index !== -1) {
        state.prescribeItems[0].selectedFrequency.splice(index, 1);
      } else {
        state.prescribeItems[0].selectedFrequency.push(action.payload);
      }
    },
    setTab: (state, action) => {
      state.prescribeItems[0].tab = action.payload;
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

export const selectedMode = state =>
  state.prescribe.prescribeItems[0].selectedMode;
export const medicine = state => state.prescribe.prescribeItems[0].medicine;
export const tab = state => state.prescribe.prescribeItems[0].tab;
export const selectedMg = state => state.prescribe.prescribeItems[0].selectedMg;
export const selectedTime = state =>
  state.prescribe.prescribeItems[0].selectedTime;
export const selectedFrequency = state =>
  state.prescribe.prescribeItems[0].selectedFrequency;
export const duration = state => state.prescribe.prescribeItems[0].duration;
export const quantity = state => state.prescribe.prescribeItems[0].quantity;

export default prescribeSlice.reducer;
