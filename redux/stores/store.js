import { configureStore } from '@reduxjs/toolkit';
import authenticateReducer from '../features/authenticate/authenticateSlice'
const store = configureStore({
    reducer: {
authenticate : authenticateReducer
    },
  })

  export default store;