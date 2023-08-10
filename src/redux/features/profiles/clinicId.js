import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  clinic_id: '',
  clinic_name:'',
  clinic_Address:''

};

const clinic_id_Slice = createSlice({
  name: 'clinic_id',
  initialState,
  reducers: {
    addclinic_id: (state, action) => {
      state.clinic_id = action.payload;
    },
    addclinic_name: (state, action) => {
      state.clinic_name = action.payload;
    },
    addclinic_Address: (state, action) => {
      state.clinic_Address = action.payload;
    },
  },
});

export const {addclinic_id,addclinic_name,addclinic_Address} = clinic_id_Slice.actions;
export const clinic_id_Reducer = clinic_id_Slice.reducer;
