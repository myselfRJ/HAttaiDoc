import {createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../../utility/constant';

const initialState = {
  allergies: [],
};

const allergiesSlice = createSlice({
  name: 'Allergies',
  initialState,
  reducers: {
    addAllergies: (state, action) => {
      state.allergies = action.payload;
    },
    updateAllergies: (state, action) => {
      state.allergies = action.payload;
    },
  },
});

export const {addAllergies, updateAllergies} = allergiesSlice.actions;

export const allergiesReducer = allergiesSlice.reducer;
