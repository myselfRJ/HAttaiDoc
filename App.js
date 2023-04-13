// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import {PermissionsAndroid} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentCard from './components/appointmentcard';
import PatientSearchCard from './components/patientsearchcard';
import InputText from './components/inputext';
import HButton from './components/button';
import HeaderAvatar from './components/headeravatar';
import SelectionTab from './components/selectiontab';
import SuggestionTab from './components/suggestiontab';
import InfoTicket from './components/infoticket';
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <AppointmentCard />
      {/* <PatientSearchCard />
      <InputText />
      <HButton /> */}
      <HeaderAvatar />
      <SelectionTab />
      <SuggestionTab />
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
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;