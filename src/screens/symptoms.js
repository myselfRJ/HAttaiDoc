import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import InputText from '../components/inputext';
import {ScrollView} from 'react-native-gesture-handler';
import CustomCalendar from '../components/calendar';

const Symptoms = ({navigation}) => {
  const symptomsData = useSelector(state => state.symptoms.symptom);
  console.log('symptommmm',symptomsData)
  const [symptom, setSymptom] = useState('');
  const [days, setDays] = useState('');
  const [selected, setSelected] = useState('');
  const [sevSelected,setSevSelected] = useState('')
  const option = 'finding';
  // const [selected, setSelected] = useState('');
  const [icon, setIcon] = useState('magnify');
  const [filtered, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

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
    setSevSelected(null)
  };

  const handleSymptomSubmit = () => {
    if (symptomsData.length > 0) {
      setDays(null);
      setSymptom(null);
      setSevSelected(null);
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

  const fetchSymptom = async () => {
    const response = await fetchApi(URL.snomed(symptom, option), {
      method: 'GET',
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setData(jsonData);
      // dispatch(addDoctor_profile.addDoctor_profile(jsonData?.data));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchSymptom();
  }, [symptom, option]);

  useEffect(() => {
    if (symptom) {
      const filtered = data?.filter(
        item =>
          item?.term &&
          item?.term.toLowerCase().startsWith(symptom.toLowerCase()),
      );
      setFilteredData([...filtered, {term: symptom}]);
    } else {
      setFilteredData(data);
    }
  }, [data, symptom]);
  const HandlePress = value => {
    setSymptom(value);
    setSelected(value);
    // dispatch(addDiagnosis([...prev, {diagnosis: value}]));

  };

  const [show, setShow] = useState(false);

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View>
          <PrescriptionHead heading={Language[language]['symptoms']} />
        </View>

        {/* {symptomsData?.map((item, ind) => (
          
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
        ))} */}

        <View>
          <View>
            <View style={styles.content}>
              {/* <View style={styles.symptomInput}>
                <Text style={styles.text}>
                  {Language[language]['symptom']}{' '}
                  {parseInt(symptomsData.length) + 1}:
                </Text>

                <TextInput
                  placeholder="Enter Symptom"
                  value={symptom}
                  onChangeText={text => setSymptom(text)}
                />
              </View> */}
              <View style={styles.input}>
          <InputText
            inputContainer={styles.inputtext}
            label="Symptoms"
            placeholder="Enter Symptoms"
            value={symptom}
            setValue={text => setSymptom(text)}
            search={true}
            IconName={
              (show && filtered.length > 0) ||
              symptom === selected ||
              symptom?.length === 0
                ? 'magnify'
                : 'close'
            }
            onPress={() => setShow(!show)}
          />
          {symptom?.length >= 4 &&
            (symptom === selected || show ? null : (
              <View style={styles.dropdownContainer}>
                <ScrollView persistentScrollbar={true}>
                  {filtered?.map((val, index) => (
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: horizontalScale(4),
                        paddingVertical: verticalScale(8),
                      }}
                      onPress={() => HandlePress(val?.term)}
                      key={index}>
                      <Text
                        style={{
                          fontSize: CUSTOMFONTSIZE.h3,
                          padding: moderateScale(10),
                          color: CUSTOMCOLOR.black,
                        }}>
                        {val?.term}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ))}
            

          {/* <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: moderateScale(32),
            }}>
            <HButton
              label={'Save'}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View> */}
          
        </View>
        <View style={styles.radiogroup}>
                <Text style={styles.text}>
                  {Language[language]['severity']}:
                </Text>
                <View style={{flexDirection: 'row',paddingLeft:moderateScale(12)}}>
                  <Option
                    label={Language[language]['low']}
                    value="low"
                    selected={sevSelected === 'low'}
                    onPress={() => setSevSelected('low')}
                  />
                  <Option
                    label={Language[language]['medium']}
                    value="medium"
                    selected={sevSelected === 'medium'}
                    onPress={() => setSevSelected('medium')}
                  />
                  <Option
                    label={Language[language]['high']}
                    value="high"
                    selected={sevSelected === 'high'}
                    onPress={() => setSevSelected('high')}
                  />
                </View>
              </View>
              
              <View style={styles.DateInput}>
                <Text style={styles.text}>Days or Hrs:</Text>
                <View style={{paddingLeft:moderateScale(8)}}>
                  <TextInput
                style={{paddingHorizontal:moderateScale(12),backgroundColor:CUSTOMCOLOR.white,borderRadius:moderateScale(4),paddingVertical:verticalScale(10)}}
                  placeholder="Enter Days or Hrs"
                  value={days}
                  onChangeText={text => setDays(text)}
                />
                </View>
              </View>
              
            </View>
          </View>
          {/* <View style={{marginTop: verticalScale(16)}}>
            <PlusButton
              icon="plus"
              size={moderateScale(24)}
              onPress={handleAddSymptoms}
            />
          </View> */}
          <View style={{alignSelf:'flex-end'}}>
            <HButton
            // icon='tick'
            btnstyles={{
              backgroundColor:
                (symptom && sevSelected && days)
                  ? CUSTOMCOLOR.primary
                  : CUSTOMCOLOR.disable,
            }}
              label='Done'
              onPress={handleAddSymptoms}
            />
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
    paddingHorizontal: verticalScale(16),
    paddingVertical: horizontalScale(16),
  },
  mainHead: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h1,
    fontWeight: 'bold',
    padding: moderateScale(10),
  },
  symptomInput: {
    backgroundColor: CUSTOMCOLOR.white,
    // flexDirection: 'row',
    // padding: moderateScale(8),
  },
  DateInput: {
    // backgroundColor: CUSTOMCOLOR.white,
    flexDirection: 'row',
    alignItems:'center',
    // padding: moderateScale(8),
  },
  radiogroup: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(0),
    alignItems:'center'
    // gap: moderateScale(8),
  },
  reduxData: {
    flex: 1,
    marginVertical: moderateScale(8),
    marginHorizontal: moderateScale(8),
    padding: moderateScale(8),
    top:moderateScale(32),
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
    paddingTop: moderateScale(64),
  },
  text: {
    // marginHorizontal: moderateScale(8),
    fontWeight: '600',
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
    
  },
  reduxText: {
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  content: {
    // flexDirection: 'row',
    paddingHorizontal: moderateScale(8),
    gap:moderateScale(16)
    // flexWrap: 'wrap',
  },
  dropdownContainer: {
    height: moderateScale(300),
    backgroundColor: CUSTOMCOLOR.white,
    marginHorizontal: horizontalScale(8),
  },
  inputtext: {
    // paddingVertical: verticalScale(0),
    paddingHorizontal:moderateScale(0)
  },
    input: {
      // paddingHorizontal:moderateScale(0),
      // paddingVertical:24,
      gap: moderateScale(0),
    },
});

export default Symptoms;
