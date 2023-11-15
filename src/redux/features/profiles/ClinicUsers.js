import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  clinic_users: [],
};

const clinic_users_data_Slice = createSlice({
  name: 'clinic_users_data',
  initialState,
  reducers: {
    addclinic_users: (state, action) => {
      state.clinic_users = [...state.clinic_users, action.payload];
    },
    updateclinic_users: (state, action) => {
      const {index, updatedUser} = action.payload;
      state.clinic_users[index] = {...state.clinic_users[index], ...updatedUser};
    },
  },
});

export const {addclinic_users, updateclinic_users} =
  clinic_users_data_Slice.actions;
export const clinic_users_Reducer = clinic_users_data_Slice.reducer;
