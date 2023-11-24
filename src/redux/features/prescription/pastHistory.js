import {createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../../utility/constant';

const initialState = {
  commorbidities: [],
  hospitalization: '',
  socialHistory: [],
  familyHistory: [],
  medicationHistory: '',
  menstrualHistory: [],
  obstericHistory: '',
};

const pastHistorySlice = createSlice({
  name: 'pastHistory',
  initialState,
  reducers: {
    addcommorbiditis: (state, action) => {
      state.commorbidities = action.payload;
    },
    updatecommorbidities: (state, action) => {
      state.commorbidities = action.payload;
    },
    addpastHospitalization: (state, action) => {
      state.hospitalization = action.payload;
    },
    updatepastHospitalization: (state, action) => {
      state.hospitalization = action.payload;
    },
    addsocialHistory: (state, action) => {
      state.socialHistory = action.payload;
    },
    updatesocialHistory: (state, action) => {
      state.socialHistory = action.payload;
    },
    addfamilyHistory: (state, action) => {
      state.familyHistory = action.payload;
    },
    updatefamilyHistory: (state, action) => {
      state.familyHistory = action.payload;
    },
    addmedicationHistory: (state, action) => {
      state.medicationHistory = action.payload;
    },
    updatemedicationHistory: (state, action) => {
      state.medicationHistory = action.payload;
    },
    addmenstrualHistory: (state, action) => {
      state.menstrualHistory = action.payload;
    },
    updatemenstrualHistory: (state, action) => {
      state.menstrualHistory = action.payload;
    },
    addobstericHistory: (state, action) => {
      state.obstericHistory = action.payload;
    },
    updateobstericHistory: (state, action) => {
      state.obstericHistory = action.payload;
    },
  },
});

export const {
  addcommorbiditis,
  addfamilyHistory,
  addmedicationHistory,
  addmenstrualHistory,
  addobstericHistory,
  addpastHospitalization,
  addsocialHistory,
  updatecommorbidities,
  updatefamilyHistory,
  updatemedicationHistory,
  updatemenstrualHistory,
  updateobstericHistory,
  updatepastHospitalization,
  updatesocialHistory,
} = pastHistorySlice.actions;

export const pastHistoryReducer = pastHistorySlice.reducer;
