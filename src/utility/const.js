export const CONSTANT = {
  DoctorRefer: ['Dr.Raju', 'Dr.Muthu', 'Dr.Chitti'],
  ConsultationList: [
    // {label: 'Reason for visit', icon: 'chevron-right', navigate: 'complaints'},

    {label: 'Symptoms', icon: 'chevron-right', navigate: 'symptoms'},
    {
      label: 'History Present Illness',
      icon: 'chevron-right',
      navigate: 'notescreen',
    },
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
      label: 'Report Findings',
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
    // {
    //   label: 'Doctor Signature',
    //   icon: 'chevron-right',
    //   navigate: 'valid',
    // },

    {
      label: 'Additional Fees',
      icon: 'chevron-right',
      navigate: 'service_fees',
    },
  ],
  API_KEY: 'AIzaSyCdshQ6BDrl4SZzdo52cGRxjhSzlNdexOQ',
  test: ['Lab', 'Radiology', 'Procedure'],
  micro_biology: [
    {
      term: 'Culture & Sensitivity(Blood)',
    },
    {
      term: 'TB Culture',
    },
    {
      term: 'Fungual Culture',
    },
    {
      term: 'Gram’s Stain',
    },
    {
      term: 'AFB Stain',
    },
    {
      term: 'Fungal Stain',
    },
    {
      term: 'Widal',
    },
    {
      term: 'A.S.O.Titre',
    },
    {
      term: 'C-Reactive Protein',
    },
    {
      term: 'Procalcitonin',
    },
    {
      term: 'R.A. Factor',
    },
    {
      term: 'ANA',
    },
    {
      term: 'ANA Profile',
    },
    {
      term: 'TORCH (lgM &igG)',
    },
    {
      term: 'HBs Ag',
    },
    {
      term: 'HCV',
    },
    {
      term: 'Retroviral Screening Test',
    },
    {
      term: 'Anti HBs Ag Titre',
    },
    {
      term: 'Leptospira IgM',
    },
    {
      term: 'Dengue Test',
    },
    {
      term: 'Culture & Sensitivity',
    },
    {
      term: 'Anti CCP',
    },
    {
      term: 'V.D.R.L',
    },
    {
      term: 'Stool routine examination',
    },
    {
      term: 'Vasculities Profile',
    },
  ],
  clinical_pathology: [
    {
      term: 'CBP(Hb,TC,DC,PIt.)',
    },
    {
      term: 'E.S.R',
    },
    {
      term: 'Peripheral Smear(PS)',
    },
    {
      term: 'Hemogram(CBP+ESR+PS+Blood Indices',
    },
    {
      term: 'Hemoglobin',
    },
    {
      term: 'Blood Smear for Malarial Parasite',
    },
    {
      term: 'Blood Smear for Micro Filaria',
    },
    {
      term: 'Stool Reducing Substances',
    },
    {
      term: 'Urine Bence Jones Protein (Qualitative)',
    },
    {
      term: 'Reticulocyte Count',
    },
    {
      term: 'A.E.C',
    },
    {
      term: 'Blood Grouping &Rh.typing',
    },
    {
      term: 'Coomb’s test(Direct / Indirect)',
    },
    {
      term: 'Osmotic Fragility Screening Test',
    },
    {
      term: 'Sickling Test',
    },
    {
      term: 'Urine Routine (AIB/Sugar/Microscopy)',
    },
    {
      term: 'Stool Occult Blood',
    },
    {
      term: 'Complete Urine Exmination (CUE)',
    },
    {
      term: 'Urine Pregnancy Test',
    },
    {
      term: 'Urine for Bile Salts / Bile Pigments',
    },
    {
      term: 'Urine for dysmorphic RBC',
    },
    {
      term: 'Urine for Chyle',
    },
    {
      term: 'Cell Count (Body Fluids / CSF)',
    },
    {
      term: 'Semen Analysis',
    },
    {
      term: 'Inj sulbacef',
    },
    {
      term: 'Inj dolokind aqua',
    },
  ],
};

export const capitalizeWord = word => {
  if (word.length === 0) return word;
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};
