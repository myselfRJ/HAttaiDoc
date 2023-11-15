import {createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../../utility/constant';

const initialState = {
  commorbitiesItems: [],
};

const commorbitiesSlice = createSlice({
  name: 'commorbities',
  initialState,
  reducers: {
    addCommorbities: (state, action) => {
      state.commorbitiesItems = action.payload;
    },
    updateCommorbities: (state, action) => {
        state.commorbitiesItems = action.payload;
      },
  },
});

export const {addCommorbities,updateCommorbities}=commorbitiesSlice.actions;

export const commorbitiesReducer = commorbitiesSlice.reducer;
