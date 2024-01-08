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
    const menstrualHistory = {};
    const obstericHistory = {};
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
    dispatch(updatefees([]));
    dispatch(updateAdditionalNote(''));
    dispatch(UpadteFindings({}));
    dispatch(UpadteExamination({}));
    dispatch(updatemartialHistory({}));
    dispatch(addRedFalg(''));
    dispatch(addProcedures(''));
    dispatch(addAdvice(''));
    dispatch(addCheck_field(''));
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
            const response = await fetch(URL.uploadPDF, requestOptions);
            const responseData = await response.json();
            // console.log('API Response:', responseData);
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
  const postReferalPdf = async url => {
    const formData = new FormData();
    formData.append('doctor_phone_number', `${doc_phone}`);
    formData.append('patient_phone_number', `${patient_phone}`);
    formData.append('clinic_id', `${Clinic_id}`);
    formData.append('appointment_id', `${appointment_id}`);
    formData.append('file_referral', {
      uri: `file:///storage/emulated/0/Android/data/com.hattaidoc/files/refer/refer.pdf`,
      type: 'application/pdf',
      name: `${patient_phone}referal.pdf`,
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
      putComplaint();
      putVitals();
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
