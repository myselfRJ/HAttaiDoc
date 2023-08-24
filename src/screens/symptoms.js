import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Option from '../components/option';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {HButton, PlusButton} from '../components';
import {useSelector, useDispatch} from 'react-redux';
import {
  addSymptom,
  updateSymptom,
} from '../redux/features/prescription/symptomslice';
import {
  CUSTOMCOLOR,
  CUSTOMFONTSIZE,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import PrescriptionHead from '../components/prescriptionHead';
import ShowChip from '../components/showChip';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';

const Symptoms = ({navigation}) => {
  const symptomsData = useSelector(state => state.symptoms.symptom);

  const [symptom, setSymptom] = useState('');
  const [days, setDays] = useState('');
  const [selected, setSelected] = useState('');

  const dispatch = useDispatch();

  const handleAddSymptoms = () => {
    dispatch(
      addSymptom([
        ...symptomsData,
        {
          symptom: symptom,
          days: days,
          severity: selected,
        },
      ]),
    );
    setDays(null);
    setSymptom(null);
    setSelected(null);
  };

  const handleSymptomSubmit = () => {
    dispatch(
      addSymptom([
        ...symptomsData,
        {
          symptom: symptom,
          days: days,
          severity: selected,
        },
      ]),
    );
    setDays(null);
    setSymptom(null);
    setSelected(null);
    navigation.goBack();
  };

  const handleDeleteSymptom = index => {
    if (symptomsData) {
      const updatedSymptom = symptomsData?.filter((item, ind) => ind !== index);

      dispatch(updateSymptom(updatedSymptom));
    }
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View>
          <PrescriptionHead heading={Language[language]['symptoms']} />
        </View>

        {symptomsData?.map((item, ind) => (
          // <ShowChip text={item.symptom} {...item?.days} {...item?.severity} />
          <View key={ind} style={styles.reduxData}>
            <View style={styles.reduxData1}>
              <View style={{flexDirection: 'row', gap: moderateScale(8)}}>
                <Icon
                  name="emoticon-sick"
                  size={16}
                  color={CUSTOMCOLOR.primary}
                />
                <Text
                  style={{
                    color: CUSTOMCOLOR.black,
                    fontFamily: CUSTOMFONTFAMILY.body,
                  }}>
                  {item.symptom} | {item.days} | {item.severity}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSymptom(ind)}>
                <Icon name="delete" size={24} color={CUSTOMCOLOR.delete} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                padding: moderateScale(10),
                flexWrap: 'wrap',
              }}>
              <View style={styles.symptomInput}>
                <Text
                  style={{
                    padding: moderateScale(10),
                    fontWeight: 'bold',
                    color: CUSTOMCOLOR.black,
                    fontFamily: CUSTOMFONTFAMILY.body,
                  }}>
                  {Language[language]['symptom']}
                  {/* {parseInt(index + 1)}: */}
                </Text>
                <View
                  style={{
                    height: moderateScale(40),
                    // width: 100,
                    textAlignVertical: 'top',
                  }}>
                  <TextInput
                    placeholder="Enter Symptom"
                    value={symptom}
                    onChangeText={text => setSymptom(text)}
                  />
                </View>
              </View>
              <View style={styles.DateInput}>
                <Text
                  style={{
                    padding: moderateScale(10),
                    fontWeight: 'bold',
                    color: CUSTOMCOLOR.black,
                    fontFamily: CUSTOMFONTFAMILY.body,
                  }}>
                  {Language[language]['days']}:
                </Text>
                <View
                  style={{
                    height: horizontalScale(40),
                    width: verticalScale(100),
                    textAlignVertical: 'top',
                  }}>
                  <TextInput
                    placeholder="Enter Days"
                    value={days}
                    onChangeText={text => setDays(text)}
                  />
                </View>
              </View>
              <View style={styles.radiogroup}>
                <Text
                  style={{
                    padding: moderateScale(10),
                    fontWeight: 'bold',
                    fontFamily: CUSTOMFONTFAMILY.body,

                    color: CUSTOMCOLOR.black,
                  }}>
                  {Language[language]['severity']}:
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Option
                    label={Language[language]['low']}
                    value="low"
                    selected={selected === 'low'}
                    onPress={() => setSelected('low')}
                  />
                  <Option
                    label={Language[language]['medium']}
                    value="medium"
                    selected={selected === 'medium'}
                    onPress={() => setSelected('medium')}
                  />
                  <Option
                    label={Language[language]['high']}
                    value="high"
                    selected={selected === 'high'}
                    onPress={() => setSelected('high')}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: verticalScale(16)}}>
            <PlusButton
              icon="plus"
              size={moderateScale(24)}
              onPress={handleAddSymptoms}
            />
          </View>
          <View style={styles.submit}>
            <HButton
              label={'submit'}
              onPress={() => {
                handleSymptomSubmit();
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

    marginHorizontal: verticalScale(8),
    marginVertical: horizontalScale(16),
  },
  mainHead: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h1,
    fontWeight: 'bold',
    padding: moderateScale(10),
  },
  symptomInput: {
    backgroundColor: CUSTOMCOLOR.white,
    flexDirection: 'row',
    padding: moderateScale(8),
  },
  DateInput: {
    backgroundColor: CUSTOMCOLOR.white,
    flexDirection: 'row',
    padding: moderateScale(8),
  },
  radiogroup: {
    flexDirection: 'row',
    padding: moderateScale(8),
    gap: moderateScale(8),
  },
  line: {
    margin: moderateScale(8),
    height: 0.5,
    width: '100%',
    backgroundColor: 'blue',
  },
  reduxData: {
    flex: 1,
    marginVertical: moderateScale(8),
    marginHorizontal: moderateScale(8),
    borderWidth: 1,
    padding: moderateScale(8),
    borderColor: '#2CBB15',
    backgroundColor: CUSTOMCOLOR.white,
  },
  reduxData1: {
    flexDirection: 'row',
    flex: 1,
    gap: moderateScale(8),
    justifyContent: 'space-between',
  },
  submit: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateScale(20),
  },
});

export default Symptoms;
