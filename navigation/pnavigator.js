import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./tabnavigator";
import { useSelector } from "react-redux";

const Stack=createNativeStackNavigator();

const ProtectedRoute=()=>{
    const isAuth=useSelector((state)=>state.authenticate.accesstoken)
    console.log('isAuth.....',isAuth)

    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
        
            <Stack.Screen name='tab' component={BottomTab}/>
           
        </Stack.Navigator>
    )
}

export default ProtectedRoute;