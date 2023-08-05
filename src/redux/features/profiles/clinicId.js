import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  clinic_id: {},
};

const clinic_id_Slice = createSlice({
  name: 'clinic_id',
  initialState,
  reducers: {
    addclinic_id: (state, action) => {
      state.clinic_id = action.payload;
    },
  },
});

export const addclinic_id = clinic_id_Slice.actions;
export const clinic_id_Reducer = clinic_id_Slice.reducer;