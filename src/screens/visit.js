import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Image,
  Pressable,
} from 'react-native';
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
import {CONSTANT} from '../utility/const';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import Prescribe1 from './prescibe1';

import {
  UpadteVitals,
  UpadateCheifComplaint,
  addCheifComplaint,
  addfees,
} from '../redux/features/prescription/prescriptionSlice';
import VitalScreen from './vitalscreen';
import {CONSTANTS} from '../utility/constant';
import Seperator from '../components/seperator';
import PDFViewer from '../components/PdfViewer';
import {PermmisionStorage} from '../utility/permissions';

const Visit = ({navigation, route}) => {
  const [filePath, setFilePath] = useState('');
  // const [show, setShow] = useState(false);
  const [prevLoad, setPrevLoad] = useState(false);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const date = useSelector(state => state?.dateTime?.date);
  const diagnosis = useSelector(state => state?.diagnosis?.DiagnosisItems);

  const vitalsData = useSelector(state => state.prescription.vitalsData);
  console.log('rate', vitalsData);
  const note = useSelector(state => state.prescription.note);
  console.log('=====note', note);
  const selectedComplaint = useSelector(
    state => state.prescription.selectedComplaint,
  );
  const selectedDoctor = useSelector(
    state => state?.prescription?.selectedDoctor,
  );
  const Symptom = useSelector(state => state.symptoms.symptom);
  const Prescribe = useSelector(state => state.pres.prescribeItems);
  let prescribeCopy = Prescribe;
  const [prescribe, setPrescribe] = useState(prescribeCopy);

  const token = useSelector(state => state.authenticate.auth.access);
  const {phone} = useSelector(state => state?.phone?.data);

  const commorbities = useSelector(
    state => state?.commorbities?.commorbitiesItems,
  );

  const pasthistory = useSelector(state => state?.pasthistory?.pasthistory);
  const allergies = useSelector(state => state?.allergies?.allergies);
  const labreport = useSelector(state => state?.labreport?.labReport);
  const dateTimeRed = useSelector(state => state.valid?.valid);
  const hospitalization = useSelector(
    state => state?.pasthistory?.hospitalization,
  );
  const medicationHistory = useSelector(
    state => state?.pasthistory?.medicationHistory,
  );
  const menstrualHistory = useSelector(
    state => state?.pasthistory?.menstrualHistory,
  );
  const obstericHistory = useSelector(
    state => state?.pasthistory?.obstericHistory,
  );

  const commor = useSelector(state => state?.pasthistory?.commorbidities);

  const socialHistory = useSelector(state => state?.pasthistory?.socialHistory);

  const familyHistory = useSelector(state => state?.pasthistory?.familyHistory);
  const service_fees = useSelector(state => state.prescription.fees);
  const charge =
    service_fees?.length > 0 ? service_fees?.[service_fees?.length - 1] : null;
  console.log('charge===', charge ? charge[charge && 'totalFees'] : null);

  useEffect(() => {
    setPrescribe(Prescribe);
  }, [Prescribe]);

  const logo = useSelector(state => state?.clinicid?.clinic_logo);

  const [patient_data, setPatientData] = useState();
  const {
    consultation_fees,
    name,
    gende,
    age,
    patient_phone,
    appointment_id,
    complaint,
  } = route.params;
  const fetchPatientData = async () => {
    const response = await fetchApi(URL.getPatientByNumber(patient_phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setPatientData(jsonData.data[0]);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchPatientData();
  }, []);
  const Clinic_id = useSelector(state => state?.clinicid?.clinic_id);

  useEffect(() => {
    dispatch(addCheifComplaint(complaint));
  }, []);

  const [chief_complaint, setComplaint] = useState('');
  const [vitals, setVitals] = useState({});
  const consultationData = {
    prescribe: Prescribe,

    symptoms: Symptom,

    chief_complaint: chief_complaint ? {} : selectedComplaint,
    vitals: vitals ? {} : vitalsData,
    refer_to_doctor: selectedDoctor,
    // ?selectedDoctor:JSON.stringify( {"doctor_name": "", "phone": "", "speciality": ""}),
    follow_up: date,
    note: note,
    diagnosis: diagnosis,
    labReports: labreport,
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
    },

    meta_data: {
      patient_phone_number: patient_phone,
      doctor_phone_number: phone,
      clinic_id: Clinic_id,
      appointment_id: appointment_id,
    },
  };

  const [data, setData] = useState();

  const fetchDoctor = async () => {
    const response = await fetchApi(URL.getPractitionerByNumber(phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setData(jsonData?.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchDoctor();
  }, []);

  const handlePreview = async () => {
    const prevScreen = 'visit';
    const doc_phone = data?.doctor_phone_number;
    setPrevLoad(true);
    const path =
      'file:///storage/emulated/0/Android/data/com.hattaidoc/files/docs/test.pdf';
    createPDF();
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

  const UpdateVitals = {
    pulse_rate: vitalsData?.pulse_rate,
    weight: vitalsData?.weight,
    height: vitalsData?.height,
    body_temperature: vitalsData?.body_temperature,
    rate: vitalsData?.rate,
    diastolic: vitalsData?.diastolic,
    systolic: vitalsData?.systolic,
    EDD: vitalsData?.EDD,
    LDD: vitalsData?.LDD,
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
  useEffect(() => {
    fetchComplaint();
  }, []);

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
      dispatch(UpadteVitals(jsonData?.data));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchVitals();
  }, []);
  const [serviceFees, setServiceFees] = useState([]);
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
      } else {
        dispatch(
          addfees([
            {
              service_name: `Consultation Fees`,
              charge: parseInt(consultation_fees),
            },
            {totalFees: parseInt(consultation_fees)},
          ]),
        );
      }
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    GetFees();
  }, []);
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
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchReport();
    // SetUploadDocument(report_findings)
  }, []);
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
  // useEffect(() => {
  //   createPDF();
  // });
  const createPDF = async () => {
    if (await PermmisionStorage()) {
      // setPrevLoad(!prevLoad)
      let options = {
        //Content to print
        html: `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- <link rel="stylesheet" href="style.css" type="text/css"> -->
                <title>
                    Consultation Pdf
                </title>
                <style>
                .header {
                  position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    text-align: center;
    border-bottom: 1px solid #4ba5fa;
    padding-bottom: 8px;
    margin: 0;
    padding: 24px;
    z-index: 1; 

                }
        
                .footer {
                  position: fixed;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  background-color: #ffffff;
                  text-align: center;
                  padding: 10px; 
                  margin: 0;
                }
        
                .page {
                  max-height: calc(50vh - (header height + footer height + margins)); 
    page-break-before: auto;
    page-break-after: always;
    page-break-inside: auto;
    margin: 0;
    padding: 24px;
    padding-top:150px;
                }
                .page + .header {
                  top: -50px; 
                  z-index: 2;
              }
              .page + .header + .page {
                
                max-height: calc(50vh - (footer height + margins));
            }
        
                .maincontainer {
                  width: 95%; 
                  height: 100%; 
                  background-color: #ffffff;
                  padding:5%;
                }
                .page-break-inside {
                  page-break-inside: avoid; /* Allow automatic page breaks inside this element */
              }
            </style>
            </head>
            <body>
                <div class='maincontaioner'>
    
            <div class='header' >
                <div class='first' style="display: flex; flex-direction: row;">
                    <img id='img' src=${
                      logo === CONSTANTS.default_image
                        ? CONSTANTS.default_clinic_logo
                        : logo_url
                    } style="width: 52px; height: 58px;" alt="Sample Image" />
                    <div class='address' style="flex-direction: column; margin-left: 16px;">
                       
                            <p id='docname' style="font-weight: 600; font-size: 16px; color: #4ba5fa; margin: 0;">Dr.${
                              data.doctor_name
                            }</p>
                            <p id='spec' style="font-weight: 400; font-size: 14px; color: #4ba5fa; margin: 0;">${
                              data.specialization
                            }</p>
                            <p id='spec' style="font-weight: 400; font-size: 14px; color: #4ba5fa; margin: 0;">Regd No:${
                              data.medical_number
                            }</p>
                      </div>
                        <div class='namecontaioner' style="margin-left: 230px; text-align: right;">
                            <p id='docname' style="font-weight: 600; font-size: 16px; color: #4ba5fa; margin: 0;">${clinic_name}</p>
                            <p id='spec' style="font-weight: 400; font-size: 14px; text-align: justify; color: #000000; margin: 0; margin-left: 16px; justify-content: flex-start;">${clinic_phone} | ${clinic_Address}</p>
                        </div>
                    </div>
             
            </div>
           <div class='page page-break-inside'>
            <div class='second' style="display: flex; flex-direction: row; justify-content: space-between;">
                <img id='rximg' src=${
                  CONSTANTS.prescription_logo
                } style="width: 28px; height: 43px;" />
                <p id='date' style="font-size: 16px; font-weight: 400px;">Date:${
                  new Date().toISOString().split('T')[0]
                }, Time:${new Date().toString().split(' ')[4]}</p>
            </div>
       
                    <div class='third' >
                        <p id='patientDetails' style=" font-size: 16px;
                        font-weight: 400px;">${name} | ${gende} | ${age} | ${patient_phone}</p>
                        <div class='subContaioner' style="  display: flex;
                        flex-direction: row;
                        gap: 8px;
                        line-height:4px;">
                            <p id='subhead' style="font-weight: 400px;
                            font-size: 16px;
                            color:#4ba5fa;">Chief Complaint:</p>
                            <p id='values' style=" font-weight: 300px;
                            font-size: 16px;
                            color:#000000;">${selectedComplaint}</p>
                        </div>
                        ${
                          Symptom?.length > 0
                            ? `<div class='subContaioner'  style="  display: flex;
                          flex-direction: row;
                          gap: 8px;
                          line-height:4px;">
                              <p id='subhead' style="font-weight: 400px;
                              font-size: 16px;
                              color:#4ba5fa;">Symptoms:</p>
                              <p id='values' style=" font-weight: 300px;
                              font-size: 16px;
                              color:#000000;">${Symptom?.map(
                                item => item?.symptom.join(' ')
                              )}</p>
                          </div>`
                            : ''
                        }
                        ${
                          vitalsData?.pulse_rate ||
                          vitalsData?.weight ||
                          vitalsData?.height ||
                          vitalsData?.body_temperature ||
                          vitalsData?.rate ||
                          vitalsData?.bmi
                            ? `
                        <div >
                        <p id='subhead' style="font-weight: 400px;
                        font-size: 16px;
                        margin:0;
                        color:#4ba5fa;">Vitals:</p>
                        <div class='vitalscontaioner' style="display: flex;
                        flex-direction: row;
                        gap: 8px;
                        margin-left: 8px;
                        line-height: 2px;">
                            <p id='values1' style="font-weight: 500;
                            font-size: 16px;
                            color:#000000;">Pulse rate:</p>
                            <p id='values' style="font-weight: 300px;
                            font-size: 16px;
                            color:#000000;">${
                              vitalsData?.pulse_rate
                                ? vitalsData?.pulse_rate
                                : ''
                            }</p>
                            <p id='values1' style="font-weight: 500;
                            font-size: 16px;
                            color:#000000;">Weight:</p>
                            <p id='values' style="font-weight: 300px;
                            font-size: 16px;
                            color:#000000;">${
                              vitalsData?.weight ? vitalsData?.weight : ''
                            }</p>
                            <p id='values1' style="font-weight: 500;
                            font-size: 16px;
                            color:#000000;">Height:</p>
                            <p id='values' style="font-weight: 300px;
                            font-size: 16px;
                            color:#000000;">${
                              vitalsData?.height ? vitalsData?.height : ''
                            }</p>
                            <p id='values1' style="font-weight: 500;
                            font-size: 16px;
                            color:#000000;">Temp:</p>
                            <p id='values' style="font-weight: 300px;
                            font-size: 16px;
                            color:#000000;">${
                              vitalsData?.body_temperature
                                ? vitalsData?.body_temperature
                                : ''
                            }</p>
                            <p id='values1' style="font-weight: 500;
                            font-size: 16px;
                            color:#000000;">Res.rate:</p>
                            <p id='values' style="font-weight: 300px;
                            font-size: 16px;
                            color:#000000;">${
                              vitalsData?.rate ? vitalsData?.rate : ''
                            }</p>
                            <p id='values1' style="font-weight: 500;
                            font-size: 16px;
                            color:#000000;">BMI:</p>
                            <p id='values' style="font-weight: 300px;
                            font-size: 16px;
                            color:#000000;">${
                              vitalsData?.bmi ? vitalsData?.bmi : ''
                            }</p>
                        </div>
                    </div>
                        `
                            : ''
                        }
                       
                       ${
                         diagnosis?.length > 0
                           ? ` <div class='subContaioner' style="  display: flex;
                        flex-direction: row;
                        gap: 8px;
                        line-height:4px;">
                            <p id='subhead' style="font-weight: 400px;
                            font-size: 16px;
                            color:#4ba5fa;">Diagnosis:</p>
                            <p id='values' style=" font-weight: 300px;
                            font-size: 16px;
                            color:#000000;">${diagnosis?.map(
                              item => item?.diagnosis,
                            )}</p>
                        </div>`
                           : ''
                       }
                    </div>
                   <div class='page-break-inside'> 
                    <p id='subhead' style="font-weight: 400px;
                            font-size: 16px;
                            margin-top:4px;
                            color:#4ba5fa; margin: 0;" >Prescribe:</p>
                    <table style="border-collapse: collapse;margin-bottom: 48px;">
                <tr>
                    <th style=" padding: 8px; text-align: center;">S.No</th>
                    <th style=" padding: 8px; text-align: center; width: 18%;">Medicine</th>
                    <th style=" padding: 8px; text-align: center;">Timing</th>
                    <th style=" padding: 8px; text-align: center;">Frequency</th>
                    <th style=" padding: 8px; text-align: center;">Duration</th>
                    <th style=" padding: 8px; text-align: center;">Quantity</th>
                </tr>
                ${prescribe
                  ?.map(
                    (item, index) =>
                      `<tr>
                  <td style="padding: 8px; text-align: center;font-size:16x;">${
                    parseInt(index) + 1
                  }</td>
                  <td style="padding: 8px; text-align: center;font-size:16x; width: 20%;">${
                    item?.medicine
                  }</td>
                  <td style="padding: 8px; text-align: center;font-size:16x">${
                    item?.timing
                  }</td>
                  <td style="padding: 8px; text-align: center;font-size:16x">${
                    item?.frequency
                  }</td>
                  <td style="padding: 8px; text-align: center;font-size:16x">${
                    item?.duration
                  } </td>
                  <td style="padding: 8px; text-align: center;font-size:16x">${
                    item?.total_quantity
                  }</td>
              </tr>`,
                  )
                  .join('')}
            </table>
            </div>
            </div>
                    <div class ='page'>
            
                   ${
                     note?.length > 0
                       ? ` <div class='subContaioner' style="  display: flex;
                    flex-direction: row;
                    gap: 8px;
                    line-height:4px;">
                            <p id='subhead' style="font-weight: 400px;
                            font-size: 16px;
                            color:#4ba5fa;">Notes:</p>
                            <p id='values' style=" font-weight: 300px;
                            font-size: 16px;
                            color:#000000;">${note}</p>
                        </div>`
                       : ''
                   }
        
                       ${
                         selectedDoctor?.length
                           ? ` <div >
                        <p id='subhead' style="font-weight: 400px;
                        font-size: 16px;
                        color:#4ba5fa;">Refer a Doctor:</p>
                        ${selectedDoctor?.map(
                          (
                            item,
                            ind,
                          ) => `<div class='vitalscontaioner' style=" display: flex;
                        flex-direction: row;
                        gap: 8px;
                        margin-left: 8px;
                        line-height: 2px;">
                            <p id='values1' style="  font-weight: 500;
                            font-size: 16px;
                            color:#000000;">Name:</p>
                            <p id='values' style="  font-weight: 500;
                            font-size: 16px;
                            color:#000000;">${
                              item?.dr_name?.length > 0
                                ? `Dr.${item?.dr_name},${item?.doctor_or_name}`
                                : `Dr.${item?.doctor_or_name}`
                            }</p>
                            <p id='values1' style="  font-weight: 500;
                            font-size: 16px;
                            color:#000000;">Specialist:</p>
                            <p id='values' style="  font-weight: 500;
                            font-size: 16px;
                            color:#000000;">${item?.speciality}</p>
                            <p id='values1' style="  font-weight: 500;
                            font-size: 16px;
                            color:#000000;">Ph:</p>
                            <p id='values' style="  font-weight: 500;
                            font-size: 16px;
                            color:#000000;">${item?.phone}</p>
                        </div>`,
                        )}
                    </div>`
                           : ''
                       }
                        ${
                          labreport?.length > 0
                            ? `<div class='subContaioner' style="  display: flex;
                          flex-direction: row;
                          gap: 8px;
                          line-height:4px;">
                              <p id='subhead' style="font-weight: 400px;
                              font-size: 16px;
                              color:#4ba5fa;">Test Prescribed:</p>
                              <p id='values' style=" font-weight: 300px;
                              font-size: 16px;
                              color:#000000;">${labreport?.map(
                                (item, ind) => item?.lab_test,
                              )}</p>
                          </div>`
                            : ''
                        }
        
                        ${
                          date?.length > 0
                            ? `<div class='subContaioner' style="  display: flex;
                          flex-direction: row;
                          gap: 8px;
                          line-height:4px;">
                              <p id='subhead' style="font-weight: 400px;
                              font-size: 16px;
                              color:#4ba5fa;">Follow Up:</p>
                              <p id='values'  style=" font-weight: 300px;
                              font-size: 16px;
                              color:#000000;">${date}</p>
                          </div>`
                            : ''
                        }
                        ${
                          dateTimeRed?.length > 0
                            ? `<div class='subContaioner' style="  display: flex;
                          flex-direction: row;
                          gap: 8px;
                          line-height:4px; ">
                              <p id='subhead' style="font-weight: 400px;
                              font-size: 16px;
                              color:#4ba5fa;">Validity Upto:</p>
                              <p id='values' style=" font-weight: 300px;
                              font-size: 16px;
                              color:#000000;">${dateTimeRed}</p>
                          </div>`
                            : ''
                        }
          <p id='subhead' style="font-weight: 400; font-size: 16px;color: #4ba5fa; margin: 0;">Consultaion Fees:</p>
                        <table style="border-collapse: collapse;margin-bottom: 48px;">
                        <tr>
        <th style="text-align: start; width:10%">S.No</th>
        <th style="padding: 8px; text-align: start; width: 20%;">Service Name</th>
        <th style="padding: 8px; text-align: start; width:20%">Amount</th>
    </tr>
                        ${service_fees
                          ?.map((item, index) =>
                            item?.service_name
                              ? `<tr>
                          <td style="padding: 8px; text-align: start;font-size:16x;width: 10%">${
                            parseInt(index) + 1
                          }</td>
                          <td style="padding: 8px; text-align: start;font-size:16x;width: 20%">${
                            item?.service_name
                          }</td>
                          <td style="padding: 8px; text-align: start;font-size:16x; width: 20%;">${
                            item?.charge
                          }</td>
                          
                      </tr>`
                              : '',
                          )
                          .join('')}           
                    </table>
                    <p style="margin-left: 48%;font-weight:700;font-size:16px";>Total : Rs.
                    ${charge ? charge[charge && 'totalFees'] : ''}</p>
                    </div>
                    <div class ='footer'>
                        <footer class='desc' style=" display: flex;
                        align-items:center;
                        justify-content: center;
                        margin-top: 84px;">
                            <div>
                            <p id='values2'  style="  font-weight: 400;
                            font-size: 16px;
                            color:#000000;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding-bottom: 32px;
                            line-height: 4px;">
                            This presctiption has been electronically signed by  Dr. ${data?.doctor_name}, ${data?.degree}. Reg: ${data?.medical_number} on ${
                              new Date().toISOString().split('T')[0]
                            } at ${new Date().toString().split(' ')[4]}</p>


                            <p id='values2'  style="  font-weight: 300;
                            font-size: 14px;
                            color:#000000;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            line-height: 4px;">In case of any drug interactions or side effects STOP all medicines</p>
                            <p id='values2'  style="  font-weight: 300;
                            font-size: 14px;
                            color:#000000;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            line-height: 4px;">immediately and consult your doctor or nearest hospital</p>
                        </div>
                        </footer>
                    <div>
                    <p id='values2'  style="  font-weight: 300;
                            font-size: 10px;
                            color:#000000;
                            line-height: 0px;
                            ">Powered By</p>
                        <img  id='foot' src=${CONSTANTS.pdf_footer} style="
                        width: 98px;
                        height: 40px;"/>
                    </div>
                    </div>
                </div>
                </div>
            </body>
        </html>`,
        //File Name
        fileName: 'test',
        //File directory
        directory: 'docs',
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath);
      setFilePath(file.filePath);
    }
  };

  const handlePDf = async () => {
    createPDF();
    if (await isPermitted()) {
      setTimeout(() => {
        handle();
      }, 3000);
    }
  };
  let lastKey, lastValue;
  if (vitalsData?.others) {
    const jsonObject = vitalsData?.others;

    for (const key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        lastKey = key;
        lastValue = jsonObject[key];
      }
    }
  }

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
              <HButton
                type={'addtype'}
                label={'Rx History'}
                btnstyles={{
                  backgroundColor: CUSTOMCOLOR.white,
                  borderWidth: 0.5,
                  borderColor: CUSTOMCOLOR.borderColor,
                }}
                textStyle={{color: CUSTOMCOLOR.primary}}
                onPress={() => {
                  navigation.navigate('patientrecord', {patient_phone});
                }}
              />
            </View>
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
                    uri: `data:image/jpeg;base64,${patient_data?.patient_pic_url}`,
                  }}
                />
                <View>
                  <Text
                    style={{
                      color: CUSTOMCOLOR.black,
                      fontWeight: 400,
                      fontSize: moderateScale(16),
                    }}>
                    {patient_data?.patient_name} | {patient_data?.bloodgroup} |{' '}
                    {patient_data?.patient_phone_number}
                  </Text>
                  <Text style={styles.patientText}>
                    Age :{' '}
                    {new Date().getFullYear() -
                      parseInt(
                        patient_data?.birth_date?.split('-')[0].toString(),
                      )}
                    | {patient_data?.gender}
                  </Text>
                  {(patient_data?.gender === 'female' ||
                    patient_data?.gender === 'Female') &&
                  vitalsData?.LDD &&
                  vitalsData?.EDD ? (
                    <Text style={styles.patientText}>
                      Pregnancy : LMP :{`${day}-${months[month]}-${Year}`} |
                      EDD:
                      {vitalsData.EDD}
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
                    onPress={() => navigation.navigate('vitalscreen', {gende})}>
                    <Icon
                      name={'pencil'}
                      size={moderateScale(18)}
                      color={CUSTOMCOLOR.primary}
                      style={styles.pencilIcon}
                    />
                  </Pressable>
                </View>
                {vitalsData && (
                  <Text style={styles.patientText}>
                    {vitalsData?.systolic &&
                      `BP : ${vitalsData.systolic}/${vitalsData.diastolic}`}{' '}
                    {vitalsData?.rate && `SPO2: ${vitalsData?.rate}`}{' '}
                    {vitalsData?.bmi && `BMI: ${vitalsData?.bmi}`}{' '}
                    {vitalsData?.pulse_rate &&
                      `Pulse: ${vitalsData?.pulse_rate}`}{' '}
                    {vitalsData?.body_temperature &&
                      `Temp: ${
                        vitalsData?.body_temperature
                      }${String.fromCharCode(8451)}`}{' '}
                    {vitalsData?.others?.length > 0
                      ? `${lastKey} : ${lastValue}`
                      : null}
                  </Text>
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
                            {index < allergies.length - 1 ? ',' : ''}
                          </Text>
                        </React.Fragment>
                      ))
                    : null}
                </View>
              </View>
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
                      (value?.label === 'History of Present Illness' &&
                      Prescribe?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Diagnosis' && diagnosis?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Test Prescribe' &&
                      labreport?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Follow-Up' && date?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Medical History' &&
                      pasthistory?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'History of Present Illness' &&
                      note?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Report Findings' && report
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Referral' && selectedDoctor?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value?.label === 'Medical History' &&
                      (commor?.length > 0 ||
                        socialHistory?.length > 0 ||
                        familyHistory?.length > 0 ||
                        medicationHistory ||
                        pasthistory ||
                        menstrualHistory ||
                        obstericHistory)
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
                        params.gende = gende;
                      } else if (value.navigate === 'service_fees') {
                        params.consultation_fees = consultation_fees;
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
                        value.navigate === 'examination' ||
                        value.navigate === 'findings'
                      ) {
                        params.examinationDetails = {
                          doc_phone: data?.doctor_phone_number,
                          patient_phone: patient_phone,
                          clinic_id: Clinic_id,
                          appointment_id: appointment_id,
                        };
                      } else if (value.navigate === 'medicalhistory') {
                        params.gende = gende;
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
                              // </View>
                            )
                          );
                        })}
                      </View>
                    </View>
                  )}
                  {value.label === 'Prescribe' && prescribe.length > 0 && (
                    <View style={styles.basiccontainer}>
                      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <View style={styles.pres}>
                          <View>
                            {prescribe?.map((item, ind) => (
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
                                    {item.total_quantity}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                  {value.label === 'Follow-Up' && date !== '' && (
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
                    note !== '' && (
                      <View style={styles.complaintcontainer}>
                        <Icon
                          name="file-document-edit"
                          color={CUSTOMCOLOR.primary}
                          size={moderateScale(16)}
                        />
                        <Text style={styles.pulse}>{note}</Text>
                      </View>
                    )}
                  {/* {value.label === 'Diagnosis' && diagnosis !== '' && 
                    
                     {diagnosis.map((item,index)=>{
                      <View style={styles.complaintcontainer}>
                       <Icon
                       name="prescription"
                       color={CUSTOMCOLOR.primary}
                       size={moderateScale(16)}
                     />
                     <Text style={styles.pulse}>{diagnosis}</Text>
                        
                    </View>
                     })} } */}
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

                  {value.label === 'Comorbidities' &&
                    commorbities.length > 0 && (
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

                  {value.label === 'Test Prescribe' && labreport.length > 0 && (
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
    fontSize: moderateScale(16),
  },
  line: {
    // borderWidth:1,
    // borderBottomWidth: moderateScale(0.5),
    // borderBottomColor: CUSTOMCOLOR.primary,
    paddingHorizontal: horizontalScale(8),
  },
});
export default Visit;
