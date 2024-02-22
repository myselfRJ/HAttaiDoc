import {configureStore} from '@reduxjs/toolkit';
import authenticateReducer from '../features/authenticate/authenticateSlice';
import urlSlice from '../features/url/urlSlice';
import {followUpReducer} from '../features/prescription/Followupslice';
import prescribeReducer from '../features/prescription/prescribeslice';
import symptomsReducer from '../features/prescription/symptomslice';
import prescriptionReducer from '../features/prescription/prescriptionSlice';
import {slotDataReducer} from '../features/slots/slotData';
import {phoneReducer} from '../features/authenticate/PhoneNumber';
import {patientDataReducer} from '../features/patient/patientslice';
import {doctor_profileReducer} from '../features/profiles/doctorprofile';
import {prescribeReducer1} from '../features/prescription/prescr';
import {clinic_data_Reducer} from '../features/profiles/clinicData';
import {Login_phone_Reducer} from '../features/phoneNumber/LoginPhoneNumber';
import {AbhaReducer} from '../features/Abha/AbhaAccesToken';
import {clinic_users_Reducer} from '../features/profiles/ClinicUsers';
import {clinic_id_Reducer} from '../features/profiles/clinicId';
import {headerDataReducer} from '../features/headerProgress/headerProgress';
import {diagnosisReducer} from '../features/prescription/diagnosis';
import {commorbitiesReducer} from '../features/prescription/commorbities';
import {allergiesReducer} from '../features/prescription/allergies';
import {labReportReducer} from '../features/prescription/labreport';
import {pastHistoryReducer} from '../features/prescription/pastHistory';
import {validityReducer} from '../features/prescription/valid';
import {signatureReducer} from '../features/prescription/sign';
import {addressReducer} from '../features/profiles/clinicAddress';
import {refreshReducer} from '../features/refreshApis/refreshApi';

const store = configureStore({
  reducer: {
    authenticate: authenticateReducer,
    url: urlSlice,
    prescription: prescriptionReducer,
    dateTime: followUpReducer,
    symptoms: symptomsReducer,
    prescribe: prescribeReducer,
    slotsData: slotDataReducer,
    patient: patientDataReducer,
    doctor_profile: doctor_profileReducer,
    pres: prescribeReducer1,
    clinic: clinic_data_Reducer,
    phone: Login_phone_Reducer,
    clinic_users: clinic_users_Reducer,
    abha: AbhaReducer,
    clinicid: clinic_id_Reducer,
    progress: headerDataReducer,
    diagnosis: diagnosisReducer,
    commorbities: commorbitiesReducer,
    allergies: allergiesReducer,
    labreport: labReportReducer,
    pasthistory: pastHistoryReducer,
    valid: validityReducer,
    sign: signatureReducer,
    address: addressReducer,
    refreshApi: refreshReducer,
  },
});

export default store;
