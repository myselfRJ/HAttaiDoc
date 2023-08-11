import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UnProtectedRoute from './upnavigator';
import ProtectedRoute from './pnavigator';
import ProfileCreate from '../screens/profilecreate';
import ClinicCreate from '../screens/cliniccreate';
import UserCreate from '../screens/usercreate';

const Stack = createNativeStackNavigator();

const OnBoardNav = () => {
  return (
    <Stack.Navigator
      initialScreen="profilecreate"
      screenOptions={{headerShown: true}}>
      <Stack.Screen name="profilecreate" component={ProfileCreate} />
      <Stack.Screen name="cliniccreate" component={ClinicCreate} />
      <Stack.Screen name="usercreate" component={UserCreate} />
    </Stack.Navigator>
  );
};

export default OnBoardNav;
