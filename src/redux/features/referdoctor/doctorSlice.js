import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctors: [
    {
      name: 'Dr. Raju',
      speciality: 'Cardiologists',
      phone: '9878965678',
    },
    {
      name: 'Dr. Muthu',
      speciality: 'Gynecologist',
      phone: '9767342167',
    },
    {
      name: 'Dr. Chitti',
      speciality: 'Endocrinologist',
      phone: '91007654721',
    },
  ],
  selectedDoctor: null,
};

const referDoctorSlice = createSlice({
  name: 'referDoctor',
  initialState,
  reducers: {
    selectDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
  },
});

export const { selectDoctor } = referDoctorSlice.actions;

export default referDoctorSlice.reducer;
