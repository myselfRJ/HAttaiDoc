// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import {PermissionsAndroid} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import AppointmentCard from './components/appointmentcard';
import PatientSearchCard from './components/patientsearchcard';
import InputText from './components/inputext';
import HButton from './components/button';
import HeaderAvatar from './components/headeravatar';
import SelectionTab from './components/selectiontab';
import SuggestionTab from './components/suggestiontab';
import InfoTicket from './components/infoticket';
import Vitals from './components/vitals';
import MedicineList from './components/medicinelist';
import VisitOpen from './components/visitopen';
import BottomTab from './navigation/tabnavigator';
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',gap:16,padding:24 }}>
      <Vitals icon='thermometer'/>
      <MedicineList lefticon='prescription' rightblock={['text-box-plus-outline','pencil','delete',]}/>
      <VisitOpen icon='chevron-down'/>
      <Text>Home Screen</Text>
      <AppointmentCard />
      <PatientSearchCard />
      <InputText label='follow_up' />
      <HButton icon='plus' label='follow_up' />
      <HButton  label='follow_up' /> 
      <HeaderAvatar />
      <SelectionTab  label='follow_up'/>
      <SuggestionTab label='follow_up'/>
      <InfoTicket />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);//for notification permisiion
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <BottomTab/> 
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}

export default App;