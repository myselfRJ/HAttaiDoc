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
import {CONSTANT} from '../utility/const';
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

const Visit = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [filePath, setFilePath] = useState('');
  // const [show, setShow] = useState(false);
  const [prevLoad, setPrevLoad] = useState(false);
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const date = useSelector(state => state?.dateTime?.date);
  const diagnosis = useSelector(state => state?.diagnosis?.DiagnosisItems);
  const notes = useSelector(state => state?.prescription?.additional_notes);
  const vitalsData = useSelector(state => state.prescription.vitalsData);
  const physical = useSelector(state => state.prescription.physicalExamination);
  const reptr = useSelector(state => state.prescription.eaxminationFindings);
  console.log('============>', physical);
  const note = useSelector(state => state.prescription.note);
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

  // const pasthistory = useSelector(state => state?.pasthistory?.pasthistory);

  // const pasthistory2 = useSelector(state => state?.pasthistory?.medicationHistory);
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

  const martialHistory = useSelector(
    state => state?.pasthistory?.martialHistory,
  );
  const commor = useSelector(state => state?.pasthistory?.commorbidities);

  const socialHistory = useSelector(state => state?.pasthistory?.socialHistory);

  const familyHistory = useSelector(state => state?.pasthistory?.familyHistory);
  const service_fees = useSelector(state => state.prescription.fees);
  const charge =
    service_fees?.length > 0 ? service_fees?.[service_fees?.length - 1] : null;

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
  const Clinic_id = useSelector(state => state?.clinicid?.clinic_id);

  useEffect(() => {
    dispatch(addCheifComplaint(complaint));
  }, []);

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
      dispatch(addAllergies(uniqueArray));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };

  useEffect(() => {
    fetchAllergyData();
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
    note: JSON.stringify({note: note, additional_notes: notes}),
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
      martial_history: JSON.stringify(martialHistory),
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
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchReport();
    fetchPatientData();
    GetFees();
    fetchVitals();
    fetchComplaint();
    fetchDoctor();
    // SetUploadDocument(report_findings)
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchReport();
      fetchPatientData();
      GetFees();
      // fetchVitals();
      // fetchComplaint();
      fetchDoctor();
    }, []),
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
  // useEffect(() => {
  //   createPDF();
  // });
  const createPDF = async () => {
    if (await PermmisionStorage()) {
      // setPrevLoad(!prevLoad)

      let options = {
        html: `<!DOCTYPE html>
      <style>
      body {width:100%}
      header {width:100%;display: flex;position:fixed;top:0; justify-content: space-between;border-bottom: 2px solid black;padding-bottom: 8px;}
       text {font-size: 12px;padding:1px;font-weight: 500;}
      h5 {margin: 1px;padding: 0px; font-size:14px;color:#4ba5fa}
      tr {display:flex;font-size:14px;justify-content: space-between;width:100%;padding:8px;align-items:flex-start;}
      td{justify-content: space-around;font-size: 10px;}
      .doctor-head text {color:#4ba5fa}
      </style>
      
      <body >
          <header >
              <div style="display:flex;flex-direction: row; gap:1rem;">
                  <img src=${
                    logo === CONSTANTS.default_image
                      ? CONSTANTS.default_clinic_logo
                      : logo_url
                  }
                  style="height:48px;width:48px">
              </img>
              <div class="doctor-head" style="display:flex;flex-direction: column;align-items:flex-start;">
                  <text>
                     Dr.${data?.doctor_name}
                  </text>
                  <text>
                      ${data?.specialization}
                  </text>
                  <text>
                     Reg No. ${data?.medical_number}
                  </text>
              </div>
          
          
              </div>
              <div style="display:flex;flex-direction: column; gap:2px; align-items: flex-end;">
                 <h5>
                  ${clinic_name}
                 <h5>
                 <text style="font-size: 10px;">
                  Phone: ${clinic_phone} / Address: ${clinic_Address}
                 </text>
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
              <text>${name}  | ${gende} | ${age} | ${patient_phone}</text>
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
            vitalsData?.pulse_rate ||
            vitalsData?.weight ||
            vitalsData?.height ||
            vitalsData?.body_temperature ||
            vitalsData?.rate ||
            vitalsData?.bmi
              ? `<div>
              <h5>
                  Vitals
              </h5>
              <text>
                  ${
                    vitalsData?.pulse_rate
                      ? 'Pulse Rate' + ' ' + vitalsData.pulse_rate + 'bpm'
                      : ''
                  }
                  ${
                    vitalsData?.systolic
                      ? 'BP' +
                        ' ' +
                        vitalsData.systolic +
                        '/' +
                        vitalsData.diastolic +
                        'bpm'
                      : ''
                  }
                  ${
                    vitalsData?.weight
                      ? 'Weight' + ' ' + vitalsData.weight + 'Kgs'
                      : ''
                  }
                  ${
                    vitalsData?.height
                      ? 'Height' + ' ' + vitalsData.height + 'cm'
                      : ''
                  }
                  ${
                    vitalsData?.body_temperature
                      ? 'Temp' + ' ' + vitalsData.body_temperature + '°C'
                      : ''
                  }
                  ${
                    vitalsData?.rate
                      ? 'Respiratory Rate' + ' ' + vitalsData.rate + 'brpm'
                      : ''
                  }
                  ${vitalsData?.bmi ? 'BMI' + ' ' + vitalsData.bmi + '' : ''}
                  
                  


              </text>
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
            JSON?.stringify(reptr) !== '{}'
              ? `<div>
              <h5>
                  Report Finding
              </h5>
              <text>
                  ${reptr?.describe}
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
              <text>
                  ${physical?.value}
              </text>
          </div>`
              : ''
          } 
      </div>
          
          
          <div style="margin-top:16px;" >
          <h5 style="font-size:14px">
          Prescribe
          </h5>
          <table style="width:100%;;">
          

              <tr>
                  <th style="text-align:center;width:4%;">S.NO</th>
                  <th style="text-align:center;width:45%;">Medicine</th>
                  <th style="text-align:center;width:12%;">Timing</th>
                  <th style="text-align:center;width:12%;">Frequency</th>
                  <th style="text-align:center;width:12%;">Duration</th>
                  <th style="text-align:center;width:12%;">Quantity</th>
                </tr>
                ${prescribe
                  ?.map(
                    (value, index) => `
                <tr style=${
                  index === 10
                    ? 'page-break-before:always;margin-top:100px'
                    : ''
                }>
                  <td style="text-align:center;width:4%">${
                    parseInt(index) + 1
                  }</td>
                  <td style="text-align:center;width:45%">${
                    value?.medicine
                  }</td>
                  <td style="text-align:center;width:12%">${value?.timing}</td>
                  <td style="text-align:center;width:12%">${
                    value?.frequency
                  }</td>
                  <td style="text-align:center;width:12%">${
                    value?.duration
                  }</td>
                  <td style="text-align:center;width:12%">${
                    value.total_quantity
                  }</td>
                </tr>
                `,
                  )
                  .join('')}
           
          </table>
          </div>

          ${
            date?.length > 0
              ? `<div>
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
                  Test Prescribed
              </h5>
              <text>
                  ${labreport?.map(value => value.lab_test).join(', ')}
              </text>
          </div>`
              : ''
          } 

          ${
            service_fees?.length > 1
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
      <footer style="display:flex;flex-direction:column;align-items:center;position:fixed;  bottom:0;page-break-before: auto;">
          <p>
              This Prescription electronically signed by ${
                data?.doctor_name
              } ,${data?.degree}, ${
          data?.medical_number
        }, ${new Date().toString()}
          </p>
          <img src=${
            CONSTANTS.pdf_footer
          } style="align-self:center;width:104px;height:40px"></img>
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

  const physi = JSON.stringify(physical);
  const examinationDetails = {
    doc_phone: data?.doctor_phone_number,
    patient_phone: patient_phone,
    clinic_id: Clinic_id,
    appointment_id: appointment_id,
    patient_name: patient_data?.patient_name,
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
                    <Text style={[styles.patientText, {fontWeight: '700'}]}>
                      Pregnant (LMP: {`${day}-${months[month]}-${Year}`} | EDD:{' '}
                      {vitalsData.EDD})
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
                    {vitalsData?.systolic && (
                      <Text>
                        BP:{' '}
                        <Text style={{fontWeight: '700'}}>
                          {vitalsData.systolic}/{vitalsData.diastolic}
                        </Text>
                      </Text>
                    )}{' '}
                    {vitalsData?.oxygen_level && (
                      <Text>
                        SPO2:{' '}
                        <Text style={{fontWeight: '700'}}>
                          {vitalsData.oxygen_level}
                        </Text>
                        %
                      </Text>
                    )}{' '}
                    {vitalsData?.bmi !== 'NaN' && (
                      <Text>
                        BMI:{' '}
                        <Text style={{fontWeight: '700'}}>
                          {vitalsData.bmi}
                        </Text>
                      </Text>
                    )}{' '}
                    {vitalsData?.pulse_rate && (
                      <Text>
                        Pulse:{' '}
                        <Text style={{fontWeight: '700'}}>
                          {vitalsData.pulse_rate}
                        </Text>
                        bpm
                      </Text>
                    )}{' '}
                    {vitalsData?.body_temperature && (
                      <Text>
                        Temp:{' '}
                        <Text style={{fontWeight: '700'}}>
                          {vitalsData.body_temperature}
                        </Text>
                        {String.fromCharCode(8451)}
                      </Text>
                    )}{' '}
                    {vitalsData?.others &&
                      Object?.keys(vitalsData?.others)[0] !== '' && (
                        <Text>
                          {vitalsData?.others
                            ? Object.keys(vitalsData?.others)[0]
                            : null}{' '}
                          :
                          <Text style={{fontWeight: '700'}}>
                            {vitalsData?.others
                              ? Object.values(vitalsData?.others)[0]
                              : null}
                          </Text>
                        </Text>
                      )}
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
                            {index < allergies.length - 1 ? ',  ' : ''}
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
                      (value?.label === 'Prescribe' && Prescribe?.length > 0
                        ? 'check-circle'
                        : '') ||
                      (value.label === 'Additional Recommendations/Notes' &&
                      notes !== ''
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
                        menstrualHistory?.length > 0 ||
                        JSON.stringify(obstericHistory) !== '{}' ||
                        JSON.stringify(martialHistory) !== '{}'
                          ? 'check-circle'
                          : '')) ||
                      (value?.label === 'Physical Examinations' &&
                      physi !== '{}'
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
                        params.medicaldata = {
                          gende: gende,
                          patient_phone: patient_phone,
                          phone: phone,
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
                  {value.label === 'Doctor Notes' && notes !== '' && (
                    <View style={styles.complaintcontainer}>
                      <Icon
                        name="file-document-edit"
                        color={CUSTOMCOLOR.primary}
                        size={moderateScale(16)}
                      />
                      <Text style={styles.pulse}>{notes}</Text>
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
