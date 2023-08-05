import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data:{
  phone: '',
  trace_id:''}
};

const Login_Phone_Slice = createSlice({
  name: 'Login_phone',
  initialState,
  reducers: {
    addLogin_phone: (state, action) => {
      state.data= action.payload;
      console.log("state",state)
      console.log(initialState)
 
    },
  },
});

export const addLogin_phone = Login_Phone_Slice.actions;
export const Login_phone_Reducer = Login_Phone_Slice.reducer;
