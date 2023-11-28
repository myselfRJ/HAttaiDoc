import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import BottomSheetView from './bottomSheet';
import SelectionTab from '../components/selectiontab';
import moment from 'moment';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import PlusButton from './plusbtn';
import HButton from './button';
import {capitalizeWord} from '../utility/const';
import {useSelector} from 'react-redux';

const AppointmentCard = ({appointment, openVisit}) => {
  const [visible, setVisible] = useState(false);
  const appointmentCardRef = useRef(null);

  const navigation = useNavigation();

  const presentYear = new Date().toISOString().split('-')[0];

  const patient_phone_number = appointment?.patient_data?.patient_phone_number;
  const patient_name = appointment?.patient_data?.patient_name;
  const patient_gender = appointment?.patient_data?.gender;
  const birth_date = appointment?.patient_data?.birth_date;
  const appointment_token = appointment?.appointment_token;
  const appointment_id = appointment?.id;
  const birthYear = appointment?.patient_data?.birth_date.split('-')[0];
  const patient_age = parseInt(presentYear) - parseInt(birthYear);
  const handleOnpress = () => {
    const patient_phone = patient_phone_number;
    const name = patient_name;
    const gende = patient_gender;
    const age = patient_age;
    const complaint = appointment.complaint;
    const consultation_fees = appointment?.clinic_data?.fees;
    navigation.navigate('visit', {
      name,
      gende,
      age,
      patient_phone,
      appointment_id,
      complaint,
      consultation_fees,
    });
    appointmentCardRef?.current?.snapToIndex(0);
  };
  const paidOpt = {
    false: 'UnPaid',
    true: 'Paid',
  };

  const handleReschedule = () => {
    const id = appointment?.id;
    const patient_phone = appointment?.patient_data?.patient_phone_number;
    navigation.navigate('bookslot', {id, patient_phone});
  };
  const token = useSelector(state => state.authenticate.auth.access);
  const [notification, setNotification] = useState([]);
  const {phone} = useSelector(state => state?.phone?.data);
  const NotificationData = async () => {
    try {
      const response = await fetchApi(
        URL.GetNotificationData(phone, appointment?.id),
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        const jsonData = await response.json();
        setNotification(jsonData?.data);
        console.log(jsonData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    NotificationData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      NotificationData();
    }, []),
  );
  const length_ofNotification = notification?.filter(
    item => item?.seen === false && !item?.doctor_phone_number?.includes('sent'),
  );
  return (
    <View style={styles.main}>
      <View style={styles.tokenContainer}>
        <Text
          style={{
            paddingBottom: moderateScale(4),
            color: CUSTOMCOLOR.primary,
            fontSize: CUSTOMFONTSIZE.h2,
            fontWeight: '700',
          }}>
          {appointment_token}
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={{
            flexDirection: 'row',
            gap: moderateScale(16),
            // borderWidth:1
            paddingLeft: moderateScale(26),
          }}>
          <View>
            <Image
              style={styles.img}
              source={{
                uri: `data:image/jpeg;base64,${appointment.patient_data.patient_pic_url}`,
              }}
            />
          </View>
          <View style={{gap: moderateScale(4)}}>
            <Text style={styles.name}>
              {appointment.patient_data.patient_name}
            </Text>
            <Text style={styles.subText}>
              {parseInt(presentYear) - parseInt(birthYear)} |{' '}
              {appointment.patient_data.gender}
            </Text>
            <Text style={styles.subText}>{appointment.complaint}</Text>
          </View>
        </View>
        <View>
          <View style={{marginLeft: moderateScale(220)}}>
            {notification?.length > 0 &&
              length_ofNotification?.length !== 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    paddingHorizontal: 5,
                    zIndex: 1,
                    marginBottom: 10,
                  }}>
                  <Text style={{color: CUSTOMCOLOR.white}}>
                    {length_ofNotification?.length}
                  </Text>
                </View>
              )}

            <Pressable
              style={styles.icon}
              onPress={() => {
                  navigation.navigate('notify', {notification});
              }}>
              <Icon
                name={'message-processing'}
                size={moderateScale(24)}
                color={CUSTOMCOLOR.primary}
              />
            </Pressable>
          </View>
          {appointment?.status === 'pending' ? (
            <View
              style={{
                flexDirection: 'row',
                gap: moderateScale(16),
                paddingTop: moderateScale(24),
              }}>
              <HButton
                label={'Reschedule'}
                btnstyles={{
                  backgroundColor: CUSTOMCOLOR.white,
                  borderWidth: moderateScale(0.5),
                  borderColor: CUSTOMCOLOR.borderColor,
                  paddingHorizontal: horizontalScale(24),
                  paddingVertical: verticalScale(8),
                }}
                textStyle={{
                  color: CUSTOMCOLOR.primary,
                  fontSize: CUSTOMFONTFAMILY.h3,
                }}
                onPress={handleReschedule}
              />
              <HButton
                btnstyles={{
                  // backgroundColor: CUSTOMCOLOR.white,
                  // borderWidth: moderateScale(0.5),
                  // borderColor: CUSTOMCOLOR.borderColor,
                  paddingHorizontal: horizontalScale(24),
                  paddingVertical: verticalScale(12),
                }}
                textStyle={{
                  color: CUSTOMCOLOR.white,
                  fontSize: CUSTOMFONTFAMILY.h3,
                }}
                onPress={handleOnpress}
                label={'Start Visit'}
                // style={[styles.btn, {backgroundColor: CUSTOMCOLOR.primary}]}>
              />
            </View>
          ) : null}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          backgroundColor: '#ECF6FF',
          borderWidth: moderateScale(0.5),
          borderColor: '#3683CC',
          padding: moderateScale(8),
          marginTop: moderateScale(18),
          borderRadius: moderateScale(12),
        }}>
        <View style={styles.statusinfo}>
          <Text style={styles.contact}>Type:</Text>
          <Text style={styles.contact}>
            {' '}
            {appointment.appointment_type === 'walkin'
              ? 'New'
              : capitalizeWord(appointment.appointment_type)}
          </Text>
        </View>
        <View style={styles.statusinfo}>
          <Text style={styles.contact}>Time:</Text>
          <Text style={styles.contact}> {appointment.appointment_slot}</Text>
        </View>
        <View style={styles.statusinfo}>
          <Text style={styles.contact}>Status:</Text>
          <Text
            style={[
              styles.contact,
              {
                fontWeight: '600',
                color:
                  appointment?.status === 'pending'
                    ? CUSTOMCOLOR.warn
                    : CUSTOMCOLOR.success,
              },
            ]}>
            {'  '}
            {capitalizeWord(appointment.status)}
          </Text>
        </View>
        <View style={styles.statusinfo}>
          <Text style={styles.contact}>Bill:</Text>
          <Text
            style={[
              styles.contact,
              {
                fontWeight: '600',
                color:
                  appointment?.is_paid.toString() === 'false'
                    ? CUSTOMCOLOR.warn
                    : CUSTOMCOLOR.success,
              },
            ]}>
            {' '}
            {capitalizeWord(paidOpt[appointment?.is_paid.toString()])}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(36),
    paddingVertical: verticalScale(24),
    backgroundColor: CUSTOMCOLOR.white,
    borderWidth: moderateScale(0.5),
    borderColor: CUSTOMCOLOR.borderColor,
    borderRadius: moderateScale(4),
  },
  img: {
    width: moderateScale(82),
    height: moderateScale(84),
    borderRadius: moderateScale(16),
  },
  name: {
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    fontWeight: '600',
  },
  subText: {
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
    fontWeight: '400',
  },
  icon: {
    height: moderateScale(40),

    width: moderateScale(40),

    borderWidth: moderateScale(1),
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: '#C0DFFC',
    borderRadius: moderateScale(24),
  },
  btn: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    borderWidth: moderateScale(2),
    borderColor: CUSTOMCOLOR.borderColor,
    borderRadius: moderateScale(16),
  },
  btnText: {
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.primary,
    fontWeight: '700',
  },
  statusinfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contact: {
    fontFamily: CUSTOMFONTFAMILY.body,
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
  },
  tokenContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    // borderWidth: 0.5,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    borderBottomRightRadius: moderateScale(64),
    borderColor: CUSTOMCOLOR.black,
    backgroundColor: '#CAE5FF',
  },
});
