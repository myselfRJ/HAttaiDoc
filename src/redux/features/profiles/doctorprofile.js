import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  doctor_profile: {},
};

const doctor_profile_Slice = createSlice({
  name: 'doctor_profile',
  initialState,
  reducers: {
    addDoctor_profile: (state, action) => {
      state.doctor_profile = action.payload;
    },
  },
});

export const addDoctor_profile = doctor_profile_Slice.actions;
export const doctor_profileReducer = doctor_profile_Slice.reducer;
