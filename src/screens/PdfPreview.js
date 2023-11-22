import React, {useState, useEffect, useRef} from 'react';
import {View, Alert} from 'react-native';
import PDFViewer from '../components/PdfViewer';
import {useRoute} from '@react-navigation/native';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
import {StatusMessage, HButton, BottomSheetView} from '../components';
import {horizontalScale, verticalScale} from '../utility/scaleDimension';
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
  updatefees,
  updateAdditionalNote,
} from '../redux/features/prescription/prescriptionSlice';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {useSelector, useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {commonstyles} from '../styles/commonstyle';

const PdfView = ({navigation}) => {
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
  const SuccesRef = useRef(null);
 console.log('data==',consultationData?.note);
  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);
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
    dispatch(updatefees([]));
    dispatch(updateAdditionalNote(''))
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
          SuccesRef?.current?.snapToIndex(1);

          // Prescribe.splice(0,Prescribe.length)
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
            console.log('API Response:', responseData);
            setTimeout(() => {
              navigation.navigate('tab');
            }, 1000);
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
  // const postPrescriptionPDF = async url => {
   
  // };

  // const handlePrescribePDF = () => {
  //   const apiUrl = URL.uploadPDF;
  //   postPrescriptionPDF(apiUrl);
  // };
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
        <ScrollView contentContainerStyle={{flex: 1}}>
          <PDFViewer path={path} />
        </ScrollView>

        <View
          style={{
            //   flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            // gap: horizontalScale(48),
            marginBottom: verticalScale(8),
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
        bottomSheetRef={SuccesRef}
        snapPoints={'50%'}
        backgroundStyle={CUSTOMCOLOR.white}>
        <StatusMessage status={apiStatus.status} message={apiStatus.message} />
      </BottomSheetView>
    </>
  );
};

export default PdfView;
