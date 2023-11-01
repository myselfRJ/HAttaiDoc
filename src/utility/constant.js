export const CONSTANTS = {
  modes: ['Injection', 'Capsule', 'Syrup', 'Tablet'],
  medicine_recomendation: ['Avil', 'Paracetmol', 'Dolo650', 'Citrizen'],
  dose: ['250mg', '300mg', '500mg', '1000mg'],
  dose_ml: ['5ml', '10ml', '15ml', '20ml'],
  timing: ['AF', 'BF'],
  frequency: ['Morning', 'Noon', 'Evening', 'Night'],
  commoribities: [
    {commorbities: 'sleep apnea'},
    {commorbities: 'obesity'},
    {commorbities: 'asthma'},
    {commorbities: 'high blood pressure.'},
  ],
  social: [{social: 'smoking'}, {social: 'Drinking'}],
  family: [
    {family: 'Diabetics'},
    {family: 'Cancer'},
    {family: 'Arthritis'},
    {family: 'Heart attack'},
  ],
  Lab: [
    {
      micro_biology: 'Culture & Sensitivity(Blood)',
      clinical_pathology: 'CBP(Hb,TC,DC,PIt.)',
      packages: 'Minor Surgical Profile',
      molecular_biology: 'PCR (Please specify the test name',
    },
    {
      micro_biology: 'TB Culture',
      clinical_pathology: 'E.S.R',
      packages: 'Major Surgical Profile',
    },
    {
      micro_biology: 'Fungual Culture',
      clinical_pathology: 'Peripheral Smear(PS)',
      packages: 'Please specify for any other package.',
    },
    {
      micro_biology: 'Gram’s Stain',
      clinical_pathology: 'Hemogram(CBP+ESR+PS+Blood Indices',
      packages: 'RP-1',
    },
    {
      micro_biology: 'AFB Stain',
      clinical_pathology: 'Hemoglobin',
      packages: 'Rp-11',
    },
    {
      micro_biology: 'Fungal Stain',
      clinical_pathology: 'Blood Smear for Malarial Parasite',
    },
    {
      micro_biology: 'Widal',
      clinical_pathology: 'Blood Smear for Micro Filaria',
    },
    {
      micro_biology: 'A.S.O.Titre',
      clinical_pathology: 'Stool Reducing Substances',
    },
    {
      micro_biology: 'C-Reactive Protein',
      clinical_pathology: 'Urine Bence Jones Protein (Qualitative)',
    },
    {
      micro_biology: 'Procalcitonin',
      clinical_pathology: 'Reticulocyte Count',
    },
    {
      micro_biology: 'R.A. Factor',
      clinical_pathology: 'A.E.C',
    },
    {
      micro_biology: 'ANA',
      clinical_pathology: 'Blood Grouping &Rh.typing',
    },
    {
      micro_biology: 'ANA Profile',
      clinical_pathology: 'Coomb’s test(Direct / Indirect)',
    },
    {
      micro_biology: 'TORCH (lgM &igG)',
      clinical_pathology: 'Osmotic Fragility Screening Test',
    },
    {
      micro_biology: 'HBs Ag',
      clinical_pathology: 'Sickling Test',
    },
    {
      micro_biology: 'HCV',
      clinical_pathology: 'Urine Routine (AIB/Sugar/Microscopy)',
    },
    {
      micro_biology: 'Retroviral Screening Test',
      clinical_pathology: 'Stool Occult Blood',
    },
    {
      micro_biology: 'Anti HBs Ag Titre',
      clinical_pathology: 'Complete Urine Exmination (CUE)',
    },
    {
      micro_biology: 'Leptospira IgM',
      clinical_pathology: 'Urine Pregnancy Test',
    },
    {
      micro_biology: 'Dengue Test',
      clinical_pathology: 'Urine for Bile Salts / Bile Pigments',
    },
    {
      micro_biology: 'Culture & Sensitivity',
      clinical_pathology: 'Urine for dysmorphic RBC',
    },
    {
      micro_biology: 'Anti CCP',
      clinical_pathology: 'Urine for Chyle',
    },
    {
      micro_biology: 'V.D.R.L',
      clinical_pathology: 'Cell Count (Body Fluids / CSF)',
    },
    {
      micro_biology: 'Stool routine examination',
      clinical_pathology: 'Semen Analysis',
    },
    {
      micro_biology: 'Vasculities Profile',
    },
  ],
  medicine: [
    {
      type: 'nsno',
      term: '6-Art',
    },
    {
      type: 'nsno',
      term: 'Abaxis 2.5',
    },
    {
      type: 'nsno',
      term: 'Abaxis 2.5',
    },
    {
      type: 'nsno',
      term: 'Aldigesic MR',
    },
    {
      type: 'nsno',
      term: 'Aldosmin 1000 mg',
    },
    {
      type: 'nsno',
      term: 'Aldosmin 1000 mg',
    },
    {
      type: 'nsno',
      term: 'Aldosmin 500 mg',
    },
    {
      type: 'nsno',
      term: 'Aldosmin 500 mg',
    },
    {
      type: 'nsno',
      term: 'Aptspase',
    },
    {
      type: 'nsno',
      term: 'Benfotime Plus',
    },
    {
      type: 'nsno',
      term: 'Bonpro K27',
    },
    {
      type: 'nsno',
      term: 'Calreal 60 K',
    },
    {
      type: 'nsno',
      term: 'Cefapime CV',
    },
    {
      type: 'nsno',
      term: 'Cefurite CV 500mg',
    },
    {
      type: 'nsno',
      term: 'Cipcal',
    },
    {
      type: 'nsno',
      term: 'Dafol 6',
    },
    {
      type: 'nsno',
      term: 'DEE 3',
    },
    {
      type: 'nsno',
      term: 'Duojoint UC',
    },
    {
      type: 'nsno',
      term: 'Gabaflex NT 40/10',
    },
    {
      type: 'nsno',
      term: 'Gabapin NT 100/1',
    },
    {
      type: 'nsno',
      term: 'Intacoxia 60',
    },
    {
      type: 'nsno',
      term: 'Intacoxia 60',
    },
    {
      type: 'nsno',
      term: 'Intacoxia MR',
    },
    {
      type: 'nsno',
      term: 'Jointace C2+',
    },
    {
      type: 'nsno',
      term: 'Lympedim',
    },
    {
      type: 'nsno',
      term: 'Montovent LC',
    },
    {
      type: 'nsno',
      term: 'Montovent LC',
    },
    {
      type: 'nsno',
      term: 'Moveflex',
    },
    {
      type: 'nsno',
      term: 'Nefrotic',
    },
    {
      type: 'nsno',
      term: 'Nefrotic',
    },
    {
      type: 'nsno',
      term: 'Neorelax M',
    },
    {
      type: 'nsno',
      term: 'Neuro stab M 75',
    },
    {
      type: 'nsno',
      term: 'Nimbcee 03',
    },
    {
      type: 'nsno',
      term: 'Novofiam plus',
    },
    {
      type: 'nsno',
      term: 'Novoflam SP',
    },
    {
      type: 'nsno',
      term: 'Prefabanyl NTM',
    },
    {
      type: 'nsno',
      term: 'Pregabanyl M',
    },
    {
      type: 'nsno',
      term: 'Rabalkem DSR',
    },
    {
      type: 'nsno',
      term: 'Salran D',
    },
    {
      type: 'nsno',
      term: 'Salvoran MR',
    },
    {
      type: 'nsno',
      term: 'Salvoran MR',
    },
    {
      type: 'nsno',
      term: 'Samflav',
    },
    {
      type: 'nsno',
      term: 'Sneptin Plus',
    },
    {
      type: 'nsno',
      term: 'Tapal ER 50',
    },
    {
      type: 'nsno',
      term: 'Tapal ER 50',
    },
    {
      type: 'nsno',
      term: 'Tendoease',
    },
    {
      type: 'nsno',
      term: 'Thera Spine',
    },
    {
      type: 'nsno',
      term: 'Titrate',
    },
    {
      type: 'nsno',
      term: 'Tocomore',
    },
  ],
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
  selections: ['Followup', 'Routine', 'Walkin'],
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
  selection: ['All', 'Followup', 'Routine', 'Walkin'],
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
  ReferTypes: ['Clinic', 'Hospital', 'Doctor'],
  blood_Groups: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
  find_us:['Newspaper','TV','Facebook','Instagram','Social Media','Friends','Doctors','Family','Old Patient'],
  clinic_fees: ['100', '200', '300', '400', '500', '1000', '2000', 'others'],
  state: [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal',
  ],
  prescription_logo: `data:image/png;base64,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`,
  default_clinic_logo: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeoAAAIACAYAAABNWi9DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAADQkSURBVHgB7d1dbFznfefx/3NmhqRsJxrZaRfbAhHtANskbSPKuQ0sSpFsySliyb3ZSrZEqRcB9sKW3IsGSCO+eAtkLxpTvligQBtRstUtAmxMBdFLHMcaBQH2qgll2Ul2gdqji8UWaykatbYlcTjn6fOcISWKImfOkGfmPOc83w9AkZRIajjznOd3nnclAJBB20/oz+rSbDloFAaDQMqB1oNam/eiy1rpshJVtp8rJWUxn8x/20bzgWr1c7VIdeFjpZsfm59XU1rVtFLmc10LVVBToqthoGu3b5auVA6qmgBdogQAHGXDWAWNoUIQDgahDM0H8JCpuQaVW/VXTdtQV7qqdVBV9r1SMzdvFy8R4lgrghpA6r78t3r9ww80tiwEsqmZhh0M49WqmWb6TChqhgDHahDUAHrKhvIjD81tMl3UQ0rrYUdbyF1nWuAz5p0JcKnoosz8+D/3XRJgGQQ1gK66E8yh7A6UjlrLvoVyTDUtumKemkqjIBWCGwu4WAAk7slT9ScKOrSt5WGCedWi4A61mg5UqXJ2n7oi8BIXD4A1u6fVHOgR81dlwjlZtqtcm9Z2WNRTtLb94vWFtOH7sn7DhoH1/eHAoF3CoVShXFDBfc+JDnXVvp8rzFV//dUad7WANMP5Mw81njEt5xFTkwwJ4dwzpqVdFa0qOlBT5/aWLgpyzZuL6g/ObfhSsRgMhaEeCgI1ZLrkBrXYCSxqFc+BtpNAajqUGdN6qMwFjRkCHD5YaDkXtR4jnN2wENqNokzS0s6n3F5gj/1k4LMD4YO7VSC7TSG2E1jKqwvleKI1lBJWzFVjuqYaFYIbeWLHnOnWdp8N7bARjgeFgQuMaedHri62P3hrw5cKododqGBk9a3lpOiK6TKfIrSRVbb1/DsP1Q8E2tzsMiEsc0xoTzekMPXjfcXTgkzL/IVnx5n/4/pHDkQtZ1HD6Ybz8rQOpwJRU5efvMpYEpxH6zlfaGVnX2YvwCigyw+/qCQ43O1u7aTY7nFtLphf7bo2JYBjbEDPjz3Tes4pUwdNhfXG+PmD66qCzMjcxZjFgF6KwIYrho/r8rrS7AvmOhrxcXcwb2mpNLQJ7OfXVQTOy9RF+cUfP/KCUmosqwG9lA1s1dAH3911tSJAD9nx5999cPbFQKkjWmQ9Ae2nhW7x8/vXTQmclYmL8ws/Lj+hgsIrJpw35yGgl7Jj2I1GY/w3u2pVAbpoIaDNDe9hYfwZ8whstzl9kdpu7t/b8PComG7uPAb0YnSHo5sIaMRBYLvJ2YvVLrUq6sIb5sNH8x7Si9G6RtJ2vX77KAGNTkSBHQYHzz9fqghS5+RFG41FB8p2dQfiIdu6bpTqW3+zlbDG6kWzuEUfl+hml4BG55gl7ganLl7b1f37Dz/yXa3VQZ9a0SvRDX3kvZ1XJwXoAMuskLRQy6RSpUnWYafDmYv40TMDG9f1PfiDvE4YW7VQj7/71NUxAdqw49D/4YH6qARymIBG0hi/To8TF7MN6QdKD71tHo1X49Fx2XHr9568dsh+KMAynj41+4J5NyaMQ6PLosCe7dt6/qCqCnoi9QuakI5LT6v/Xz90ed+N6wLM2/Z3NzcOrCt8z3y4lYBGL+mwMX72+XVjgq5L9cImpDulZ97dfvVx83zRsgazuZE6Zof3RmoXNyG9OnSDY+c/3P6SCtVxc9VsJqDhAjvZ7Ga9NF45qGqCxKVykRPSa6NDPfneU1dfEsLaO4xFw1W2dV0Xtecn+/pmBIlK5UL/4o8f+ScVMLt7TZgN7hXGopEVjF0nr+cX/B++9fDfiA6OENJrp1S45/L2a9OCXNvx2tzXS4XwuGmybCCkkQXMDE9WTy9633ccS56uzRXnNrODWT6xLhpZxrrr5PTs4p8fl35fKUI6WcwEzyPb1d0/UPgBE8aQdXSFr13PKoA/fPMz/8zkse5gclm+RFuAKv0GXd3IC61lJqyX9tAVvjo9ad1+8c2HjxLS3WOGEw7/0U8+s0WQeXZtdFF0RWl5mJBGXpiafyjom72w49TskKBjXa8I6PLuDXvi1ns7PnyMLvBsis6L/lT9uyagDxLQyLNQh0fOPTfAYUMd6Hp4zq+XpuLpMnPHOvhHb35mVJA5djz6dx+sv01IwweBCl55+rWbY4LYulopfOF8eX9QKB5nlnev6Jq6XX/s8p+wH3hWzK+Pfls4MxqesWdd/+u/ll76+X9R1FdtdDVAg6BoW3hUPj2jymFf8bvCc54JdtLYwAOFXwghDQ+ZXsCRT3+6/vbO43pQ0FLXgtq2pk3VM8gEst5SKhj5/IXyRoHTdr02u78k+gKTxuCzhUlmhHVrXQtqWtPpKdQLPPcOi069CmRKerTqAnCZacwNEtatdaWioDWdLlrV7po/mnKMVjRw10JYs3xreV0JalrT6SvOFkcETiGkgZXZsO7TQlgvI/Gg/uKb5a+bd7Sm0xbIi3/8o/UbBE4gpIEYlJQJ6/slHtRKFQ6wbtoFqhwWSwcEqSOkgQ4Q1vdJNKjtLmSi1W5a025QBXlGNOGQJkIaWAXC+h6JBvVAYWAL1ZFL1PAfn1lfFqSCkAbWYD6sd/4PZoMnGtRBULBdrVRKDqH7Ox1Pn5p9IVBqlJAG1sCEdRCydCuxoI66vU0Ljm5vt9D93Xs7Xpv7unnCXxHWSQNrxjrrBCsSur1dRfd3L+38h9tfKhXC45qWNJCYKKxL9Te+8t+1lytZEgtqVQjsechUTi4a6Oes6h6wB2wEWr1hejA20OUNJMtuN/rp9bPfE9HeXVvJBbUOhgVu0iE3UV3GKVhA95mW9e5dr9e/61tYJxLUzfFpNjlxlRmiHjZ/oItMSJs7fUIa6LZAyeFdr99+UTySSFCvKw1sEjiM5Q3dZJdhmXdbCWmgNwIVvLLztfqweCKhru9giN3IXKbKn69wSEc3sAwLSEcQhMd9mQmeSFArpWhROy6oF4YFibLj0kqzDAtIw8JMcNH5H69OpoLRwvIfxwVaDQoSszB5TNOTBKTGzgTfdSr/k8sSagko9mN1nFbKdn0TKgnpHyjYcWkmjwEps5PLnj5Zz/UOjEl12ZWZ8e02pXSZmd/JaI5LywghDbhBBfJKnvcEX3NQf+EMk5SyQQ0K1oxxacBBSsqFRv14XrvA117ZDAhBnQGaeQSJGBhgXBpwkpLhp1+bHZUcolUAxBStl1aMSwOuUoEazeP6aoLaE0rJoGDVon28hfXSgOvs+uqvnMrX4R0ENRADXd5ANtj11Z/S9aN5Gq8mqIE26PIGssUu2drx/XpuNuIiqIEW6PIGsqlv1q7OyEermqAGWlg3UPgBXd5ABikZzsspWwQ1sIKnXpvbby72IVrTQDYFEozmYWIZQQ0sw3Z5F4JwVBPSQHYpKX9aZ38vcIIaWMbAusILwl7eQOYpJSM7X5vbIhlGUANLzG8TepiQBvKhoPRollvVBDWwhD0ZiwlkQI4oGc5yq5qgBhZpLsfiZCwgb+yOZaKz2aomqIFFzNj092hNA/ljdyzb+Vo2z60mqIF5T56qP2ESepjWNJBPQcGMVWewVU1QA/OKolmOBeRYVlvVBDUgtKYBX2SxVU1QA2Jb0/IirWkg/7LYqiao4b3mumm9m9Y04IdCIAeytK6aoIb3WDcNeCZj66oJaniNddOAn7K0WxlBDa8NrCu+QGsa8FCGWtUENfxmxqYFgJeUkmey0KomqOEte960uVAH6fYG/BSIHvnKKSmL4whqeKsQhAdYkgV4TEn5U9r9pVoENbw0f5QlG5wAnjMh6Hz3N0ENL/UPFA8wiQyAnVS24/v1TeIwghpeUqIzeYoOgOSVbrs9qZSghneifb2ZRAZgQaAOuLz/N0EN7xS0ZhIZgDtMZTC483V311QT1PCOPSVLAGARl9dUE9TwCt3eAJajlBmn1uIkghpeKYo8Q7c3gKVs9/f2f/xkSBxEUMMrSuthAYBl9M0VnxEHEdTwht3kxLwbotsbwHKUUltcHKcmqOGNUn9pCxENYEVKhl3c+5ughjcKgWZ8GkBLn1IN55ZpEdTwh9ZOThQB4JBQO9f9TVDDC0/9/ewmO6uT8WkArbi4TIughh/6gk1ENIB27A39V/7BrXFqghpeYHwaQFyujVMT1PCC0npQACAOx8apCWrk3va/1euF9dMAYgrErYmnBDVyL3hojvFpAJ0YcmlCGUGN3Cs6dncMwHFKyjv/UTaKI4oC5J7aos14E41qf5nXvqZFVc37qikL0cf3f5U2FbMaNB+UzccMlXhO6Ya9wa+KAwhq5J6dSObmKbPoFvN6V1WoprXSl/pmG5Xpg+uq0qFdJ+tbVEFvUloNm0I0bHpCy4S3R8JwUBxBUMMHtI48YFvNoajJIJSLZ54vVWSNzu0vXTTv7Nur9vOnT8w9o4uhPV1phPKUf4GSTc2Z3yr10WqCGrlmdyQT5JtSFdWQ8R8lEM6tnD1QPG3end526ub4gBSeMdX3YVONs9tdfjUnlDnw6hLUyDU9oNaLa/sBIhlaZqShXjpzoHRBeujtfeuuSLOV/equ1+tHlegRAjuHtAyKI5j1jVxjxnf+RF3cOjxy5rm+zb0O6aXOPVeauKkaW82HU5o7wnxRUnZlK1GCGrmmtSqzdWiOmG7uuaC0+dxzA5PiCNvCPruv75CWYMRE9QcEdn4MBJ8MigMIauSaiiaEIA9CrSbP7C1uO/9nyy2tSt+5fcWTtnVt7goJ65wo6X4n1lIT1Mg57dQpOFidUMsR0818xIUZuK3Y1vXtj0qPm3HrNwjr7FNzdH0DXWeqdYI643RDDp57rs+Zru523vqGunFmX/+faiXHCeuMU41BcQBBjXxT7szcROdsS/rs/r4pyaBze/v+nJZ1tqlAbXThFC2CGvmm2U0qq3Sox7PUkl7O7Y/6DpnC90vCGmtBUCO35o+3RAaZluj02ef7xiXjbDf4TWk8a8L6OmGdQUoNigMIauRW+NAtxqczSVfngj7nJ47FZSeYmV9kXBHU2aN12YVXjaBGbpVuFQjqDNKixl1dgrVaZ/f1vWrq+wqt6mzRwqxvoKui7UMZnc4YXT27t3RCcuiWNA6ZPgKCGh0jqAE4w7amzbhgLsMs2iM8YKtRdI6gBuCI/LamF9S1OsFYdXa4sg8DQQ3ACXluTS94c1/pZ4xVZ4giqAHgjvCB7p4n7ZDTtKrRCYIaQPqUqpzfI1fEA7ekcZqYRicIagCpC0OZEU/Mr6uu0v2NuAhqAOkL1MW8bHAShwqkIkBMBDWA1NXVbS+6vReEofLq98XaENQAUncrfKAqHtGirzChDHER1ABS9/O9UhMAyyKoAaDXdHBdgJgIagDosTDQ9CAgNoIaAACHEdQAADiMoAYAwGEENQAADiOoAQBwGEENAIDDCGoAABxGUAMA4DCCGgAAhxHUAAA4jKAGAMBhBDUAAA4jqAEAcBhBDQCAwwhqAAAcRlADAOAwghoAAIcR1AAAOIygBgDAYQQ1AAAOI6gBAHAYQQ0AgMMIagAAHEZQAwDgMIIaAACHEdQAADiMoAYAwGEENQAADiOoAQBwGEENAIDDCGoAABxGUAMA4DCCGgAAhxHUAAA4jKAGAMBhBDUAAA4jqAEAcBhBDQCAwwhqAAAcRlADAOAwghoAAIcR1AAAOIygBgDAYQQ1AAAOI6gBAHAYQQ0AgMMIagAAHEZQAwDgMIIaAACHEdQAADisKACQsqdfnx2VU3UtntCh3qgDUUqA9ghqAKlTgRo18SW+UPRlogMEtUf++Ke/8768Jd74f/J7Esz9vmm10G5x3e9d+1/mVSK9gOUQ1B7RWgbFM43C/xUAyDJuYQEAcBhBDQCAwwhqAAAcRlADAOAwghoAAIcR1AAAOIygBgDAYQQ1AAAOI6gBAHAYQQ0AgMMIagAAHEZQAwDgMIIaAACHEdQAADiMoAYAwGEENQAADiOoAQBwGEENAIDDCGoAABxGUAMA4DCCGgAAhxHUAAA4jKAGAMBhBDUAAA4jqAEAcBhBDQCAwwhqAAAcRlADAOCwogAJUkpqWkvVvM00P9dV+15LuF5rVVZKDZpPy+ZtSNmvBgC0RFBjTUzwVkWH06L0xXq9MfObXbVq3O/9T+fLm0qFwiYT6rsDpYa0yCDhDQD3IqjRsWarWU+aDy9e3v5hRVbp/+ysXTLv7NtJ+/nn3yxvKarCAS1qhMD2jT5oul2OamVv1oTXHliEMWrEZqKzqrQcLPxb/dF3d1wdN28VSdBvnqxdfHfHtUPh7NyjIuFxczNwXYtpbyP3zu5dd+Kmamw1H05pO1IC4I4137l+4aflJ4JG8YLpAiX0c8q2oMM5Pf7ezquT0kNfOFPeWOgrjNLCzr93t38YmNooCuhtp25uXCeFt80nj9K6RtrO7C0FdrKNpIhwRUum7py0Leheh7T166/VrtxtYev3aV374e19666c2df3Oa3VmPn0Oi1s+I6gxrJsK1qF4Z7LO64emdlTq0mKmoF91VTc4Rhh7Y9zz5Umbkpjs9AdDs8R1LiPHYsuFAqbLz91bVoc8qsnfztheqAOm7AOBV6wreuz+/oOaQlGTFR/QGDDRwQ1ltAzcmv28Zmt/1IVB727/dqrc6qxWWv9W1rX/ji3r3iSyWbwFUGNRfSMul3fdvlPblwXh/3v7dffmQtMpa2FWeEeoXUNXxHUiERLrzIQ0gsIa38tal1fIKzhA4IaC2PSW7MS0gtsWIvSR4TK2jvzreuv2pnhhDXyjqCG2JB2dUy6nfd2XDupdThOq9pPdmb4LWk8aj58n8BGXhHUvgv1eFZDeoGdDW5y+gJh7Sfbur79Uelx0zN0nLBGHhHUHrNd3u8+eXVcciCsNw4xXu2vt76hbpzZ2/fn5sPD5o3le8gVgtpjtst7YdvGrLObomgJjwm8ZsatX70pjceErnDkCEHtKdOanjJd3lckR26p3x6jVQ3bFW7Cepu5B32DsEYeENSeMq1p2+Wdq0rs/R1yg1Y1rOZ+4f1/yqxw5AFB7aE8tqYX0KrGYnZWeBgGu80Qz28JbGQVQe2hxqy8KjmttGhVY6nzzxd/eFM3HlfCbmbIJoLaPzO/2vXhjOTYfKuaChl33B23ll8S1sgagtozuqFP5GWm90psq9r8phW6v7HY/DnXXzaDP68Q1sgSgtozOlQXxQMmpL34PdG5s/tKf8EkM2QJQe0Ru8FJ3ru9F+hCWKH7Gyuxk8yEzVGQEQS1R7TWXoS09euv1n5m3tXo/sZK7OYojTDYw4xwuI6g9ohuyMW8j08vZnsQBGjBzghviN7KjHC4jKD2yyXxifKnBwGrd35v/zvzM8IJaziJoPaIDlVNPBKGOpebuiB5i5ZvEdZwDkHtkUI4WxWPKK1sUFPpIhbCGq4iqD1y+Ws3vGpRA50irOEighq5FRYbH1DVolOENVxDUAPAEoQ1XEJQA8AyCGu4gqAGgBUQ1nABQQ0ALRDWSBtBDQBtENZIE0ENADEsCuvrhDV6iaAGgJhsWDeU3qoUYY3eIagBoAN2b/BQyxFFUKNHCGoA6NC5fX0nTUofEc6zRg8Q1ACwCvY861CrcbrA0W0ENQCs0rnnShNayXHCGt1EUAPAGtT/rfSSGa/+JWGNbiGoAWAN3vqGunFTGs+yxhrdQlADwBrNL9vaw7ItdANBDQAJYNkWuoWgBoCENJdtqUla1UgSQQ0ACTq7r/QX5t0FwhpJIagBIGG3pHGIyWVICkENAAmzk8vqog4yXo0kENQA0AVv7iv9jG1GkQSCGgC6xG4zasK6Qhc41oKgBoAumv2o9KzSjFdj9QhqAOgiu3NZXTFejdUjqAGgy5rj1ayvxuoQ1ADQA3Z9tekC5/AOdIygBoAeuamiwzvYDxwdIagBoEfs+mqT0OOMV6MTBDUA9BBLttApghoAemx+i1G6wBELQQ0APUYXODpBUANACugCR1wENQCkJFT6iNIENVojqAEgJef39r8TihqnVY1WCGoASFH94+Ix9gJHKwQ1AKSIvcDRDkENACmbP7uaiWVYFkENAA5gbTVWQlADgAPs2upQq2MCLEFQA4AjmFiG5RDUAOAIO7EsVAE7luEeBDUAOOTcvuJJJpZhMYIaABwzJ4pWNe4gqAHAMSzXwmIENQA4iFY1FhDUAOAg26oWJVO0qkFQA4CjburGBKdrgaAGAEfZTVBMLU2r2nMENQA4jFY1CGoAcBitahDUAOA4WtV+I6gBwHG0qv1GUANABtS1OsG6aj8R1ACQAexW5i+CGgAygt3K/ERQA0BG0Kr2E0ENABmiwtIxWtV+IagBIEPOPK9+aN7VaFX7g6AGgIwJtTom8AZBDQAZU/+4aLu/r9Oq9gNBDQAZ89Y31A1RMi3wAkENABnEBij+IKgBIINYquUPghoAsus0rer8I6gBIKNmPyqdEJZq5R5BDQAZFU0qE1UR5BpBDQAZVhdhp7KcI6gBIMPspDKh+zvXCGoAyDgtakqQWwQ1AGTcHLO/c42gBoCMi9ZUa6nS/Z1PBDUA5IDp/j4hyCWCGgByoKGkQvd3PhHUAJADdH/nF0ENADlB93c+EdQAkBN0f+cTQQ0AOcHmJ/lEUANAjrD5Sf4Q1ACQI2x+kj8ENQDkSPhR8ZLQ/Z0rBDUA5Ig9+tIk9IwgNwhqAMgfur9zhKAGgJxp3JKLxHR+ENQAkDM//vO+S6IYp84LghoA8kjJtCAXCGoAyCGt5RLj1PlAUANADt2SxmliOh8IagDIobf3rbvCOHU+ENQAkFeMU+cCQQ0AOcU4dT4Q1ACQU3Oi2KEsBwhqAMgp9v3OB4IaAHLK7vttIroqyDSCGgByTCtVEWQaQQ0AORZq/Q4TyrKNoAaAHNO3ZYaYzjaCGgByLDqgA5lGUANA/s0w8zu7CGoAyLtAWE+dYQQ1AOQcO5RlG0ENADkXhkFVkFkENQDk3GxQv0R7OrsIagDIuejIS2QWQQ0AHjAN6iozv7OJoAYAHyhO0soqghoA/FAVZBJBDQBe0FdYopVNBDUAeIAlWtlFUAOAB/RseIX2tGQSQe0JzeHxcBRlszcac6WqIJPWHNSNev2GAA6ibAJ3vfUNdUOU1FiilT1rDupCo1QTOE8p/1otlM1s8LFspsX0XnBNZNCag/rXX6ux4w2cRNkEluCmKJMSGaO2d8Ta3qvBWUr0jPnDO5RN9/laNtNA70U2JTWZjO4Ux+lQ7Hitj4FF2XScx2UTiCWZoFaarekcpwqBn68RZdN53pbNFIShYjgogxIJ6rAhl4Q7Yqc1ZrWXFyhl032+ls00KKVr7E6WPQm1qBtVXnqX6dqvdn3oaYuasuk2j8tmCkItLFnMoESC+paqXRQ4zN9TcyibruNEp57SwXVB5iQS1O/vkBvMrnWXz7NqKZtuY8Z3b4WBZnJlBiW2hahW4bTASWac9ofi8bgUZdNdvpfNXpuTOfb7zqDk9vpuqHeEC85JwVzd6+5FHYYXTcmkbDrI97IJxJFYUN8Mrk1TFTqpcvlrN7zu7mKc2lnel81eCz4a4PnOoMSC2o4FmrZLhbFAtygtJ+xAoHiMsukmymbv2YM5zBNe5WCOmBzZGz3RYy5NNXhaKABOKZQKFQFl00GUTbhOqxwG9a3g2gl7B0LLxRmVmeF/YTMJoWw6iLKZEsW2urG58lwlGtTNpTC6InACXYt3UTbdQtlMj1aqKohHqZoLywcTDWqrETSOMcM2fXbt8OUdH54Q3EHZdANlM112G1FBPFpXxQGJB/Wvv1r7GRN3HKBlmo0k7kXZdARlM1Wm9F9iv+94Qm3PClCpP1eJB3VEib1bpiCkqFAsHBNeg/tRNlNH2UzXHNu2xhY01CVxQFeC+r0d104qYdvGtJiuxamZrUzUWQ5lM12UzfSFHxUvcZsUz41i0Ymbmu60qMXeLutx4a45FYVCgee+Bcpmeiib6WMtdWwzP9+bw1nfi9FySYcSPUmLpTXKZjoomw5Riv3v23PmwJiuBbXVCOYOMsu2d+xs2kKxyPhfDJTN3qJsumVO5DQTytqYUyddmEhmdTWomWXbY6GMmxZLVdAWZbPHKJtOeXNfyZR/uwEQYb0sLbUz+4sVcURXg9oK641D5pe+ToXYXaxN7Rxlszcom27SoqYEy1NuLSHselD/+mu1Kypg8k63FQqFrez01BnKZm9QNt1E93cLDnV7W10Pauvd7ddeNY0Wuhm7JdR0K64SZbPLKJvOst3fptBX6P5eSldd6va2ehLUFt2MXVN598mr44JVo2x2DWXTcXOixmlV38sMCYzbfVbFIT0LatvNqIWZtkmyY3/FYuEg3YprQ9lMHmUzG6JJZZo11Xfp6tm9JefmU/QsqK1fPVn7oZZwnJZLMgoF2UO3YjIom8mibGZHXamDtKqbXGxNWz0NautXT/52wjwPx6kQ10Y39JGZrR+yZ2+CKJvJoGxmC2PVTeaXn3GxNW31PKitT/S1l8wd3C+pEFcp1OPv7bw6KUgcZXONKJuZFCp9RHk+9BM+UNrjYmvaSiWo398hNxqzc8+aCvEDKsQOmYrw3aeujgm6grK5BpTNzDq/t/+d0HT7+tqq1qbsnt+jquKoVJd0f+FMeWOhr/i2KRmPKjv9BC3Zk4cub//wkDCe1HWUzc5QNvPh6VOzPzXvtipxabuPbtPVM3v7HnO1NW2l0qJeYGfbmtbLNlov7dkDDagIe4eyGR9lMz9uSeOQKfPX/WlZ62oj6NvqckhbqQa1tahCZFxwJaZb5vKOq0eEirCnKJsxUDZz5e19667URe3xZRZ4GBaOnP8zd7u8F6Qe1JatED+Rq9tM2XiDCvFedgYt437poWyujLKZT/OzwO3NVyg5Zselzz1fzMRxn86NQ3zxzYePKhWM+T4uaH77Wij62fe2X70gcAJls4my6Yddr9dNeddjeRyvtiF99vn+MckIJ1rUi9m1rOZpHDFvHo8N6plCobCZitAtlE2LsumLc8+VJrRWY3kbr85aSFvO3inNz7r9gSkhm31qwdiJOYWP5sZn9tRqAif5XDbNePRLwni0V/LUss5iSFvOP/G+dDfavZHDOX3ovZ20VLKCsglf7Hxt7uuFQnjc9CNtyGJgmwdcCxty5Oz+vinJoEw84c0WTGFUixrJZaVo7vKKn8xN0orOHsomfLHt1M2N66Qwv7dAlsJaV831uefsvr7MbmubqYrlD3/yyH5TGdoxk8GcVIqV4lzh4MwuDi/IOsomfLD9b/X6vgfmRiXQh7MQ1qFWkzfrxfHKQZXpG81MVig5qBQr5i5v/N0dVyuCXKFswge7Ts3tD3Q4ppUt5y7miK7KXHDozIFSLoZrMn3nn8FKsUIl6AfKJnxgJ5oFokdcCexoLFrU5CezxWNZb0Uvlosxtc+/Wd5SVIUDLo4T2jWnWuvJ4kdzxxjn8w9lE3lnx677dfFAmoGd14BekKvJL3ZiT9BX2GJ+rRHz6XBaFWO0IUQo00rpE7RQYLlUNkXrKdPSP03ZRJK+bMavf/ehxjNK9GHTOzPUk8BWqqK0nv5otnQijwG9ILfLSh77vqwf2FAeDqTwjGnNDJm/GupW5dhsmciMKZwV8+lFKkC0QtlE3j312uymgqgDEshw4qFtwtmU6UoQysUfPV+qiAe82azBVo595fJQMShsMq3dYaVU2fzyQ6ZlUe6kkjTfV9U6nDHfULUfz5nC0vdxvUrXIVaLsok8s13jA3OlIQn0FhPc5sZUD4rE6yI3XenVQKsZE8xVrfSlT2ZL03luOa/Em6Bu5dEzAxtLhYFyEEi5qIr3PSdzc3NV+/43u2pVAXqIsom8evrvbm7UfcXBgro3h8JA1/pmG7Xpg+uqAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA2ikBemFMf10CGTIlbuUy15BjMqZqkncT+gXzZ7nFc1GTb6tjAiB/xvQTUV24UAdoqchRdbHVtxQF6IVAnhHRB02hbHFzqE6IDan8e9E8F4+2eC6q5t9fNc+HFgD58C29Ufr198y1vVUWGskLV/h4WBWt9piGysxy3xoIAADorn45av68G9KLKRmUQF+Qb+oNy33r8i3ql/X/FK03S6uu8VBtNelfldWKukL1K9LqZkGpSboAAaxKswXzvsRrkNTkE/WYfEddF6AbtB5pOfRnu8IHZIt5P730H4or/MCy+XNQujmGrWTD/P+x8kUUhhsEAFajX+xcgLh1WFkekAPm/aQASbM3jXFGsgIpL//XAJBLendnX67tPAom2CJ5czHn3oTLfx2TyeCPZlfo27L0BjVU0zImLzF5K0fszFrRg9JJr6CSYfmmadF8R9Lt/na1nI6H/zTfE7roOdUVORoc4tpp47+pG/JyOCNaWg8piyw7mYyghj/6o/GfQVlaAQZhmc6lnAmibuzOW8cudH+7WE4n9H4TykP3PSYVDAriaahxCfQbsmK5VJPmRuzKcv9C7QSP6NVV3sggPSyr4UT3tx4V18qpsssruXbWZEz90DyFj5s3G9a218b2QtREqYopciNyVB1ZqWeCFjX8YLsTm5U3lU3ete/2tuOA62X5ZTLDplWz0bxVJQ0TelPHXfbdZq8dHY33c+2s1VF1yfz5rHSIFjX80FzDSEXjg3bd3lq3XvKpwhFJTycz1Xuj2RWPFBHU8MQqu0LToL3Yna2LWsz21qalfDOwQb3Q9Xg/pQ6k1/3tYDnV+kXhJjdVdH0v5y/1elknm6L9WLWd1BHO78scmPEEU4mGMmPeV+e7Mdxw9zEPip2IosPB+xbXq6AaPfaCefsrdUV8sZoZwGkKVtjvfEx/1ry+w7L09VXBjHldq6asXvRir/RW7EZKEu0DsfxrrXRFvmOeo4lodu3WFX7KoOn63mLeKtJLzcc+KC6V02ZXvJ1E5v61s2K9vWBR/Z2xOpCgXsxW6EqPmbfmhumy8DIvvNa6eQ++8Kndn9Ve+OHsuIytq0qv2cerw2FTsQ+bxzEsiy8mtcx1pXXzK0JpPnbRk1IIpnMd2mP6BQnMa9qyolEjpkIaaT4xK9FTqS1DsRW40ofveY0Xv74Lr6t9m2hMmQpp0qmbyF4qmG7vVvvJh8HF5muoT7ecs9Dcm/5iz17vpMqp1uMyWhiTJDRner8irYcRhs1NT5jatRPV2bLb/Ojd99zk3FNv33kcd+vvZh04E820Lpgbsl7UgRPhT2WlLUQXfFsF5tq+73kiqK27AT0sna27HIwunqB/RMYaJqwTukBasXeND9rKyG5HZ28o1OrudJuPfVIaJgDGTeU+WhiXPFnta+oCbW+igvnXWv/gnk382zLlUbQtj5PmZ4x71cK2z1f7SU+V6M+P5YS5jl5Z+ctsIKqXpNua5fQV89ZufW3vjOkvNbd37qTc9ZB9nQfCF6WgDrfsPWlH2ROszE1Ew/RGjc2Za6U4JY5ijHq0cdQUyop50dZWKAM1au7QPjCFfFC66SH5XtQSVpLMhW0DW6kx0xI7notdmexFPNb4biKvaWpMF52defyg/oXIKn+HQNkW+Iqb/OfSg9ESopXZZTAL61TtBhTN0F6plVeOur+7xZbTCf338+X0cXEmpBt/Yx6THRbYJq5eO7YOLJg6S5ZuvrJK0YEYwXHzu4+Jo/wOahvSzRc8mQIZhZ6pHLsZ1vbM5pUrlzUwLbGx8LuZD+tojEple/KLDm+YR29nqT8qa/k9bIthIDyaixuwWNqsk9dy+t7u19ZnAM93f3fnubPlNGq1O7YMy97guX7tdKsOtI0tR8Pa36BOOqQXNMP6ja61ZMbUz6R1S2D17EU6xlKM1Clzo6ESqsR9eU2jdfLRRLuVn7O6LA1mE9ytriPzGnxz+UMSkKLu1oEmrKM5Sk7xM6jtRV1Q8Xb/UfYgbzU1/2Z3lPlA2hUQ25JZF74o3RKq8baPQVQ1euy2u6/VUpT7vs3uisTBBClb/bjbcnx4Tdut9bXLsl5eso9yNOEuOqp35e7vAdvyhXPa14G1+Tqwsoo68BXXrpfVTyYL5EV5Wa9+okpop/2n1MXS3PC+9f+t7UWtXjIX84X7/u3ubMiVx0hsq+ib+lhXzre1d5QTYUUWj182C+O0eV0uyrfUzDKPeZNo/b22Y9tp78y0VnUzBtlvLuLFyzJ0my0Z7WsdqOmWPzeMbth6P+O7yVY60+Y3sJv634j+RssT8xPlBqVdWXblsImuatPtbVdnLP/P9nU/0uL7Rrsy+3tpOQ1lfTSzf63lVKJ6YHXsCU+dXztV85impJVuXDut6sCG6SkZi27A7jWhzc2cqQPbDSnZhpZj18saZn2bQrWWpz6t+5U4axXtBXFTbVsxZI+qk+bnmItG/7LFzynPt6rHpBvCaIP3IVM4X43GbNrN7m0u1/lyrCUCgdiZs+keTLBafx0ts5i45+/GzTitalmJz8i31USKQdyCqQQ/kZeWKYtTi05Zaj+W3WwZViSP4mwPq4OTy76+oanUA1k5ILtVaS8tp9FrKa3nVnS7nDYn2HV27QQmEL8t6Vw7tg5Upi4PTH0crw68KH+pH5+fpNnqmim7dr34tzyr3TpLS6s9bVvCY+odc4dmul9arX1UW5pdKN1YPxiN0zwinWoG/LC0rtg3du1xoxPTclRWXn9qK/tv6W0mrG3F03oGrN0EIq9B3d9mtrdt9Y2u8Ls3W2a2gl/p+Ss7caIW7tesAz/X0ffYm5EJu4Vsm/Xhjl0vfo1Rx1pnGZ35ekXi+LjN7MOFLkeX3JQYG2GETKBxQbjyaTp32LBWsbo7N+Z3nFq3a4lWpKU2XbdOnKiFxNyOJhG249T14ldQr4s1MST+eJS9O4vGsluE9YBjM26bj7k1zph1QAc3jKH8UNpOlMnpzVe0xWWbcfowON3ymg7bzP528YYbXebW9eJXUAdtlm9YOk6LcxG1zMSte//PQQE6Fcrp2DeMSmbEX+1Pm7p137KsezV7mWz398rPd7P7G0iFX2PUyrSo27Ym9Qsy0dgvsek2y0J6cGe23Gb0osz7aBrIRrm3Ilv+HF64pdHBDeNtO1tXeiPaXtKUs2AVZSiMDrK5KIlqc9qUHRb4TpvTyKJxy7DVIR0L3d/HmLfhqGYduCVqGLWtA3Xm6sA1BPUy0987Ej1Zya4Xbftf6jihuTsTr+HdPb9333tYw50/kGX2dKeXxT3RigA9ZkK380IWjaXrbYmFXZxT0RpyItb/p9XJlvvCZ33ZYh4t7Pm99FCiHNaBqw/q0Nx9jq0hrMf1AfPk2jVtPQxqKWf+9buzIX205rLccukEsqrGqxpDIK3XTkdfE26Rl6Ndy1oLY/Q0qXBEurXcEvFFredwVAJbByovrhTPur5VuRu7zvXMnXWz6lGh2Zxn/px4tSZtur0jaiQ6BrTtl0mMr1HmxsAuyaT7OzXNk73e8K0O5PSsrOhkcwsg76KNi9rM9k7eIHvhpyg6NMSGtH91IOdRZ0V/J6cpRUMSdqvBS+arbeus2UJrzI+vBfqfhZs0ZFl0slUKlXXzRK2LtKpT0B9j+88FdjWOjjYsub8ODKI10rbRk5k60K+g1rr92N+sesw8KwlehGrt3ZjNLRJHpP3Ssqr5kkMyusz+5IuNh7TJkV12jDK1IyLt/6teEvRWc+LgsMStA4+2qAO/ZcZCerVKIiG+jVHPmFdyc8uvsRvT/9cuHKSxFu22SGyqiVZrm+AHtFeb77HpPCR1QmPvD8a6HrqlHHV/j+V0O1ZXxelBsSGd0zrQt67v9hWFi4cXKFMxtNufXPS0KaBXBOimo+pV8+erkiZlKm2dYp8Q3d8piHFGtFbjeW2o+DVO2W6rQKt5EbrVMRxn/fdKpwMtZbdcpNsbWWWHgdru199tpvubLUV7TA22/ZK4mwSVpP1yPcf41aK2WwU+KK1OypHoIhxTxzK3sYGWD2J+ZZz9zgE39ceZda3sqWPPrrrF2/4oWOeOQUxNaBsRjtz5x90kKM76e8f41aJunrfabl/ksrm+j6+pVW0nuzSXj/RS+66h5qS0UWEq2RJqtyAjdPtKtpN90pel2ve8KXsdJdjzNhdn/F4NS6+pqCu51YElg870LozHaCnHnZjrGP+W6NjzmNtehDJsuoh/YMJ2UDphZyaONo7Kg/oDKciR5C7kGOMuQdi6y97nddjtKptoglA4uuK/Nm+8nhCkK6pkYxyss9aWbpxjEJW5MU4yoJqNiNYHg0TruJ0rp6Z3ITy6Yt2T1GOyK3baCl9sWQfazVKadWDm6j//1lE3D4qvSOuuLcvuoT0kEw3ztcGUuUu/ZL73bmEZ058VW0ijgzDCYRMGw819h7uypZ0de9GtH68aMb+XKas3x2VsXVUWP04djtzZctTL1rSuSvMGZWWBGpXx8IB5P3Xn78LQBIMaisqBfd60DszLywSitMTp9rb7icc9HnQl9ozvCVtmdKub2vL8iVqTkhQ7a1lFw3Ira19Oze+uH0twoltF2l87h2U8OnNgen7N8vyWrHrhMZXNtVNY07XT3Cd+c9vHMRbekKLpEf2rRRNr7Y2CraOD7NaBfm54clsdMndWv5CWY9XS7NaxAWi7Smzfgw3COxaVuW5vNxua7vpYfR/msQb9NrAXFvjbi6Xc/QfoOntik97a/svsyTt67O7njBA4ResX2+5tr9fa7X2H3TDoiLR+PMmeqBUnjKKv62k5jdFIkPm60gShvvN5suxwRiCH2/5keyMTmmGJnNWBfu5OZe+YQ7VH2nWBu8L2AjTvbOM+XnvXOCgr3YjoaJzen5Zh2NFzBxfZbm8lzZ6NVuptzp6OK84KETtElmT3d5z/s9c+tqePOSDOmeH3al0HRntqZKdO8HcbSRt+oTpoPvqtZOEFizO2HkdzUwB7k3JBfAmvzm904Jp+eUHibHjxctvJovE0y0z7YGh2fyfDxXIajZ0r272f7mNqPo6k6sAZcwOyTTJUB/q93/OYOmm6wR83H30grr9g0UW8xoK6eOeepII/K+xwRxZeZ6xAt5+Zr3RFEqWm235Js/s7uW5VF8vpxzIhLjymaLOdNd402JC+qbbJd+zukyqZ3pce4GAG2w1+NPicedHGJKnCaMeaQplKcEJH01E1Mf84V/Nzp00BffzOzj1xWwx5YV/n28reRRPWWdOcNTwobVvUMTf9iUvLzyRO9/dYghtouFhObWvWlcd0VP3F6utAE/K2ofKd+S2iP5Zj5s/rkoH6YIXJZFFlbt+6NwAfmCdIR//PyjcLQQ/33I5C0Nw5Tuj9Ymd8NzeAjz9DMJoIEnVbXZRvRx93h32c39InpE9GTZ20u81jrM2PxYwv/5iiVvX9EzSS2pN56WNZ7R7RSfnraCbo55qvcTQZZ7D945k/iUyZ8cOkZnyrqGdDyUr/t1rNZjttrqUkDodJS2CXZEWvXYuJn7omRxPegOQT87o/pF4w10PrSaeFaB/qY5KUtZbTbmxtes9jsnWGbj9foBvXjnVvHTjS5nHU5uvmY/fVgfYG5GXTC6Nl8/0/oxvXS4xcVR39NSJ2u01tLhIV3TGX75lxquVKtBQhME983byNpVQRTugt0txt7O7js4+tYLp40nxcWWAnKPXJ0JLXt2aevxs8f3CGi+V0+ce0UC9WpWEeVy8ek12n/WA0yXBxHcg1DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgJ76d7JWr1zRguz5AAAAAElFTkSuQmCC`,
  pdf_footer: `data:image/png;base64,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IHADAABAAQI3AAAAFCBwAwAAQAECNwAAABQgcAMAAEABAjcAAAAUIHADAABAAQI3AAAAFCBwAwAAQAECNwAAABQgcAMAAEABAjcAAAAUIHADAABAAQI3AAAAFCBwAwAAQAECNwAAABQgcAMAAEABAjcAAAAUIHADAABAAQI3AAAAFCBwAwAAQAECNwAAABQgcAMAAEABAjcAAAAUIHADAABAAQI3AAAAFCBwAwAAQAECNwAAABQgcAMAAEABAjcAAAAUIHADAABAAQI3AAAAFCBwAwAAQAECNwAAABQgcAMAAEABAjcAAAAUIHADAABAAQI3AAAAFCBwAwAAQAECNwAAABQgcAMAAEABAjcAAAAUIHADAABAAQI3AAAAFCBwAwAAQAECNwAAABQgcAMAAEABAjcAAAAUIHADAABAAQI3AAAAFCBwAwAAQAECNwAAABQgcAMAAEABAjcAAAAUIHADAABAAQI3AAAAFCBwAwAAQAECNwAAABQgcAMAAEABAjcAAAAUIHADAABAAQI3AAAAFCBwAwAAQAECNwAAABQgcAMAAEABAjcAAAAUsG/w+moCAAAAuvBcAgAAAMr578SZwXse1w4NAAAAAElFTkSuQmCC`,
};
