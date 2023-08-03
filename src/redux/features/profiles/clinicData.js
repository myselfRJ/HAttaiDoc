import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  clinic_data: {},
};

const clinic_data_Slice = createSlice({
  name: 'clinic_data',
  initialState,
  reducers: {
    addclinic_data: (state, action) => {
      state.clinic_data = action.payload;
    },
  },
});

export const addclinic_data = clinic_data_Slice.actions;
export const clinic_data_Reducer = clinic_data_Slice.reducer;
