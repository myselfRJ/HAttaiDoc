import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {useSelector, useDispatch} from 'react-redux';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {addDoctorRefer} from '../redux/features/prescription/prescriptionSlice';
import {useNavigation} from '@react-navigation/native';
import {HButton} from '../components';
import PrescriptionHead from './prescriptionHead';

const ReferDoctorForm = props => {
  const nav = useNavigation();
  const doctors = useSelector(state => state.prescription.doctors);
  const selectedDoctor = useSelector(
    state => state.prescription.selectedDoctor,
  );
  const dispatch = useDispatch();

  const onPress = () => {
    console.log(selectedDoctor);
    nav.goBack();
  };

  const handlePress = doctor => {
    dispatch(addDoctorRefer(doctor));
  };

  const handleNameChange = value => {
    dispatch(addDoctorRefer({...selectedDoctor, doctor_name: value}));
  };

  const handleSpecialityChange = value => {
    dispatch(addDoctorRefer({...selectedDoctor, speciality: value}));
  };

  const handlePhoneChange = value => {
    dispatch(addDoctorRefer({...selectedDoctor, phone: value}));
  };

  return (
    <View style={{paddingHorizontal: 24, paddingVertical: 24}}>
      <View style={styles.main}>
        <PrescriptionHead heading='Refer to Doctor'/>
        <Text style={styles.title}>Refer to Doctor</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.head}>Recommendation</Text>
        <View
          style={{
            width: 323,
            height: 30,
            padding: 8,
            gap: 16,
            flexDirection: 'row',
          }}>
          {doctors.map((doctor, index) => (
            <TouchableOpacity
              style={[
                styles.suggestion,
                {
                  backgroundColor:
                    selectedDoctor === doctor
                      ? CUSTOMCOLOR.primary
                      : CUSTOMCOLOR.white,
                },
              ]}
              key={index}
              onPress={() => handlePress(doctor)}>
              <Text
                style={[
                  styles.fields,
                  {
                    color:
                      selectedDoctor === doctor
                        ? CUSTOMCOLOR.white
                        : CUSTOMCOLOR.primary,
                  },
                ]}>
                {doctor?.doctor_name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            width: 651,
            height: 50,
            padding: 8,
            marginTop: 10,
            gap: 10,
            flexDirection: 'row',
          }}>
          {selectedDoctor ? (
            <View style={{flexDirection: 'row', gap: 10}}>
              <TextInput
                placeholder="Name"
                style={styles.input}
                value={selectedDoctor.doctor_name}
                onChangeText={handleNameChange}
              />
              <TextInput
                placeholder="Speciality"
                style={styles.input}
                value={selectedDoctor.speciality}
                onChangeText={handleSpecialityChange}
              />
              <TextInput
                placeholder="Phone number"
                keyboardType="numeric"
                style={styles.input}
                value={selectedDoctor.phone}
                onChangeText={handlePhoneChange}
              />
            </View>
          ) : (
            <View style={{flexDirection: 'row', gap: 10}}>
              <TextInput placeholder="Name" style={styles.input} />
              <TextInput placeholder="Speciality" style={styles.input} />
              <TextInput
                placeholder="Phone number"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
          )}
        </View>
      </View>
      <View style={{top: 150, alignItems: 'center'}}>
        <HButton label={Language[language]['submit']} onPress={onPress} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  h2: {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
    padding: 10,
  },
  main: {
    width: 651,
    height: 35,
    justifyContent: 'space-between',
    padding: 8,
  },
  title: {
    width: 104,
    height: 19,
    fontFamily: CUSTOMFONTFAMILY.opensans,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 19.07,
    color: CUSTOMCOLOR.black,
  },
  container: {
    width: 651,
    height: 62,
    padding: 8,
    gap: 8,
  },
  head: {
    width: 125,
    height: 35,
    padding: 8,
    gap: 10,
    color: CUSTOMCOLOR.black,
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 16.34,
  },
  fields: {
    height: 14,
    fontFamily: CUSTOMFONTFAMILY.opensans,
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 13.62,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  input: {
    width: 150,
    height: 45,
    borderRadius: 4,
    padding: 16,
    gap: 8,
    //borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    backgroundColor: CUSTOMCOLOR.white,
  },
  suggestion: {
    flex: 1,
    paddingHorizontal: 16,
    height: 30,
    gap: 8,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    //borderColor: CUSTOMCOLOR.primary
  },
  inputfields: {
    width: 34,
    height: 16,
    fontFamily: CUSTOMFONTFAMILY.opensans,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16.34,
  },
  submitbtn: {
    //  alignItems: 'flex-start',
    //  justifyContent: 'flex-start',
    // paddingHorizontal: 8,
    // alignSelf:"center",
    margin: 100,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: CUSTOMCOLOR.primary,
    borderRadius: 4,
    width: 60,
    padding: 3,
  },
});
export default ReferDoctorForm;
