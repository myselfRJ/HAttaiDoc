import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./tabnavigator";

const Stack=createNativeStackNavigator();

const ProtectedRoute=()=>{

    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
        
            <Stack.Screen name='tab' component={BottomTab}/>
           
        </Stack.Navigator>
    )
}

export default ProtectedRoute;