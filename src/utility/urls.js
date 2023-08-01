const baseUrl = 'http://10.9.78.38:8000/api/v1/';
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
  getClinic: phoneId =>
    `${baseUrl}clinic/get/clinic/?doctor_phone_number=${phoneId}`,
  getPractitionerByNumber: phoneId => `${baseUrl}practioner/${phoneId}`,
  savePrescription: `${baseUrl}consult/savePrescription`,
  getUserByNumber: phoneId => `${baseUrl}customuser/${phoneId}`,
  getInitScreen: `${baseUrl}practioner/init`,
};
