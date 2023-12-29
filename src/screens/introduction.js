import {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {RetriveAsyncData} from '../utility/AsyncStorage';
import {useSelector, useDispatch} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {
  addFcmToken,
  addGoogleKey,
  addLogin_phone,
  addServerFCMToken,
} from '../redux/features/phoneNumber/LoginPhoneNumber';
import {authenticateActions} from '../redux/features/authenticate/authenticateSlice';
const Introduction = ({navigation}) => {
  const dispatch = useDispatch();
  const getTokenFcm = async () => {
    try {
      const Token = await messaging().getToken();
      dispatch(addFcmToken(Token));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTokenFcm();
  }, []);

  useEffect(() => {
    RetriveAsyncData(`token_and_phone`).then(array => {
      if (array?.time) {
        const originalDate = new Date(array?.time);
        const newDate = new Date(originalDate);
        newDate.setDate(originalDate.getDate() + 29);
        const formattedNewDate = newDate.toISOString();
        dispatch(authenticateActions.updateauthenticate(array?.acces_token));
        dispatch(addLogin_phone({phone: array?.phone, trace_id: ''}));
        dispatch(addGoogleKey(array?.googleApi));
        dispatch(addServerFCMToken(array?.serverFCMapi));
        if (originalDate.toISOString() <= formattedNewDate && array?.time) {
          setTimeout(() => {
            navigation.navigate('protected');
          }, 2000);
        }
      } else {
        setTimeout(() => {
          navigation.navigate('intro');
        }, 2000);
      }
    });
  }, []);
  return (
    <View style={styles.main}>
      <Image
        style={styles.images}
        source={require('../assets/images/first.png')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: CUSTOMCOLOR.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    width: moderateScale(472),
    height: moderateScale(439),
  },
});
export default Introduction;
