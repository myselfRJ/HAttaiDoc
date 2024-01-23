import React, {useState, useEffect, useRef} from 'react';
import {View, Alert} from 'react-native';
import PDFViewer from '../components/PdfViewer';
import {useRoute} from '@react-navigation/native';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
import {StatusMessage, HButton, BottomSheetView} from '../components';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {updatePrescribe1} from '../redux/features/prescription/prescr';
import {updateSymptom} from '../redux/features/prescription/symptomslice';
import {updateDate} from '../redux/features/prescription/Followupslice';
import {updateCommorbities} from '../redux/features/prescription/commorbities';
import {updateDiagnosis} from '../redux/features/prescription/diagnosis';
import {
  addAdvice,
  addCheck_field,
  addProcedures,
  addRedFalg,
  updatemartialHistory,
  updatepastHistory,
} from '../redux/features/prescription/pastHistory';
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
  updatefees,
  updateAdditionalNote,
  UpadteExamination,
  UpadteFindings,
} from '../redux/features/prescription/prescriptionSlice';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {useSelector, useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {commonstyles} from '../styles/commonstyle';
import sendNotification from '../utility/notification';

const PdfView = ({navigation}) => {
  const serverFCM = useSelector(state => state?.phone?.serverFCMapi);
  const [patientFcmTokens, setPatientFcmTokens] = useState([]);
  const [bottom, setBottom] = useState(false);
  const FecthFcmTokensByPatient = async () => {
    try {
      const response = await fetch(URL.GetFcmTokens_Patient(patient_phone), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const jsonData = await response.json();
        setPatientFcmTokens(jsonData?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FecthFcmTokensByPatient();
  }, []);
  const [apiStatus, setApiStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const {
    path,
    consultationData,
    UpdateVitals,
    UpdateComplaint,
    appointment_id,
    doc_phone,
    patient_phone,
    prevScreen,
  } = route.params;

  // console.log('data==', consultationData?.pastHistory?.martial_history);

  const dispatch = useDispatch();
  const token = useSelector(state => state.authenticate.auth.access);
  const Clinic_id = useSelector(state => state?.clinicid?.clinic_id);
  const pharmaphone = useSelector(
    state => state?.clinicid?.clinic_pharmacy_phone,
  );
  const appointmentID = useSelector(state => state?.address?.appointment_id);
  const follow_up = useSelector(state => state?.dateTime?.date);
  const date =
    follow_up?.length > 0
      ? follow_up?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const dia = useSelector(state => state?.diagnosis?.DiagnosisItems);
  const diagnosis =
    dia?.length > 0
      ? dia?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const adn = useSelector(state => state?.prescription?.additional_notes);
  const notes =
    adn?.length > 0
      ? adn?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const vital = useSelector(state => state.prescription.vitalsData);
  const vitalsData =
    vital?.length > 0
      ? vital?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const physical = useSelector(state => state.prescription.physicalExamination);
  const reptr = useSelector(state => state.prescription.eaxminationFindings);
  const notess = useSelector(state => state.prescription.note);
  const note =
    notess?.length > 0
      ? notess?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const selectedComplaint = useSelector(
    state => state.prescription.selectedComplaint,
  );
  const selectedDoc = useSelector(state => state?.prescription?.selectedDoctor);
  const selectedDoctor =
    selectedDoc?.length > 0
      ? selectedDoc?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const symp = useSelector(state => state.symptoms.symptom);
  const Symptom =
    symp?.length > 0
      ? symp?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const dummyPrescribe = useSelector(state => state.pres.prescribeItems);
  const Prescribe =
    dummyPrescribe?.length > 0
      ? dummyPrescribe?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const allergy = useSelector(state => state?.allergies?.allergies);
  const allergies =
    allergy?.length > 0
      ? allergy?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const lab = useSelector(state => state?.labreport?.labReport);
  const labreport =
    lab?.length > 0
      ? lab?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const hosp = useSelector(state => state?.pasthistory?.hospitalization);
  const hospitalization =
    hosp?.length > 0
      ? hosp?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const medication_history = useSelector(
    state => state?.pasthistory?.medicationHistory,
  );
  const medicationHistory =
    medication_history?.length > 0
      ? medication_history?.filter(
          item => item?.appointment_id !== appointmentID,
        )
      : [];
  const mens = useSelector(state => state?.pasthistory?.menstrualHistory);
  const menstrualHistory =
    mens?.length > 0
      ? mens?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const obs = useSelector(state => state?.pasthistory?.obstericHistory);
  const obstericHistory =
    obs?.length > 0
      ? obs?.filter(item => item?.appointment_id !== appointmentID)
      : [];

  const mars = useSelector(state => state?.pasthistory?.martialHistory);
  const martialHistory =
    mars?.length > 0
      ? mars?.filter(item => item?.appointment_id !== appointmentID)
      : [];

  const com = useSelector(state => state?.pasthistory?.commorbidities);
  const commor =
    com?.length > 0
      ? com?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const sochstry = useSelector(state => state?.pasthistory?.socialHistory);
  const socialHistory =
    sochstry?.length > 0
      ? sochstry?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const fhstry = useSelector(state => state?.pasthistory?.familyHistory);
  const familyHistory =
    fhstry?.length > 0
      ? fhstry?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const service_fees = useSelector(state => state.prescription.fees);
  const proce = useSelector(state => state.pasthistory.procedures);
  const procedure =
    proce?.length > 0
      ? proce?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const rflag = useSelector(state => state.pasthistory.red_flag);
  const redflag =
    rflag?.length > 0
      ? rflag?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const adv = useSelector(state => state?.pasthistory?.advice);
  const advices =
    adv?.length > 0
      ? adv?.filter(item => item?.appointment_id !== appointmentID)
      : [];
  const ResetRuduxState = () => {
    dispatch(updatesocialHistory(socialHistory));
    dispatch(updatefamilyHistory(familyHistory));
    dispatch(updatepastHospitalization(hospitalization));
    dispatch(updatemedicationHistory(medicationHistory));
    dispatch(updatemenstrualHistory(menstrualHistory));
    dispatch(updateobstericHistory(obstericHistory));
    dispatch(updatePrescribe1(Prescribe));
    dispatch(updateAllergies(allergies));
    dispatch(updateCommorbities(commor));
    dispatch(updateDiagnosis(diagnosis));
    dispatch(updateLabReport(labreport));
    dispatch(updateSymptom(Symptom));
    dispatch(updateDate(date));
    // dispatch(updateValid(newValid?.valid));
    dispatch(UpadteVitals(vitalsData));
    dispatch(UpdateNote(note));
    dispatch(UpdateDoctorRefer(selectedDoctor));
    // dispatch(UpadateCheifComplaint(newComplaint));
    // dispatch(updatecommorbidities(commorbidities));
    // dispatch(updatefees([]));
    dispatch(updateAdditionalNote(notes));
    dispatch(UpadteFindings({}));
    dispatch(UpadteExamination({}));
    dispatch(updatemartialHistory(martialHistory));
    dispatch(addRedFalg(redflag));
    dispatch(addProcedures(procedure));
    dispatch(addAdvice(advices));
    dispatch(addCheck_field([]));
  };
  const putComplaint = async () => {
    try {
      const response = await fetchApi(URL.updateComplaints(appointment_id), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(UpdateComplaint),
      });
      if (response.ok) {
        const jsonData = await response.json();
      } else {
        console.error('API call failed:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  const putVitals = async () => {
    try {
      const response = await fetchApi(URL.updatevitlas(appointment_id), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(UpdateVitals),
      });
      if (response.ok) {
        const jsonData = await response.json();
      } else {
        console.error('API call failed:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  const uploadPharmapdf = async () => {
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
          ResetRuduxState();
          const formData = new FormData();
          formData.append('doctor_phone_number', `${doc_phone}`);
          formData.append('patient_phone_number', `${patient_phone}`);
          formData.append('clinic_id', `${Clinic_id}`);
          formData.append('appointment_id', `${appointment_id}`);
          formData.append('pharmacyPhone', `${pharmaphone}`);
          formData.append('file_url', {
            uri: `file:///storage/emulated/0/Android/data/com.hattaidoc/files/pharmacy/phrma.pdf`,
            type: 'application/pdf',
            name: `prescription.pdf`,
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
            const response = await fetch(URL.uploadPharmaPdf, requestOptions);
            const responseData = await response.json();
          } catch (error) {
            console.error('Error:', error);
          }
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
  const fetchData = async () => {
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
          setBottom(true);
          ResetRuduxState();
          const formData = new FormData();
          formData.append('doctor_phone_number', `${doc_phone}`);
          formData.append('patient_phone_number', `${patient_phone}`);
          formData.append('clinic_id', `${Clinic_id}`);
          formData.append('appointment_id', `${appointment_id}`);
          formData.append('pharmacyPhone', `${pharmaphone}`);
          formData.append('file_url', {
            uri: `file:///storage/emulated/0/Android/data/com.hattaidoc/files/docs/test.pdf`,
            type: 'application/pdf',
            name: `prescription.pdf`,
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
            const response = await fetch(URL.uploadPDF, requestOptions);
            const responseData = await response.json();
            uploadPharmapdf();
            const data = {
              user_phone: '',
              Clinic_id: Clinic_id,
              doc_phone: doc_phone,
              patient_phone: patient_phone,
              appointment_id: appointment_id,
              Logintoken: token,
            };
            sendNotification(
              serverFCM,
              patientFcmTokens,
              `Appointment Sucessfully Completed`,
              data,
              `pdf,${responseData['file_url']}`,
            );
            setTimeout(() => {
              navigation.navigate('tab');
            }, 2000);
          } catch (error) {
            console.error('Error:', error);
          }

          setLoading(false);
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

  const postReferalPdf = async url => {
    const formData = new FormData();
    formData.append('doctor_phone_number', `${doc_phone}`);
    formData.append('patient_phone_number', `${patient_phone}`);
    formData.append('clinic_id', `${Clinic_id}`);
    formData.append('appointment_id', `${appointment_id}`);
    formData.append('file_referral', {
      uri: `file:///storage/emulated/0/Android/data/com.hattaidoc/files/refer/refer.pdf`,
      type: 'application/pdf',
      name: `referal.pdf`,
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
      setLoading(true);
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      if (responseData) {
        // handleAddDoctors();
        Alert.alert('Success', 'Successfully shared to patient');
        setLoading(false);
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('', 'Something went Wrong');
      setLoading(false);
    }
  };

  const handle = () => {
    postReferalPdf(URL.refer_doc_pdf);
  };

  const handleConfirm = () => {
    if (prevScreen === 'visit') {
      // handlePrescribePDF();
      // putComplaint();
      // putVitals();
      fetchData();
    } else if (prevScreen === 'refer') {
      handle();
    }
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: CUSTOMCOLOR.background}}>
        <ScrollView
          contentContainerStyle={{flex: 1, marginBottom: moderateScale(20)}}>
          <PDFViewer path={path} />
        </ScrollView>

        <View
          style={{
            //   flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <HButton
            loading={loading}
            onPress={handleConfirm}
            label={'Confirm'}
            btnstyles={commonstyles.activebtn}
          />
        </View>
      </View>
      <BottomSheetView
        visible={bottom}
        setVisible={setBottom}
        status={apiStatus.status}
        message={apiStatus.message}
      />
    </>
  );
};

export default PdfView;
