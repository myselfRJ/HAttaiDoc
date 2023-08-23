import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dashboard from '../screens/dashboard';
import Appointment from '../screens/appoinment';
import PatientSearch from '../screens/patientsearch';
import Titbit from '../screens/titbit';
import Account from '../screens/account';
import {CUSTOMCOLOR} from '../settings/styles';
import {StyleSheet} from 'react-native';
import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from '../utility/scaleDimension';

const Tab = createBottomTabNavigator();

const BottomTab = ({navigation, route}) => {
  const options = {
    headerStyle: styles.headerStyle,
    headerTintColor: 'white',
    // headerLeft: () => (
    //   <View style={styles.leftIcon}>
    //     <Icon
    //       name="arrow-left"
    //       size={24}
    //       color={CUSTOMCOLOR.white}
    //       onPress={
    //         route.name !== 'dashboard' ? () => navigation.goBack() : null
    //       }
    //     />
    //   </View>
    // ),
  };
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
        options={{...options, headerLeft: null, title: 'Dashboard'}}
      />
      <Tab.Screen
        name="myappointment"
        component={Appointment}
        options={{...options, title: 'My Appointments'}}
      />
      <Tab.Screen
        name="mypatient"
        component={PatientSearch}
        options={{...options, title: 'My Patients'}}
      />
      {/* <Tab.Screen name="titbits" component={Titbit} options={{...options,title:'Titbits'}} /> */}
      <Tab.Screen
        name="account"
        component={Account}
        options={{...options, title: 'Account'}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: CUSTOMCOLOR.primary,
    height: verticalScale(80),
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  leftIcon: {
    paddingHorizontal: horizontalScale(16),
  },
});

export default BottomTab;
