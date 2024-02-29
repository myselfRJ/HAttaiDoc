import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import AlertMessage from './Alerts';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import VisitOpen from '../components/visitopen';
import HeaderAvatar from '../components/headeravatar';
import PlusButton from '../components/plusbtn';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Language} from '../settings/customlanguage';
import {language} from '../settings/userpreferences';
import {useSelector, useDispatch} from 'react-redux';
import {getDate} from '../redux/features/prescription/Followupslice';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import HButton from '../components/button';
import {ScrollView} from 'react-native-gesture-handler';
import {BottomSheetView, StatusMessage} from '../components';
import {
  CONSTANT,
  calculateWeeksAndDaysFromDate,
  formatdate,
} from '../utility/const';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import Prescribe1 from './prescibe1';
import {useFocusEffect} from '@react-navigation/native';
import {
  UpadteVitals,
  UpadateCheifComplaint,
  addCheifComplaint,
  addfees,
  addFindings,
} from '../redux/features/prescription/prescriptionSlice';
import VitalScreen from './vitalscreen';
import {CONSTANTS} from '../utility/constant';
import Seperator from '../components/seperator';
import PDFViewer from '../components/PdfViewer';
import {PermmisionStorage} from '../utility/permissions';
import {addAllergies} from '../redux/features/prescription/allergies';
import {
  addcommorbiditis,
  addfamilyHistory,
  addmedicationHistory,
  addsocialHistory,
} from '../redux/features/prescription/pastHistory';
import {clearStorage} from '../utility/AsyncStorage';

const Visit = ({navigation, route}) => {
  const token = useSelector(state => state.authenticate.auth.access);
  const {phone} = useSelector(state => state?.phone?.data);
  const [visible, setVisible] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [prevLoad, setPrevLoad] = useState(false);
  const dispatch = useDispatch();
  const [physicalExamination, setPhysicalExamination] = useState({
    body_parts: '',
    general: '',
    piccle: '',
  });
  const appointmentID = useSelector(state => state?.address?.appointment_id);
  const follow_up = useSelector(state => state?.dateTime?.date);
  const date =
    follow_up?.length > 0
      ? follow_up
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)[0]?.date
      : '';
  const dia = useSelector(state => state?.diagnosis?.DiagnosisItems);
  const diagnosis =
    dia?.length > 0
      ? dia?.filter(item => item?.appointment_id === appointmentID)
      : [];
  const adn = useSelector(state => state?.prescription?.additional_notes);
  const notes =
    adn?.length > 0
      ? adn
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.ad_notes
      : '';
  const vital = useSelector(state => state.prescription.vitalsData);
  const vitalsData =
    vital?.length > 0
      ? vital
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.vitals
      : {};
  const phy = useSelector(state => state.prescription.physicalExamination);
  const physical =
    phy?.length > 0
      ? phy
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.data
      : {};
  const reptr = useSelector(state => state.prescription.eaxminationFindings);
  const notess = useSelector(state => state.prescription.note);
  const note =
    notess?.length > 0
      ? notess
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.note
      : '';
  const selectedComplaint = useSelector(
    state => state.prescription.selectedComplaint,
  );
  const selectedDoc = useSelector(state => state?.prescription?.selectedDoctor);
  const selectedDoctor =
    selectedDoc?.length > 0
      ? selectedDoc?.filter(item => item?.appointment_id === appointmentID)
      : [];
  const symp = useSelector(state => state.symptoms.symptom);
  const Symptom =
    symp?.length > 0
      ? symp?.filter(item => item?.appointment_id === appointmentID)
      : [];
  const dummyPrescribe = useSelector(state => state.pres.prescribeItems);
  const Prescribe =
    dummyPrescribe?.length > 0
      ? dummyPrescribe?.filter(item => item?.appointment_id === appointmentID)
      : [];
  const checkOthersmed =
    Prescribe?.length > 0
      ? Prescribe?.filter(item => item?.mode === 'Others')
      : [];

  const commorbities = useSelector(
    state => state?.commorbities?.commorbitiesItems,
  );
  const red = useSelector(state => state?.pasthistory?.red_flag);
  // const redFlag =
  //   red?.length > 0
  //     ? red?.filter(item => item?.appointment_id === appointmentID)
  //     : [];
  // console.log('====================================');
  // console.log('red flag0', redFlag);
  // console.log('====================================');
  const allergy = useSelector(state => state?.allergies?.allergies);
  const allergies =
    allergy?.length > 0
      ? allergy?.filter(item => item?.appointment_id === appointmentID)
      : [];
  const lab = useSelector(state => state?.labreport?.labReport);
  const labreport =
    lab?.length > 0
      ? lab?.filter(item => item?.appointment_id === appointmentID)
      : [];
  const dateTimeRed = useSelector(state => state.valid?.valid);
  const hosp = useSelector(state => state?.pasthistory?.hospitalization);
  const hospitalization =
    hosp?.length > 0
      ? hosp
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.hospitalization
      : '';
  const medication_history = useSelector(
    state => state?.pasthistory?.medicationHistory,
  );
  const medicationHistory =
    medication_history?.length > 0
      ? medication_history
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.medicationHistory
      : '';
  const mens = useSelector(state => state?.pasthistory?.menstrualHistory);
  const menstrualHistory =
    mens?.length > 0
      ? mens
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.mens
      : {};

  const obs = useSelector(state => state?.pasthistory?.obstericHistory);
  const obstericHistory =
    obs?.length > 0
      ? obs
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.mens
      : {};

  const mars = useSelector(state => state?.pasthistory?.martialHistory);
  const martialHistory =
    mars?.length > 0
      ? mars
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.mens
      : {};

  const com = useSelector(state => state?.pasthistory?.commorbidities);
  const commor =
    com?.length > 0
      ? com
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.map(item => ({commorbities: item?.commorbities}))
      : [];
  const sochstry = useSelector(state => state?.pasthistory?.socialHistory);
  const socialHistory =
    sochstry?.length > 0
      ? sochstry
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.map(item => ({social: item?.social}))
      : [];
  const fhstry = useSelector(state => state?.pasthistory?.familyHistory);
  const familyHistory =
    fhstry?.length > 0
      ? fhstry
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.map(item => ({family: item?.family, relation: item?.relation}))
      : [];
  const service_fees = useSelector(state => state.prescription.fees);
  const charge =
    service_fees?.length > 0 ? service_fees?.[service_fees?.length - 1] : null;
  const proce = useSelector(state => state.pasthistory.procedures);
  const procedure =
    proce?.length > 0
      ? proce
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.procedure
      : '';
  const rflag = useSelector(state => state.pasthistory.red_flag);
  const redflag =
    rflag?.length > 0
      ? rflag
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.redflag
      : '';
  const adv = useSelector(state => state?.pasthistory?.advice);
  console.log('====================================');
  console.log('red', redflag);
  console.log('====================================');
  const advices =
    adv?.length > 0
      ? adv?.filter(item => item?.appointment_id === appointmentID)
      : [];

  const status =
    adv?.length > 0
      ? adv
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)[0]?.status
      : '';
  const logo = useSelector(state => state?.clinicid?.clinic_logo);
  const {
    bloodGroup,
    consultation_fees,
    name,
    gende,
    age,
    patient_phone,
    appointment_id,
    complaint,
    patient_profile_pic,
    reference_id,
  } = route.params;

  const Clinic_id = useSelector(state => state?.clinicid?.clinic_id);
  const handlePhysical = data => {
    try {
      const body_parts = JSON.parse(data?.body_parts_examination);
      const general = JSON.parse(data?.generalExamination);
      const piccle = JSON.parse(data?.piccle);
      setPhysicalExamination({
        body_parts: body_parts,
        general: general,
        piccle: piccle,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllergyData = async () => {
    const response = await fetchApi(URL.getAllergy(patient_phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      const allergiesData = jsonData?.data?.map(item => ({
        allergies: item?.allergies,
      }));
      const uniqueArray = allergiesData?.filter((item, index) => {
        return (
          index ===
          allergiesData?.findIndex(obj => obj.allergies === item?.allergies)
        );
      });
      dispatch(addAllergies([...allergy, ...uniqueArray]));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };

  const [chief_complaint, setComplaint] = useState('');
  const [vitals, setVitals] = useState({});
  const consultationData = {
    prescribe: Prescribe,

    symptoms: Symptom,

    chief_complaint: selectedComplaint,
    vitals: vitalsData,
    refer_to_doctor: selectedDoctor,
    // ?selectedDoctor:JSON.stringify( {"doctor_name": "", "phone": "", "speciality": ""}),
    follow_up: date,
    note: JSON.stringify({note: note, additional_notes: notes}),
    diagnosis: diagnosis,
    labReports: labreport?.map(item => ({
      lab_test: JSON.stringify({lab_test: item?.lab_test, date: item?.date}),
    })),
    // commoribities: commorbities,
    allergies: allergies,
    pastHistory: {
      past_history: JSON.stringify(hospitalization),
      commoribities: JSON.stringify(commor),
      social_history: JSON.stringify(socialHistory),
      family_history: JSON.stringify(familyHistory),
      medication_history: JSON.stringify(medicationHistory),
      mensutral_history: JSON.stringify(menstrualHistory),
      obsteric_history: JSON.stringify(obstericHistory),
      martial_history: JSON.stringify(martialHistory),
      procedures: procedure,
      red_flag: redflag,
    },

    meta_data: {
      patient_phone_number: patient_phone,
      doctor_phone_number: phone,
      clinic_id: Clinic_id,
      appointment_id: appointment_id,
    },
  };
  const doc_prof = useSelector(state => state?.doctor_profile?.doctor_profile);
  const [data, setData] = useState();

  const UpdateVitals = {
    weight: vitalsData?.weight,
    height: vitalsData?.height,
    bmi: vitalsData?.bmi,
    patient_phone_number: patient_phone,
    doctor_phone_number: phone,
    clinic_id: Clinic_id,
    appointment_id: appointment_id,
  };

  const UpdateComplaint = {
    complaint_message: selectedComplaint,
    patient_phone_number: patient_phone,
    doctor_phone_number: phone,
    clinic_id: Clinic_id,
    appointment_id: appointment_id,
  };

  const fetchComplaint = async () => {
    const response = await fetchApi(URL.updateComplaints(appointment_id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      if (jsonData?.data?.complaint_message) {
        dispatch(UpadateCheifComplaint(jsonData?.data?.complaint_message));
      }

      setComplaint(jsonData?.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };

  const fetchVitals = async () => {
    const response = await fetchApi(URL.updatevitlas(appointment_id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setVitals(jsonData?.data);
      const data = vital?.filter(
        item => item?.appointment_id === appointmentID,
      );
      if (data?.length === 0) {
        dispatch(
          UpadteVitals([
            ...vital,
            {vitals: jsonData?.data, appointment_id: appointmentID},
          ]),
        );
      }
    } else {
      console.error('API call failed:', response.status, response);
    }
  };

  const [serviceFees, setServiceFees] = useState([]);
  const [consultation, setConsultationFees] = useState();
  const GetFees = async () => {
    const response = await fetchApi(URL.updateFees(appointment_id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();

      if (jsonData?.data?.fees) {
        const fees = JSON.parse(jsonData?.data?.fees);
        dispatch(addfees(fees));
        setServiceFees(fees);
        const consultation_fees = fees?.filter(
          item => item?.service_name === 'Consultation Fees',
        );
        setConsultationFees(
          consultation_fees?.length > 0 ? consultation_fees[0] : null,
        );
      }
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  const [report, setreport] = useState({});
  const fetchReport = async () => {
    const response = await fetchApi(URL.get_reports(appointment_id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setreport(jsonData?.data);
      try {
        const parsed = JSON.parse(jsonData?.data?.description);
        dispatch(addFindings({describe: parsed}));
      } catch (err) {
        console.log(err);
      }
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    handlePhysical(physical);
  }, [physical]);

  useEffect(() => {
    // clearStorage();
    // fetchReport();
    // GetFees();
    fetchVitals();
    fetchComplaint();
    setData(doc_prof);
    dispatch(
      addfees([
        {
          service_name: `Consultation Fees`,
          charge: parseInt(consultation_fees),
        },
        {totalFees: parseInt(consultation_fees)},
      ]),
    );
    dispatch(addCheifComplaint(complaint));
    fetchAllergyData();
    // SetUploadDocument(report_findings)
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchReport();
      GetFees();
      handlePhysical(physical);
      setData(doc_prof);
    }, []),
  );
  useFocusEffect(
    React.useCallback(() => {
      handlePhysical(physical);
    }, [physical]),
  );
  const months = CONSTANTS.months;
  const month = vitalsData?.LDD ? vitalsData?.LDD.split('-')[1] : '';
  const day = vitalsData?.LDD ? vitalsData?.LDD.split('-')[2] : '';
  const Year = vitalsData?.LDD ? vitalsData?.LDD.split('-')[0] : '';
  const clinic_name = useSelector(state => state?.clinicid?.clinic_name);
  const clinic_Address = useSelector(state => state?.clinicid?.clinic_Address);
  const clinic_phone = useSelector(state => state?.clinicid?.clinic_phone);
  const logo_url = `data:image/png;base64,${logo}`;
  const sign = useSelector(state => state?.sign?.sign);
  // const Sign_base64 = sign
  //   ? `data:image/jpeg;base64,${sign}`
  //   : data?.doctor_name;
  const Sign_base64 = `${data?.doctor_name}`;
  const week_days = calculateWeeksAndDaysFromDate(vitalsData?.LDD);
  const physicalFilter = [
    ...physicalExamination.body_parts,
    ...physicalExamination?.general,
    ...physicalExamination?.piccle,
  ]?.filter(item => item?.status !== '');
  const createPDF = async () => {
    if (await PermmisionStorage()) {
      // setPrevLoad(!prevLoad)

      let options = {
        html: `<!DOCTYPE html>
      <style>
      body {width: 827px; height:1169px;}
      header {width:inherit;position:fixed;top:12px;left:12px;justify-content:center;align-items:center;}
       text {font-size: 14px;padding:1px;font-weight: 300;letter-spacing:0.5px}

      h5 {margin: 1px;padding: 0px; font-size:14px;color:#4ba5fa}
      tr {display:flex;font-size:14px;justify-content: space-between;width:100%;padding:8px;align-items:flex-start;}
      td{justify-content: space-around;font-size: 10px;}
      .doctor-head text {color:#4ba5fa;font-weight:600}
      
      </style>
      
      <body >
          <header >
          <div style="display:flex;height:80px;width:inherit;flex-direction:row;justify-content:space-between;align-items:center;border-bottom:2px solid black">
              <div style="display:flex;flex-direction: row; gap:1rem; position:absolute";left:16px;border:1px solid black>
                  <img src=${
                    logo === CONSTANTS.default_image
                      ? CONSTANTS.default_clinic_logo
                      : logo_url
                  }
                  style="height:48px;width:48px">
              </img>
              <div class="doctor-head" style="display:flex;flex-direction: column;align-items:flex-start;">
                  <text>
                  ${`${
                    data?.doctor_name?.includes('Dr')
                      ? `${data?.doctor_name}`
                      : `Dr. ${data?.doctor_name}`
                  }`}
                  </text>
                  <text>
                      ${data?.specialization}
                  </text>
                  <text>
                     Reg No. ${data?.medical_number}
                  </text>
              </div>
          
          
              </div>
              <div style="display:flex;flex-direction: column;gap:2px; align-items: flex-end;position:absolute;right:12px">
                 <h5>
                  ${clinic_name}
                 <h5>
                 <text style="font-size: 10px;">
                  Phone: ${clinic_phone} / Address: ${clinic_Address}
                 </text>
              </div>
              <div>
          
          </header>
          <div style="page-break-after: auto;padding:1rem;gap:8px;margin-top:100px">
              <div style="gap:8px;" >
          <div style="display:flex;justify-content: space-between;align-items:center;">
              <img src=${CONSTANTS.prescription_logo}
              style="height:28px;width:24px;">
          </img>
          <text style="font-size: 10px;">
             Date: ${new Date().toISOString().split('T')[0]} Time:${
          new Date().toString().split(' ')[4]
        }
             </text>
          </div>
          <div>
              <text>${name}  | ${gende} | ${age} | ${patient_phone} ${
          reference_id ? `| ${reference_id}` : ''
        }</text>
          </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px;margin-top:16px">
          <div>
              <h5>
                 Reason for Visit
              </h5>
              <text>
              ${selectedComplaint}
              </text>
          </div>
          ${
            Symptom?.length > 0
              ? `<div>
              <h5>
                  Symptom
              </h5>
              <text>
                  ${Symptom?.map(value => value.symptom).join(', ')}
              </text>
          </div>`
              : ''
          } 
          ${
            note?.length > 0
              ? `<div>
              <h5>
                  History of Present illness
              </h5>
              <text>
                  ${note}
              </text>
          </div>`
              : ''
          }
          ${
            vitalsData?.weight &&
            vitalsData?.height &&
            vitalsData?.bp?.bp?.length === 1 &&
            vitalsData?.vits?.vitals?.length === 1 &&
            vitalsData?.bmi
              ? `<div>
              <h5>
                  Vitals
              </h5>
              <text>
                  ${
                    vitalsData?.vits?.vitals?.[0]?.pulse
                      ? 'Pulse Rate:' +
                        ' ' +
                        `<b>${
                          vitalsData?.vits?.vitals?.[0]?.pulse
                        }bpm,${' '} </b>`
                      : ''
                  }
                  ${
                    vitalsData?.bp?.bp?.length === 1
                      ? vitalsData?.systolic
                        ? 'BP:' +
                          ' ' +
                          `<b> ${
                            vitalsData?.bp?.bp?.[0]?.systolic +
                            '/' +
                            vitalsData?.bp?.bp?.[0]?.diastolic +
                            ','
                          }</b>`
                        : ''
                      : ''
                  }
                  ${
                    vitalsData?.weight
                      ? 'Weight:' + ' ' + `<b> ${vitalsData.weight}Kg,</b>`
                      : ''
                  }
                  ${
                    vitalsData?.height
                      ? 'Height:' + ' ' + `<b>${vitalsData.height}cm,</b>`
                      : ''
                  }
                  ${
                    vitalsData?.vits?.vitals?.[0]?.temp
                      ? 'Temp:' +
                        ' ' +
                        `<b>${vitalsData?.vits?.vitals?.[0]?.temp}°F,</b>`
                      : ''
                  }
                  ${
                    vitalsData?.vits?.vitals?.[0]?.rate
                      ? 'Respiratory Rate:' +
                        ' ' +
                        `<b>${vitalsData?.vits?.vitals?.[0]?.rate}brpm,</b>`
                      : ''
                  }
                  ${
                    !isNaN(vitalsData?.bmi)
                      ? 'BMI:' + ' ' + `<b> ${vitalsData.bmi} </b>` + ''
                      : ''
                  }
              </text>
          </div>`
              : `${
                  vitalsData
                    ? `<div>
              <h5>
                  Vitals
              </h5>
              ${
                !isNaN(vitalsData?.bmi)
                  ? `<text style="margin-bottom:4px">
              ${
                !isNaN(vitalsData?.bmi)
                  ? 'BMI:' + ' ' + `<b> ${vitalsData.bmi} </b>` + ''
                  : ''
              }</text>`
                  : ''
              }
              <div style="display:flex;flex-direction:column;">
              ${vitalsData?.bp?.bp
                ?.map(
                  (item, index) =>
                    `<text style="margin-bottom:4px">Bp:${'  '}<b>${
                      item?.systolic
                    }/${item?.diastolic}</b>${'  '}Time:${'  '}<b>${
                      item?.time
                    }</b></text>`,
                )
                .join('')}
              </div>
              <div style="display:flex;flex-direction:column;">
              ${vitalsData?.vits?.vitals
                ?.map(
                  (item, index) =>
                    `<text style="margin-bottom:4px">SPO2:${'  '}<b>${
                      item?.spo2
                    }%</b>${'  '}Pulse:${'   '}:<b>${
                      item?.pulse
                    }</b>bpm${'  '}Respiration.rate:${'  '}<b>${
                      item?.rate
                    }</b>brpm${'  '}Temp:${'  '}<b>${
                      item?.temp
                    }°F</b>${'  '}Time:${'  '}<b>${item?.time}</b></text>`,
                )
                .join('')}
              </div>
          </div>`
                    : ''
                }`
          }
          ${
            vitalsData?.LDD?.length > 0
              ? `<div>
          <h5>
              Pregnant
          </h5>
          <text>
             LMP:${'  '} <b>${formatdate(
                  vitalsData?.LDD,
                )}</b> EDD:${'  '} <b>${formatdate(
                  vitalsData?.EDD,
                )}</b> Weeks:${'  '}<b>${week_days?.weeks}</b> Days:${'  '}<b>${
                  week_days?.days
                }</b>
          </text>
      </div>`
              : ''
          }
          ${
            JSON?.stringify(physical) !== '{}'
              ? `<div>
              <h5>
                  Physical Examination
              </h5>
             <div>
             ${
               physicalExamination?.body_parts !== '' &&
               physicalExamination?.piccle !== '' &&
               physicalExamination?.general
                 ? `<div>
             ${physicalFilter
               ?.map((item, index) => {
                 if (physicalFilter?.[physicalFilter?.length - 1] === item) {
                   return `<text>${`${item?.label}-${item?.status}`}${'  '}${
                     item?.desc !== '' ? `(${item?.desc})` : ''
                   }</text>`;
                 } else {
                   return `<text>${`${item?.label}-${item?.status}`}${'  '}${
                     item?.desc !== '' ? `(${item?.desc})` : ''
                   } , </text>`;
                 }
               })
               .join('')}
             </div>`
                 : ''
             }
             </div>
          </div>`
              : ''
          } 
          ${
            diagnosis?.length > 0
              ? `<div>
              <h5>
                  Diagnosis
              </h5>
              <text>
                  ${diagnosis?.map(value => value.diagnosis).join(', ')}
              </text>
          </div>`
              : ''
          }
          ${
            JSON?.stringify(reptr) !== '{}'
              ? `<div>
              <h5>
                  Report Finding
              </h5>
           
                  ${reptr?.describe?.map(
                    item => `<text>Type: ${item?.type},
                    Date: ${item?.date},
                    Describe: ${item?.describe}</text>`,
                  )}
    
          </div>`
              : ''
          } 
      </div>
          
          
          <div style="margin-top:16px;" >
          <h5 style="font-size:14px">
          Prescribe
          </h5>
          ${
            checkOthersmed?.length > 0
              ? `<div style="display:flex;flex-direction:column;">${checkOthersmed?.[0]?.medicine
                  ?.split(',')
                  ?.map(val => {
                    if (val === ',') {
                    } else {
                      return `<text>${val}</text>`;
                    }
                  })}
                </div>`
              : `
          <table style="width:100%;">
        

            <tr>
                <th style="text-align:center;width:4%;">S.NO</th>
                <th style="text-align:left;width:45%;padding-left:20px">Medicine</th>
                <th style="text-align:center;width:12%;">Timing</th>
                <th style="text-align:center;width:12%;">Frequency</th>
                <th style="text-align:center;width:12%;">Duration</th>
                <th style="text-align:center;width:12%;">Quantity</th>
                <th style="text-align:center;width:12%;">Remarks</th>
              </tr>
              ${Prescribe?.map(
                (value, index) => `
              <tr style=${
                index === 10 ? 'page-break-before:always;margin-top:100px' : ''
              }>
                <td style="text-align:center;width:4%">${
                  parseInt(index) + 1
                }</td>
                <td style="text-align:left;width:45%;padding-left:20px">${
                  value?.medicine
                }</td>
                <td style="text-align:center;width:12%">${value?.timing}</td>
                <td style="text-align:center;width:12%">${value?.frequency}</td>
                <td style="text-align:center;width:12%">${value?.duration}</td>
                <td style="text-align:center;width:12%">${
                  value.total_quantity
                }</td>
                <td style="text-align:center;width:12%">${value.others}</td>
              </tr>
              `,
              ).join('')}
         
        </table>`
          }
          </div>
          ${
            advices?.length > 0
              ? `<div style="margin-top:18px">
              <h5>
                  Advices
              </h5>
              ${advices
                ?.map(
                  (val, ind) => `<text>
                ${val?.status} - ${val?.advice}
                </text>`,
                )
                .join(', ')}
              
          </div>`
              : ''
          } 
          ${
            date?.length > 0
              ? `<div style="margin-top:18px">
              <h5>
                  Follow Up
              </h5>
              <text>
                  ${date}
              </text>
          </div>`
              : ''
          } 
          ${
            labreport?.length > 0
              ? `<div style="margin-top:16px">
              <h5>
              Prescribe Investigation
              </h5>
              <text>
                  ${labreport?.map(value => value.lab_test).join(', ')}
              </text>
              <text><b>Date: ${labreport?.[0]?.date}</b></text>
          </div>`
              : ''
          } 

          ${
            service_fees?.length > 0
              ? `<div style="page-break-before:always;">
              <div style="height:100px"></div>
              <h5>
              Consultaion Fees
              </h5>
    <table style="width:100%;;">
     
              <tr>
                  <th style="text-align:center;width:4%;">S.NO</th>
                  <th style="text-align:center;width:45%;">Service name</th>
                  <th style="text-align:center;width:12%;">Amount</th>
                
                </tr>
                ${service_fees
                  ?.map(
                    (value, index) => `
               ${
                 value?.service_name
                   ? `<tr>
                  <td style="text-align:center;width:4%">${
                    parseInt(index) + 1
                  }</td>
                  <td style="text-align:center;width:45%">${
                    value?.service_name
                  }</td>
                  <td style="text-align:center;width:12%">${value?.charge}</td>
                  
                </tr>`
                   : ''
               }
                `,
                  )
                  .join('')}

           
          </table>
          <div style="display:flex;width:100%;justify-content:flex-end;">
          <text >Total Rs ${charge ? charge[charge && 'totalFees'] : ''}</text>
          </div></div>`
              : ''
          }
          

      </div>
      <footer style="display:flex;flex-direction:column;align-items:center;position:fixed; padding:12px;  bottom:0;page-break-before: auto;">
          <div style="display:flex;width:105vw; align-item:center">
          <p style="text-align:center;width:100%; font-size:12px">
              This Prescription electronically signed by ${`${
                data?.doctor_name?.includes('Dr')
                  ? `${data?.doctor_name}`
                  : `Dr. ${data?.doctor_name}`
              }`},${' '}${data?.degree}, ${' '}${
          data?.medical_number
        }, ${' '}${new Date().toString()}
          </p>
          </div>
          <p style="text-align:left;width:100%;margin:0px;font-weight:300;font-size:12px;">
              powered by
          </p>
          <img src=${
            CONSTANTS.pdf_footer
          } style="align-self:flex-start;width:28px;height:24px;margin-left:15px"></img>
      </footer>
        
      </body>
      
      
      
      </html>`,
        fileName: 'test',
        //     //File directory
        directory: 'docs',
      };
      let file = await RNHTMLtoPDF.convert(options);
      setFilePath(file.filePath);
    }
  };
  const createPharmacyPDF = async () => {
    if (await PermmisionStorage()) {
      // setPrevLoad(!prevLoad)

      let options = {
        html: `<!DOCTYPE html>
      <style>
      body {width: 827px; height:1169px;}
      header {width:inherit;position:fixed;top:12px;left:12px;justify-content:center;align-items:center;}
       text {font-size: 14px;padding:1px;font-weight: 300;letter-spacing:0.5px}

      h5 {margin: 1px;padding: 0px; font-size:14px;color:#4ba5fa}
      tr {display:flex;font-size:14px;justify-content: space-between;width:100%;padding:8px;align-items:flex-start;}
      td{justify-content: space-around;font-size: 10px;}
      .doctor-head text {color:#4ba5fa;font-weight:600}
      
      </style>
      
      <body >
          <header >
          <div style="display:flex;height:80px;width:inherit;flex-direction:row;justify-content:space-between;align-items:center;border-bottom:2px solid black">
              <div style="display:flex;flex-direction: row; gap:1rem; position:absolute";left:16px;border:1px solid black>
                  <img src=${
                    logo === CONSTANTS.default_image
                      ? CONSTANTS.default_clinic_logo
                      : logo_url
                  }
                  style="height:48px;width:48px">
              </img>
              <div class="doctor-head" style="display:flex;flex-direction: column;align-items:flex-start;">
                  <text>
                  ${`${
                    data?.doctor_name?.includes('Dr')
                      ? `${data?.doctor_name}`
                      : `Dr. ${data?.doctor_name}`
                  }`}
                  </text>
                  <text>
                      ${data?.specialization}
                  </text>
                  <text>
                     Reg No. ${data?.medical_number}
                  </text>
              </div>
          
          
              </div>
              <div style="display:flex;flex-direction: column;gap:2px; align-items: flex-end;position:absolute;right:12px">
                 <h5>
                  ${clinic_name}
                 <h5>
                 <text style="font-size: 10px;">
                  Phone: ${clinic_phone} / Address: ${clinic_Address}
                 </text>
              </div>
              </div>
          
          </header>
          <div style="page-break-after: auto;padding:1rem;gap:8px;margin-top:100px">
              <div style="gap:8px;" >
          <div style="display:flex;justify-content: space-between;align-items:center;">
              <img src=${CONSTANTS.prescription_logo}
              style="height:28px;width:24px;">
          </img>
          <text style="font-size: 10px;">
             Date: ${new Date().toISOString().split('T')[0]} Time:${
          new Date().toString().split(' ')[4]
        }
             </text>
          </div>
          <div>
              <text>${name}  | ${gende} | ${age} | ${patient_phone}  ${
          reference_id ? `| ${reference_id}` : ''
        }</text>
          </div>
      </div>
          <div style="margin-top:16px;" >
          <h5 style="font-size:14px">
          Prescribe
          </h5>
          ${
            checkOthersmed?.length > 0
              ? `<div style="display:flex;flex-direction:column;">${checkOthersmed?.[0]?.medicine
                  ?.split(',')
                  ?.map(val => {
                    if (val === ',') {
                    } else {
                      return `<text>${val}</text>`;
                    }
                  })}
                </div>`
              : `
          <table style="width:100%;">
        

            <tr>
                <th style="text-align:center;width:4%;">S.NO</th>
                <th style="text-align:center;width:45%;">Medicine</th>
                <th style="text-align:center;width:12%;">Timing</th>
                <th style="text-align:center;width:12%;">Frequency</th>
                <th style="text-align:center;width:12%;">Duration</th>
                <th style="text-align:center;width:12%;">Quantity</th>
                <th style="text-align:center;width:12%;">Remarks</th>
              </tr>
              ${Prescribe?.map(
                (value, index) => `
              <tr style=${
                index === 18 ? 'page-break-before:always;margin-top:100px' : ''
              }>
                <td style="text-align:center;width:4%">${
                  parseInt(index) + 1
                }</td>
                <td style="text-align:center;width:45%">${value?.medicine}</td>
                <td style="text-align:center;width:12%">${value?.timing}</td>
                <td style="text-align:center;width:12%">${value?.frequency}</td>
                <td style="text-align:center;width:12%">${value?.duration}</td>
                <td style="text-align:center;width:12%">${
                  value.total_quantity
                }</td>
                <td style="text-align:center;width:12%">${value.others}</td>
              </tr>
              `,
              ).join('')}
         
        </table>`
          }
      <footer style="display:flex;flex-direction:column;align-items:center;position:fixed; padding:12px;  bottom:0;page-break-before: auto;">
          <div style="display:flex;width:105vw; align-item:center">
          <p style="text-align:center;width:100%; font-size:12px">
              This Prescription electronically signed by ${`${
                data?.doctor_name?.includes('Dr')
                  ? `${data?.doctor_name}`
                  : `Dr. ${data?.doctor_name}`
              }`},${' '}${data?.degree}, ${' '}${
          data?.medical_number
        }, ${' '}${new Date().toString()}
          </p>
          </div>
          <p style="text-align:left;width:100%;margin:0px;font-weight:300;font-size:12px;">
              powered by
          </p>
          <img src=${
            CONSTANTS.pdf_footer
          } style="align-self:flex-start;width:28px;height:24px;margin-left:15px"></img>
      </footer>
        
      </body>
      
      
      
      </html>`,
        fileName: 'phrma',
        //     //File directory
        directory: 'pharmacy',
      };
      let file = await RNHTMLtoPDF.convert(options);
      // console.log(file);
    }
  };
  const handlePreview = async () => {
    const prevScreen = 'visit';
    const doc_phone = data?.doctor_phone_number;
    setPrevLoad(true);
    const path =
      'file:///storage/emulated/0/Android/data/com.hattaidoc/files/docs/test.pdf';
    try {
      await createPDF();
      await createPharmacyPDF();
    } catch (error) {
      console.error('Error creating PDFs:', error);
    }
    if (await PermmisionStorage()) {
      setTimeout(() => {
        navigation.navigate('pdf', {
          path,
          consultationData,
          UpdateVitals,
          UpdateComplaint,
          appointment_id,
          doc_phone,
          patient_phone,
          prevScreen,
        });
        setPrevLoad(false);
      }, 2000);
    }
  };
  if (vitalsData?.others) {
    const jsonObject = vitalsData?.others;

    for (const key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        lastKey = key;
        lastValue = jsonObject[key];
      }
    }
  }

  const physi = JSON.stringify(physical);
  const examinationDetails = {
    doc_phone: data?.doctor_phone_number,
    patient_phone: patient_phone,
    clinic_id: Clinic_id,
    appointment_id: appointment_id,
    patient_name: name,
  };
  const Age = age;

  const SaveFees = async () => {
    const feeDetails = JSON.stringify(service_fees);
    const FeesSaving = {
      fees: feeDetails,
      patient_phone_number: patient_phone,
      doctor_phone_number: phone,
      clinic_id: Clinic_id,
      appointment_id: appointment_id,
    };
    try {
      const response = await fetchApi(URL.savefees, {
        method: 'POST',
        headers: {
          Prefer: '',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json, application/xml',
        },
        body: JSON.stringify(FeesSaving),
      });
      if (response.ok) {
        const jsonDAta = await response.json();
      }
    } catch (error) {}
  };
  return (
    <View>
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.appointment}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.h2}>
                {Language[language]['consultation']}
              </Text>
              <View style={{flexDirection: 'row', gap: moderateScale(16)}}>
                <HButton
                  type={'addtype'}
                  icon={'message-processing'}
                  color={CUSTOMCOLOR.primary}
                  btnstyles={{
                    backgroundColor: CUSTOMCOLOR.white,
                    borderWidth: 0.5,
                    borderColor: CUSTOMCOLOR.borderColor,
                  }}
                  textStyle={{color: CUSTOMCOLOR.primary}}
                  onPress={() => {
                    setVisible(!visible);
                  }}
                />
                <HButton
                  type={'addtype'}
                  label={'Rx History'}
                  btnstyles={{
                    backgroundColor: CUSTOMCOLOR.primary,
                    borderWidth: 0.5,
                    borderColor: CUSTOMCOLOR.lightgreen,
                  }}
                  textStyle={{color: CUSTOMCOLOR.white}}
                  onPress={() => {
                    navigation.navigate('patientrecord', {
                      patient_phone: patient_phone,
                      birthYea: age,
                      patient_pic: patient_profile_pic,
                      patient_age: age,
                      patient_name: name,
                      gender: gende,
                      reference_id: reference_id,
                    });
                  }}
                />
              </View>
            </View>
            <Modal
              visible={visible}
              onRequestClose={() => {
                setVisible(!visible);
              }}
              transparent={true}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#000000aa',
                }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setVisible(!visible);
                  }}>
                  <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View
                  style={{
                    backgroundColor: CUSTOMCOLOR.white,
                    borderTopEndRadius: moderateScale(16),
                    borderTopLeftRadius: moderateScale(16),
                  }}>
                  <AlertMessage
                    data={examinationDetails}
                    onPress={() => setVisible(!visible)}
                  />
                </View>
              </View>
            </Modal>
            <View
              style={{
                // paddingHorizontal: moderateScale(24),
                // paddingVertical: verticalScale(16),
                borderRadius: moderateScale(8),
                gap: moderateScale(12),
                borderColor: CUSTOMCOLOR.primary,
                borderWidth: 1,
                paddingBottom: verticalScale(16),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: moderateScale(8),
                  backgroundColor: CUSTOMCOLOR.backgroundColor,
                  padding: horizontalScale(8),
                  borderRadius: moderateScale(8),
                }}>
                <Image
                  style={{
                    height: moderateScale(64),
                    width: moderateScale(64),
                    borderRadius: moderateScale(4),
                    borderWidth: moderateScale(1),
                    borderColor: CUSTOMCOLOR.borderColor,
                  }}
                  source={{
                    uri: `data:image/jpeg;base64,${patient_profile_pic}`,
                  }}
                />
                <View>
                  <Text
                    style={{
                      color: CUSTOMCOLOR.black,
                      fontWeight: 400,
                      fontSize: moderateScale(16),
                    }}>
                    {name} | {bloodGroup} | {patient_phone}
                  </Text>
                  <Text style={styles.patientText}>
                    Age : {age} | {gende}{' '}
                    {reference_id ? `| ${reference_id}` : ''}
                  </Text>
                  {gende?.toLowerCase() === 'female' &&
                  vitalsData?.LDD &&
                  vitalsData?.EDD ? (
                    <Text style={[styles.patientText, {fontWeight: '700'}]}>
                      Pregnant (LMP : {formatdate(vitalsData?.LDD)} | EDD :{' '}
                      {formatdate(vitalsData.EDD)}){'  '}
                      <Text
                        style={{
                          color: CUSTOMCOLOR.black,
                        }}>
                        Week :{' '}
                        <Text style={styles.weeks}>
                          {isNaN(week_days?.weeks) ? '0' : week_days?.weeks}
                          {'  '}
                        </Text>
                        Days :{' '}
                        <Text style={styles.weeks}>
                          {week_days?.days !== NaN ? week_days?.days : '0'}
                        </Text>
                      </Text>
                    </Text>
                  ) : null}
                </View>
              </View>
              <View style={styles.line}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.patientHead}>Reason For Visit</Text>
                  <Pressable
                    style={styles.gap}
                    onPress={() =>
                      navigation.navigate('complaints', {complaint})
                    }>
                    <Icon
                      name={'pencil'}
                      size={moderateScale(18)}
                      color={CUSTOMCOLOR.primary}
                      style={styles.pencilIcon}
                    />
                  </Pressable>
                </View>
                <Text style={styles.patientText}>{selectedComplaint}</Text>
                <Seperator />
              </View>
              <View style={styles.line}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.patientHead}>Vitals</Text>
                  <Pressable
                    style={styles.gap}
                    onPress={() =>
                      navigation.navigate('vitalscreen', {gende, patient_phone})
                    }>
                    <Icon
                      name={'pencil'}
                      size={moderateScale(18)}
                      color={CUSTOMCOLOR.primary}
                      style={styles.pencilIcon}
                    />
                  </Pressable>
                </View>
                {vitalsData &&
                vitalsData?.bp?.bp?.length == 1 &&
                vitalsData?.vits?.vitals?.length === 1 ? (
                  <Text style={styles.patientText}>
                    {vitalsData?.bp?.bp?.[0]?.systolic && (
                      <Text>
                        BP:{' '}
                        <Text style={{fontWeight: '700'}}>
                          {vitalsData?.bp?.bp?.[0]?.systolic}/
                          {vitalsData?.bp?.bp?.[0]?.diastolic}
                        </Text>
                      </Text>
                    )}{' '}
                    {vitalsData?.vits?.vitals?.[0]?.spo2 && (
                      <Text>
                        SPO2:{' '}
                        <Text style={{fontWeight: '700'}}>
                          {vitalsData?.vits?.vitals?.[0]?.spo2}
                        </Text>
                        %
                      </Text>
                    )}{' '}
                    {vitalsData?.bmi !== 'NaN' &&
                      vitalsData?.bmi !== undefined && (
                        <Text>
                          BMI:{' '}
                          <Text style={{fontWeight: '700'}}>
                            {vitalsData.bmi}
                          </Text>
                        </Text>
                      )}{' '}
                    {vitalsData?.vits?.vitals?.[0]?.pulse && (
                      <Text>
                        Pulse:{' '}
                        <Text style={{fontWeight: '700'}}>
                          {vitalsData?.vits?.vitals?.[0]?.pulse}{' '}
                        </Text>
                        bpm
                      </Text>
                    )}{' '}
                    {vitalsData?.vits?.vitals?.[0]?.rate && (
                      <Text>
                        Res.rate:{' '}
                        <Text style={{fontWeight: '700'}}>
                          {vitalsData?.vits?.vitals?.[0]?.rate}{' '}
                        </Text>
                        brpm
                      </Text>
                    )}{' '}
                    {vitalsData?.vits?.vitals?.[0]?.temp && (
                      <Text>
                        Temp:{' '}
                        <Text style={{fontWeight: '700'}}>
                          {vitalsData?.vits?.vitals?.[0]?.temp}
                        </Text>
                        °F
                      </Text>
                    )}{' '}
                    {vitalsData?.others &&
                      Object?.keys(vitalsData?.others)?.[0] !== 'null' &&
                      Object?.keys(vitalsData?.others)?.[0] !== '' && (
                        <Text>
                          {vitalsData?.others
                            ? Object.keys(vitalsData?.others)?.[0]
                            : null}
                          {' :'}

                          <Text style={{fontWeight: '700'}}>
                            {vitalsData?.others
                              ? Object.values(vitalsData?.others)[0]
                              : null}
                          </Text>
                        </Text>
                      )}
                  </Text>
                ) : (
                  <View>
                    {vitalsData?.bmi !== 'NaN' &&
                      vitalsData?.bmi !== undefined && (
                        <Text style={styles.patientText}>
                          BMI:{' '}
                          <Text style={{fontWeight: '700'}}>
                            {vitalsData.bmi}
                          </Text>
                        </Text>
                      )}
                    {vitalsData?.bp?.bp?.map((item, index) => (
                      <Text style={styles.patientText}>
                        Bp :{' '}
                        <Text style={{fontWeight: '700'}}>
                          {item?.systolic}/{item?.diastolic}{' '}
                          <Text style={styles.patientText}>Time</Text> :{' '}
                          {item?.time}
                        </Text>
                      </Text>
                    ))}
                    {vitalsData?.vits?.vitals?.map((item, index) => (
                      <Text style={styles.patientText}>
                        SPO2 :{' '}
                        <Text style={{fontWeight: '700'}}>{item?.spo2}</Text>%{' '}
                        Pulse :{' '}
                        <Text style={{fontWeight: '700'}}>{item?.pulse}</Text>
                        bpm Res.rate :{' '}
                        <Text style={{fontWeight: '700'}}>{item?.rate}</Text>
                        brpm Temp :{' '}
                        <Text style={{fontWeight: '700'}}>{item?.temp}</Text>°F
                        Time :{' '}
                        <Text style={{fontWeight: '700'}}>{item?.time}</Text>
                      </Text>
                    ))}
                    {vitalsData?.others &&
                      Object?.keys(vitalsData?.others)?.[0] !== 'null' &&
                      Object?.keys(vitalsData?.others)?.[0] !== '' && (
                        <Text style={styles.patientText}>
                          {vitalsData?.others
                            ? Object.keys(vitalsData?.others)?.[0]
                            : null}
                          {' :'}

                          <Text style={{fontWeight: '700'}}>
                            {vitalsData?.others
                              ? Object.values(vitalsData?.others)[0]
                              : null}
                          </Text>
                        </Text>
                      )}
                  </View>
                )}

                <Seperator />
              </View>
              <View style={styles.line}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.patientHead}>Allergies</Text>
                  <Pressable
                    style={styles.gap}
                    onPress={() => navigation.navigate('allergies')}>
                    <Icon
                      name={'pencil'}
                      size={moderateScale(18)}
                      color={CUSTOMCOLOR.primary}
                      style={styles.pencilIcon}
                    />
                  </Pressable>
                </View>

                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {allergies?.length > 0
                    ? allergies?.map((item, index) => (
                        <React.Fragment key={index}>
                          <Text style={styles.patientText}>
                            {item?.allergies}
                            {index < allergies.length - 1 ? ',  ' : ''}
                          </Text>
                        </React.Fragment>
                      ))
                    : null}
                </View>
                {redflag !== '' && redflag !== undefined && <Seperator />}
              </View>

              {redflag !== '' && redflag !== undefined && (
                <View style={[styles.line, {gap: verticalScale(8)}]}>
                  {/* <View> */}
                  <Text
                    style={[styles.patientHead, {color: CUSTOMCOLOR.error}]}>
                    Red Flag
                  </Text>
                  {/* </View> */}

                  <Text style={styles.patientText}>
                    {redflag}
                    {/* {index < allergies.length - 1 ? ',  ' : ''} */}
                  </Text>
                </View>
              )}
            </View>
            {CONSTANT.ConsultationList.map((value, index) => (
              <View key={index}>
                <View style={styles.visitOpenItem}>
                  <VisitOpen
                    label={value.label}
                    icon={value.icon}
                    doneIcon={
                      (value?.label === 'Fees' && serviceFees?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Symptoms' && Symptom?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Prescribe Medicine' &&
                      Prescribe?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value.label === 'Doctor Notes' &&
                      notes !== '' &&
                      notes !== undefined
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Diagnosis' && diagnosis?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Prescribe Investigation' &&
                      labreport?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Follow-Up' && date?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'History of Present Illness' &&
                      note?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Report Findings' &&
                      report !== undefined
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Referral' && selectedDoctor?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Advice' && advices?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Medical History' &&
                      (commor?.length > 0 ||
                        socialHistory?.length > 0 ||
                        familyHistory?.length > 0 ||
                        medicationHistory ||
                        menstrualHistory?.length > 0 ||
                        obstericHistory?.length > 0 ||
                        martialHistory?.length > 0)
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Physical Examinations' &&
                      physi !== '{}' &&
                      physi !== undefined
                        ? 'check-circle'
                        : '')
                    }
                    // navigate={() =>
                    //   navigation.navigate(
                    //     value.navigate,
                    //     value.navigate === 'complaints' ? {complaint} : null,
                    //     value.navigate === 'FollowUp' ? {date} : null,
                    //     value.navigate === 'vitalscreen' ? {date} : null,
                    //   )
                    // }
                    navigate={() => {
                      const params = {};

                      if (value.navigate === 'complaints') {
                        params.complaint = complaint;
                      } else if (value.navigate === 'FollowUp') {
                        params.date = date;
                      } else if (value.navigate === 'vitalscreen') {
                        params.details = {
                          gende: gende,
                          patient_phone: patient_phone,
                        };
                      } else if (value.navigate === 'service_fees') {
                        params.consultation_fees = consultation
                          ? null
                          : consultation_fees;
                        params.feesDetails = {
                          clinic_id: Clinic_id,
                          patient_phone: patient_phone,
                          doctor_phone_number: phone,
                          appointment_id: appointment_id,
                        };
                      } else if (value.navigate === 'refer') {
                        params.patient_details = {
                          doc_phone: data?.doctor_phone_number,
                          name: name,
                          genger: gende,
                          patient_phone: patient_phone,
                          age: age,
                          appointment_id: appointment_id,
                          clinic_id: Clinic_id,
                        };
                      } else if (
                        // value.navigate === 'examination'
                        value.navigate === 'physical' ||
                        value.navigate === 'findings'
                      ) {
                        params.examinationDetails = {
                          doc_phone: data?.doctor_phone_number,
                          patient_phone: patient_phone,
                          clinic_id: Clinic_id,
                          appointment_id: appointment_id,
                        };
                      } else if (value.navigate === 'medicalhistory') {
                        params.medicaldata = {
                          gende: gende,
                          patient_phone: patient_phone,
                          phone: phone,
                          Age: Age,
                        };
                      } else if (value.label === 'Doctor Notes') {
                        params.patient_phone = patient_phone;
                      }

                      navigation.navigate(value.navigate, params);
                    }}
                  />
                  {value.label === 'Symptoms' && Symptom.length > 0 && (
                    <View style={styles.basiccontainer}>
                      <View style={{flexWrap: 'wrap'}}>
                        {Symptom?.map((item, index) => {
                          return (
                            item.symptom != '' && (
                              <View key={index} style={styles.symptomicon}>
                                <Icon
                                  name="emoticon-sick"
                                  size={moderateScale(16)}
                                  color={CUSTOMCOLOR.primary}
                                />
                                <View>
                                  <Text style={styles.pulse}>
                                    {item.symptom} | {item.days} |{' '}
                                    {item.severity}
                                  </Text>
                                </View>
                              </View>
                            )
                          );
                        })}
                      </View>
                    </View>
                  )}
                  {value.label === 'Prescribe Medicine' &&
                    Prescribe.length > 0 && (
                      <View style={styles.basiccontainer}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                          <View style={styles.pres}>
                            <View>
                              {Prescribe?.map((item, ind) => {
                                if (item?.mode === 'Others') {
                                  return (
                                    <View key={ind} style={styles.pres1}>
                                      <Icon
                                        name="prescription"
                                        size={moderateScale(16)}
                                        color={CUSTOMCOLOR.primary}
                                      />
                                      <View>
                                        <Text style={styles.pulse}>
                                          {item.medicine}
                                        </Text>
                                      </View>
                                    </View>
                                  );
                                } else {
                                  return (
                                    <View key={ind} style={styles.pres1}>
                                      <Icon
                                        name="prescription"
                                        size={moderateScale(16)}
                                        color={CUSTOMCOLOR.primary}
                                      />
                                      <View>
                                        <Text style={styles.pulse}>
                                          {item.medicine} | {item.timing} |
                                          {item.frequency} | {item.duration} |{' '}
                                          {item.total_quantity} | {item.others}
                                        </Text>
                                      </View>
                                    </View>
                                  );
                                }
                              })}
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                  {value.label === 'Follow-Up' &&
                    date !== '' &&
                    date !== undefined && (
                      <View style={styles.FollowUpcontainer}>
                        <>
                          <Icon
                            name="file-document-edit"
                            color={CUSTOMCOLOR.primary}
                            size={moderateScale(16)}
                          />
                          <Text style={styles.pulse}>{date}</Text>
                        </>
                      </View>
                    )}
                  {value.label === 'Advice' &&
                    advices !== '' &&
                    advices !== undefined &&
                    advices?.map((item, ind) => (
                      <View style={styles.FollowUpcontainer}>
                        <>
                          <Icon
                            name="file-document-edit"
                            color={CUSTOMCOLOR.primary}
                            size={moderateScale(16)}
                          />
                          <Text
                            style={
                              styles.pulse
                            }>{`${item?.status} - ${item?.advice}`}</Text>
                        </>
                      </View>
                    ))}
                  {value.label === 'Validity' && dateTimeRed !== '' && (
                    <View style={styles.FollowUpcontainer}>
                      <>
                        <Icon
                          name="file-document-edit"
                          color={CUSTOMCOLOR.primary}
                          size={moderateScale(16)}
                        />
                        <Text style={styles.pulse}>{dateTimeRed}</Text>
                      </>
                    </View>
                  )}
                  {value.label === 'Vitals' &&
                    (vitalsData?.LDD ||
                      vitalsData?.EDD ||
                      vitalsData?.weight ||
                      vitalsData?.height ||
                      vitalsData?.pulse_rate ||
                      vitalsData?.bmi ||
                      vitalsData?.boby_temparature ||
                      vitalsData?.diastolic ||
                      vitalsData?.systolic ||
                      vitalsData?.rate) && (
                      <View style={styles.basiccontainer}>
                        {(vitalsData?.systolic ||
                          vitalsData?.pulse_rate ||
                          vitalsData?.diastolic) && (
                          <View style={styles.vitals}>
                            <View key={index} style={styles.vitals1}>
                              {vitalsData?.pulse_rate && (
                                <>
                                  <Icon
                                    name="water-check"
                                    color={CUSTOMCOLOR.primary}
                                    size={moderateScale(16)}
                                  />
                                  <Text style={styles.pulse}>
                                    pulse rate:
                                    {vitalsData?.pulse_rate}bpm
                                  </Text>
                                </>
                              )}
                              {vitalsData?.height && (
                                <Text style={styles.pulse}>
                                  {Language[language]['height']}:
                                  {vitalsData.height}cm
                                </Text>
                              )}
                              {vitalsData?.weight && (
                                <Text style={styles.pulse}>
                                  {Language[language]['weight']}:
                                  {vitalsData.weight}kg
                                </Text>
                              )}
                              {vitalsData?.bmi && (
                                <Text style={styles.pulse}>
                                  {Language[language]['bmi']}:{vitalsData.bmi}cm
                                </Text>
                              )}
                              {vitalsData?.body_temperature && (
                                <Text style={styles.pulse}>
                                  {Language[language]['temp']}:
                                  {vitalsData?.body_temperature}
                                </Text>
                              )}
                              {vitalsData?.rate && (
                                <Text style={styles.pulse}>
                                  Resp.rate:{vitalsData.rate}
                                  cm
                                </Text>
                              )}
                            </View>
                            <View key={index} style={styles.common}>
                              {vitalsData?.systolic && (
                                <>
                                  <Icon
                                    name="water-check"
                                    color={CUSTOMCOLOR.primary}
                                    size={moderateScale(16)}
                                  />
                                  <Text style={styles.pulse}>
                                    {Language[language]['systolic_bp']}:
                                    {vitalsData.systolic}mmHg
                                  </Text>
                                </>
                              )}
                              {vitalsData?.diastolic && (
                                <Text style={styles.pulse}>
                                  {Language[language]['diastolic_bp']}:
                                  {vitalsData.diastolic}mmHg
                                </Text>
                              )}
                            </View>
                          </View>
                        )}
                        {vitalsData?.LDD && (
                          <View
                            style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                            <View key={index} style={styles.common}>
                              {vitalsData?.LDD && (
                                <>
                                  <Icon
                                    name="calendar-range"
                                    color={CUSTOMCOLOR.primary}
                                    size={moderateScale(16)}
                                  />
                                  <Text style={styles.pulse}>
                                    LMP:
                                    {/* {" "}{vitalsData.LDD} */}
                                    {/* {Language[language]['lmp_edd']}: */}
                                    {/* {vitalsData.LDD} */}
                                    {`${day}-${months[month]}-${Year}`}
                                  </Text>
                                </>
                              )}
                              {vitalsData?.EDD && (
                                <Text style={styles.pulse}>
                                  EDD: {vitalsData.EDD}
                                </Text>
                              )}
                            </View>
                          </View>
                        )}
                      </View>
                    )}
                  {value.label === 'Reason for visit' && (
                    <View style={styles.complaintcontainer}>
                      <Icon
                        name="file-document-edit"
                        color={CUSTOMCOLOR.primary}
                        size={moderateScale(16)}
                      />
                      <Text style={styles.pulse}>{selectedComplaint}</Text>
                    </View>
                  )}
                  {value.label === 'History of Present Illness' &&
                    note !== '' &&
                    note !== undefined && (
                      <View style={styles.complaintcontainer}>
                        <Icon
                          name="file-document-edit"
                          color={CUSTOMCOLOR.primary}
                          size={moderateScale(16)}
                        />
                        <Text style={styles.pulse}>{note}</Text>
                      </View>
                    )}
                  {value.label === 'Doctor Notes' &&
                    notes !== '' &&
                    notes !== undefined && (
                      <View style={styles.complaintcontainer}>
                        <Icon
                          name="file-document-edit"
                          color={CUSTOMCOLOR.primary}
                          size={moderateScale(16)}
                        />
                        <Text style={styles.pulse}>{notes}</Text>
                      </View>
                    )}

                  {value.label === 'Diagnosis' && diagnosis.length > 0 && (
                    <View style={styles.basiccontainer}>
                      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <View style={styles.common}>
                          <View>
                            {diagnosis?.map((item, ind) => (
                              <View key={ind} style={styles.common}>
                                <Icon
                                  name="prescription"
                                  size={moderateScale(16)}
                                  color={CUSTOMCOLOR.primary}
                                />
                                <View>
                                  <Text
                                    style={{
                                      color: CUSTOMCOLOR.black,
                                      fontFamily: CUSTOMFONTFAMILY.body,
                                      fontSize: CUSTOMFONTSIZE.h4,
                                    }}>
                                    {item?.diagnosis}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>
                  )}

                  {value.label === 'Comorbidities' && commorbities.length > 0 && (
                    <View style={styles.basiccontainer}>
                      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <View style={styles.common}>
                          <View>
                            {commorbities?.map((item, ind) => (
                              <View key={ind} style={styles.common}>
                                <Icon
                                  name="prescription"
                                  size={moderateScale(16)}
                                  color={CUSTOMCOLOR.primary}
                                />
                                <View>
                                  <Text style={styles.pulse}>
                                    {item?.commoribities}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>
                  )}

                  {value.label === 'Past Hospitalization' &&
                    pasthistory.length > 0 && (
                      <View style={styles.basiccontainer}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                          <View style={styles.common}>
                            <View>
                              {pasthistory?.map((item, ind) => (
                                <View key={ind} style={styles.common}>
                                  <Icon
                                    name="prescription"
                                    size={moderateScale(16)}
                                    color={CUSTOMCOLOR.primary}
                                  />
                                  <View>
                                    <Text style={styles.pulse}>
                                      {item?.past_history}
                                    </Text>
                                  </View>
                                </View>
                              ))}
                            </View>
                          </View>
                        </View>
                      </View>
                    )}

                  {value.label === 'Allergies' && allergies?.length > 0 && (
                    <View style={styles.basiccontainer}>
                      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <View style={styles.common}>
                          <View>
                            {allergies?.map((item, ind) => (
                              <View key={ind} style={styles.common}>
                                <Icon
                                  name="prescription"
                                  size={moderateScale(16)}
                                  color={CUSTOMCOLOR.primary}
                                />
                                <View>
                                  <Text style={styles.pulse}>
                                    {item?.allergies}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>
                  )}

                  {value.label === 'Prescribe Investigation' &&
                    labreport.length > 0 && (
                      <View style={styles.basiccontainer}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                          <View style={styles.common}>
                            <View>
                              {labreport?.map((item, ind) => (
                                <View key={ind} style={styles.common}>
                                  <Icon
                                    name="prescription"
                                    size={moderateScale(16)}
                                    color={CUSTOMCOLOR.primary}
                                  />
                                  <View>
                                    <Text style={styles.pulse}>
                                      {item?.lab_test}
                                    </Text>
                                  </View>
                                </View>
                              ))}
                            </View>
                          </View>
                        </View>
                      </View>
                    )}

                  {value.label === 'Referral' &&
                    (selectedDoctor?.length > 0 ? (
                      <View style={styles.basiccontainer}>
                        {selectedDoctor?.map((item, ind) => (
                          <View style={{flexDirection: 'row'}} key={ind}>
                            <Icon
                              name="doctor"
                              color={CUSTOMCOLOR.primary}
                              size={moderateScale(16)}
                            />
                            <Text style={styles.pulse}>
                              Refer to{' '}
                              {item?.refer_to === 'Clinic' ||
                              item?.refer_to === 'Hospital'
                                ? `${item?.doctor_or_name}  Dr.${item?.dr_name}`
                                : `Dr.${item?.doctor_or_name}`}{' '}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ) : null)}
                </View>
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingHorizontal: horizontalScale(24),
            }}>
            {/* <HButton
              label="Preview"
              loading={prevLoad}
              loadColor={CUSTOMCOLOR.primary}
              onPress={handlePreview}
              // onPress={createPDF}
              btnstyles={{
                backgroundColor: CUSTOMCOLOR.white,
              }}
              textStyle={{
                color: CUSTOMCOLOR.primary,
              }}
            /> */}
            <HButton
              label="Save"
              onPress={() => {
                handlePreview();
                SaveFees();
              }}
              loading={prevLoad}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: moderateScale(24),
    gap: moderateScale(16),
    backgroundColor: CUSTOMCOLOR.background,
  },
  select: {
    gap: moderateScale(8),
  },
  tab: {
    flexDirection: 'row',
    gap: moderateScale(24),
  },
  appointment: {
    gap: moderateScale(8),
    paddingHorizontal: horizontalScale(8),
  },
  h2: {
    fontSize: moderateScale(24),
    fontWeight: 600,
    fontFamily: CUSTOMFONTFAMILY.heading,
    lineHeight: moderateScale(20 * 2),
    color: CUSTOMCOLOR.black,
  },
  visitOpenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderColor: CUSTOMCOLOR.borderColor,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
  },
  basiccontainer: {
    width: '100%',
    borderRadius: moderateScale(4),
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(16),
    gap: moderateScale(16),
  },
  FollowUpcontainer: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: moderateScale(4),
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(16),
    gap: moderateScale(16),
  },
  pulse: {
    fontFamily: CUSTOMFONTFAMILY.body,
    // fontWeight: 400,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(15.04),
    color: CUSTOMCOLOR.black,
    paddingHorizontal: horizontalScale(8),
  },
  complaintcontainer: {
    // width: 635,
    // height: 32,
    borderRadius: moderateScale(4),
    padding: moderateScale(16),
    gap: moderateScale(8),
    flexDirection: 'row',
  },
  symptomicon: {
    flexDirection: 'row',
    gap: moderateScale(10),
    padding: moderateScale(8),
    alignItems: 'center',
  },
  pres: {
    gap: moderateScale(8),
    flexDirection: 'row',
  },
  pres1: {
    flexDirection: 'row',
    padding: moderateScale(8),
    gap: moderateScale(8),
  },
  vitals: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  vitals1: {
    flexDirection: 'row',
    gap: moderateScale(8),
    padding: moderateScale(2),
    marginBottom: moderateScale(18),
  },
  common: {
    flexDirection: 'row',
    padding: moderateScale(4),
    gap: moderateScale(4),
  },
  patientText: {
    color: CUSTOMCOLOR.black,
    fontWeight: 400,
    fontSize: moderateScale(14),
    paddingBottom: moderateScale(4),
  },
  gap: {
    height: moderateScale(32),

    width: moderateScale(32),

    borderWidth: moderateScale(1),
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: '#C0DFFC',
    borderRadius: moderateScale(24),
    // backgroundColor: CUSTOMCOLOR.white,
  },
  pencilIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientHead: {
    color: CUSTOMCOLOR.black,
    fontWeight: 700,
    fontSize: moderateScale(14),
  },
  line: {
    // borderWidth:1,
    // borderBottomWidth: moderateScale(0.5),
    // borderBottomColor: CUSTOMCOLOR.primary,
    paddingHorizontal: horizontalScale(8),
  },
  modalOverlay: {
    position: 'absolute',
    // width:'100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // borderWidth:1
    // backgroundColor: 'rgba(0,0,0,0.5)'
  },
});
export default Visit;
