import {createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../../utility/constant';

const initialState = {
  prescribeItems: [],
};

const prescribeSlice = createSlice({
  name: 'prescribe',
  initialState,
  reducers: {
    addPrescribe: (state, action) => {
      // state.prescribeItems.push(action.payload);
      state.prescribeItems = action.payload;
    },
    deletePrescribe: state => {
      state.prescribeItems.splice(state.prescribeItems.length - 1, 1);
    },
    updatePrescribe1: (state, action) => {
      state.prescribeItems = action.payload;
    },
  },
});

export const {addPrescribe, updatePrescribe1, deletePrescribe} =
  prescribeSlice.actions;

export const prescribeReducer1 = prescribeSlice.reducer;
