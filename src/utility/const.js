export const CONSTANT = {
  DoctorRefer: ['Dr.Raju', 'Dr.Muthu', 'Dr.Chitti'],
  ConsultationList: [
    // {label: 'Reason for visit', icon: 'chevron-right', navigate: 'complaints'},
   
    {label: 'Symptoms', icon: 'chevron-right', navigate: 'symptoms'},
    {label: 'History Present Illness', icon: 'chevron-right', navigate: 'notescreen'},
    {
      label: 'Physical Examinations',
      icon: 'chevron-right',
      navigate: 'examination',
    },
    {
      label: 'Medical History',
      icon: 'chevron-right',
      navigate: 'medicalhistory',
    },

    {label: 'Diagnosis', icon: 'chevron-right', navigate: 'diagnosis'},
    {label: 'Prescribe', icon: 'chevron-right', navigate: 'pres'},
    {label: 'Test Prescribe', icon: 'chevron-right', navigate: 'labreport'},
    {
      label: 'Examination Findings',
      icon: 'chevron-right',
      navigate: 'findings',
    },
    // {label: 'Comorbidities', icon: 'chevron-right', navigate: 'commorbities'},
    // {
    //   label: 'Past Hospitalization',
    //   icon: 'chevron-right',
    //   navigate: 'medicalhistory',
    // },
    // {label: 'Allergies', icon: 'chevron-right', navigate: 'allergies'},
    {label: 'Follow-Up', icon: 'chevron-right', navigate: 'FollowUp'},

    {
      label: 'Referral',
      icon: 'chevron-right',
      navigate: 'refer',
    },
    {
      label: 'Doctor Signature',
      icon: 'chevron-right',
      navigate: 'valid',
    },

    {
      label: 'Additional Fees',
      icon: 'chevron-right',
      navigate: 'service_fees',
    },
  ],
  API_KEY: 'AIzaSyCdshQ6BDrl4SZzdo52cGRxjhSzlNdexOQ',
  test: ['Lab', 'Radiology', 'Procedure'],
};
