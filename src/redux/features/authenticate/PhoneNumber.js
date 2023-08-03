import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  phone_number: '',
};

const phoneSlice = createSlice({
  name: 'phone',
  initialState,
  reducers: {
    addPhone: (state, action) => {
      state.slots = action.payload;
    },
  },
});

export const addPhone = phoneSlice.actions;

export const phoneReducer = phoneSlice.reducer;
