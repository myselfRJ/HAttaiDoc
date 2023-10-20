import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectedComplaint: '',
  note: '',
  doctors: [
    {
      doctor_name: 'Dr. Raju',
      speciality: 'Cardiologists',
      phone: '9878965678',
    },
    {
      doctor_name: 'Dr. Muthu',
      speciality: 'Gynecologist',
      phone: '9767342167',
    },
    {
      doctor_name: 'Dr. Chitti',
      speciality: 'Endocrinologist',
      phone: '9100765472',
    },
  ],
  selectedDoctor: [],
  vitalsData: {},
  physicalExamination: {},
  eaxminationFindings: {},
};

const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState,
  reducers: {
    addCheifComplaint: (state, action) => {
      state.selectedComplaint = action.payload;
    },
    UpadateCheifComplaint: (state, action) => {
      state.selectedComplaint = action.payload;
    },
    addNote: (state, action) => {
      state.note = action.payload;
    },
    UpdateNote: (state, action) => {
      state.note = action.payload;
    },
    addDoctorRefer: (state, action) => {
      state.selectedDoctor = action.payload;
    },
    UpdateDoctorRefer: (state, action) => {
      state.selectedDoctor = action.payload;
    },
    UpadteVitals: (state, action) => {
      state.vitalsData = action.payload;
    },
    addVitals: (state, action) => {
      state.vitalsData = action.payload;
    },
    UpadteExamination: (state, action) => {
      state.physicalExamination = action.payload;
    },
    addExamination: (state, action) => {
      state.physicalExamination = action.payload;
    },
    UpadteFindings: (state, action) => {
      state.eaxminationFindings = action.payload;
    },
    addFindings: (state, action) => {
      state.eaxminationFindings = action.payload;
    },
  },
});
export const {
  addCheifComplaint,
  addNote,
  addDoctorRefer,
  addVitals,
  UpadateCheifComplaint,
  UpdateDoctorRefer,
  UpdateNote,
  UpadteVitals,
  UpadteExamination,
  addExamination,
  UpadteFindings,
  addFindings,
} = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
