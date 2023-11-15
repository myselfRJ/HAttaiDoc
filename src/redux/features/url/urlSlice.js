import {createSlice} from '@reduxjs/toolkit';

let initialState = {url: null};

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    urlupdate: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const urlActions = urlSlice.actions;
export default urlSlice.reducer;
