import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SelectorBtn from '../components/selector';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {useSelector, useDispatch} from 'react-redux';
import {
  updatePrescribe1,
  addPrescribe,
} from '../redux/features/prescription/prescr';
import {CONSTANTS} from '../utility/constant';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import PrescriptionHead from '../components/prescriptionHead';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {HButton, InputText, PlusButton} from '../components';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import {ScrollView} from 'react-native-gesture-handler';
import {
  StoreAsyncData,
  RetriveAsyncData,
  UpdateAsyncData,
  clearStorage,
} from '../utility/AsyncStorage';
import CustomIcon from '../components/icon';
import ShowChip from '../components/showChip';

export default function Prescribe1({navigation}) {
  const [data, setData] = useState([]);
  const option = 'product';
  const modes = CONSTANTS.modes;
  const [medicine, setMedicine] = useState('');
  const [mode, setMode] = useState('');
  const [setmedicine, selectedMedicine] = useState(null);
  const [mgs, setmg] = useState('');
  const [setmgs, setSelectedMgs] = useState(false);
  const [dose_quantity, setDose_quantity] = useState('');
  const [timing, setTiming] = useState('');
  const [frequency, setFrequency] = useState([]);
  const [dose_number, setDose_number] = useState('1');
  const [generic, setGeneric] = useState('');
  const [setgeneric, setselectedGeneric] = useState(false);
  const [duration, setDuration] = useState('1');
  const recommdations = CONSTANTS.medicine_recomendation;
  const mg = CONSTANTS.dose;
  const ml = CONSTANTS.dose_ml;
  const timings = CONSTANTS.timing;
  const frequencys = CONSTANTS.frequency;
  const [total_quantity, setTotalQuantity] = useState();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [sug, setSug] = useState([]);
  // console.log('suggggggg',sug)
  // const prescribe = useState([
  //   {
  //     medicine: medicine,
  //     mode: mode,
  //     dose_quantity: dose_quantity,
  //     timing: timing,
  //     frequency: JSON.stringify(frequency),
  //     dose_number: dose_number,
  //     duration: duration,
  //     total_quantity: total_quantity,
  //   },
  // ])
  const prevPres = useSelector(state => state.pres.prescribeItems);

  const handleAddPrescribe = () => {
    if (sug?.length > 0) {
      const medicineName = `${setmedicine} ${mgs}`;
      UpdateAsyncData('prescribe', {medicine: medicineName, mode: mode});
    }
    dispatch(
      addPrescribe([
        ...prevPres,
        {
          medicine: medicine,
          mode: mode,
          dose_quantity: mgs,
          timing: timing,
          frequency: selectedDaysString,
          dose_number: dose_number,
          duration: duration,
          total_quantity: total_quantity,
        },
      ]),
    );
    setMedicine('');
    setMode('');
    setDose_number('1');
    setDose_quantity('');
    setTiming('');
    setFrequency([]);
    setDuration('1');
    setmg('');
  };

  const handleDelete = index => {
    if (prevPres) {
      const updatedPrescriptions = prevPres?.filter(
        (item, ind) => ind !== index,
      );

      dispatch(updatePrescribe1(updatedPrescriptions));
    }
  };
  const setMedicineValue = value => {
    setMedicine(value);
    selectedMedicine(value);
    setselectedGeneric(!setgeneric);
    setSelectedMgs(!setmgs);
  };
  console.log('===check', setgeneric);
  console.log('---->', newMedicine);

  const setMG = value => {
    setDose_quantity(value);
    setmg(value);
  };

  const setTime = value => {
    setTiming(value);
  };

  const FrequencySelection = index => {
    const isSelected = frequency.includes(index);

    if (isSelected) {
      setFrequency(frequency.filter(i => i !== index));
    } else {
      setFrequency([...frequency, index]);
    }
  };

  const getSelectedDaysString = () => {
    const selectedDays = [];

    for (let i = 0; i < CONSTANTS.frequency.length; i++) {
      if (frequency.includes(i)) {
        selectedDays.push('1');
      } else {
        selectedDays.push('0');
      }
    }

    return selectedDays.join('-');
  };
  const selectedDaysString = getSelectedDaysString();

  const totoal_quantity = () => {
    const quantity =
      parseInt(dose_number) * parseInt(duration) * parseInt(frequency.length);

    if (quantity !== 'NaN') {
      setTotalQuantity(quantity);
    } else {
      setTotalQuantity('00');
    }
  };

  useEffect(() => {
    totoal_quantity();
  }, [duration, dose_number, frequency]);

  const handleAlert = () => {
    if (prevPres.length > 0) {
      navigation.goBack();
    } else {
      Alert.alert('', 'Please give Atleast One Medication');
    }
  };

  const fetchMedicine = async () => {
    const response = await fetchApi(URL.snomed(mode, option), {
      method: 'GET',
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      // console.log('fetch data====>',jsonData)
      setData(jsonData);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchMedicine();
  }, [mode, option]);
  const [newMedicine, setnewMedicine] = useState([]);
  const [filtered, setFilteredData] = useState('');
  //  console.log('filter values=====>',filtered)
  useEffect(() => {
    if (medicine) {
      const filtered = data?.filter(
        item =>
          item?.term &&
          item?.term.toLowerCase().startsWith(medicine.toLowerCase()),
      );

      setFilteredData([...filtered, {term: medicine}]);
      // setnewMedicine([...filtered, {term: medicine}])
    } else {
      setFilteredData(data);
      // setnewMedicine(data);
    }
  }, [data, medicine]);

  useEffect(() => {
    if (
      medicine &&
      !data?.find(item => item.term.toLowerCase() === medicine.toLowerCase())
    ) {
      setnewMedicine([{term: medicine}]);
    } else {
      setnewMedicine(null);
    }
  }, [medicine, data]);

  const HandlePress = value => {
    setMedicine(value);
    selectedMedicine(value);
  };
  const handleBack = () => {
    if (sug?.length === 0 || !sug) {
      StoreAsyncData('prescribe', prevPres);
    }
  };
  useEffect(() => {
    RetriveAsyncData('prescribe').then(array => {
      const uniqueArray = array?.filter((item, index) => {
        return (
          index === array?.findIndex(obj => obj.medicine === item?.medicine)
        );
      });
      setSug(uniqueArray);
    });
  }, []);
  const [med_filter, setMed_filter] = useState([]);
  useEffect(() => {
    if (sug && mode) {
      const resultArray = sug?.filter(word => word?.mode === mode);
      setMed_filter(resultArray);
    }
  }, [mode]);
  console.log('suggg=>', sug);
  return (
    <View style={styles.main}>
      <PrescriptionHead
        heading={Language[language]['prescribe']}
        head={{padding: moderateScale(0)}}
      />
      <ScrollView style={styles.prescribeConatiner}>
        {prevPres?.map((item, ind) => (
          <ShowChip
          main={{marginHorizontal:0}}
            key={ind}
            text={`${item.mode} | ${item.medicine} | ${item.dose_quantity} | ${item.timing}|${item.frequency} | ${item.dose_number} | ${item.duration} | ${item.total_quantity}`}
            onPress={() => handleDelete(ind)}
          />
        ))}

        <View>
          <View>
            <Text style={styles.ModeText}>{Language[language]['mode']}</Text>
            <View style={styles.Modes}>
              {modes?.map(value => (
                <SelectorBtn
                  key={value}
                  onPress={() => setMode(value)}
                  input={value}
                  select={{
                    backgroundColor:
                      mode === value ? CUSTOMCOLOR.primary : CUSTOMCOLOR.white,
                    borderColor: CUSTOMCOLOR.borderColor,
                  }}
                  inputstyle={{
                    color:
                      mode === value ? CUSTOMCOLOR.white : CUSTOMCOLOR.primary,
                    fontSize: moderateScale(14),
                    fontWeight: '600',
                  }}
                />
              ))}
            </View>
          </View>
          <InputText
            lbltext={{fontSize: 14}}
            inputContainer={{paddingHorizontal: 0}}
            label={Language[language]['medicine']}
            placeholder="Enter Medicine"
            multiline={true}
            value={medicine}
            setValue={val => setMedicine(val)}
            search={true}
            IconName={
              (show && filtered.length > 0) ||
              medicine === setmedicine ||
              medicine.length === 0
                ? 'magnify'
                : 'close'
            }
            onPress={() => setShow(!show)}
          />
          {medicine.length >= 4 &&
            (medicine === setmedicine || show ? null : (
              <View style={styles.dropdownContainer}>
                <ScrollView persistentScrollbar={true}>
                  {filtered?.map((val, index) => (
                    <SelectorBtn
                      select={{
                        paddingHorizontal: horizontalScale(4),
                        paddingVertical: verticalScale(8),
                        borderWidth: 0,
                        backgroundColor: null,
                      }}
                      onPress={() => HandlePress(val?.term)}
                      key={index}
                      input={val?.term}></SelectorBtn>
                  ))}
                </ScrollView>
              </View>
            ))}
          {med_filter.length >= 1 ? (
            <Text style={styles.RecommdationText}>Recently Used</Text>
          ) : null}

          {med_filter?.length > 0 && (
            <View style={styles.Modes}>
              <ScrollView
                horizontal={true}
                persistentScrollbar={true}
                contentContainerStyle={{gap: moderateScale(12)}}>
                {med_filter?.map(value => (
                  <SelectorBtn
                    key={value}
                    onPress={() => setMedicineValue(value?.medicine)}
                    input={value?.medicine}
                    select={{
                      backgroundColor:
                        medicine === value?.medicine
                          ? CUSTOMCOLOR.primary
                          : CUSTOMCOLOR.white,
                    }}
                    inputstyle={{
                      color:
                        medicine === value?.medicine
                          ? CUSTOMCOLOR.white
                          : CUSTOMCOLOR.primary,
                      fontSize: moderateScale(14),
                      fontWeight: '600',
                    }}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {newMedicine != null && setgeneric === false ? (
            <View>
              <InputText
                lbltext={{fontSize: 14, color: CUSTOMCOLOR.black}}
                inputContainer={{paddingHorizontal: moderateScale(0)}}
                label="Generic Name"
                placeholder="Medicine generic name"
                value={generic}
                setValue={txt => setGeneric(txt)}
              />
            </View>
          ) : null}

          <View style={styles.ModeContainer}>
            <InputText
              // style={styles.durationInput}
              label={Language[language]['number']}
              inputContainer={{
                paddingHorizontal: moderateScale(0),
                paddingVertical: moderateScale(0),
                width: '24%',
              }}
              value={dose_number}
              setValue={value => setDose_number(value)}
            />
            {newMedicine != null && setgeneric === false ? (
              <>
                <InputText
                  label={Language[language]['dose']}
                  inputContainer={{paddingHorizontal: moderateScale(0)}}
                  value={mgs}
                  setValue={setmg}
                  placeholder={'Enter Dosage eg: 100mg,200mg 0r 10m1 ,20ml'}
                />
                <View style={styles.Modes}>
                  {mode === 'Injection' || mode === 'Syrup'
                    ? ml?.map((value, mgIndex) => (
                        <SelectorBtn
                          input={value}
                          key={mgIndex}
                          onPress={() => setMG(value)}
                          select={{
                            backgroundColor:
                              mgs === value
                                ? CUSTOMCOLOR.primary
                                : CUSTOMCOLOR.white,
                          }}
                          inputstyle={{
                            color:
                              mgs === value
                                ? CUSTOMCOLOR.white
                                : CUSTOMCOLOR.primary,
                            fontSize: moderateScale(14),
                            fontWeight: '600',
                          }}
                        />
                      ))
                    : mg?.map((value, mgIndex) => (
                        <SelectorBtn
                          input={value}
                          key={mgIndex}
                          onPress={() => setMG(value)}
                          select={{
                            backgroundColor:
                              mgs === value
                                ? CUSTOMCOLOR.primary
                                : CUSTOMCOLOR.white,
                          }}
                          inputstyle={{
                            color:
                              mgs === value
                                ? CUSTOMCOLOR.white
                                : CUSTOMCOLOR.primary,
                            fontSize: moderateScale(14),
                            fontWeight: '600',
                          }}
                        />
                      ))}
                </View>
              </>
            ) : null}
          </View>
          <View style={{top: moderateScale(8)}}>
            <Text style={[styles.ModeText, {paddingBottom: moderateScale(2)}]}>
              {Language[language]['timing']}
            </Text>
            <View style={styles.Modes}>
              {timings?.map((value, timeIndex) => (
                <SelectorBtn
                  input={value}
                  key={timeIndex}
                  onPress={() => setTime(value)}
                  select={{
                    backgroundColor:
                      timing === value
                        ? CUSTOMCOLOR.primary
                        : CUSTOMCOLOR.white,
                  }}
                  inputstyle={{
                    color:
                      timing === value
                        ? CUSTOMCOLOR.white
                        : CUSTOMCOLOR.primary,
                    fontSize: moderateScale(14),
                    fontWeight: '600',
                  }}></SelectorBtn>
              ))}
            </View>
          </View>
          <View style={styles.frequencys}>
            <Text style={[styles.ModeText, {paddingBottom: moderateScale(2)}]}>
              {Language[language]['frequency']}
            </Text>
            <View style={styles.Modes}>
              {frequencys?.map((value, frequencyIndex) => (
                <SelectorBtn
                  select={{
                    backgroundColor: frequency.includes(frequencyIndex)
                      ? CUSTOMCOLOR.primary
                      : CUSTOMCOLOR.white,
                  }}
                  inputstyle={{
                    color: frequency.includes(frequencyIndex)
                      ? CUSTOMCOLOR.white
                      : CUSTOMCOLOR.primary,
                    fontSize: moderateScale(14),
                    fontWeight: '600',
                  }}
                  input={value}
                  key={frequencyIndex}
                  onPress={() => {
                    FrequencySelection(frequencyIndex);
                  }}></SelectorBtn>
              ))}
            </View>
          </View>
          <View style={styles.ModeContainer}>
            {/* <Text style={styles.ModeText}>
                  {Language[language]['duration']}(inDays)
                </Text> */}

            <InputText
              // style={styles.durationInput}
              label={Language[language]['duration']}
              inputContainer={{
                paddingHorizontal: moderateScale(0),
                paddingVertical: moderateScale(0),
                width: '24%',
              }}
              value={duration}
              placeholder="Enter Days"
              setValue={value => setDuration(value)}
            />
          </View>
          {/* <View style={styles.ModeContainer}> */}
          <Text style={[styles.ModeText, {marginTop: moderateScale(3)}]}>
            {Language[language]['quantity']}
          </Text>
          <View style={styles.total_quantity}>
            {isNaN(total_quantity) ? (
              <Text style={styles.numText}>{'00'}</Text>
            ) : (
              <Text style={styles.numText}>{total_quantity}</Text>
            )}
          </View>
          {/* </View> */}
        </View>
        <HButton
          label={'Add'}
          icon="plus"
          size={moderateScale(32)}
          onPress={handleAddPrescribe}
          btnstyles={{alignSelf:'flex-end'}}
        />
      </ScrollView>
      {/* <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: moderateScale(20),
        }}> */}
        
      {/* </View> */}
      <HButton
        label={'Save'}
        btnstyles={{
          backgroundColor:
            prevPres?.length > 0 ? CUSTOMCOLOR.primary : CUSTOMCOLOR.disable,
          justifyContent: 'center',
          marginHorizontal: moderateScale(144),
          borderRadius: moderateScale(10),
        }}
        onPress={() => {
          if (prevPres?.length > 0) {
            handleAlert();
            handleBack();
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  prescribeConatiner: {
    gap: moderateScale(8),
    // paddingTop: moderateScale(16),
  },
  ModeContainer: {
    gap: moderateScale(8),
  },
  ModeText: {
    fontWeight: '400',
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h3,
    // top: moderateScale(6),
    color: CUSTOMCOLOR.black,
  },
  DoseText: {
    fontWeight: 400,
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h3,
    //fontWeight: '400',
    top: moderateScale(28),
    color: CUSTOMCOLOR.black,
  },
  ModesContainer: {
    gap: moderateScale(8),
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  Modes: {
    flexDirection: 'row',
    gap: moderateScale(16),
  },
  MedicineHead: {
    gap: moderateScale(10),
  },
  RecommdationText: {
    paddingHorizontal: horizontalScale(4),

    paddingVertical: verticalScale(8),
    fontWeight: 500,
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
  },
  reduxText: {
    flex: 1,
    marginBottom: moderateScale(6),
    padding: moderateScale(4),
    width: '100%',
    borderWidth: 1,
    borderColor: CUSTOMCOLOR.success,
    backgroundColor: CUSTOMCOLOR.white,
  },
  TextDose: {
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
    paddingTop: moderateScale(12),
  },
  TabInput: {
    gap: moderateScale(8),
    flexDirection: 'row',
    textAlign: 'center',
    top: moderateScale(24),
  },
  tab: {
    borderRadius: 4,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    backgroundColor: CUSTOMCOLOR.white,
  },
  frequency: {
    // width: moderateScale(635),
    gap: moderateScale(8),
  },
  DurationContainer: {
    // width: moderateScale(635),
    gap: moderateScale(8),
  },
  QuantityContainer: {
    gap: moderateScale(8),
  },
  numText: {
    padding: moderateScale(4),
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h2,
    color: CUSTOMCOLOR.primary,
    gap: moderateScale(10),
  },
  line: {
    margin: moderateScale(8),
    height: moderateScale(0.5),
    backgroundColor: 'blue',
  },
  PlusButton: {
    backgroundColor: CUSTOMCOLOR.primary,
    padding: moderateScale(16),
    borderRadius: moderateScale(32),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  main: {
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(12),
    flex: 1,
    // gap: moderateScale(24),
  },
  total_quantity: {
    marginTop: moderateScale(2),
    height: moderateScale(40),
    width: '25%',
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CUSTOMCOLOR.white,
  },
  frequencys: {
    // paddingLeft: moderateScale(8),
    top: moderateScale(8),
    paddingVertical: verticalScale(16),
  },
  dropdownContainer: {
    top:moderateScale(175),
    position:'absolute',
    zIndex:1,
    width:'100%',
    height: moderateScale(300),
    backgroundColor: CUSTOMCOLOR.white,
    paddingHorizontal: horizontalScale(8),
  },
});
