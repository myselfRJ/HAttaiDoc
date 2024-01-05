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
import {
  StoreAsyncData,
  UpdateAsyncData,
  RetriveAsyncData,
} from '../utility/AsyncStorage';
import {pastHistoryReducer} from '../redux/features/prescription/pastHistory';
import CustomCalendar from '../components/calendar';
import {mode} from '../redux/features/prescription/prescribeslice';
import Seperator from '../components/seperator';
import {commonstyles} from '../styles/commonstyle';
import {capitalizeWord} from '../utility/const';

const Symptoms = ({navigation}) => {
  const {phone} = useSelector(state => state?.phone?.data);
  const symptomsData = useSelector(state => state.symptoms.symptom);
  const [symptom, setSymptom] = useState('');
  const [days, setDays] = useState('');
  const [hr, setHr] = useState('');
  const [selected, setSelected] = useState('');
  const [sevSelected, setSevSelected] = useState('');
  const option = 'finding++disorder';
  // const [selected, setSelected] = useState('');
  const [months, setmonths] = useState('');
  const [icon, setIcon] = useState('magnify');
  const [filtered, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [sug, setSug] = useState([]);
  const [years, setYears] = useState('');
  const dispatch = useDispatch();

  const handleAddSymptoms = () => {
    if (symptom && (days || hr || months || years)) {
      dispatch(
        addSymptom([
          ...symptomsData,
          {
            symptom: symptom,
            // days: days ? days : hr,
            days:
              days && hr && months && years
                ? `${years} ${
                    parseInt(years) > 1 ? 'years' : 'year'
                  } & ${months} ${
                    parseInt(months) > 1 ? 'months' : 'month'
                  } & ${days} ${parseInt(days) > 1 ? 'days' : 'day'} & ${hr} hr`
                : days && !hr && !months && !years
                ? `${days} ${parseInt(days) > 1 ? 'days' : 'day'}`
                : !days && hr && !months && !years
                ? `${hr} hr`
                : !days && !hr && !months && years
                ? `${years} ${parseInt(years) > 1 ? 'years' : 'year'}`
                : `${months} ${parseInt(months) > 1 ? 'months' : 'month'}`,
            severity: sevSelected,
          },
        ]),
      );
    } else {
      Alert.alert('Warning', 'Enter all Fields');
    }
    setDays('');
    setSymptom('');
    setSevSelected('');
    setHr('');
    setSelected('');
    setmonths('');
    setYears('');
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
    const response = await fetchApi(
      URL.snomed(symptom ? symptom : 'NA', option),
      {
        method: 'GET',
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      const jsonData = await response.json();
      const snomed_data = jsonData?.map(item => ({term: item}));
      setData([...snomed_data, {term: symptom}]);
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
          item?.term.toLowerCase().includes(symptom.toLowerCase()),
      );
      setFilteredData([...filtered, {term: symptom}]);
    } else {
      setFilteredData(data);
    }
  }, [data, symptom]);
  const HandlePress = value => {
    setSymptom(value);
    setSelected(value);
    // dispatch(addSymptom([...symptomsData, {symptom: value}]));
    if (sug?.length > 0) {
      UpdateAsyncData(`symptom${phone}`, {symptom: value});
    }
  };

  const [show, setShow] = useState(false);

  const handledata = () => {
    if (sug?.length === 0 || !sug) {
      StoreAsyncData(`symptom${phone}`, symptomsData);
    }
    navigation.goBack();
  };
  const selectChange = value => {
    setSelected(value);
    setSymptom(value);
    // dispatch(addSymptom([...symptomsData, {symptom: value}]));
    if (sug?.length > 0) {
      UpdateAsyncData(`symptom${phone}`, {symptom: value});
    }
  };
  useEffect(() => {
    RetriveAsyncData(`symptom${phone}`).then(array => {
      const uniqueArray = array?.filter((item, index) => {
        return index === array?.findIndex(obj => obj.symptom === item?.symptom);
      });
      if (uniqueArray?.length > 10) {
        uniqueArray?.splice(10);
        setSug(uniqueArray);
      } else {
        setSug(uniqueArray);
      }
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <PrescriptionHead heading={Language[language]['symptoms']} />
      <ScrollView
        contentContainerStyle={{
          zIndex: 1,
          paddingBottom: verticalScale(120),
        }}>
        <View style={styles.content}>
          <View style={styles.input}>
            <InputText
              inputContainer={styles.inputtext}
              label="Search"
              placeholder="Write first four letters..."
              value={symptom}
              setValue={setSymptom}
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
            {symptom?.length > 1 &&
              (symptom === selected || show ? null : (
                <View style={styles.dropdownContainer}>
                  <ScrollView persistentScrollbar={true}>
                    {filtered?.map((val, index) => (
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: horizontalScale(4),
                          paddingVertical: verticalScale(-1),
                        }}
                        onPress={() => HandlePress(val?.term)}
                        key={index}>
                        <Text
                          style={{
                            fontSize: CUSTOMFONTSIZE.h3,
                            padding: moderateScale(6),
                            color: CUSTOMCOLOR.black,
                          }}>
                          {val?.term}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              ))}

            <View style={styles.subvalues}>
              {sug?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectChange(item?.symptom)}
                  style={[
                    styles.recomend,
                    {
                      backgroundColor:
                        item?.symptom === selected
                          ? CUSTOMCOLOR.primary
                          : CUSTOMCOLOR.recent,
                    },
                  ]}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color:
                        item?.symptom === selected
                          ? CUSTOMCOLOR.white
                          : CUSTOMCOLOR.primary,
                    }}>
                    {item?.symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{...styles.input, zIndex: 1}}>
            <View style={{gap: moderateScale(10)}}>
              <Text style={commonstyles.subhead}>
                {Language[language]['severity']}:
              </Text>
              <Seperator />
            </View>
            <View style={styles.subvalues}>
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

          <View style={{...styles.input, zIndex: 1}}>
            <View style={{gap: moderateScale(10)}}>
              <Text style={commonstyles.subhead}>Time Period</Text>
              <Seperator />
            </View>
            <View style={styles.subvalues}>
              <View style={styles.timeFields}>
                <Text style={styles.option}>Day :</Text>
                <TextInput
                  placeholderTextColor={CUSTOMCOLOR.disable}
                  style={styles.timeinput}
                  placeholder="Enter Days"
                  value={days}
                  onChangeText={text => setDays(text)}
                  keyboardType="numeric"
                />
              </View>
              {/* <Text
                style={{
                  color: CUSTOMCOLOR.black,
                  fontWeight: '400',
                  fontSize: CUSTOMFONTSIZE.h3,
                }}>
                (OR)
              </Text> */}
              <View style={styles.timeFields}>
                <Text style={styles.option}>Hr :</Text>
                <TextInput
                  placeholderTextColor={CUSTOMCOLOR.disable}
                  style={styles.timeinput}
                  placeholder="Enter Hr"
                  value={hr}
                  onChangeText={text => setHr(text)}
                  keyboardType="numeric"
                />
              </View>
              {/* <Text
                style={{
                  color: CUSTOMCOLOR.black,
                  fontWeight: '400',
                  fontSize: CUSTOMFONTSIZE.h3,
                }}>
                (OR)
              </Text> */}
              <View style={styles.timeFields}>
                <Text style={styles.option}>Month :</Text>
                <TextInput
                  placeholderTextColor={CUSTOMCOLOR.disable}
                  style={styles.timeinput}
                  placeholder="Enter Months"
                  value={months}
                  onChangeText={text => setmonths(text)}
                  keyboardType="numeric"
                />
              </View>
              {/* <Text
                style={{
                  color: CUSTOMCOLOR.black,
                  fontWeight: '400',
                  fontSize: CUSTOMFONTSIZE.h3,
                }}>
                (OR)
              </Text> */}
              <View style={styles.timeFields}>
                <Text style={styles.option}>Year :</Text>
                <TextInput
                  placeholderTextColor={CUSTOMCOLOR.disable}
                  style={styles.timeinput}
                  placeholder="Enter Years"
                  value={years}
                  onChangeText={text => setYears(text)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          <HButton
            icon="plus"
            type="addtype"
            btnstyles={{
              backgroundColor:
                symptom && (days || hr || months || years)
                  ? CUSTOMCOLOR.success
                  : CUSTOMCOLOR.disable,
              alignSelf: 'flex-end',
            }}
            label="Add"
            onPress={handleAddSymptoms}
          />

          {symptomsData?.map((item, ind) => (
            <View key={ind} style={styles.reduxData}>
              <View style={styles.reduxData1}>
                <Text style={styles.symText}>
                  <Text style={{fontWeight: '600'}}>Symptom :</Text>{' '}
                  {item.symptom}
                </Text>
                <View>
                  <Text style={styles.reduxText}>
                    <Text style={{fontWeight: '600'}}>Severity :</Text>{' '}
                    {capitalizeWord(item.severity)}
                  </Text>
                </View>
                {/* {item.days &&
                (item.days.includes('days') || item.days.includes('day')) ? ( */}
                <View>
                  <Text style={styles.reduxText}>
                    <Text style={{fontWeight: '600'}}>Time Period:</Text>{' '}
                    {item.days}
                  </Text>
                </View>
                {/* ) : null} */}
                {/* {item.days && item.days.includes('hr') ? (
                  <View>
                    <Text style={styles.reduxText}>
                      Time Period: {item.days}
                    </Text>
                  </View>
                ) : null} */}
                <View style={{flexDirection: 'row', gap: moderateScale(4)}}>
                  {/* <TouchableOpacity
                    style={{
                      borderRadius: moderateScale(32),
                      backgroundColor: CUSTOMCOLOR.white,
                      padding: moderateScale(4),
                    }}>
                    <Icon
                      name="pencil"
                      size={moderateScale(20)}
                      color={CUSTOMCOLOR.primary}
                    />
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => handleDeleteSymptom(ind)}
                    style={{
                      borderRadius: moderateScale(24),
                      backgroundColor: CUSTOMCOLOR.white,
                      padding: moderateScale(4),
                    }}>
                    <Icon
                      name="close"
                      size={moderateScale(20)}
                      color={CUSTOMCOLOR.delete}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <HButton
        btnstyles={{
          ...commonstyles.activebtn,
          backgroundColor:
            symptomsData.length > 0 ? CUSTOMCOLOR.primary : CUSTOMCOLOR.disable,

          // bottom:moderateScale(12)
        }}
        label={'Save'}
        onPress={() => {
          handledata();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),

    paddingVertical: verticalScale(12),
    backgroundColor: CUSTOMCOLOR.background,
  },
  subvalues: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(8),
    padding: moderateScale(8),
    alignItems: 'center',
  },
  timeFields: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  timeinput: {
    paddingHorizontal: moderateScale(12),
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: moderateScale(4),
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
    paddingVertical: verticalScale(10),
    color: CUSTOMCOLOR.black,
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
    padding: moderateScale(8),
    paddingHorizontal: horizontalScale(0),
  },
  radiogroup: {
    gap: moderateScale(8),
  },
  reduxData: {
    // flex: 1,
    // marginVertical: moderateScale(4),
    // paddingHorizontal: moderateScale(8),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    borderColor: CUSTOMCOLOR.success,
    backgroundColor: '#EAF3FC',
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
    borderRadius: moderateScale(4),
    top: moderateScale(24),
  },
  reduxData1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    // marginHorizontal: moderateScale(8),
    fontWeight: 'bold',
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
    fontSize: CUSTOMFONTSIZE.h2,
  },
  reduxText: {
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  content: {
    // paddingHorizontal: horizontalScale(16),
    gap: moderateScale(16),
    zIndex: 2,
    // position:'absolute'
  },
  dropdownContainer: {
    top: moderateScale(70),
    position: 'absolute',
    zIndex: 4,
    width: '100%',
    height: moderateScale(220),
    backgroundColor: CUSTOMCOLOR.white,
    // paddingHorizontal: horizontalScale(8),
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
    borderRadius: moderateScale(4),
  },
  inputtext: {
    // paddingVertical: verticalScale(0),
    paddingHorizontal: moderateScale(0),
  },
  input: {
    // borderWidth: 1,
    gap: moderateScale(0),
    zIndex: 3,
  },
  recomend: {
    padding: moderateScale(12),
    borderRadius: moderateScale(4),
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
  },
  option: {
    color: CUSTOMCOLOR.black,
    fontWeight: '400',
    fontSize: CUSTOMFONTSIZE.h3,
  },
  symText: {
    fontWeight: '500',
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.primary,
    width: moderateScale(200),
  },
});

export default Symptoms;
