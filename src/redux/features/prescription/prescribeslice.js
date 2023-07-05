import {createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../../utility/constant';

const initialState = {
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
};

const prescribeSlice = createSlice({
  name: 'prescribe',
  initialState,
  reducers: {
    setMode(state, action) {
      state.selectedMode = action.payload;
    },
    setMedicine(state, action) {
      state.medicine = action.payload;
    },
    setSelectedMedicine(state, action) {
      state.selectedMedicine = action.payload;
    },
    setSelectedMg(state, action) {
      state.selectedMg = action.payload;
    },
    setSelectedTime(state, action) {
      state.selectedTime = action.payload;
    },
    toggleFrequency(state, action) {
      const index = state.selectedFrequency.indexOf(action.payload);
      if (index !== -1) {
        state.selectedFrequency.splice(index, 1);
      } else {
        state.selectedFrequency.push(action.payload);
      }
    },
    setTab(state, action) {
      state.tab = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
  },
});

export const {
  setMode,
  setMedicine,
  setSelectedMedicine,
  setSelectedMg,
  setSelectedTime,
  toggleFrequency,
  setTab,
  setDuration,
} = prescribeSlice.actions;

export default prescribeSlice.reducer;
