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
      navigate: 'physical',
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
    {label: 'Diagnosis', icon: 'pencil', navigate: 'diagnosis'},
    {label: 'Prescribe Investigation', icon: 'pencil', navigate: 'labreport'},

    {label: 'Prescribe Medicine', icon: 'pencil', navigate: 'pres'},
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
  physicaldata1: [
    {
      label: 'Consciousness',
      status: '',
      desc: '',
    },
    {
      label: 'Orientation',
      status: '',
      desc: '',
    },
    {
      label: 'Build',
      status: '',
      desc: '',
    },
    {
      label: 'Nutrition',
      status: '',
      desc: '',
    },
    {
      label: 'Hydration',
      status: '',
      desc: '',
    },
  ],
  physicaldata2: [
    {
      label: 'Pallor',
      status: '',
      desc: '',
    },
    {
      label: 'Icterus',
      status: '',
      desc: '',
    },
    {
      label: 'Cynosis',
      status: '',
      desc: '',
    },
    {
      label: 'Clubbing',
      status: '',
      desc: '',
    },
    {
      label: 'Lymphadenopathy',
      status: '',
      desc: '',
    },
    {
      label: 'Edema',
      status: '',
      desc: '',
    },
    {
      label: 'Acne',
      status: '',
      desc: '',
    },
    {
      label: 'Hirsutism',
      status: '',
      desc: '',
    },
  ],
  physicaldata3: [
    {
      label: 'Breast',
      status: '',
      desc: '',
    },
    {
      label: 'Thyroid',
      status: '',
      desc: '',
    },
    {
      label: 'C.V.S',
      status: '',
      desc: '',
    },
    {
      label: 'RS',
      status: '',
      desc: '',
    },
    {
      label: 'CNS',
      status: '',
      desc: '',
    },
    {
      label: 'P/A',
      status: '',
      desc: '',
    },
    {
      label: 'P/V',
      status: '',
      desc: '',
    },
    {
      label: 'Speculam',
      status: '',
      desc: '',
    },
  ],
};

export const capitalizeWord = word => {
  if (word.length === 0) return word;
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

export const handleGallery = async () => {
  const options = {
    mediaType: 'photo',
    includeBase64: true,
    quality: 0.5,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        resolve(null);
      } else if (response.error) {
        reject(response.error);
      } else {
        const responsedData = response?.assets?.[0];
        // console.log('====================================');
        // console.log(
        //   '========================filesize',
        //   responsedData?.fileSize,
        // );
        // console.log('====================================');
        const fileSizeLimit = 1 * 1024 * 1000;
        if (responsedData?.fileSize > fileSizeLimit) {
          Alert.alert('File size exceeds 1MB. Please select a smaller file.'),
            reject(
              new Error('File size exceeds 1MB. Please select a smaller file.'),
            );
        } else {
          const data = {
            uri: responsedData?.uri,
            base64: responsedData?.base64,
            type: responsedData?.type,
            name: responsedData?.fileName,
            size: responsedData?.fileSize,
            height: responsedData?.height,
            width: responsedData?.width,
          };
          resolve(data);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const handleCamera = async () => {
  const options = {
    mediaType: 'photo',
    quality: 0.5,
    includeBase64: true,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await launchCamera(options);

      if (response.didCancel) {
        resolve(null);
      } else if (response.error) {
        reject(response.error);
      } else {
        const responsedData = response?.assets?.[0];
        // console.log('====================================');
        // console.log(
        //   '========================filesize',
        //   responsedData?.fileSize,
        // );
        // console.log('====================================');
        const fileSizeLimit = 1 * 1024 * 1024;
        if (responsedData?.fileSize > fileSizeLimit) {
          Alert.alert('File size exceeds 1MB. Please select a smaller file.'),
            reject(
              new Error('File size exceeds 1MB. Please select a smaller file.'),
            );
        } else {
          const data = {
            uri: responsedData?.uri,
            base64: responsedData?.base64,
            type: responsedData?.type,
            name: responsedData?.fileName,
            size: responsedData?.fileSize,
            height: responsedData?.height,
            width: responsedData?.width,
          };
          resolve(data);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
const convertUriToBase64 = async documentUri => {
  try {
    const base64Data = await RNFS.readFile(documentUri, 'base64');
    return base64Data;
  } catch (error) {
    console.error('Error converting document to base64:', error);
    return null;
  }
};
export const pickSingleFile = async () => {
  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    });
    const originalFilename = result[0]?.name || '';
    const fileSize = result[0]?.size || 0;
    const maxSizeInBytes = 1 * 1024 * 1000;

    if (fileSize > maxSizeInBytes) {
      alert('File size exceeds 1MB. Please select a smaller file.');
      return null;
    }

    const base64Document = await convertUriToBase64(result[0]?.uri || '');
    const resultedData = result?.[0];
    let fileDetails = {
      name: originalFilename,
      base64uri: base64Document,
      uri: resultedData?.uri,
      type: resultedData?.type,
    };
    return fileDetails;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
    } else {
    }
  }
};
export const AppointmentDatafilterAndSortData = data => {
  const pendingItems = data?.filter(item => item.status === 'pending');
  const sortedData = pendingItems;
  const filterdata = sortedData?.sort((a, b) => {
    const startTimeA = parseInt(
      a?.appointment_slot?.split('-')[0].replace(':', ''),
      10,
    );
    const startTimeB = parseInt(
      b?.appointment_slot?.split('-')[0].replace(':', ''),
      10,
    );
    return startTimeA - startTimeB;
  });
  return filterdata;
};
export const CompletedAppointmentDatafilterAndSortData = data => {
  const completedItems = data?.filter(item => item.status === 'completed');
  const sortedData = completedItems;
  sortedData?.sort((a, b) => {
    const timeA = new Date(`2023-01-01T${a.appointment_slot?.split('-')[0]}`);
    const timeB = new Date(`2023-01-01T${b.appointment_slot?.split('-')[0]}`);

    return timeA - timeB;
  });
  const sorteddata = sortedData;
  return sorteddata;
};
import {CONSTANTS} from './constant';
import {Alert} from 'react-native';
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
    let dummyvariable = result?.map((item, _) => {
      let obj = monthlyCounts.filter(e => e.month === item);
      if (obj.length > 0) {
        return {month: obj[0]?.month, count: obj[0]?.count};
      } else {
        return {month: item, count: 0};
      }
    });
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

export const feeDataInyear = (data, startDate, endDate) => {
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
  const result = generateMonthSeries(startDate, endDate);
  function filterDataByDateRange(startDate, endDate) {
    return data.filter(entry => {
      const entryDate = new Date(entry.created_at);
      return entryDate >= startDate;
    });
  }
  let totalFees = 0;
  const Fess_date_range = filterDataByDateRange(
    new Date(startDate),
    new Date(endDate),
  );
  const monthlyData = {};
  Fess_date_range.forEach(entry => {
    const entryDate = new Date(entry.created_at);
    const year = entryDate.getFullYear().toString();
    const month = entryDate.toISOString().slice(0, 7);
    if (!monthlyData[year]) {
      monthlyData[year] = {};
    }
    if (!monthlyData[year][month]) {
      monthlyData[year][month] = [];
    }
    monthlyData[year][month].push(entry);
  });
  const feeItems = [];
  for (const year in monthlyData) {
    if (monthlyData.hasOwnProperty(year)) {
      for (const month in monthlyData[year]) {
        if (monthlyData[year].hasOwnProperty(month)) {
          monthlyData[year][month]?.map(item => {
            const fees = JSON.parse(item?.fees);
            totalFees += parseInt(fees[fees?.length - 1]?.totalFees);
          });
          feeItems.push({
            month: `${months[month?.split('-')[1]]}-${month?.split('-')[0]}`,
            fees: totalFees,
          });
          // return feeItems;
        }
      }
    }
  }
  if (feeItems?.length > 0) {
    let dummyvariable = result?.map((item, _) => {
      let obj = feeItems.filter(e => e.month === item);
      if (obj.length > 0) {
        return {month: obj[0]?.month, fees: obj[0]?.fees};
      } else {
        return {month: item, fees: 0};
      }
    });
    return dummyvariable;
  }
};

export const feeDataIneachday = (data, startDate, endDate) => {
  // function filterDataByDateRange(startDate, endDate) {
  //   return data.filter(entry => {
  //     const entryDate = new Date(entry.created_at);
  //     return entryDate >= startDate;
  //   });
  // }

  // const feesDataInRange = filterDataByDateRange(
  //   new Date(startDate),
  //   new Date(endDate),
  // );
  const dailyData = {};

  data.forEach(entry => {
    const entryDate = new Date(entry.created_at);
    const year = entryDate.getFullYear().toString();
    const month = entryDate.toLocaleString('default', {month: 'long'});
    const day = entryDate.toISOString().slice(0, 10);
    if (!dailyData[year]) {
      dailyData[year] = {};
    }

    if (!dailyData[year][month]) {
      dailyData[year][month] = {};
    }

    if (!dailyData[year][month][day]) {
      dailyData[year][month][day] = [];
    }

    dailyData[year][month][day].push(entry);
  });
  const dailyFeeItems = {};

  const start = new Date(startDate);
  const end = new Date(endDate);
  while (start <= end) {
    const year = start.getFullYear().toString();
    const month = start.toLocaleString('default', {month: 'long'});
    const day = start.toISOString().slice(0, 10);
    if (
      !dailyData[year] ||
      !dailyData[year][month] ||
      !dailyData[year][month][day]
    ) {
      dailyFeeItems[day] = 0;
    } else {
      let totalFees = 0;
      dailyData[year][month][day]?.map(item => {
        const fees = JSON.parse(item?.fees);
        totalFees += parseInt(fees[fees?.length - 1]?.totalFees);
      });
      dailyFeeItems[day] = totalFees;
    }
    start.setDate(start.getDate() + 1);
  }

  return dailyFeeItems;
};

import Toast from 'react-native-toast-message';
import {moderateScale} from './scaleDimension';

export const showToast = (type, text) => {
  Toast.show({
    type: type,
    text1: text,
    text1Style: {fontSize: moderateScale(16)},
  });
};

export const sortTimeIntervals = timeIntervals => {
  const sortedIntervals = timeIntervals.slice().sort((a, b) => {
    const getUnitOrder = unit => {
      switch (unit) {
        case 'year':
        case 'years':
          return 0;
        case 'month':
        case 'months':
          return 1;
        case 'day':
        case 'days':
          return 2;
        case 'hr':
        case 'hrs':
        case 'hour':
        case 'hours':
          return 3;
        default:
          return Infinity;
      }
    };

    const unitA = a.toLowerCase().replace(/\d+/g, '');
    const unitB = b.toLowerCase().replace(/\d+/g, '');

    const orderA = getUnitOrder(unitA);
    const orderB = getUnitOrder(unitB);

    return orderA - orderB;
  });

  return sortedIntervals;
};

export const handleAddDates = (selectedDate, daysToAdd) => {
  let startDate = new Date(selectedDate);
  let numberOfDaysToAdd = parseInt(daysToAdd);
  let endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + numberOfDaysToAdd);
  let formattedEndDate = endDate.toISOString().substring(0, 10);
  const day = formattedEndDate.split('-')[2];
  const year = formattedEndDate.split('-')[0];
  const month = `${formattedEndDate.split('-')[1]}`;
  const updateDate = `${year}-${month}-${day}`;
  return updateDate;
};

export const calculateWeeksAndDaysFromDate = startDateStr => {
  const startDate = new Date(startDateStr);
  const today = new Date();
  const diffInMilliseconds = today - startDate;
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffInDays / 7);
  const days = diffInDays % 7;
  return {weeks, days};
};
export const formatdate = strdate => {
  const date = `${strdate.split('-')[2]}-${months[strdate.split('-')[1]]}-${
    strdate.split('-')[0]
  }`;
  return date;
};
import {Dimensions, PixelRatio} from 'react-native';

export const isTablet = () => {
  const window = Dimensions.get('window');
  const scale = PixelRatio.get();
  const windowWidthInches = window.width / scale / 160;
  const windowHeightInches = window.height / scale / 160;
  const screenDiagonal = Math.sqrt(
    windowWidthInches ** 2 + windowHeightInches ** 2,
  );
  return screenDiagonal >= 3;
};
import BlobUtil from 'react-native-blob-util';

export const fetchPdfAndSaveToLocalFile = async contentUri => {
  try {
    // Fetch the content from the URI
    const response = await BlobUtil.fetch('GET', contentUri);

    // Convert the content to a base64 string
    const base64String = response.data;

    // Return the base64 string
    return base64String;
  } catch (error) {
    console.error('Error fetching document:', error);
    return null;
  }
};
