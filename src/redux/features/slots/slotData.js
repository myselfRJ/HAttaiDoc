import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  slots: {
    M: [],
    T: [],
    W: [],
    TH: [],
    F: [],
    Sa: [],
    Su: [],
  },
};

const slotDataSlice = createSlice({
  name: 'Slots',
  initialState,
  reducers: {
    addslots: (state, action) => {
      state.slots = action.payload;
    },
  },
});

export const addSlots = slotDataSlice.actions;

export const slotDataReducer = slotDataSlice.reducer;
