import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dashboard from '../screens/dashboard';
import Appointment from '../screens/appoinment';
import PatientSearch from '../screens/patientsearch';
import Titbit from '../screens/titbit';
import Account from '../screens/account';
import {CUSTOMCOLOR} from '../settings/styles';
import style from '../components/Searchbar/style';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="dashboard"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let selectedColor;
          if (route.name == 'dashboard') {
            iconName = 'view-dashboard';
            selectedColor = focused ? color : CUSTOMCOLOR.grey;
          } else if (route.name == 'myappointment') {
            iconName = 'calendar-clock';
            selectedColor = focused ? color : CUSTOMCOLOR.grey;
          } else if (route.name == 'mypatient') {
            iconName = 'account';
            selectedColor = focused ? color : CUSTOMCOLOR.grey;
          } else if (route.name == 'titbits') {
            iconName = 'message-text-outline';
            selectedColor = focused ? color : CUSTOMCOLOR.grey;
          } else if (route.name == 'account') {
            iconName = 'account-cog';
            selectedColor = focused ? color : CUSTOMCOLOR.grey;
          }
          return <Icon size={size} name={iconName} color={selectedColor} />;
        },
      })}>
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
          headerStyle: {backgroundColor: CUSTOMCOLOR.primary},
          headerTintColor: 'white',
        }}
      />
      <Tab.Screen
        name="myappointment"
        component={Appointment}
        options={{
          title: 'My Appointment',
          headerStyle: {backgroundColor: CUSTOMCOLOR.primary},
          headerTintColor: 'white',
        }}
      />
      <Tab.Screen
        name="mypatient"
        component={PatientSearch}
        options={{
          title: 'My Patients',
          headerStyle: {backgroundColor: CUSTOMCOLOR.primary},
          headerTintColor: 'white',
        }}
      />
      <Tab.Screen
        name="titbits"
        component={Titbit}
        options={{
          title: 'Titbits',
          headerStyle: {backgroundColor: CUSTOMCOLOR.primary},
          headerTintColor: 'white',
        }}
      />
      <Tab.Screen
        name="account"
        component={Account}
        options={{
          title: 'Account',
          headerStyle: {backgroundColor: CUSTOMCOLOR.primary},
          headerTintColor: 'white',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
