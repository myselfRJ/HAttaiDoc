import React, {useRef, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import PlusButton from './plusbtn';

const AppointmentCard = ({appointment, openVisit}) => {
  const [visible, setVisible] = useState(false);
  const appointmentCardRef = useRef(null);

  const navigation = useNavigation();

  const presentYear = new Date().toISOString().split('-')[0];

  const patient_phone_number = appointment?.patient_data?.patient_phone_number;
  const patient_name = appointment?.patient_data?.patient_name;
  const patient_gender = appointment?.patient_data?.gender;
  const birth_date = appointment?.patient_data?.birth_date;

  const appointment_id = appointment?.id;
  const birthYear = appointment?.patient_data?.birth_date.split('-')[0];
  const patient_age = parseInt(presentYear) - parseInt(birthYear);
  const handleOnpress = () => {
    const patient_phone = patient_phone_number;
    const name = patient_name;
    const gende = patient_gender;
    const age = patient_age;
    const complaint = appointment.complaint;
    navigation.navigate('visit', {
      name,
      gende,
      age,
      patient_phone,
      appointment_id,
      complaint,
    });
    appointmentCardRef?.current?.snapToIndex(0);
  };
  const paidOpt = {
    false: 'UnPaid',
    true: 'Paid',
  };
  return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={{
            flexDirection: 'row',
            gap: moderateScale(16),
            // paddingTop: moderateScale(34),
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
            <Pressable style={styles.icon} onPress={() => setVisible(!visible)}>
              <Icon
                name={visible ? 'chevron-up' : 'chevron-down'}
                size={moderateScale(24)}
                color={CUSTOMCOLOR.primary}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: moderateScale(16),
              paddingTop: moderateScale(24),
            }}>
            <Pressable style={styles.btn}>
              <Text style={styles.btnText}>Reschedule</Text>
            </Pressable>
            <Pressable
              onPress={handleOnpress}
              style={[styles.btn, {backgroundColor: CUSTOMCOLOR.primary}]}>
              <Text style={[styles.btnText, {color: CUSTOMCOLOR.white}]}>
                Start Visit
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {visible && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            backgroundColor: '#ECF6FF',
            borderWidth: moderateScale(2),
            borderColor: '#3683CC',
            padding: moderateScale(8),
            marginTop: moderateScale(18),
            borderRadius: moderateScale(12),
          }}>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>Type:</Text>
            <Text style={styles.contact}> {appointment.appointment_type}</Text>
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
              {appointment.status}
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
              {paidOpt[appointment?.is_paid.toString()]}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(36),
    paddingVertical: verticalScale(24),
    backgroundColor: CUSTOMCOLOR.white,
    borderWidth: moderateScale(2),
    borderColor: CUSTOMCOLOR.borderColor,

    borderRadius: moderateScale(16),
  },
  img: {
    width: moderateScale(84),
    height: moderateScale(84),
    borderRadius: moderateScale(8),
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
    padding: moderateScale(2),
    borderWidth: moderateScale(2),
    borderColor: CUSTOMCOLOR.borderColor,
    borderRadius: moderateScale(100),
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
});
