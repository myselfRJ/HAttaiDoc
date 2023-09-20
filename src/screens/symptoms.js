import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
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
    if (symptomsData.length > 0) {
      setDays(null);
      setSymptom(null);
      setSelected(null);
      navigation.goBack();
    } else {
      Alert.alert('', 'Please Add Atleast One Symptom');
    }
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
                  size={moderateScale(16)}
                  color={CUSTOMCOLOR.primary}
                />
                <Text style={styles.reduxText}>
                  {item.symptom} | {item.days} | {item.severity}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSymptom(ind)}>
                <Icon
                  name="delete"
                  size={moderateScale(24)}
                  color={CUSTOMCOLOR.delete}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
          <View>
            <View style={styles.content}>
              <View style={styles.symptomInput}>
                <Text style={styles.text}>
                  {Language[language]['symptom']}{' '}
                  {parseInt(symptomsData.length) + 1}:
                  {/* {parseInt(index + 1)}: */}
                </Text>

                <TextInput
                  placeholder="Enter Symptom"
                  value={symptom}
                  onChangeText={text => setSymptom(text)}
                />
              </View>
              <View style={styles.DateInput}>
                <Text style={styles.text}>{Language[language]['days']}:</Text>
                <TextInput
                  placeholder="Enter Days"
                  value={days}
                  onChangeText={text => setDays(text)}
                />
              </View>
              <View style={styles.radiogroup}>
                <Text style={styles.text}>
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

    marginHorizontal: verticalScale(16),
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
    // padding: moderateScale(8),
  },
  DateInput: {
    backgroundColor: CUSTOMCOLOR.white,
    flexDirection: 'row',
    // padding: moderateScale(8),
  },
  radiogroup: {
    flexDirection: 'row',
    // padding: moderateScale(8),
    // gap: moderateScale(8),
  },
  reduxData: {
    flex: 1,
    marginVertical: moderateScale(8),
    marginHorizontal: moderateScale(8),
    borderWidth: 1,
    padding: moderateScale(8),
    borderColor: CUSTOMCOLOR.success,
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
  text: {
    padding: moderateScale(18),
    fontWeight: '600',
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  reduxText: {
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  content: {
    flexDirection: 'row',
    padding: moderateScale(8),
    flexWrap: 'wrap',
  },
});

export default Symptoms;
