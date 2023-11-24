import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import moment, {min} from 'moment';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {commonstyles} from '../styles/commonstyle';
import Keyboardhidecontainer from '../components/keyboardhidecontainer';
import InputText from '../components/inputext';
import HButton from '../components/button';
import AddImage from '../components/addimage';
import Option from '../components/option';
import {SelectorBtn, BottomSheetView, StatusMessage} from '../components';
import {CONSTANTS} from '../utility/constant';
import {launchImageLibrary} from 'react-native-image-picker';
import {URL} from '../utility/urls';
import {HttpStatusCode} from 'axios';
import {fetchApi} from '../api/fetchApi';
import {useSelector, useDispatch} from 'react-redux';
import {addPatient} from '../redux/features/patient/patientslice';
import {checkNotifications} from 'react-native-permissions';
import {checkNumber} from '../utility/checks';
import sendNotification from '../utility/notification';
import getMessaging from '@react-native-firebase/messaging';
import {horizontalScale, verticalScale} from '../utility/scaleDimension';

const Alert = () => {
  const [users, setUsers] = useState([]);
  const [tokens, setToken] = useState([]);
  const {phone} = useSelector(state => state?.phone?.data);
  const token = useSelector(state => state.authenticate.auth.access);
  const fetchUsers = async () => {
    const response = await fetchApi(URL.getUsers(phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      // console.log('--------------clinics', jsonData);
      setUsers(jsonData?.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [phone]);
  const GetFcmTokens = async () => {
    try {
      const response = await fetchApi(URL.GetFcmToken(phone, '9538002347'), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      console.log(jsonData?.data);
      setToken(jsonData?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetFcmTokens();
  }, []);
  const [message, setMessage] = useState('');
  const [back, setBack] = useState({borderColor: CUSTOMCOLOR.primary});
  console.log(back);
  const send = () => {
    const body = message;
    const title = 'Message From Doctor';
    const fcmTokens = [tokens?.[0]?.fcmtoken];

    sendNotification(fcmTokens, body, title);
  };

  useEffect(() => {
    if (message) {
      setBack({borderColor: CUSTOMCOLOR.primary});
    }
  }, [message]);

  //   const ftoken =
  //     'AAAAz5ihZ2k:APA91bHjASxPwGM8B4Wm65D571YUt0IzsEgXHLPSNLu_GeDxK1Ni-NYc13puVhbFdf-GyN_87T8D7VJx1q2kYN02KTexaCbCSRYfRBVtplshylUcZVT69-6nJqV6jRT_pywtXuqkst6l';
  //   const sendNotification = async () => {
  //     const NotificationDetails = {
  //       data: {},
  //       notification: {
  //         body: 'Indra',
  //         title: 'hello world',
  //       },
  //       registration_ids: [tokens?.[0]?.fcmtoken],
  //     };
  //     try {
  //       const response = await fetch('https://fcm.googleapis.com/fcm/send', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${ftoken}`,
  //           Accept: 'application/json, application/xml',
  //         },
  //         body: JSON.stringify(NotificationDetails),
  //       });
  //       if (response.ok) {
  //         const jsonData = await response.json();
  //         if (jsonData) {
  //           Alert.alert('success', 'Succesfully sent');
  //         } else {
  //           Alert.alert('Warn', 'Try After sometime');
  //           console.error('API call failed:', response.status, response);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error occurred:', error);
  //       Alert.alert('Error', 'Try After sometime');
  //     }
  //   };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: horizontalScale(16),
        paddingVertical: verticalScale(20),
        gap: verticalScale(36),
      }}>
      <InputText
        textStyle={back}
        label={'message'}
        value={message}
        setValue={setMessage}
        required={true}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <HButton
          label={'send'}
          onPress={() => {
            if (message) {
              send();
            } else {
              console.log('=================');
              setBack({borderColor: CUSTOMCOLOR.error});
            }
          }}
        />
      </View>
    </View>
  );
};

export default Alert;
