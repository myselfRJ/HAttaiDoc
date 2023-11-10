// const baseUrl = 'http://10.9.64.61:8000/api/v1/';
// const baseUrl = 'http://10.9.64.23:8000/api/v1/';
// const baseUrl = 'http://34.205.77.155/api/v1/';
const baseUrl = 'http://13.200.15.208/api/v1/';
// const snomedUrl = 'http://34.205.77.155/';
const snomedUrl = 'http://13.200.15.208/';
export const fileurl = `http://10.9.64.61:8000`;
// export const fileurl = `http://13.200.15.208`;

// export const fileurl = `http://10.9.64.23:8000`;

// export const Host = '13.200.15.208';

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
  getPatientsAll: phoneId =>
    `${baseUrl}custompatient/allPatients?phone_number=${phoneId}`,
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
  getConsultationByAppointmentId: id => `${baseUrl}consult/byId?id=${id}`,
  updatevitlas: Id => `${baseUrl}consult/vi?id=${Id}`,
  updateComplaints: Id => `${baseUrl}consult/id?id=${Id}`,
  uploadPDF: `${baseUrl}consult/pd`,
  updateDoctorProfile: phoneId =>
    `${baseUrl}practioner/change?doctor_phone_number=${phoneId}`,
  snomed: (term, option) =>
    `${snomedUrl}csnoserv/api/search/suggest?term=${term}&state=active&semantictag=${encodeURIComponent(
      option,
    )}&acceptability=preferred&returnlimit=80`,
  get_clinics_slots: phoneId =>
    `${baseUrl}clinic/Clinic_slots?doctor_phone_number=${phoneId}`,
  get_clinic_slots_by_id: id => `${baseUrl}clinic/clinic_id?id=${id}`,
  update_clinic: id => `${baseUrl}clinic/update_clinic?id=${id}`,
  update_slots: id => `${baseUrl}clinic/update_slot?id=${id}`,
  delete_clinic_slot: id => `${baseUrl}clinic/delete_clinic?id=${id}`,
  update_clinic_user: id => `${baseUrl}customuser/update-user?id=${id}`,
  delete_clinic_user: id => `${baseUrl}customuser/delete-user?id=${id}`,
  get_clinic_user_by_id: id => `${baseUrl}customuser/getuser-id?id=${id}`,
  uploadExaminations: `${baseUrl}consult/exam`,
  uploadPhysicalExamination: `${baseUrl}consult/physical`,
  refer_doc_pdf: `${baseUrl}consult/refer`,
  upload_reports: `${baseUrl}consult/upload_document`,
  get_consultationPDF: id => `${baseUrl}consult/pdfbyId?id=${id}`,
  get_refer_pdf: id => `${baseUrl}consult/get-refer?id=${id}`,
  get_reports: id => `${baseUrl}consult/get-examination?id=${id}`,
  get_physical: id => `${baseUrl}consult/get-physical?id=${id}`,
  reschedule_appointment: id =>
    `${baseUrl}customappointment/reschedule_appointment?id=${id}`,
  get_reports: id => `${baseUrl}consult/get-examination?id=${id}`,
  getFees: id => `${baseUrl}consult/getFees?id=${id}`,
  updateFees: id => `${baseUrl}consult/updateFees?id=${id}`,
  savefees: `${baseUrl}consult/saveFees`,
  logout: `${baseUrl}doctor-authenticate/generate-otp/logout`,
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
