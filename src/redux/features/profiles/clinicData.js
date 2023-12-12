// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {
//   clinics: [],
// };

// const clinic_data_Slice = createSlice({
//   name: 'clinic_data',
//   initialState,
//   reducers: {
//     addclinic_data: (state, action) => {
//       state.clinics = [...state.clinics, action.payload];
//     },
//     updateclinics: (state, action) => {
//       state.clinics = action.payload;
//     },
//   },
// });

// export const {addclinic_data, updateclinics} = clinic_data_Slice.actions;
// export const clinic_data_Reducer = clinic_data_Slice.reducer;
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  clinics: [],
};

const clinic_data_Slice = createSlice({
  name: 'clinic_data',
  initialState,
  reducers: {
    addclinic_data: (state, action) => {
      // state.clinics = [...state.clinics, action.payload];
      state.clinics = action.payload;
    },
    updateclinics: (state, action) => {
      state.clinics = action.payload;
      // const {index, updatedClinic} = action.payload;
      // state.clinics[index] = {...state.clinics[index], ...updatedClinic};
    },
    deleteclinics: (state, action) => {
      state.clinics = action.payload;
    },
  },
});

export const {addclinic_data, updateclinics, deleteclinics} =
  clinic_data_Slice.actions;
export const clinic_data_Reducer = clinic_data_Slice.reducer;
