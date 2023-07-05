import { configureStore } from '@reduxjs/toolkit';
import authenticateReducer from '../features/authenticate/authenticateSlice';
import urlSlice from '../features/url/urlSlice';
import prescriptionReducer from '../features/prescription/prescriptionSlice'; 
const store = configureStore({
    reducer: {
authenticate : authenticateReducer,
url:urlSlice,
prescription:prescriptionReducer,
    },
  })

  export default store;