import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './tabnavigator';
import {useSelector} from 'react-redux';
import ProfileCreate from '../screens/profilecreate';
import ClinicCreate from '../screens/cliniccreate';
import UserCreate from '../screens/usercreate';
import SlotCreate from '../screens/SlotCreate';
import AfterAuthLoadingScreen from '../screens/afterauthloadingscreen';
import Visit from '../screens/visit';
import Patientlookup from '../screens/patientlookup';
import PatientCreate from '../screens/patientcreate';
import SlotBook from '../screens/slotbook';
import Prescribe from '../screens/prescribe';
import Date from '../screens/Follow-up';
import Symptoms from '../screens/symptoms';
import CheifComplaints from '../screens/cheif_complaint';
import {Vitals} from '../components';
import NoteScreen from '../screens/notescreen';
// import ReferDoctorScreen from '../screens/referdoctorscreen';
import VitalScreen from '../screens/vitalscreen';
import AddClinic from '../screens/addclinic';
import AddUser from '../screens/adduser';
import AadharVerify from '../screens/aadharVerify';
import MobileVerify from '../screens/mobVerify';
import AbhaCreate from '../screens/abhaCreate';
import Success from '../screens/success';
import SearchAddnew from '../screens/searchAddnew';
import InitScreen from '../screens/init_screen';
import MedicalRecordPatient from '../screens/medicalRecordPatients';
import {getAccessToken} from '../redux/features/authenticate/authenticateSlice';
import Prescribe1 from '../screens/prescibe1';
import Abha from '../screens/AddPatient';
import AbhaExistDetails from '../screens/AbhaExistS';
import Prescription from '../screens/prescription';
import Diagnosis from '../screens/diagnosis';
import Commorbities from '../screens/commorbities';
import Allergies from '../screens/allergies';
import LabReports from '../screens/labReport';
import PastHistory from '../screens/pasthistory';
import {CUSTOMCOLOR} from '../settings/styles';
import Valid from '../screens/consultationValid';
import Uploadrecord from '../screens/UploadRecord';
import ProgresHeader from '../components/progressheader';
import PatientHistory from '../screens/patientHistory';
import ReferToDoctor from '../screens/Refer';
import UpdateProfile from '../screens/updateProfile';
import ClinicAddress from '../components/clinic_address';
import Symptoms1 from '../screens/Symptom1';
import UserDisplay from '../screens/userDisplay';
import MyClinics from '../screens/MyClinics';
import MedicalHistory from '../screens/medicalhistory';
import PhysicalExamination from '../screens/physicalExaminations';
import ExaminationFindings from '../screens/Examinationfindings';
import OthersFees from '../screens/OthersFees';
import PdfView from '../screens/PdfPreview';
import PatientHistoryPdf from '../screens/PdfHistory';
import History from '../screens/History';
import ImageViewer from '../screens/imageViewer';
import AdditionalNotes from '../screens/additionNotes';
import MenstrualHistory from '../screens/menstrualHistory';
import ObstetricHistory from '../screens/obstetricHistory';
import MaritalHistory from '../screens/maritalHistory';
import AlertMessage from '../screens/Alerts';
import Notification from '../screens/Notifications';
import {Image} from 'react-native';
import {moderateScale} from '../utility/scaleDimension';

const Stack = createNativeStackNavigator();

const ProtectedRoute = () => {
  // console.log(getAccessToken(state => state));
  const isAuth = useSelector(state => state.authenticate.auth.access);
  const access = useSelector(state => state.getAccessToken);
  // console.log('isAuth.....', isAuth);

  // console.log('isAccess.....', access);
  const header = () => (
    <Image
      source={require('../assets/images/header.png')}
      style={{height: moderateScale(48), width: moderateScale(48)}}
    />
  );
  return (
    <Stack.Navigator
      //initialRouteName="addclinic"
      initialRouteName="initscreen"
      // screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name="tab"
        component={BottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="alert"
        component={AlertMessage}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="clinic"
        component={MyClinics}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Clinics',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="img"
        component={ImageViewer}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Image Viewer',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="pdf"
        component={PdfView}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Preview',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="history"
        component={History}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Rx History',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="service_fees"
        component={OthersFees}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Fees',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="pdfhistory"
        component={PatientHistoryPdf}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'History',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="notify"
        component={Notification}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Notifications',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="findings"
        component={ExaminationFindings}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Report Findings',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="menstrual"
        component={MenstrualHistory}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Back',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="obstetric"
        component={ObstetricHistory}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Back',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="marital"
        component={MaritalHistory}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Back',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="additional"
        component={AdditionalNotes}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Notes',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="examination"
        component={PhysicalExamination}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Physical Examination',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />

      <Stack.Screen
        name="profilecreate"
        component={ProfileCreate}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="updateprofile"
        component={UpdateProfile}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Update Profile',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="cliniccreate"
        component={ClinicCreate}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="usercreate"
        component={UserCreate}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="createslot"
        component={SlotCreate}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="visit"
        component={Visit}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Visit',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="upload-record"
        component={Uploadrecord}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Reports',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="symp"
        component={Uploadrecord}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Symptoms',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="address"
        component={ClinicAddress}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Select Address',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen name="patientlookup" component={Patientlookup} />
      <Stack.Screen
        name="patientcreate"
        component={PatientCreate}
        options={{
          headerShown: true,
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Add Patient',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="bookslot"
        component={SlotBook}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Book Appointment',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen name="authloading" component={AfterAuthLoadingScreen} />
      <Stack.Screen name="prescribe" component={Prescribe} />
      <Stack.Screen
        name="FollowUp"
        component={Date}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Follow Up',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="symptoms"
        component={Symptoms}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Symptoms',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="complaints"
        component={CheifComplaints}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Reason for Visit',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="vitalscreen"
        component={VitalScreen}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Vitals',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="notescreen"
        component={NoteScreen}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Present Illness',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      {/* <Stack.Screen
        name="referdoctorscreen"
        component={ReferDoctorScreen}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Refer to Doctor',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
        }}
      /> */}
      <Stack.Screen
        name="refer"
        component={ReferToDoctor}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Refer to Doctor',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="addclinic"
        component={AddClinic}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="adduser"
        component={AddUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="userdisplay"
        component={UserDisplay}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'My Admin',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="aadharverify"
        component={AadharVerify}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="mobileverify"
        component={MobileVerify}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="abhacreate"
        component={AbhaCreate}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="success"
        component={Success}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="addnew"
        component={SearchAddnew}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Add New Patient',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="initscreen"
        component={InitScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="patientrecord"
        component={MedicalRecordPatient}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Rx History',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="patienthistory"
        component={PatientHistory}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Patient History',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="medicalhistory"
        component={MedicalHistory}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Medical History',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="pres"
        component={Prescribe1}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Prescribe',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen name="ab" component={Abha} options={{headerShown: false}} />
      <Stack.Screen
        name="abhaexist"
        component={AbhaExistDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="prescription"
        component={Prescription}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Prescription Preview',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="diagnosis"
        component={Diagnosis}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Diagnosis',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="commorbities"
        component={Commorbities}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Comorbidities',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="pasthistory"
        component={PastHistory}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Past Hospitalization',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="allergies"
        component={Allergies}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Allergies',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="labreport"
        component={LabReports}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Test Prescribe',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
      <Stack.Screen
        name="valid"
        component={Valid}
        options={{
          headerTintColor: CUSTOMCOLOR.white,
          title: 'Doctor Signature',
          headerStyle: {
            backgroundColor: CUSTOMCOLOR.primary,
          },
          headerRight: () => header(),
        }}
      />
    </Stack.Navigator>
  );
};

export default ProtectedRoute;
