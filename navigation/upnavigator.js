import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login";
import Signup from "../screens/signup";
import Otp from "../screens/otp";
import AfterAuthLoadingScreen from "../screens/afterauthloadingscreen";

const Stack=createNativeStackNavigator();

const UnProtectedRoute=()=>{

    return (

        <Stack.Navigator initialRouteName="login" screenOptions={{headerShown:false}}>
            <Stack.Screen name='login' component={Login}/>
            <Stack.Screen name='signup' component={Signup}/>
            <Stack.Screen name='otp' component={Otp}/>
            
        </Stack.Navigator>
    )
}
export default UnProtectedRoute;