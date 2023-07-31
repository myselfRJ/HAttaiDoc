// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CombinedRoute from './src/navigation/combinednavigator';
import store from './src/redux/stores/store';
import axios from 'axios';
import {urlActions} from './src/redux/features/url/urlSlice';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();

function App() {
  axios
    .get('http://10.9.78.38:8000')
    .then(function (response) {
      // handle success
      store.dispatch(urlActions.urlupdate(response.data['ip'] + '/api/v1/'));
      global.globalurl = response.data['ip'] + '/api/v1/';
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);//for notification permisiion
  // const routeNameRef = React.useRef();
  // const navigationRef = React.useRef();
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer
        // ref={navigationRef}
        // onReady={() => {
        //   routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        // }}
        // onStateChange={async () => {
        //   const previousRouteName = routeNameRef.current;
        //   const currentRouteName = navigationRef.current.getCurrentRoute().name;

        //   if (previousRouteName !== currentRouteName) {
        //     await analytics().logScreenView({
        //       screen_name: currentRouteName,
        //       screen_class: currentRouteName,
        //     });
        //   }
        //   routeNameRef.current = currentRouteName;
        // }}
        >
          <CombinedRoute />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
