// const baseUrl = 'http://10.9.78.38:8000/api/v1/';
const baseUrl = 'http://34.205.77.155/api/v1/';
export const URL = {
  generateOtp: `${baseUrl}doctor-authenticate/generate-otp`,
  validateOtp: `${baseUrl}doctor-authenticate/validate-otp`,
  profileUrl: `${baseUrl}practioner/practitoner-save`,
  get_all_appointments_of_clinic: `${baseUrl}customappointment/get/appointment/`,
  Appointment_Booking: `${baseUrl}customappointment/book-appointment/`,
  SlotsAvailable: clinicId => `${baseUrl}clinic/get-slot/${clinicId}/`,
  addclinic: `${baseUrl}clinic/clinic-save`,
  adduser: `${baseUrl}customuser/create-user/`,
  addPatient: `${baseUrl}custompatient/savepatient/`,
  getPatientByClinic: clinicId =>
    `${baseUrl}customappointment/get-patients/${clinicId}/`,
  getPatientByNumber: phoneId => `${baseUrl}custompatient/${phoneId}`,
  getPatientsAll: `${baseUrl}custompatient/allPatients`,
  getClinic: phoneId =>
    `${baseUrl}clinic/get/clinic/?doctor_phone_number=${phoneId}`,
  getPractitionerByNumber: phoneId =>
    `${baseUrl}practioner/practioner/?doctor_phone_number=${phoneId}`,
  savePrescription: `${baseUrl}consult/savePrescription`,
  getUserByNumber: phoneId => `${baseUrl}customuser/${phoneId}`,
  getInitScreen: `${baseUrl}practioner/init`,
  getUsers: phoneId =>
    `${baseUrl}customuser/getUsers/?doctor_phone_number=${phoneId}`,
  getConsultationByPatientPhone: phoneId =>
    `${baseUrl}consult/pres?patient_phone_number=${phoneId}`,
  AbhaGatewayAuth: 'https://dev.abdm.gov.in/gateway/v0.5/sessions',
  AbhaAadhargenerateOtp:
    'https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/generateOtp',
  AbhaVerifyAadharOtp:
    'https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/verifyOTP',
  AbhaGenerateMobileOtp:
    'https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/generateMobileOTP',
  AbhaMobileVerifyOtp:
    'https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/verifyMobileOTP',
  CreateAbhaAccount:
    'https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/createHealthIdWithPreVerified',
  AbhaExitsMobileGetOtp:
    'https://healthidsbx.abdm.gov.in/api/v2/registration/mobile/login/generateOtp',
  AbhaEsistsValIdateOtp:
    'https://healthidsbx.abdm.gov.in/api//v2/registration/mobile/login/verifyOtp',
  AbhaExistsGetUserToken:
    'https://healthidsbx.abdm.gov.in/api/v2/registration/mobile/login/userAuthorizedToken',
  AbhaExistsGetProfile:
    'https://healthidsbx.abdm.gov.in/api//v1/account/profile',
};
