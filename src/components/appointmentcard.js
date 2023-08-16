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
  const birthYear = appointment?.patient_data?.birth_date.split('-')[2];
  const patient_age = parseInt(presentYear) - parseInt(birthYear);
  const handleOnpress = () => {
    const patient_phone = patient_phone_number;
    const name = patient_name;
    const gende = patient_gender;
    const age = patient_age;
    navigation.navigate('visit', {
      name,
      gende,
      age,
      patient_phone,
      appointment_id,
    });
    appointmentCardRef?.current?.snapToIndex(0);
  };
  return (
    <>
      <View style={styles.maincontainer}>
        <Image
          style={styles.img}
          source={{
            uri: `data:image/jpeg;base64,${appointment.patient_data.patient_pic_url}`,
          }}
        />
        <View style={styles.child}>
          <Text style={styles.name}>
            {appointment.patient_data.patient_name}
          </Text>
          <Text style={styles.age}>
            {parseInt(presentYear) - parseInt(birthYear)} |{' '}
            {appointment.patient_data.gender}
          </Text>
          <View style={styles.seperator}></View>
          <Text style={styles.symptom}>{appointment.complaint}</Text>
        </View>
        <View style={styles.hseperator}></View>
        <View style={styles.patientinfo}>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>
              {Language[language]['type']}:{appointment.appointment_type}
            </Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>
              {Language[language]['time']}:{appointment.appointment_slot}
              {/* {moment(appointment.appointment_slot).format('HH:mm')} */}
            </Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>
              {Language[language]['status']}:
              <Text
                style={{
                  color:
                    appointment?.status === 'pending'
                      ? CUSTOMCOLOR.warn
                      : CUSTOMCOLOR.success,
                }}>
                {appointment.status}
              </Text>
            </Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
          {/* <View style={styles.statusinfo}>
            <Text style={styles.contact}>
              {Language[language]['bill']}:{appointment.bill}
            </Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View> */}
        </View>
        <Pressable
          style={styles.icon}
          onPress={() => {
            // setVisible(!visible);
            appointmentCardRef?.current?.snapToIndex(1);
          }}>
          <View>
            <Icon
              name="dots-horizontal"
              color={CUSTOMCOLOR.primary}
              size={24}
            />
          </View>
        </Pressable>

        <BottomSheetView
          bottomSheetRef={appointmentCardRef}
          snapPoints={'100%'}
          backgroundStyle="#000000aa">
          <View style={styles.tab}>
            <SelectionTab
              label={Language[language]['start_visit']}
              selected={true}
              onPress={handleOnpress}
            />
            <SelectionTab
              label={Language[language]['reschedule']}
              selected={true}
            />
            <SelectionTab
              label={Language[language]['cancel']}
              selected={true}
              onPress={() => {
                appointmentCardRef?.current?.snapToIndex(0);
              }}
            />
          </View>
        </BottomSheetView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: moderateScale(12),
    fontSize: CUSTOMFONTSIZE.h3,
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: moderateScale(4),
    gap: moderateScale(8),
  },
  child: {
    width: '40%',
  },
  name: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    padding: moderateScale(0),
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  age: {
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 19,
    padding: moderateScale(0),
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  gender: {
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 19,
    padding: moderateScale(0),
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  symptom: {
    flexWrap: 'wrap',
    fontWeight: 600,
    fontSize: CUSTOMFONTSIZE.h5,
    lineHeight: 1.5 * CUSTOMFONTSIZE.h5,
    padding: moderateScale(0),
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  img: {
    width: moderateScale(96),
    height: moderateScale(96),
    borderRadius: moderateScale(96 / 2),
  },
  patientinfo: {
    gap: moderateScale(4),
  },
  icon: {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: moderateScale(10),
  },
  option: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperator: {
    height: verticalScale(0.5),
    margin: 8,
    backgroundColor: '#f3f4f3',
  },
  hseperator: {
    height: '100%',
    width: horizontalScale(0.5),
    margin: 8,
    backgroundColor: '#f3f4f3',
  },
  statusinfo: {
    flexDirection: 'row',
    gap: moderateScale(16),
    width: '100%',
    justifyContent: 'space-between',
  },
  statustext: {
    textAlign: 'right',
    fontWeight: '600',
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  contact: {
    height: verticalScale(25),
    width: horizontalScale(150),
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  contact1: {
    height: verticalScale(25),
    width: horizontalScale(150),
  },
  modal: {
    backgroundColor: '#000000aa',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: moderateScale(40),
    borderRadius: moderateScale(10),
  },
  tab: {
    flexDirection: 'row',
    gap: moderateScale(16),
    paddingHorizontal: 8,
    padding: moderateScale(20),
    alignSelf: 'center',
  },
});

export default AppointmentCard;
