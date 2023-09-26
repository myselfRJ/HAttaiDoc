import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {HButton, PatientSearchCard} from '../components';
import DatePicker from 'react-native-date-picker';
import {SelectorBtn} from '../components';
import {CONSTANTS} from '../utility/constant';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
import {useSelector} from 'react-redux';
import PatientSearch from '../components/PatientSearch';
import {Image} from 'react-native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import PrescribeHead from '../components/prescriptionHead';

export default function PatientHistory({route, navigation}) {
  const Views = CONSTANTS.prescription;
  const [selectedView, setSelectedView] = useState(Views[0]);
  const [data, setData] = useState([]);
  const [consultation, setConsultation] = useState([]);

  const token = useSelector(state => state?.authenticate?.auth?.access);
  const {id} = route.params;
  const fetchPrescribe = async () => {
    const response = await fetchApi(URL.getConsultationByAppointmentId(id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      console.log(jsonData.data);
      setConsultation(jsonData?.data[0]?.consultation);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchPrescribe();
  }, []);

  const [vitals, setVitals] = useState({
    chiefComplaints: consultation?.chief_complaint?.complaint_message,
    medication: consultation?.prescribe?.map((item, index) => {
      return `${item.mode} | ${item?.medicine} | ${item?.dose_quantity} | ${item?.timing} | ${item?.frequency} | ${item?.total_quantity}`;
    }),
    // diagnosis: consultation?.diagnosis?.diagnosis?.map((item, index) => {
    //   return `${item?.diagnosis}`;
    // }),
    vital: {
      BP: 'Bp',
      PR: 'Pr',
      SPO2: 'SPO2',
      TEMP: 'TEMP',
      LMP: 'LMP',
      EDD: 'EDD',
    },
  });
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const handleConfirm = date => {
    setDOB(date);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handlePress = value => {
    setSelectedView(value);
  };
  const birthYear = data?.birth_date?.split('-')[2];
  const presentYear = new Date().toISOString().split('-')[0];

  const handleBook = () => {
    const patient_phone = data?.patient_phone_number;
    // console.log('-----------phonepatient', patient_phone);
    navigation.navigate('bookslot', {patient_phone});
  };
  return (
    <View style={styles.container}>
      <View style={{top: moderateScale(32)}}>
        <View>
          <Text style={styles.Head}>Consultation:</Text>
        </View>
        <View
          style={{
            // paddingHorizontal: 32,
            top: moderateScale(16),
          }}>
          <View
            style={{
              top: moderateScale(16),
              gap: moderateScale(16),
              marginBottom: moderateScale(64),
            }}>
            <View>
              <Text style={styles.contentHead}>Chief Complaints</Text>
              <Text style={styles.text}>
                {consultation?.chief_complaint?.complaint_message}
              </Text>
            </View>
            <View>
              <Text style={styles.contentHead}>Diagnosis</Text>
              <Text style={styles.text}>
                {consultation?.diagnosis?.map((item, index) => {
                  return `${item?.diagnosis}`;
                })}
                {/* {consultation?.diagnosis?.diagnosis} */}
              </Text>
            </View>
            <View style={{gap: moderateScale(8)}}>
              <Text style={styles.contentHead}>Medication</Text>

              {consultation?.prescribe?.map((item, index) => {
                return (
                  <Text key={index} style={styles.text}>
                    {item.mode} | {item?.medicine} | {item?.dose_quantity} |{' '}
                    {item?.timing} | {item?.frequency} | {item?.total_quantity}
                  </Text>
                );
              })}
            </View>
            <View>
              <Text style={styles.contentHead}>Vitals</Text>
              <View style={{flexDirection: 'row', gap: moderateScale(48)}}>
                <Text style={styles.text}>BP</Text>
                <Text style={styles.text}>PR</Text>
                <Text style={styles.text}>BMI</Text>
                <Text style={styles.text}>TEMP</Text>
                <Text style={styles.text}>LMP</Text>
                <Text style={[styles.text, {paddingLeft: moderateScale(30)}]}>
                  EDD
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: moderateScale(26),
                  top: moderateScale(8),
                }}>
                <Text style={styles.text}>
                  {consultation?.vitals?.systolic}
                  {'/'}
                  {consultation?.vitals?.diastolic}
                </Text>
                <Text style={styles.text}>
                  {consultation?.vitals?.pulse_rate}
                </Text>
                <Text style={[styles.text, {paddingLeft: moderateScale(20)}]}>
                  {consultation?.vitals?.bmi}
                </Text>
                <Text style={[styles.text, {paddingLeft: moderateScale(30)}]}>
                  {consultation?.vitals?.body_temperature}
                </Text>
                {/* <Text>{vitals.vital.EDD}</Text> */}
                <Text style={[styles.text, {paddingLeft: moderateScale(20)}]}>
                  {consultation?.vitals?.LDD}
                </Text>
                <Text style={[styles.text]}>{consultation?.vitals?.EDD}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            // top: 24,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            left: '40%',
            paddingHorizontal: horizontalScale(8),
          }}>
          {/* <HButton label={'Download'} /> */}
        </View>
        <View
          style={{
            // top: 30,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <HButton label={'BookAppointment'} onPress={handleBook} /> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Head: {
    fontWeight: '700',
    fontSize: CUSTOMFONTSIZE.h1,
    color: CUSTOMCOLOR.black,
    lineHeight: moderateScale(19.07),
  },
  contentHead: {
    fontWeight: '700',
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    lineHeight: moderateScale(19.07),
  },

  main: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: moderateScale(12),
    paddingHorizontal: horizontalScale(24),
    fontSize: CUSTOMFONTSIZE.h3,
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: moderateScale(4),
    gap: moderateScale(8),
  },
  name: {
    fontWeight: '600',
    fontSize: CUSTOMFONTSIZE.h3,
    lineHeight: moderateScale(20),
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  age: {
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h5,
    lineHeight: 20,
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  contact: {
    fontWeight: 600,
    fontSize: CUSTOMFONTSIZE.h5,
    lineHeight: 12.5,
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  img: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: 60 / 2,
  },
  text: {
    color: CUSTOMCOLOR.black,
  },
  container: {gap: moderateScale(32), paddingHorizontal: horizontalScale(48)},
});
