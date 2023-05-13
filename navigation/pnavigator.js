import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./tabnavigator";
import { useSelector } from "react-redux";
import ProfileCreate from "../screens/profilecreate";
import ClinicCreate from "../screens/cliniccreate";
import UserCreate from "../screens/usercreate";
import AfterAuthLoadingScreen from "../screens/afterauthloadingscreen";

const Stack=createNativeStackNavigator();

const ProtectedRoute=()=>{
    const isAuth=useSelector((state)=>state.authenticate.accesstoken)
    console.log('isAuth.....',isAuth)

    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='profilecreate' component={ProfileCreate}/>
            <Stack.Screen name='cliniccreate' component={ClinicCreate}/>
            <Stack.Screen name='usercreate' component={UserCreate}/>
            <Stack.Screen name='tab' component={BottomTab}/>
            <Stack.Screen name='authloading' component={AfterAuthLoadingScreen}/>
        </Stack.Navigator>
    )
}

export default ProtectedRoute;