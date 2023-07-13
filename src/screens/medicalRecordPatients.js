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
import {HButton, PatientSearchCard} from '../components';
import DatePicker from 'react-native-date-picker';
import {SelectorBtn} from '../components';
import {CONSTANTS} from '../utility/constant';

export default function MedicalRecordPatient() {
  const Views = CONSTANTS.prescription;
  const [selectedView, setSelectedView] = useState(Views[0]);

  const [vitals, setVitals] = useState({
    chiefComplaints: 'Headache and sever stomach pain',
    medication: 'Headache and sever stomach pain',
    diagnosis: 'Headcha and sever fever',
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
              <TouchableOpacity key={ind} onPress={() => handlePress(val)}>
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
        {selectedView === Views[0] ? (
          <View
            style={{
              paddingHorizontal: 32,
              top: 16,
              gap: 16,
            }}>
            <View>
              <Text style={styles.contentHead}>Chief Complaints</Text>
              <Text>{vitals.chiefComplaints}</Text>
            </View>
            <View>
              <Text style={styles.contentHead}>Diagnosis</Text>
              <Text>{vitals.diagnosis}</Text>
            </View>
            <View>
              <Text style={styles.contentHead}>Medication</Text>
              <Text>{vitals.medication}</Text>
            </View>
            <View>
              <Text style={styles.contentHead}>Vitals</Text>
              <View style={{flexDirection: 'row', gap: 40}}>
                <Text>BP</Text>
                <Text>PR</Text>
                <Text>SPO2</Text>
                <Text>TEMP</Text>
                <Text>LMP</Text>
                <Text>EDD</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 40, top: 8}}>
                <Text>{vitals.vital.BP}</Text>
                <Text>{vitals.vital.PR}</Text>
                <Text>{vitals.vital.SPO2}</Text>
                <Text>{vitals.vital.TEMP}</Text>
                <Text>{vitals.vital.LMP}</Text>
                <Text>{vitals.vital.EDD}</Text>
              </View>
            </View>
          </View>
        ) : null}
        <View
          style={{
            top: 24,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            left: '40%',
          }}>
          <HButton label={'Download'} />
        </View>
        <View
          style={{
            top: 30,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <HButton label={'BookAppointment'} />
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
