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

const Stack = createNativeStackNavigator();

const ProtectedRoute = () => {
  const isAuth = useSelector(state => state.authenticate.accesstoken);
  console.log('isAuth.....', isAuth);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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
    </Stack.Navigator>
  );
};

export default ProtectedRoute;
