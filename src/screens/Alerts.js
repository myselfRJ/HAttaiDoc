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

const AlertMessage = () => {
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
  const [user_phone,setUser_phone] = useState('')
  const GetFcmTokens = async () => {
    try {
      const response = await fetchApi(URL.GetFcmToken(phone,user_phone), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      console.log(jsonData?.data);
      setToken(jsonData?.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetFcmTokens();
  }, [user_phone]);
  const [message, setMessage] = useState('');
  const [back, setBack] = useState({borderColor: CUSTOMCOLOR.primary});
  const send = () => {
    const body = message;
    const title = 'Message From Doctor';
    const fcmTokens = tokens;

    sendNotification(fcmTokens, body, title);
  };

  useEffect(() => {
    if (message) {
      setBack({borderColor: CUSTOMCOLOR.primary});
    }
  }, [message]);

const handleUserphone = (userPhone) =>{
       if (user_phone){
        setUser_phone('')
       }else{
        setUser_phone(userPhone)
       }
}
  return (
    <View
      style={{
        // flex: 1,
        paddingHorizontal: horizontalScale(16),
        paddingVertical: verticalScale(20),
        gap: verticalScale(36),
      }}>
        <View>
        <Text style={commonstyles.subhead}>Select Admin:</Text>
        <View style={{flexDirection:'row'}}>
          {users?.map((item,index)=>(
            <SelectorBtn key={index} input = {item?.clinic_user_name} onPress={()=>{
             handleUserphone(item?.user_phone_number)
            }} select={{backgroundColor:user_phone===item?.user_phone_number?CUSTOMCOLOR.primary:CUSTOMCOLOR.white}}/>
          ))}
        </View>
        </View>
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
          btnstyles={{backgroundColor:user_phone?CUSTOMCOLOR.primary:CUSTOMCOLOR.disable}}
          onPress={() => {
            if (message && user_phone) {
              send();
            } else {
              setBack({borderColor: CUSTOMCOLOR.error});
            }
          }}
        />
      </View>
    </View>
  );
};

export default AlertMessage;
