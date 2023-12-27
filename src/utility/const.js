export const CONSTANT = {
  DoctorRefer: ['Dr.Raju', 'Dr.Muthu', 'Dr.Chitti'],
  ConsultationList: [
    // {label: 'Reason for visit', icon: 'chevron-right', navigate: 'complaints'},

    {label: 'Symptoms', icon: 'pencil', navigate: 'symptoms'},
    {
      label: 'History of Present Illness',
      icon: 'pencil',
      navigate: 'notescreen',
    },
    {
      label: 'Physical Examinations',
      icon: 'pencil',
      navigate: 'examination',
    },
    {
      label: 'Medical History',
      icon: 'pencil',
      navigate: 'medicalhistory',
    },
    {
      label: 'Report Findings',
      icon: 'pencil',
      navigate: 'findings',
    },
    {label: 'Test Prescribe', icon: 'pencil', navigate: 'labreport'},
    {label: 'Diagnosis', icon: 'pencil', navigate: 'diagnosis'},
    {label: 'Prescribe', icon: 'pencil', navigate: 'pres'},
    {label: 'Doctor Notes', icon: 'stethoscope', navigate: 'additional'},

    {label: 'Follow-Up', icon: 'pencil', navigate: 'FollowUp'},
    {label: 'Advice', icon: 'pencil', navigate: 'advice'},
    {
      label: 'Fees',
      icon: 'pencil',
      navigate: 'service_fees',
    },
    {
      label: 'Referral',
      icon: 'pencil',
      navigate: 'refer',
    },

    // {label: 'Comorbidities', icon: 'chevron-right', navigate: 'commorbities'},
    // {
    //   label: 'Past Hospitalization',
    //   icon: 'chevron-right',
    //   navigate: 'medicalhistory',
    // },
    // {label: 'Allergies', icon: 'chevron-right', navigate: 'allergies'},

    // {
    //   label: 'Doctor Signature',
    //   icon: 'chevron-right',
    //   navigate: 'valid',
    // },
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
  blood: [
    {
      term: 'Blood Glucose(Fasting/P-Prandial/Random)',
    },
    {
      term: 'GTT(Routine/ Extended)',
    },
    {
      term: 'HbA,C',
    },
    {
      term: 'Urea',
    },
    {
      term: 'Creatinine',
    },
    {
      term: 'Sodium',
    },
    {
      term: 'Potassium',
    },
    {
      term: 'Chloride',
    },
    {
      term: 'Magnesium',
    },
    {
      term: 'Calcium',
    },
    {
      term: 'Phosphorus',
    },
    {
      term: 'Uric Acid',
    },
    {
      term: 'Fasting lipid Profile(FLP)',
    },
    {
      term: 'Total Cholesterol',
    },
    {
      term: 'Triglycerides',
    },
    {
      term: 'HDL Cholesterol',
    },
    {
      term: 'LDL Cholesterol',
    },
    {
      term: 'VLDL Cholesterol',
    },
    {
      term: 'Liver Function Tests (LFT)',
    },
    {
      term: 'Total Bilirubin',
    },
    {
      term: 'Direct Bilirubin',
    },
    {
      term: 'AlK. Phosphatase /ALP / SAP',
    },
    {
      term: 'SGOT / AST',
    },
    {
      term: 'SGPT / ALT',
    },
    {
      term: 'Total Proteins',
    },
    {
      term: 'Albumin',
    },
    {
      term: 'Globulin',
    },
    {
      term: 'S.Amylase',
    },
    {
      term: 'S.Lipase',
    },
    {
      term: 'Gamma GT',
    },
    {
      term: 'CPK',
    },
    {
      term: 'CK-MB',
    },
    {
      term: 'Troponine-1',
    },
    {
      term: 'Ammonia',
    },
    {
      term: 'ASA',
    },
    {
      term: 'LDH',
    },
    {
      term: 'Osmolality',
    },
    {
      term: 'IRON',
    },
    {
      term: 'TIBC',
    },
    {
      term: 'Ferritin',
    },
    {
      term: 'Biochemical Analysis(CSF/Body Fluids)',
    },
  ],
  urine: [
    {
      term: '24 hrs. / Spot Protein',
    },
    {
      term: '24 hrs. / Spot Creatinine',
    },
    {
      term: 'MIcro Albumin',
    },
    {
      term: 'Osmolality',
    },
    {
      term: 'Spot Sodium',
    },
    {
      term: 'Spot Potassium ',
    },
  ],
  coagulation_assays: [
    {
      term: 'PT',
    },
    {
      term: 'APTT',
    },
  ],
  hormones: [
    {
      term: 'Thyroid Profile (T3,T4,TSH)',
    },
    {
      term: 'T3',
    },
    {
      term: 'TSH',
    },
    {
      term: 'LH',
    },
    {
      term: 'Prolactin',
    },
    {
      term: 'Beta h-CG',
    },
    {
      term: 'Testosterone',
    },
    {
      term: 'T4',
    },
    {
      term: 'FSH',
    },
    {
      term: 'Free T3',
    },
    {
      term: 'Free T4',
    },
    {
      term: 'Estradiol',
    },
    {
      term: 'PTH',
    },
  ],
  tumor_markers: [
    {
      term: 'PSA',
    },
    {
      term: 'ASP',
    },
    {
      term: 'CA125',
    },
    {
      term: 'CA 19-9',
    },
    {
      term: 'C.E.A',
    },
  ],
  vitamin_assays: [
    {
      term: 'Vit D',
    },
    {
      term: 'Vit B12',
    },
  ],

  HistoryTypes: [
    'Prescription',
    'Referral',
    'Report Finding',
    'Physical Examination',
  ],
};

export const capitalizeWord = word => {
  if (word.length === 0) return word;
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export const AppointmentDatafilterAndSortData = data => {
  const completedItems = data?.filter(item => item.status === 'completed');
  const pendingItems = data?.filter(item => item.status === 'pending');
  const sortedData = pendingItems;
  sortedData?.sort((a, b) => {
    const timeA = new Date(`2023-01-01T${a.appointment_time?.split('-')[0]}`);
    const timeB = new Date(`2023-01-01T${b.appointment_time?.split('-')[0]}`);

    return timeA - timeB;
  });
  const sorteddata = sortedData?.concat(completedItems);
  return sorteddata;
};
import {CONSTANTS} from './constant';
const months = CONSTANTS.months;

export const AppointmentsInAYear = (data, start_date, end_date) => {
  function generateMonthSeries(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthSeries = [];
    while (start <= end) {
      const month = start.toLocaleString('default', {month: 'short'});
      const year = start.getFullYear();
      const monthString = `${month}-${year}`;

      monthSeries.push(monthString);
      start.setMonth(start.getMonth() + 1);
    }

    return monthSeries;
  }
  const result = generateMonthSeries(start_date, end_date);
  // console.log('====================================');
  // console.log('=========dates', start_date, end_date, data);
  // console.log('====================================');
  const monthlyCounts = [];
  data.forEach(appointment => {
    const date = new Date(appointment.appointment_date);
    const monthYear = `${months[date.getMonth() + 1]}-${date.getFullYear()}`;
    const existingMonth = monthlyCounts.find(
      entry => entry.month === monthYear,
    );
    if (existingMonth) {
      existingMonth.count++;
    } else {
      monthlyCounts.push({month: monthYear, count: 1});
    }
  });
  if (monthlyCounts?.length > 0) {
    console.log('====================================');
    console.log(result, monthlyCounts);
    console.log('====================================');
    let dummyvariable = result?.map((item, _) => {
      let obj = monthlyCounts.filter(e => e.month === item);
      if (obj.length > 0) {
        return {month: obj[0]?.month, count: obj[0]?.count};
      } else {
        return {month: item, count: 0};
      }
    });
    console.log('====================================');
    console.log('======dummy', dummyvariable);
    console.log('====================================');
    return dummyvariable;
  }
};

export const AppointmentsInAMonth = (data, startDate, endDate) => {
  const dailyCounts = {};
  data.forEach(appointment => {
    const date = new Date(appointment.appointment_date);
    const dayKey = date.toISOString().split('T')[0];
    if (!dailyCounts[dayKey]) {
      dailyCounts[dayKey] = 0;
    }
    dailyCounts[dayKey]++;
  });
  const EveryDayresult = {};
  const currentDate = new Date(startDate);
  const endDateTime = new Date(endDate).getTime();
  while (currentDate.getTime() <= endDateTime) {
    const formattedDate = currentDate.toISOString().split('T')[0];
    EveryDayresult[formattedDate] = dailyCounts[formattedDate] || 0;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return EveryDayresult;
};

// export const Appointments = (data, startDate, endDate) => {
//   const dailyCounts = {};
//   data.forEach(appointment => {
//     const date = new Date(appointment.appointment_date);
//     const dayKey = date.toISOString().split('T')[0];
//     if (!dailyCounts[dayKey]) {
//       dailyCounts[dayKey] = 0;
//     }
//     dailyCounts[dayKey]++;
//   });
//   const EveryDayresult = {};
//   const currentDate = new Date(startDate);
//   const endDateTime = new Date(endDate).getTime();
//   while (currentDate.getTime() <= endDateTime) {
//     const formattedDate = new Date(currentDate - 30).getMonth();
//     EveryDayresult[formattedDate] = dailyCounts[formattedDate] || 0;
//     currentDate.setDate(currentDate.getDate() + 1);
//   }
//   return EveryDayresult;
// };

export const WeekdaysData = data => {
  const weekname = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dateday = [];
  for (const date in data) {
    if (data.hasOwnProperty(date)) {
      const dateObject = new Date(date);
      const weekDay = dateObject.getDay();
      const dayName = weekname[weekDay];
      dateday.push({
        day: dayName,
        value: data[date],
      });
    }
  }
  return dateday;
};
