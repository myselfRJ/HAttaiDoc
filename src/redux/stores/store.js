import { configureStore } from '@reduxjs/toolkit';
import authenticateReducer from '../features/authenticate/authenticateSlice';
import urlSlice from '../features/url/urlSlice';
const store = configureStore({
    reducer: {
authenticate : authenticateReducer,
url:urlSlice
    },
  })

  export default store;