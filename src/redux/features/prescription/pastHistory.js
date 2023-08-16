import {createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../../utility/constant';

const initialState = {
  pasthistory: [],
};

const pastHistorySlice = createSlice({
  name: 'pastHistory',
  initialState,
  reducers: {
    addpastHistory: (state, action) => {
      state.pasthistory = action.payload;
      console.log('action.payload',action.payload);
    },
    updatepastHistory: (state, action) => {
        state.pasthistory = action.payload;
      },
  },
});

export const {addpastHistory,updatepastHistory}=pastHistorySlice.actions;

export const pastHistoryReducer =pastHistorySlice.reducer;
