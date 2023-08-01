import {configureStore} from '@reduxjs/toolkit';
import authenticateReducer from '../features/authenticate/authenticateSlice';
import urlSlice from '../features/url/urlSlice';
import dateTimeSlice from '../features/prescription/Followupslice';
import prescribeReducer from '../features/prescription/prescribeslice';
import symptomsReducer from '../features/prescription/symptomslice';
import prescriptionReducer from '../features/prescription/prescriptionSlice';
import {slotDataReducer} from '../features/slots/slotData';
import {phoneReducer} from '../features/authenticate/PhoneNumber';
const store = configureStore({
  reducer: {
    authenticate: authenticateReducer,
    url: urlSlice,
    prescription: prescriptionReducer,
    dateTime: dateTimeSlice,
    symptoms: symptomsReducer,
    prescribe: prescribeReducer,
    slotsData: slotDataReducer,
    phone: phoneReducer,
  },
});

export default store;
