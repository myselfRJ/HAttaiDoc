
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
import {addSymptom} from '../redux/features/prescription/symptomslice';
import {CUSTOMCOLOR, CUSTOMFONTSIZE,CUSTOMFONTFAMILY} from '../settings/styles';
import PrescriptionHead from '../components/prescriptionHead';

const Symptoms = ({navigation}) => {
  const symptomsData = useSelector(state => state.symptoms.symptom);

  const dispatch = useDispatch();
  const [symptomInput, setSymptomInput] = useState(symptomsData);
  console.log(symptomInput, '=====', symptomsData);

  useEffect(() => {
    console.log(symptomInput.length);
  }, [symptomInput.length, symptomsData.length]);
  const handleAddSymptoms = () => {
    const uuid = Math.random() + 'tt';
    let symptomCopy = symptomInput;
    dispatch(addSymptom(symptomCopy));
    setSymptomInput(state => [...state, {symptom: '', days: '', severity: ''}]);

    console.log(uuid);
  };

  const handleSymptomSubmit = () => {
    let symptomCopy = symptomInput;
    dispatch(addSymptom(symptomCopy));
    navigation.goBack();
  };

  const handleDeleteSymptom = () => {
    let symptomCopy = [...symptomInput];
    console.log(symptomCopy);
    symptomCopy.pop();
    dispatch(addSymptom(symptomCopy));
    setSymptomInput(symptomCopy);
  };

  const handleSymptomChange = (text, index, field) => {
    setSymptomInput(prevState => {
      const symptomCopy = [...prevState];
      symptomCopy[index][field] = text;
      return symptomCopy;
    });
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={{margin: 10}}>
          <PrescriptionHead heading={Language[language]['symptoms']}/>
        </View>
        <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
          <View style={{flexDirection: 'column'}}>
            {symptomInput?.map((data, index) => (
              <View
                key={index}
                style={{flexDirection: 'row', padding: 10, flexWrap: 'wrap'}}>
                <View style={styles.symptomInput}>
                  <Text
                    style={{
                      padding: 10,
                      fontWeight: 'bold',
                      color: CUSTOMCOLOR.black,
                      fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight:600,
                    }}>
                    {Language[language]['symptoms']}:
                  </Text>
                  <View
                    style={{
                      height: 40,
                      width: 100,
                      textAlignVertical: 'top',
                      
                    }}>
                    <TextInput
                      placeholder="Enter Symptom"
                      value={data?.symptom}
                      onChangeText={text =>
                        handleSymptomChange(text, index, 'symptom')
                      }
                    />
                  </View>
                </View>
                <View style={styles.DateInput}>
                  <Text
                    style={{
                      padding: 10,
                      fontWeight: 'bold',
                      color: CUSTOMCOLOR.black,
                      fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight:600,
                    }}>
                    {Language[language]['days']}:
                  </Text>
                  <View
                    style={{
                      height: 40,
                      width: 100,
                      textAlignVertical: 'top',
                    }}>
                    <TextInput
                      placeholder="Enter Days"
                      value={data?.days}
                      onChangeText={text =>
                        handleSymptomChange(text, index, 'days')
                      }
                    />
                  </View>
                </View>
                <View style={styles.radiogroup}>
                  <Text style={{padding: 10, fontWeight: 'bold',fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight:600,color:CUSTOMCOLOR.black}}>
                    {Language[language]['severity']}:
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Option
                      label={Language[language]['low']}
                      value="low"
                      selected={data?.severity === 'low'}
                      onPress={() =>
                        handleSymptomChange('low', index, 'severity')
                      }
                    />
                    <Option
                      label={Language[language]['medium']}
                      value="medium"
                      selected={data?.severity === 'medium'}
                      onPress={() =>
                        handleSymptomChange('medium', index, 'severity')
                      }
                    />
                    <Option
                      label={Language[language]['high']}
                      value="high"
                      selected={data?.severity === 'high'}
                      onPress={() =>
                        handleSymptomChange('high', index, 'severity')
                      }
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View>
            <TouchableOpacity onPress={handleAddSymptoms}>
              <Icon name="plus" style={[styles.PlusText, styles.PlusButton]} />
            </TouchableOpacity>
            {symptomInput.length > 1 && (
              <TouchableOpacity
                onPress={() => handleDeleteSymptom(symptomInput.length)}>
                <Icon
                  name="minus"
                  style={[styles.PlusText, styles.PlusButton]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  mainHead: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h1,
    fontWeight: 'bold',
    padding: 10,
  },
  symptomInput: {
    backgroundColor: CUSTOMCOLOR.white,
    flexDirection: 'row',
    padding: 8,
  },
  DateInput: {
    backgroundColor: CUSTOMCOLOR.white,
    flexDirection: 'row',
    padding: 8,
  },
  radiogroup: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
  },
  PlusText: {
    fontSize: 40,
    color: CUSTOMCOLOR.white,
  },
  PlusButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    backgroundColor: CUSTOMCOLOR.primary,
    borderColor: CUSTOMCOLOR.white,
    borderWidth: 2,
    borderRadius: 100,
    padding: 4,
  },
  line: {
    margin: 8,
    height: 0.5,
    width: '100%',
    backgroundColor: 'blue',
  },
});

export default Symptoms;
