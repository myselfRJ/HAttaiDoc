import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
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
import ConsultationCard from '../components/ConsultationCard';
import { ScrollView } from 'react-native-gesture-handler';

export default function MedicalRecordPatient({route, navigation}) {
  const Views = CONSTANTS.prescription;
  const [selectedView, setSelectedView] = useState(Views[0]);
  const [data, setData] = useState([]);
  const [consultation, setConsultation] = useState([]);

  const token = useSelector(state => state?.authenticate?.auth?.access);
  const {patient_phone} = route.params;
  // console.log('-------------------phone', patient_phone);
  const fetchData = async () => {
    const response = await fetchApi(URL.getPatientByNumber(patient_phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      // console.log(jsonData.data);
      setData(jsonData.data[0]);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchPrescribe = async () => {
    const response = await fetchApi(
      URL.getConsultationByPatientPhone(patient_phone),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      const jsonData = await response.json();
      // console.log(jsonData.data);
      setConsultation(jsonData?.data);
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
    navigation.navigate('bookslot', {patient_phone});
  };

  return (
    <View style={styles.container}>
      <View style={{top: moderateScale(32),gap:moderateScale(8)}}>
        <View>
          <View style={styles.main}>
            <Image
              style={styles.img}
              source={{
                uri: `data:image/jpeg;base64,${data?.patient_pic_url}`,
              }}
            />
            <View style={styles.patientinfo}>
              <Text style={styles.name}>{data?.patient_name}</Text>
              <Text style={styles.age}>
                {parseInt(presentYear) - parseInt(birthYear)} | {data?.gender}
              </Text>
              <Text style={styles?.contact}>
                contact:
                {data?.patient_phone_number}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <SelectorBtn
            label="Date"
            name="calendar"
            onPress={() => setOpen('to')}
            input={formattedDate}
          />
          <DatePicker
            modal
            open={open !== false}
            date={date}
            theme="auto"
            mode="date"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </View>
        <Text
          style={{
            paddingTop: moderateScale(16),
            fontSize: CUSTOMFONTSIZE.h2,
            fontWeight: '500',
            color: CUSTOMCOLOR.black,
          }}>
          Prescription
        </Text>

          
          <View
            style={{
              // top: moderateScale(16),
              gap: moderateScale(8),
              // marginBottom: moderateScale(64),
              height:verticalScale(750)
            }}>
              <ScrollView>
              
            {consultation?.map((value, index) => (
              <View style={{marginBottom:verticalScale(8)}}>
              <ConsultationCard data={value?.consultation} />
              </View>
            ))}
            </ScrollView>
          </View>
          

        {/* <View
          style={{
            // top: 24,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            left: '40%',
            paddingHorizontal: horizontalScale(8),
          }}>
          <HButton label={'Download'} />
        </View> */}
        <View
          style={{
            // top: 30,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <HButton label={'BookAppointment'} onPress={handleBook} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  patientinfo: {},
  container: {gap: moderateScale(16),
     paddingHorizontal: horizontalScale(24)},
});
