import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/dashboard';
import Appointment from '../screens/appoinment';
import PatientSearch from '../screens/patientsearch';
import Titbit from '../screens/titbit';
const Tab=createBottomTabNavigator();

const BottomTab=()=>{

    <Tab.Navigator>
        <Tab.Screen name='dashboard' component={Dashboard}/>
        <Tab.Screen name='myappointment' component={Appointment}/>
        <Tab.Screen name='mypatient' component={PatientSearch}/>
        <Tab.Screen name='titbits' component={Titbit}/>

    </Tab.Navigator>
}

export default BottomTab;