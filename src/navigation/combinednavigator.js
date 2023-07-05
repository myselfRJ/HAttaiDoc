import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UnProtectedRoute from './upnavigator';
import ProtectedRoute from './pnavigator';

const Stack = createNativeStackNavigator();

const CombinedRoute = () => {
  return (
    <Stack.Navigator
      initialScreen="unprotected"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="unprotected" component={UnProtectedRoute} /> */}
      <Stack.Screen name="protected" component={ProtectedRoute} />
    </Stack.Navigator>
  );
};

export default CombinedRoute;
