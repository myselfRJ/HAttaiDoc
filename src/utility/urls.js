const baseUrl = 'http://10.9.78.38:8000/api/v1/';
export const URL = {
  generateOtp: `${baseUrl}doctor-authenticate/generate-otp`,
  validateOtp: `${baseUrl}doctor-authenticate/validate-otp`,
  profileUrl: `${baseUrl}practioner/practitioner-save`,
  get_all_appointments_of_clinic: `${baseUrl}customappointment/get/appointment/`,
  Appointment_Booking: `${baseUrl}customappointment/book-appointment/`,
  SlotsAvailable: clinicId => `${baseUrl}clinic/get-slot/${clinicId}/`,
  addclinic: `${baseUrl}clinic/clinic-save`,
  adduser: `${baseUrl}customuser/create-user/`,
  addPatient: `${baseUrl}custompatient/savepatient/`,
  getPatientByClinic: clinicId =>
    `${baseUrl}customappointment/get-patients/${clinicId}/`,
  getPatientByNumber: phoneId => `${baseUrl}custompatient/${phoneId}`,
  getClinic: `${baseUrl}clinic/get/clinic/`,
  getPractitionerByNumber: phoneId => `${baseUrl}practioner/${phoneId}`,
  savePrescription: `${baseUrl}consult/savePrescription`,
  getPatientByNumber: phoneId => `${baseUrl}customuser/${phoneId}`,
};
