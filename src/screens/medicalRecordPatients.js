import React, {useState} from 'react';
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
import {PatientSearchCard} from '../components';
import DatePicker from 'react-native-date-picker';
import {SelectorBtn} from '../components';
import {CONSTANTS} from '../utility/constant';

export default function MedicalRecordPatient() {
  const Views = CONSTANTS.prescription;
  const [selectedView, setSelectedView] = useState(Views[0]);
  const [chiefComplaints, setChiefComplaints] = useState(
    'Headache and sever stomach pain',
  );
  const [medication, setMedication] = useState('Dolo650,Paracetmol');
  const [diagnosis, setDiagnosis] = useState('eadache and sever stomach pain');
  //   const [vitals, setVitals] = useState({
  //     pulse_rate: '',
  //     weight: '',
  //     height: '',
  //     temp: '',
  //     rate: '',
  //     bmi: '',
  //     diastolic_bp: '',
  //     systolic_bp: '',
  //     lmp_edd: '',
  //     us_edd: '',
  //   });
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

  return (
    <View style={{gap: 32}}>
      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 24,
          backgroundColor: CUSTOMCOLOR.primary,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}>
        <Text
          style={{
            fontSize: CUSTOMFONTSIZE.h1,
            color: CUSTOMCOLOR.white,
            top: 16,
          }}>
          {' '}
          Medical History
        </Text>
        <Icon name="bell" size={24} color={'#fff'} style={styles.bellIcon} />
      </View>
      <View style={{paddingHorizontal: 32, gap: 32}}>
        <View style={{height: 100}}>
          <PatientSearchCard />
        </View>
        <View style={{height: 40}}>
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
        <View
          style={{
            paddingHorizontal: 24,
            top: 16,
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          {Views?.map((val, ind) => (
            <View style={{width: 160}}>
              <TouchableOpacity onPress={() => handlePress(val)}>
                <Text
                  style={{
                    fontSize: CUSTOMFONTSIZE.h2,
                    color: selectedView === val ? CUSTOMCOLOR.black : '#BBBBBB',
                    fontWeight: '500',
                  }}>
                  {val}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View
          style={{
            paddingHorizontal: 32,
            top: 16,
            gap: 16,
          }}>
          <View>
            <Text style={styles.contentHead}>Chief Complaints</Text>
            <Text>{chiefComplaints}</Text>
          </View>
          <View>
            <Text style={styles.contentHead}>Diagnosis</Text>
            <Text>{diagnosis}</Text>
          </View>
          <View>
            <Text style={styles.contentHead}>Medication</Text>
            <Text>{medication}</Text>
          </View>
          <View>
            <Text style={styles.contentHead}>Vitals</Text>
            {/* <Text>{vitals}</Text> */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bellIcon: {
    left: 662,
    bottom: 8,
  },
  contentHead: {
    fontWeight: '700',
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    lineHeight: 19.07,
  },
});
