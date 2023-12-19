import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {
    phone: '',
    trace_id: '',
  },
  fcmtoken: '',
};

const Login_Phone_Slice = createSlice({
  name: 'Login_phone',
  initialState,
  reducers: {
    addLogin_phone: (state, action) => {
      state.data = action.payload;
    },
    addFcmToken: (state, action) => {
      state.fcmtoken = action.payload;
    },
  },
});

export const {addLogin_phone, addFcmToken} = Login_Phone_Slice.actions;
export const Login_phone_Reducer = Login_Phone_Slice.reducer;
