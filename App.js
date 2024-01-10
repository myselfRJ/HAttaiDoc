// In App.js in a new project

import * as React from 'react';
import {View, Text, Alert} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CombinedRoute from './src/navigation/combinednavigator';
import store from './src/redux/stores/store';
import axios from 'axios';
import {urlActions} from './src/redux/features/url/urlSlice';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {CUSTOMCOLOR, CUSTOMFONTFAMILY} from './src/settings/styles';
import {useNetInfo} from '@react-native-community/netinfo';
import {moderateScale} from './src/utility/scaleDimension';
import {
  PermmisionStorage,
  NotificationPermission,
} from './src/utility/permissions';
import messaging from '@react-native-firebase/messaging';
const Stack = createNativeStackNavigator();
import Toast from 'react-native-toast-message';
const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [initialRoute, setInitialRoute] = React.useState('');
  React.useEffect(() => {
    navigation.navigate('up');
  }, []);
  React.useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate('up');
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute('up');
        }
        setLoading(false);
      });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'Notification',
        JSON.stringify(remoteMessage?.notification?.body),
      );
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return null;
  }

  return <View></View>;
};
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
  const netInfo = useNetInfo();

  let netConnection = netInfo.isConnected;
  React.useEffect(() => {
    PermmisionStorage();
    NotificationPermission();
  });
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        {!netConnection ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: moderateScale(4),
              backgroundColor: CUSTOMCOLOR.delete,
            }}>
            <Text
              style={{
                color: CUSTOMCOLOR.white,
                fontFamily: CUSTOMFONTFAMILY.body,
              }}>
              Please Check Your Connection .....
            </Text>
          </View>
        ) : null}
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
          <Stack.Navigator initialRouteName="home">
            <Stack.Screen
              name="home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="up"
              component={CombinedRoute}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
          {/* <CombinedRoute /> */}
          <Toast position="bottom" bottomOffset={20} />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
