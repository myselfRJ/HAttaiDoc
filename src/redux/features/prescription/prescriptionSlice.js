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
  selectedDoctor: {},
  vitalsData: {},
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
} = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
