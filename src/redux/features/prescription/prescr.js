import {createSlice, combineReducers} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../../utility/constant';

const symptomsInitialState = [{symptom: '', days: '', severity: ''}];

const prescribeInitialState = {
  modes: CONSTANTS.modes,
  medicine: null,
  selectedMode: null,
  selectedMedicine: null,
  selectedMg: null,
  selectedTime: null,
  selectedFrequency: CONSTANTS.frequency,
  tab: '',
  recommdations: CONSTANTS.medicine_recomendation,
  mg: CONSTANTS.dose,
  timing: CONSTANTS.timing,
  frequency: CONSTANTS.frequency,
  quantity: '100',
  duration: '',
};

const dateTimeInitialState = {
  date: new Date(),
  open: false,
};

const symptomsSlice = createSlice({
  name: 'symptoms',
  initialState: symptomsInitialState,
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

const prescribeSlice = createSlice({
  name: 'prescribe',
  initialState: prescribeInitialState,
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

const dateTimeSlice = createSlice({
  name: 'dateTime',
  initialState: dateTimeInitialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

const rootReducer = combineReducers({
  symptoms: symptomsSlice.reducer,
  prescribe: prescribeSlice.reducer,
  dateTime: dateTimeSlice.reducer,
});

export const {addSymptom, deleteSymptom, updateSymptom} = symptomsSlice.actions;

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

export const {setDate, setOpen} = dateTimeSlice.actions;

export const getSymptoms = state => state.symptoms;
export const getPrescribe = state => state.prescribe;
export const getDateTime = state => state.dateTime.date;

export default rootReducer;
