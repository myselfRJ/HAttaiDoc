export const CONSTANTS = {
  modes: ['Injection', 'Capsule', 'Syrup', 'Tablet'],
  medicine_recomendation: ['Avil', 'Paracetmol', 'Dolo650', 'Citrizen'],
  dose: ['250mg', '300mg', '500mg', '1000mg'],
  dose_ml: ['5ml', '10ml', '15ml', '20ml'],
  timing: ['AF', 'BF'],
  frequency: ['Morning', 'Noon', 'Evening', 'Night'],
  speciality: [
    'General physician',
    'Cardiology',
    'Cardiothoracic and Vascular Surgery',
    'Dermatology',
    'Emergency',
    'Fetal Medicine',
    'Gastroenterology',
    'General Surgery',
    'Geriatrics',
    'Nephrology',
    'Neurology',
    'Neurosurgery',
    'Obstetrics and Gynecology',
    'Oncology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Radiology',
    'Rheumatology',
  ],
  consultTypes: ['Physical', 'Telephonic', 'Online'],
  duration: [10, 15, 20, 25, 30],
  abhaOption: ["Don't Have ABHA_ID", 'Have ABHA_ID'],
  role: ['Receptionist', 'Administrator', 'Others'],
  clinic: ['Rasi Clinic', 'Magizh Clinic', 'Kamatchi Clinic'],
  success: 'success',
  error: 'error',
  warning: 'warning',
  selections: ['followup', 'routine', 'walkin'],
  default_image: `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`,
  prescription: ['Prescription', 'Lab Report', 'Scan'],
  cert: `MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAstWB95C5pHLXiYW59qyO
  4Xb+59KYVm9Hywbo77qETZVAyc6VIsxU+UWhd/k/YtjZibCznB+HaXWX9TVTFs9N
  wgv7LRGq5uLczpZQDrU7dnGkl/urRA8p0Jv/f8T0MZdFWQgks91uFffeBmJOb58u
  68ZRxSYGMPe4hb9XXKDVsgoSJaRNYviH7RgAI2QhTCwLEiMqIaUX3p1SAc178ZlN
  8qHXSSGXvhDR1GKM+y2DIyJqlzfik7lD14mDY/I4lcbftib8cv7llkybtjX1Aayf
  Zp4XpmIXKWv8nRM488/jOAF81Bi13paKgpjQUUuwq9tb5Qd/DChytYgBTBTJFe7i
  rDFCmTIcqPr8+IMB7tXA3YXPp3z605Z6cGoYxezUm2Nz2o6oUmarDUntDhq/PnkN
  ergmSeSvS8gD9DHBuJkJWZweG3xOPXiKQAUBr92mdFhJGm6fitO5jsBxgpmulxpG
  0oKDy9lAOLWSqK92JMcbMNHn4wRikdI9HSiXrrI7fLhJYTbyU3I4v5ESdEsayHXu
  iwO/1C8y56egzKSw44GAtEpbAkTNEEfK5H5R0QnVBIXOvfeF4tzGvmkfOO6nNXU3
  o/WAdOyV3xSQ9dqLY5MEL4sJCGY1iJBIAQ452s8v0ynJG5Yq+8hNhsCVnklCzAls
  IzQpnSVDUVEzv17grVAw078CAwEAAQ==`,
  selection: ['All', 'followup', 'routine', 'walkin'],
  months: {
    '01': 'Jan',
    '02': 'feb',
    '03': 'march',
    '04': 'apr',
    '05': 'May',
    '06': 'jun',
    '07': 'July',
    '08': 'Aug',
    '09': 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  },
  comorbidities: [
    'Heart disease',
    'High BP',
    'Diabetes',
    'Chronic respiratory disease',
  ],
  allergy: ['Milk', 'Water', 'Peanut', 'Junk foods', 'Insect stings'],
  doctors: [
    {
      doctor_name: 'Dr. Raju',
      speciality: 'Cardiologist',
      phone: '9878965678',
    },
    {
      doctor_name: 'Dr. Muthu',
      speciality: 'Gynaecologist',
      phone: '9767342167',
    },
    {
      doctor_name: 'Dr. Chitti',
      speciality: 'Endocrinologist',
      phone: '9100765472',
    },
  ],
  blood_Groups: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
  clinic_fees: ['100', '200', '300', '400', '500', '1000', '2000', 'others'],
};
