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
import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from '../utility/scaleDimension';
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
    <View style={styles.maincontnet}>
      <PrescriptionHead heading="Refer to Doctor" />
      {/* <Text style={styles.title}>Refer to Doctor</Text> */}
      <View style={styles.container}>
        <Text style={styles.head}>Recommendation</Text>
        <View style={styles.child}>
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

        <View style={styles.selected}>
          {selectedDoctor ? (
            <View style={{flexDirection: 'row', gap: moderateScale(10)}}>
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
            <View style={{flexDirection: 'row', gap: moderateScale(10)}}>
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
      <View style={{top: moderateScale(150), alignItems: 'center'}}>
        <HButton label={Language[language]['submit']} onPress={onPress} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    //width: horizontalScale(651),
    height: verticalScale(35),
    justifyContent: 'space-between',
    padding: moderateScale(8),
  },
  container: {
    width: horizontalScale(651),
    height: verticalScale(62),
    padding: moderateScale(8),
    gap: moderateScale(8),
  },
  head: {
    //width: horizontalScale(125),
    height: verticalScale(35),
    padding: moderateScale(8),
    gap: moderateScale(10),
    color: CUSTOMCOLOR.black,
    fontSize: moderateScale(14),
    fontWeight: 600,
    lineHeight: moderateScale(16.34),
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  fields: {
    height: verticalScale(14),
    fontFamily: CUSTOMFONTFAMILY.opensans,
    fontSize: moderateScale(10),
    fontWeight: 400,
    lineHeight: moderateScale(13.62),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(8),
    alignSelf: 'center',
  },
  input: {
    //width: horizontalScale(150),
    paddingHorizontal: horizontalScale(32),
    height: verticalScale(45),
    borderRadius: moderateScale(4),
    //padding: moderateScale(16),
    gap: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: moderateScale(12),
    backgroundColor: CUSTOMCOLOR.white,
  },
  suggestion: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    height: verticalScale(32),
    gap: moderateScale(8),
    borderRadius: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  maincontnet: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(24),
  },
  child: {
    //width: horizontalScale(323),
    height: verticalScale(30),
    padding: moderateScale(8),
    gap: moderateScale(16),
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(8),
  },
  selected: {
    //width: horizontalScale(651),
    height: verticalScale(50),
    padding: moderateScale(8),
    marginTop: moderateScale(10),
    gap: moderateScale(10),
    flexDirection: 'row',
  },
});
export default ReferDoctorForm;
