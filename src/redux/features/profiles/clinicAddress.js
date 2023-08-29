import {createSlice} from '@reduxjs/toolkit';

const ClinicAddress = createSlice({
  name: 'address',
  initialState: {
    address: '',
  },
  reducers: {
    addAddress: (state, action) => {
      state.address = action.payload;
    },
    updateAddress: (state, action) => {
        state.address = action.payload;
      },
  },
});

export const {addAddress,updateAddress} = ClinicAddress.actions;

export const addressReducer = ClinicAddress.reducer;