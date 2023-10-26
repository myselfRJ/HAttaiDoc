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
import {updatePrescribe1} from '../redux/features/prescription/prescr';
import {updateSymptom} from '../redux/features/prescription/symptomslice';
import {updateDate} from '../redux/features/prescription/Followupslice';
import {updateCommorbities} from '../redux/features/prescription/commorbities';
import {updateDiagnosis} from '../redux/features/prescription/diagnosis';
import {updatepastHistory} from '../redux/features/prescription/pastHistory';
import {updateLabReport} from '../redux/features/prescription/labreport';
import {updateAllergies} from '../redux/features/prescription/allergies';
import {updateValid} from '../redux/features/prescription/valid';
import {
  updatecommorbidities,
  updatefamilyHistory,
  updatemedicationHistory,
  updatemenstrualHistory,
  updateobstericHistory,
  updatepastHospitalization,
  updatesocialHistory,
} from '../redux/features/prescription/pastHistory';
import {
  addVitals,
  UpdateNote,
  UpdateDoctorRefer,
  UpadteVitals,
  UpadateCheifComplaint,
  addCheifComplaint,
} from '../redux/features/prescription/prescriptionSlice';
import VitalScreen from './vitalscreen';
import {CONSTANTS} from '../utility/constant';
import Seperator from '../components/seperator';

const Visit = ({navigation, route}) => {
  const [filePath, setFilePath] = useState('');

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const date = useSelector(state => state?.dateTime?.date);
  //console.log('date=======', typeof date);
  const diagnosis = useSelector(state => state?.diagnosis?.DiagnosisItems);

  const vitalsData = useSelector(state => state.prescription.vitalsData);

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
  const [apiStatus, setApiStatus] = useState({});

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
  console.log('======>hospitilization', hospitalization);
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

  useEffect(() => {
    setPrescribe(Prescribe);
  }, [Prescribe]);

  const logo = useSelector(state => state?.clinicid?.clinic_logo);

  const [submit, setSubmit] = useState(false);

  const habdlePrescribe = () => {
    setSubmit(true);
  };
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
      // console.log(jsonData.data);
      setPatientData(jsonData.data[0]);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchPatientData();
  }, []);
  const Clinic_id = useSelector(state => state?.clinicid?.clinic_id);

  const ResetRuduxState = () => {
    const newPrescribe = [];
    const newSymptoms = [];
    const newDiagnosis = [];
    const newLabhistory = [];
    const newCommorbities = [];
    const newAllregies = [];
    const commorbidities = [];
    const social = [];
    const family = [];

    const hospitalization = '';

    const medicationHistory = '';
    const menstrualHistory = '';
    const obstericHistory = '';
    const newDate = {
      date: '',
    };
    const newValid = {
      valid: '',
    };
    const newVitals = {};
    const newDoctor = [];
    const newComplaint = '';
    const newNote = '';
    dispatch(updatesocialHistory(social));
    dispatch(updatefamilyHistory(family));
    dispatch(updatepastHospitalization(hospitalization));
    dispatch(updatemedicationHistory(medicationHistory));
    dispatch(updatemenstrualHistory(menstrualHistory));
    dispatch(updateobstericHistory(obstericHistory));
    dispatch(updatePrescribe1(newPrescribe));
    dispatch(updateAllergies(newAllregies));
    dispatch(updateCommorbities(newCommorbities));
    dispatch(updateDiagnosis(newDiagnosis));
    dispatch(updateLabReport(newLabhistory));
    dispatch(updateSymptom(newSymptoms));
    dispatch(updateDate(newDate?.date));
    dispatch(updateValid(newValid?.valid));
    dispatch(UpadteVitals(newVitals));
    dispatch(UpdateNote(newNote));
    dispatch(UpdateDoctorRefer(newDoctor));
    dispatch(UpadateCheifComplaint(newComplaint));
    dispatch(updatecommorbidities(commorbidities));
  };

  useEffect(() => {
    dispatch(addCheifComplaint(complaint));
  }, []);

  const [chief_complaint, setComplaint] = useState('');
  const [vitals, setVitals] = useState({});
  const fetchData = async () => {
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
      commoribities: commorbities,
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
    try {
      setLoading(true);
      const response = await fetchApi(URL.savePrescription, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(consultationData),
      });
      if (response.ok) {
        const jsonData = await response.json();
        if (jsonData?.status === 'success') {
          setApiStatus({status: 'success', message: 'Successfully created'});
          SuccesRef?.current?.snapToIndex(1);
          // Prescribe.splice(0,Prescribe.length)
          ResetRuduxState();
          setTimeout(() => {
            navigation.navigate('tab');
          }, 1000);

          setLoading(false);
          // setTimeout(() => {
          //   SuccesRef?.current?.snapToIndex(0);
          // }, 1500);
        } else {
          setApiStatus({status: 'warning', message: 'Enter all Values'});
          console.error('API call failed:', response.status, response);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setApiStatus({status: 'error', message: 'Please try again'});
      setLoading(false);
    }
  };

  const SuccesRef = useRef(null);

  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);

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

  const handlePreview = () => {
    const patient_phone_number = patient_phone;
    const patient_name = patient_name;
    const gender = gende;
    const patient_age = age;
    navigation.navigate('prescription', {
      name,
      gender,
      patient_age,
      patient_phone_number,
    });
  };

  const putVitals = async () => {
    const consultationData = {
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
    try {
      const response = await fetchApi(URL.updatevitlas(appointment_id), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(consultationData),
      });
      if (response.ok) {
        const jsonData = await response.json();
        // Handle successful response data
        console.log('Complaint updated successfully:', jsonData);
      } else {
        console.error('API call failed:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const putComplaint = async () => {
    const consultationData = {
      complaint_message: selectedComplaint,
      patient_phone_number: patient_phone,
      doctor_phone_number: phone,
      clinic_id: Clinic_id,
      appointment_id: appointment_id,
    };
    try {
      const response = await fetchApi(URL.updateComplaints(appointment_id), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(consultationData),
      });
      if (response.ok) {
        const jsonData = await response.json();
        // Handle successful response data
        console.log('Complaint updated successfully:', jsonData);
      } else {
        console.error('API call failed:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
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
      console.log('-----------------js', jsonData);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchVitals();
  }, []);

  const months = CONSTANTS.months;

  const month = vitalsData?.LDD ? vitalsData?.LDD.split('-')[1] : '';
  const day = vitalsData?.LDD ? vitalsData?.LDD.split('-')[2] : '';
  const Year = vitalsData?.LDD ? vitalsData?.LDD.split('-')[0] : '';

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };

  const clinic_name = useSelector(state => state?.clinicid?.clinic_name);
  const clinic_Address = useSelector(state => state?.clinicid?.clinic_Address);
  const logo_url = `data:image/png;base64,${logo}`;
  const sign = useSelector(state => state?.sign?.sign);
  console.log('---------sign=========>', sign);
  const Sign_base64 = sign
    ? `data:image/jpeg;base64,${sign}`
    : data?.doctor_name;

  const createPDF = async () => {
    if (await isPermitted()) {
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
            </head>
            <body>
                <div class='maincontaioner' style=" width: 650px;
                height: 842px;
                background-color: #ffffff;
                padding: 24px;">
                    <div class='head'>
                        <div class='first' style="  padding: 8px;
                        display: flex;
                        flex-direction: row;
                        border-bottom:1px #4ba5fa solid;">
                            <img id='img' src=${
                              logo ? logo_url : CONSTANTS.default_clinic_logo
                            } style="width: 52px;height: 58px;" alt="Sample Image"/>
                            <div class='address' style="   display: flex;
                            margin-right: 0px;
                            flex-direction: row;
                            justify-content: space-between;
                            width:500px">
                                <div class='namecontaioner' style="padding: 4px;">
                                    <p id='docname' style=" font-weight: 600px;
                                    font-size: 14px;
                                    margin-left: 8px ;
                                    color: #4ba5fa;
                                    line-height: 8px;">${data.doctor_name}</p>
                                    <p id='spec' style="font-weight: 400px;
                                    font-size: 12px;
                                    margin-left: 8px ;
                                    line-height: 0px;
                                    color: #4ba5fa;">${data.specialization}</p>
                                </div>
                                <div class='namecontaioner' style="  padding: 4px;">
                                    <p id='docname' style="font-weight: 600px;
                                    font-size: 14px;
                                    margin-left: 8px ;
                                    color: #4ba5fa;
                                    line-height: 8px;">
                                    <p id='docname' style="font-weight: 600px;
                                    font-size: 14px;
                                    margin-left: 8px ;
                                    color: #4ba5fa;
                                    line-height: 8px;">${clinic_name}</p>
                                    <p id='spec' style="font-weight: 400px;
                                    font-size: 12px;
                                    margin-left: 8px ;
                                    line-height: 0px;
                                    color: #4ba5fa;">${clinic_Address}</p>
                                </div>
                            </div>
                        </div>
                        <div class='second' style="display: flex;
                        flex-direction: row;
                        justify-content: space-between;">
                            <img id='rximg' src=${
                              CONSTANTS.prescription_logo
                            } style="width:28px;
                            height: 43px;"/>
                            <p id='date' style="font-size: 14px;
                            font-weight: 400px;">Date:${
                              new Date().toISOString().split('T')[0]
                            },Time:${new Date().toString().split(' ')[4]}</p>
                        </div>
                    </div>
                    <div class='third' >
                        <p id='patientDetails' style=" font-size: 12px;
                        font-weight: 400px;">${name} | ${gende} | ${age} | ${patient_phone}</p>
                        <div class='subContaioner' style="  display: flex;
                        flex-direction: row;
                        gap: 8px;
                        line-height:4px;">
                            <p id='subhead' style="font-weight: 400px;
                            font-size: 12px;
                            color:#4ba5fa;">Cheif Complaint:</p>
                            <p id='values' style=" font-weight: 300px;
                            font-size: 12px;
                            color:#000000;">${selectedComplaint}</p>
                        </div>
                        <div class='subContaioner'  style="  display: flex;
                        flex-direction: row;
                        gap: 8px;
                        line-height:4px;">
                            <p id='subhead' style="font-weight: 400px;
                            font-size: 12px;
                            color:#4ba5fa;">Symptoms:</p>
                            <p id='values' style=" font-weight: 300px;
                            font-size: 12px;
                            color:#000000;">${Symptom?.map(
                              item => item?.symptom,
                            )}</p>
                        </div>
                        <div >
                            <p id='subhead' style="font-weight: 400px;
                            font-size: 12px;
                            color:#4ba5fa;">Vitals:</p>
                            <div class='vitalscontaioner' style="display: flex;
                            flex-direction: row;
                            gap: 8px;
                            margin-left: 8px;
                            line-height: 2px;">
                                <p id='values1' style="font-weight: 500;
                                font-size: 12px;
                                color:#000000;">Pulse rate:</p>
                                <p id='values' style="font-weight: 300px;
                                font-size: 12px;
                                color:#000000;">${
                                  vitalsData?.pulse_rate
                                    ? vitalsData?.pulse_rate
                                    : ''
                                }</p>
                                <p id='values1' style="font-weight: 500;
                                font-size: 12px;
                                color:#000000;">Weight:</p>
                                <p id='values' style="font-weight: 300px;
                                font-size: 12px;
                                color:#000000;">${
                                  vitalsData?.weight ? vitalsData?.weight : ''
                                }</p>
                                <p id='values1' style="font-weight: 500;
                                font-size: 12px;
                                color:#000000;">Height:</p>
                                <p id='values' style="font-weight: 300px;
                                font-size: 12px;
                                color:#000000;">${
                                  vitalsData?.height ? vitalsData?.height : ''
                                }</p>
                                <p id='values1' style="font-weight: 500;
                                font-size: 12px;
                                color:#000000;">Temp:</p>
                                <p id='values' style="font-weight: 300px;
                                font-size: 12px;
                                color:#000000;">${
                                  vitalsData?.body_temperature
                                    ? vitalsData?.body_temperature
                                    : ''
                                }</p>
                                <p id='values1' style="font-weight: 500;
                                font-size: 12px;
                                color:#000000;">Res.rate:</p>
                                <p id='values' style="font-weight: 300px;
                                font-size: 12px;
                                color:#000000;">${
                                  vitalsData?.rate ? vitalsData?.rate : ''
                                }</p>
                                <p id='values1' style="font-weight: 500;
                                font-size: 12px;
                                color:#000000;">BMI:</p>
                                <p id='values' style="font-weight: 300px;
                                font-size: 12px;
                                color:#000000;">${
                                  vitalsData?.bmi ? vitalsData?.bmi : ''
                                }</p>
                            </div>
                        </div>
                        <div class='subContaioner' style="  display: flex;
                        flex-direction: row;
                        gap: 8px;
                        line-height:4px;">
                            <p id='subhead' style="font-weight: 400px;
                            font-size: 12px;
                            color:#4ba5fa;">Diagnosis:</p>
                            <p id='values' style=" font-weight: 300px;
                            font-size: 12px;
                            color:#000000;">${diagnosis?.map(
                              item => item?.diagnosis,
                            )}</p>
                        </div>
                    </div>
                    <div class='presContaioner' style=" display: flex;
                    justify-content: space-between;
                    background-color: #DFF0FF;
                    padding: 2px;
                    line-height: 4px;
                    flex-direction: row;">
                        <p id='values3' style="font-weight: 500;
                        font-size: 12px;
                        color:#000000;
                        width:130px;">S.No</p>
                        <p id='values3' style="font-weight: 500;
                        font-size: 12px;
                        color:#000000;
                        width:130px;">Mode</p>
                        <p id='values3' style="font-weight: 500;
                        font-size: 12px;
                        color:#000000;
                        width:130px;">Medicine</p>
                        <p id='values3' style="font-weight: 500;
                        font-size: 12px;
                        color:#000000;
                        width:130px;">Dose</p>
                        <p id='values3' style="font-weight: 500;
                        font-size: 12px;
                        color:#000000;
                        width:130px;">Timing</p>
                        <p id='values3' style="font-weight: 500;
                        font-size: 12px;
                        color:#000000;
                        width:130px;">Frequency</p>
                        <p id='values3' style="font-weight: 500;
                        font-size: 12px;
                        color:#000000;
                        width:130px;">Duration</p>
                        <p id='values3' style="font-weight: 500;
                        font-size: 12px;
                        color:#000000;
                        width:130px;">Quantity</p>
                    </div>
                   ${prescribe?.map(
                     (item, ind) =>
                       `<div class='presContaioner1' style="display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    padding: 2px;
                    line-height: 4px;">
                        <p id='values4' style="  font-weight: 400;
                        font-size: 12px;
                        color:#000000;
                        width:130px;
                        padding-left: 4px;">${parseInt(ind) + 1}</p>
                        <p id='values4' style="  font-weight: 400;
                        font-size: 12px;
                        color:#000000;
                        width:130px;
                        padding-left: 4px;">${item.mode}</p>
                        <p id='values4' style="  font-weight: 400;
                        font-size: 12px;
                        color:#000000;
                        width:300px;
                        padding-left: 4px;">${item?.medicine}</p>
                        <p id='values4' style="  font-weight: 400;
                        font-size: 12px;
                        color:#000000;
                        width:130px;
                        padding-left: 4px;">${item?.dose_quantity}</p>
                        <p id='values4' style="  font-weight: 400;
                        font-size: 12px;
                        color:#000000;
                        width:130px;
                        padding-left: 4px;">${item?.timing}</p>
                        <p id='values4' style="  font-weight: 400;
                        font-size: 12px;
                        color:#000000;
                        width:130px;
                        padding-left: 4px;">${item?.frequency}</p>
                        <p id='values4' style="  font-weight: 400;
                        font-size: 12px;
                        color:#000000;
                        width:130px;
                        padding-left: 4px;">${item?.duration}</p>
                        <p id='values4' style="  font-weight: 400;
                        font-size: 12px;
                        color:#000000;
                        width:130px;
                        padding-left: 4px;">${item?.total_quantity}</p>
                    </div>`,
                   )}
                    <div class='subContaioner' style="  display: flex;
                    flex-direction: row;
                    gap: 8px;
                    line-height:4px;">
                            <p id='subhead' style="font-weight: 400px;
                            font-size: 12px;
                            color:#4ba5fa;">Notes:</p>
                            <p id='values' style=" font-weight: 300px;
                            font-size: 12px;
                            color:#000000;">${note}</p>
                        </div>
        
                        <div >
                            <p id='subhead' style="font-weight: 400px;
                            font-size: 12px;
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
                                font-size: 12px;
                                color:#000000;">Name:</p>
                                <p id='values' style="  font-weight: 500;
                                font-size: 12px;
                                color:#000000;">${item?.doctor_name}</p>
                                <p id='values1' style="  font-weight: 500;
                                font-size: 12px;
                                color:#000000;">Specialist:</p>
                                <p id='values' style="  font-weight: 500;
                                font-size: 12px;
                                color:#000000;">${item?.speciality}</p>
                                <p id='values1' style="  font-weight: 500;
                                font-size: 12px;
                                color:#000000;">Ph:</p>
                                <p id='values' style="  font-weight: 500;
                                font-size: 12px;
                                color:#000000;">${item?.phone}</p>
                            </div>`,
                            )}
                        </div>
                        <div class='subContaioner' style="  display: flex;
                        flex-direction: row;
                        gap: 8px;
                        line-height:4px;">
                            <p id='subhead' style="font-weight: 400px;
                            font-size: 12px;
                            color:#4ba5fa;">Test Prescribed:</p>
                            <p id='values' style=" font-weight: 300px;
                            font-size: 12px;
                            color:#000000;">${labreport?.map(
                              (item, ind) => item?.lab_test,
                            )}</p>
                        </div>
                        <div class='subContaioner' style="  display: flex;
                        flex-direction: row;
                        gap: 8px;
                        line-height:4px;">
                            <p id='subhead' style="font-weight: 400px;
                            font-size: 12px;
                            color:#4ba5fa;">Follow Up:</p>
                            <p id='values'  style=" font-weight: 300px;
                            font-size: 12px;
                            color:#000000;">${date}</p>
                        </div>
                        <div class='sign' style="  display: flex;
                align-items: center;
                justify-content: flex-end;
                line-height: 4px;">
                    <div>
                    <p id='values1' style="  font-weight: 500;
                    font-size: 12px;
                    color:#000000;">Signature</p>
                    <p id='values'  style=" font-weight: 300px;
                    font-size: 12px;
                    color:#000000;">Dr.name</p>
                    </div>
                </div>
                        <div class='subContaioner' style="  display: flex;
                        flex-direction: row;
                        gap: 8px;
                        line-height:4px;">
                            <p id='subhead' style="font-weight: 400px;
                            font-size: 12px;
                            color:#4ba5fa;">Validity Upto:</p>
                            <p id='values' style=" font-weight: 300px;
                            font-size: 12px;
                            color:#000000;">${dateTimeRed}</p>
                        </div>
                        <div class='desc' style=" display: flex;
                        align-items:center;
                        justify-content: center;
                        margin-top: 84px;">
                            <div>
                            <p id='values2' style="  font-weight: 300;
                            font-size: 12px;
                            color:#000000;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            line-height: 4px;">Not valid for Medical Legal Purpose</p>
                            <p id='values2'  style="  font-weight: 300;
                            font-size: 12px;
                            color:#000000;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            line-height: 4px;">In case of any drug interactions or side effects STOP all medicines</p>
                            <p id='values2'  style="  font-weight: 300;
                            font-size: 12px;
                            color:#000000;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            line-height: 4px;">immediately and consult your doctor or nearest hospital</p>
                        </div>
                        </div>
                    <div>
                        <img  id='foot' src=${
                          CONSTANTS.pdf_footer
                        } style="margin-top: 32px;
                        width: 87px;
                        height: 45px;"/>
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
      handle();
      // readFile();
    }
  };
  const postData = async url => {
    const formData = new FormData();
    formData.append('doctor_phone_number', `${data?.doctor_phone_number}`);
    formData.append('patient_phone_number', `${patient_phone}`);
    formData.append('clinic_id', `${Clinic_id}`);
    formData.append('appointment_id', `${appointment_id}`);
    formData.append('file_url', {
      uri: `file:///storage/emulated/0/Android/data/com.hattaidoc/files/docs/test.pdf`,
      type: 'application/pdf',
      name: `${patient_phone}.pdf`,
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    try {
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      console.log('API Response:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const apiUrl = URL.uploadPDF;

  const handle = () => {
    postData(apiUrl);
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
                borderWidth: 0.5,
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
                    {patient_data?.patient_name}
                  </Text>
                  <Text style={styles.patientText}>
                    Age :{' '}
                    {new Date().getFullYear() -
                      parseInt(
                        patient_data?.birth_date?.split('-')[0].toString(),
                      )}
                    | {patient_data?.gender}
                  </Text>
                  <Text style={styles.patientText}>
                    Blood Group : {patient_data?.bloodgroup}
                  </Text>
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
                <Text style={styles.patientText}>
                  BP: {vitalsData.systolic}/{vitalsData.diastolic} SPO2:{' '}
                  {vitalsData?.rate} BMI: {vitalsData?.bmi} Pulse:{' '}
                  {vitalsData?.pulse_rate} Temp: {vitalsData?.boby_temparature}
                </Text>
                {(patient_data?.gender === 'Female' ||
                  patient_data?.gender === 'Female') &&
                vitalsData?.LDD &&
                vitalsData?.EDD ? (
                  <Text style={styles.patientText}>
                    Pregnancy : LMP :{`${day}-${months[month]}-${Year}`} | EDD:
                    {vitalsData.EDD}
                  </Text>
                ) : null}
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

                <View style={{flexDirection: 'row'}}>
                  {allergies?.length > 0
                    ? allergies?.map((item, index) => (
                        <Text style={styles.patientText}>
                          {item?.allergies}
                          {' , '}
                        </Text>
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
                                    {item.mode} | {item.medicine} |
                                    {item.dose_quantity} | {item.timing} |
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
                                  {Language[language]['rate']}:{vitalsData.rate}
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
                  {value.label === 'Present Illness' && note !== '' && (
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
              justifyContent: 'space-between',
              paddingHorizontal: horizontalScale(24),
            }}>
            <HButton
              label="Preview"
              onPress={handlePreview}
              // onPress={createPDF}
              btnstyles={{
                backgroundColor: CUSTOMCOLOR.white,
              }}
              textStyle={{
                color: CUSTOMCOLOR.primary,
              }}
            />
            <HButton
              label="Save"
              onPress={() => {
                fetchData();
                putVitals();
                putComplaint();
                // createPDF();
              }}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
      <BottomSheetView
        bottomSheetRef={SuccesRef}
        snapPoints={'50%'}
        backgroundStyle={CUSTOMCOLOR.white}>
        <StatusMessage status={apiStatus.status} message={apiStatus.message} />
      </BottomSheetView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: moderateScale(24),
    gap: moderateScale(16),
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
    backgroundColor: CUSTOMCOLOR.white,
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
