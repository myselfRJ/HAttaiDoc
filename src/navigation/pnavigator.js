import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './tabnavigator';
import {useSelector} from 'react-redux';
import ProfileCreate from '../screens/profilecreate';
import ClinicCreate from '../screens/cliniccreate';
import UserCreate from '../screens/usercreate';
import SlotCreate from '../screens/slotcreate';
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
import ReferDoctorScreen from '../screens/referdoctorscreen';
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

const Stack = createNativeStackNavigator();

const ProtectedRoute = () => {
  const isAuth = useSelector(state => state.authenticate.accesstoken);
  console.log('isAuth.....', isAuth);

  return (
    <Stack.Navigator
      initialRouteName="initscreen"
      //initialRouteName="tab"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="tab" component={BottomTab} />
      <Stack.Screen name="profilecreate" component={ProfileCreate} />
      <Stack.Screen name="cliniccreate" component={ClinicCreate} />
      <Stack.Screen name="usercreate" component={UserCreate} />
      <Stack.Screen name="createslot" component={SlotCreate} />
      <Stack.Screen name="visit" component={Visit} />
      <Stack.Screen name="patientlookup" component={Patientlookup} />
      <Stack.Screen name="patientcreate" component={PatientCreate} />
      <Stack.Screen name="bookslot" component={SlotBook} />
      <Stack.Screen name="authloading" component={AfterAuthLoadingScreen} />
      <Stack.Screen name="prescribe" component={Prescribe} />
      <Stack.Screen name="FollowUp" component={Date} />
      <Stack.Screen name="symptoms" component={Symptoms} />
      <Stack.Screen name="complaints" component={CheifComplaints} />
      <Stack.Screen name="vitalscreen" component={VitalScreen} />
      <Stack.Screen name="notescreen" component={NoteScreen} />
      <Stack.Screen name="referdoctorscreen" component={ReferDoctorScreen} />
      <Stack.Screen name="addclinic" component={AddClinic} />
      <Stack.Screen name="adduser" component={AddUser} />
      <Stack.Screen name="aadharverify" component={AadharVerify} />
      <Stack.Screen name="mobileverify" component={MobileVerify} />
      <Stack.Screen name="abhacreate" component={AbhaCreate} />
      <Stack.Screen name="success" component={Success} />
      <Stack.Screen name="addnew" component={SearchAddnew} />
      <Stack.Screen name="initscreen" component={InitScreen} />
      <Stack.Screen name="patientrecord" component={MedicalRecordPatient} />
    </Stack.Navigator>
  );
};

export default ProtectedRoute;
