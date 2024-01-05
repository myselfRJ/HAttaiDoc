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
    updatePrescribe1: (state, action) => {
      state.prescribeItems = action.payload;
    },
    updateIndexPrescribe: (state, action) => {
      const {index, updatedItem} = action.payload;
      state.prescribeItems[index] = updatedItem;
    },
  },
});

export const {addPrescribe, updatePrescribe1, updateIndexPrescribe} =
  prescribeSlice.actions;

export const prescribeReducer1 = prescribeSlice.reducer;
