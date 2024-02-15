// const baseUrl = 'http://192.168.1.22:8000/api/v1/';
// const baseUrl = 'http://65.0.12.213/api/v1/';
const baseUrl = 'https://attai.healthattai.com/api/v1/';
// const baseUrl = 'http://13.200.15.208/api/v1/';
const snomedUrl = 'https://attai.healthattai.com/';
// export const fileurl = `http://192.168.1.22:8000`;
// export const fileurl = `http://65.0.12.213`;
export const fileurl = `https://attai.healthattai.com`;
// export const fileurl = `http://13.200.15.208`;

export const URL = {
  retriveTokens: `${baseUrl}retrivetokens`,
  generateOtp: `${baseUrl}doctor-authenticate/generate-otp`,
  validateOtp: `${baseUrl}doctor-authenticate/validate-otp`,
  profileUrl: `${baseUrl}practioner/practitoner-save`,
  get_all_appointments_of_clinic: `${baseUrl}customappointment/get/appointment/`,
  getAppointmentsInRange: (start, end, phone) =>
    `${baseUrl}customappointment/app?start_date=${start}&end_date=${end}&doctor_phone=${phone}`,
  getAppointmentsForStats: (start, end, phone) =>
    `${baseUrl}customappointment/range?start_date=${start}&end_date=${end}&doctor_phone=${phone}`,
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
  getUserByNumber: phoneId =>
    `${baseUrl}customuser/?user_phone_number=${phoneId}`,
  getInitScreen: `${baseUrl}practioner/init`,
  getUsers: phoneId =>
    `${baseUrl}customuser/getUsers/?doctor_phone_number=${phoneId}`,
  getConsultationByPatientPhone: (phoneId, doctorId) =>
    `${baseUrl}consult/pres?patient_phone_number=${phoneId}&doctor_phone_number=${doctorId}`,
  getConsultationByAppointmentId: id => `${baseUrl}consult/byId?id=${id}`,
  updatevitlas: Id => `${baseUrl}consult/vi?id=${Id}`,
  updateComplaints: Id => `${baseUrl}consult/id?id=${Id}`,
  uploadPDF: `${baseUrl}consult/pd`,
  updateDoctorProfile: phoneId =>
    `${baseUrl}practioner/change?doctor_phone_number=${phoneId}`,
  snomed: (term, option) =>
    `${snomedUrl}csnoserv/api/search/suggest?term=${term}&state=active&semantictag=${encodeURIComponent(
      option,
    )}&acceptability=synonyms&returnlimit=-1`,
  get_clinics_slots: phoneId =>
    `${baseUrl}clinic/Clinic_slots?doctor_phone_number=${phoneId}`,
  get_clinic_slots_by_id: id => `${baseUrl}clinic/clinic_id?id=${id}`,
  update_clinic: id => `${baseUrl}clinic/update_clinic?id=${id}`,
  update_slots: id => `${baseUrl}clinic/update_slot?id=${id}`,
  delete_clinic_slot: id => `${baseUrl}clinic/delete_clinic?id=${id}`,
  update_clinic_user: id => `${baseUrl}customuser/update-user?id=${id}`,
  delete_clinic_user: id => `${baseUrl}customuser/delete-user?id=${id}`,
  get_clinic_user_by_id: id => `${baseUrl}customuser/getuser-id?id=${id}`,
  get_user_by_clinic_id: id =>
    `${baseUrl}customuser/getUserbyClinic_id?id=${id}`,
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
  getFees: id => `${baseUrl}consult/getFees?id=${id}`,
  getRangeFess: (start_date, end_date, phone) =>
    `${baseUrl}consult/getFessInrange?start_date=${start_date}&end_date=${end_date}&phone=${phone}`,
  updateFees: id => `${baseUrl}consult/updateFees?id=${id}`,
  getAllergy: phone => `${baseUrl}consult/get-allergies?phone=${phone}`,
  getNotes: (doc_phone, pat_phone) =>
    `${baseUrl}consult/get-Notes?doc_phone=${doc_phone}&pat_phone=${pat_phone}`,
  getMedical: (doc_phone, pat_phone) =>
    `${baseUrl}consult/get-Pasthistory?doc_phone=${doc_phone}&pat_phone=${pat_phone}`,
  savefees: `${baseUrl}consult/saveFees`,
  addFcmToken: `${baseUrl}fcmtokens/addToken`,
  GetFcmToken: (doc_phone, userPhone) =>
    `${baseUrl}fcmtokens/getToken?doc_phone=${doc_phone}&user_phone=${userPhone}`,
  sendNotification: 'https://fcm.googleapis.com/fcm/send',
  GetNotificationData: (phone, id) =>
    `${baseUrl}fcmtokens/get-notifications-by-doc?doc_phone=${phone}&appointment_id=${id}`,
  saveNotifications: `${baseUrl}fcmtokens/save-notifications`,
  visibility_notification: id => `${baseUrl}fcmtokens/update-visible?id=${id}`,
  GetFcmTokens_Patient: phone =>
    `${baseUrl}fcmtokens/based_on_patient_phone?patient_phone=${phone}`,
  getReportsbyId: id => `${baseUrl}consult/getUploadedRecordsby_id?id=${id}`,
  uploadImmunizationKids: `${baseUrl}consult/uploadImmunization`,
  getImmunization: (age, phone) =>
    `${baseUrl}consult/getImmunization?patient_phone=${phone}&age=${age}`,
  getImmunizationPatient: phone =>
    `${baseUrl}consult/getImmunizationPatient?patient_phone=${phone}`,
  savingTemplate: `${baseUrl}templates/savingTemp`,
  getTemplates: (key, phone) =>
    `${baseUrl}templates/get_temp?key=${key}&phone=${phone}`,
  getVitals: phone => `${baseUrl}consult/updatedVitals?phone=${phone}`,
  uploadVaccination: `${baseUrl}custompatient/uploadPatientVaccination`,
  GetVaccination: phone =>
    `${baseUrl}custompatient/getVaccination?phone=${phone}`,
  consent: `${baseUrl}consult/consent`,
  uploadPharmaPdf: `${baseUrl}consult/uploadPharmacyPdf`,
  getAllmed: medicine => `${baseUrl}consult/getAllMed?medicine=${medicine}`,
  logout: `${baseUrl}doctor-authenticate/logout`,
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
