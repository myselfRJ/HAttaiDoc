import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import Signup from '../screens/signup';
import Otp from '../screens/otp';
import AfterAuthLoadingScreen from '../screens/afterauthloadingscreen';
import Intro from '../screens/intro';
import Entry from '../screens/entry';
import OtpScreen from '../screens/otpscreen';

const Stack = createNativeStackNavigator();

const UnProtectedRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="otp" component={Otp} /> */}
      <Stack.Screen name="intro" component={Intro}/>
      <Stack.Screen name="entry" component={Entry}/>
      <Stack.Screen name='otpscreen' component={OtpScreen}/>
    </Stack.Navigator>
  );
};
export default UnProtectedRoute;
