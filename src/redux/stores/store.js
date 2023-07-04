import {configureStore} from '@reduxjs/toolkit';
import authenticateReducer from '../features/authenticate/authenticateSlice';
import urlSlice from '../features/url/urlSlice';
import dateTimeSlice from '../features/prescription/Followupslice';
import prescribeReducer from '../features/prescription/prescribeslice';
import symptomsReducer from '../features/prescription/symptomslice';

const store = configureStore({
  reducer: {
    authenticate: authenticateReducer,
    url: urlSlice,
    dateTime: dateTimeSlice,
    symptoms: symptomsReducer,
    prescribe: prescribeReducer,
  },
});

export default store;
