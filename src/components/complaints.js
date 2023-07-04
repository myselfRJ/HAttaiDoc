import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addCheifComplaint } from '../redux/features/prescription/prescriptionSlice';
import { CUSTOMCOLOR, CUSTOMFONTFAMILY } from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import { useNavigation } from '@react-navigation/native';

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
      <Text style={styles.h2}>{Language[language]['consultation']}</Text>
      <Text style={styles.h3}>{Language[language]['cheif_complaints']}</Text>
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
              style={[styles.sugbtn, { borderColor: selectedComplaint === value ? 'green' : CUSTOMCOLOR.primary }]}
              key={index}
              onPress={() => handlePress(value)}
            >
              <View>
                <Text style={styles.sugText}>{value}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.submitbtn} onPress={onPress}>
       <Text style={{ color: CUSTOMCOLOR.primary }}>
                        {Language[language]['submit']}
                    </Text>
       </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 24,
    gap: 16,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
    padding: 24,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
    padding: 5,
  },
  input: {
    width: '100%',
    margin: 10,
    padding: 5,
  },
  sugg: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sugText: {
    color: CUSTOMCOLOR.primary,
  },
  sugbtn: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
  submitbtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    alignSelf:"center",
    margin:100,
    borderWidth:1,
    borderColor:CUSTOMCOLOR.primary,
    borderRadius:4
}
});

export default ComplaintsCard;
