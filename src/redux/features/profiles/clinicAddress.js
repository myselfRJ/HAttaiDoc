import {createSlice} from '@reduxjs/toolkit';

const ClinicAddress = createSlice({
  name: 'address',
  initialState: {
    address: '',
    appointment_id: '',
  },
  reducers: {
    addAddress: (state, action) => {
      state.address = action.payload;
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
    addAppointmentID: (state, action) => {
      state.appointment_id = action.payload;
    },
  },
});

export const {addAddress, updateAddress, addAppointmentID} =
  ClinicAddress.actions;

export const addressReducer = ClinicAddress.reducer;
