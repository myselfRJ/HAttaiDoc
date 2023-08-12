import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addCheifComplaint } from '../redux/features/prescription/prescriptionSlice';
import { CUSTOMCOLOR, CUSTOMFONTFAMILY } from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import { useNavigation } from '@react-navigation/native';
import HButton from '../components/button';
import PrescriptionHead from './prescriptionHead';

const ComplaintsCard = (props) => {
  const selectedComplaint = useSelector(state => state.prescription.selectedComplaint);
  const nav=useNavigation()
  const dispatch = useDispatch();

  const handlePress = (suggestion) => {
    dispatch(addCheifComplaint(suggestion));
  };
  const onPress=()=>{
    console.log(selectedComplaint)
    nav.goBack()
  }
  return (
    <View style={styles.main}>
      <PrescriptionHead heading={Language[language]['cheif_complaints']}/>
      <TextInput
        style={styles.input}
        placeholder='write complaints'
        multiline={true}
        value={selectedComplaint}
        onChangeText={(text) => { dispatch(addCheifComplaint(text)); }}
      />
      <View>
        <Text style={styles.h3}>{Language[language]['suggestions']}</Text>
        <View style={styles.sugg}>
          {props.cheifcomplaints.map((value, index) => (
            <TouchableOpacity
              style={[styles.sugbtn, { backgroundColor: selectedComplaint === value ? CUSTOMCOLOR.primary : CUSTOMCOLOR.white }]}
              key={index}
              onPress={() => handlePress(value)}
            >
              <View>
                <Text style={[styles.sugText,{color: selectedComplaint === value ? CUSTOMCOLOR.white : CUSTOMCOLOR.primary}]}>{value}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{alignItems:'center',padding:16}}>
      <HButton
              label={Language[language]['save']}
              onPress={onPress}
            />
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  h3: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
    paddingHorizontal:8
  },
  input: {
    paddingHorizontal:8,
    borderRadius:4,
    fontSize:12,
    backgroundColor:CUSTOMCOLOR.white
  },
  sugg: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sugText: {
    color: CUSTOMCOLOR.primary,
    fontSize:12,
    fontWeight:400,
    alignItems:'center'
  },
  sugbtn: {
    borderRadius: 8,
    padding: 5,
    height:30,
    gap:4

  },
});

export default ComplaintsCard;
