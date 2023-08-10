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
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import BottomSheetView from './bottomSheet';
import SelectionTab from '../components/selectiontab';
import moment from 'moment';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
import {useNavigation} from '@react-navigation/native';

const AppointmentCard = ({appointment, openVisit}) => {
  const [visible, setVisible] = useState(false);
  const appointmentCardRef = useRef(null);

  const navigation = useNavigation();

  const presentYear = new Date().toISOString().split('-')[0];

  console.log('==============appointment', appointment);
  const patient_phone_number = appointment?.patient_data?.patient_phone_number;
  const appointment_id = appointment?.id;
  const birthYear = appointment?.patient_data?.birth_date.split('-')[2];

  const handleOnpress = () => {
    const patient_phone = patient_phone_number;
    navigation.navigate('visit', {patient_phone, appointment_id});
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
              {Language[language]['status']}:{appointment.status}
            </Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>
              {Language[language]['bill']}:{appointment.bill}
            </Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
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
{
  /* {visible && (
            <View style={[styles.option, {width: 100}]}>
              <View>
                <TouchableOpacity onPress={openVisit}>
                  <Text style={styles.contact1}>
                    {Language[language]['start_visit']}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.contact1}>
                    {Language[language]['reschedule']}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                  }}>
                  <Text style={styles.contact1}>
                    {Language[language]['cancel']}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )} */
}

{
  /* <View style={[styles.option]}>
            <TouchableOpacity onPress={openVisit}>
              <Text style={styles.contact1}>
                {Language[language]['start_visit']}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.contact1}>
                {Language[language]['reschedule']}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                appointmentCardRef?.current?.snapToIndex(0);
              }}>
              <Text style={styles.contact1}>
                {Language[language]['cancel']}
              </Text>
            </TouchableOpacity>
          </View> */
}

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 12,
    fontSize: CUSTOMFONTSIZE.h3,
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: 4,
    gap: 8,
  },
  child: {
    width: '40%',
  },
  name: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  age: {
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 19,
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  gender: {
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 19,
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  symptom: {
    flexWrap: 'wrap',
    fontWeight: 600,
    fontSize: CUSTOMFONTSIZE.h5,
    lineHeight: 1.5 * CUSTOMFONTSIZE.h5,
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  img: {
    width: 96,
    height: 96,
    borderRadius: 96 / 2,
  },
  patientinfo: {
    gap: 4,
  },
  icon: {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 10,
  },
  option: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperator: {
    height: 0.5,
    margin: 8,
    backgroundColor: '#f3f4f3',
  },
  hseperator: {
    height: '100%',
    width: 0.5,
    margin: 8,
    backgroundColor: '#f3f4f3',
  },
  statusinfo: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    justifyContent: 'space-between',
  },
  statustext: {
    textAlign: 'right',
    fontWeight: '600',
  },
  contact: {
    height: 25,
    width: 150,
  },
  contact1: {
    height: 25,
    width: 150,
  },
  modal: {
    backgroundColor: '#000000aa',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 10,
  },
  tab: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 8,
    padding: 20,
    alignSelf: 'center',
  },
});

export default AppointmentCard;
