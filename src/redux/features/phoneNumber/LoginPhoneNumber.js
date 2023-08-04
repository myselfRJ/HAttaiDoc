import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  phone: {},
};

const Login_Phone_Slice = createSlice({
  name: 'Login_phone',
  initialState,
  reducers: {
    addLogin_phone: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export const addLogin_phone = Login_Phone_Slice.actions;
export const Login_phone_Reducer = Login_Phone_Slice.reducer;
