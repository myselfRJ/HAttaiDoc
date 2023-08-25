import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
import {InputText} from '../components';

export default function Prescribe1() {
  const modes = CONSTANTS.modes;
  const [medicine, setMedicine] = useState('');
  const [mode, setMode] = useState('');
  const [setmedicine, selectedMedicine] = useState('');
  const [mgs, setmg] = useState('');
  const [dose_quantity, setDose_quantity] = useState('');
  const [timing, setTiming] = useState('');
  const [frequency, setFrequency] = useState([]);
  const [dose_number, setDose_number] = useState('');
  const [duration, setDuration] = useState('');
  const recommdations = CONSTANTS.medicine_recomendation;
  const mg = CONSTANTS.dose;
  const ml = CONSTANTS.dose_ml;
  const timings = CONSTANTS.timing;
  const frequencys = CONSTANTS.frequency;
  const [total_quantity, setTotalQuantity] = useState();
  const dispatch = useDispatch();
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
  // ]);
  const prevPres = useSelector(state => state.pres.prescribeItems);

  const handleAddPrescribe = () => {
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
    selectedMedicine('');
    setDose_number('');
    setDose_quantity('');
    setTiming('');
    setFrequency([]);
    setDuration('');
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
  };

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
    console.log('-----------quantiy', quantity);
  };

  useEffect(() => {
    totoal_quantity();
  }, [duration, dose_number, frequency]);

  return (
    <ScrollView>
      <View style={styles.main}>
        <PrescriptionHead heading={Language[language]['prescribe']} />
        {/* <Text style={styles.mainText}>{Language[language]['prescribe']}</Text> */}

        {prevPres?.map((item, ind) => (
          <View key={ind} style={styles.reduxText}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                width: '100%',
                // marginBottom: 5,
                //borderWidth:1,
              }}>
              <Icon
                name="prescription"
                size={moderateScale(16)}
                color={CUSTOMCOLOR.primary}
              />
              <View style={{width: '90%'}}>
                <Text
                  style={{
                    color: CUSTOMCOLOR.black,
                    fontFamily: CUSTOMFONTFAMILY.body,
                  }}>
                  {item.mode} | {item.medicine} | {item.dose_quantity} |{' '}
                  {item.timing}|{item.frequency} | {item.dose_number} |
                  {item.duration} | {item.total_quantity}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(ind)}>
                <Icon
                  name="delete"
                  size={moderateScale(24)}
                  color={CUSTOMCOLOR.delete}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.prescribeConatiner}>
          <View>
            <View>
              <View style={styles.ModeContainer}>
                <Text style={styles.ModeText}>
                  {Language[language]['mode']}
                </Text>
                <View style={styles.Modes}>
                  {modes?.map(value => (
                    <TouchableOpacity
                      key={value}
                      onPress={() => setMode(value)}>
                      <View
                        style={[
                          styles.ModesContainer,
                          {
                            backgroundColor:
                              mode === value
                                ? CUSTOMCOLOR.primary
                                : CUSTOMCOLOR.white,
                          },
                        ]}>
                        <Text
                          style={{
                            color:
                              mode === value
                                ? CUSTOMCOLOR.white
                                : CUSTOMCOLOR.primary,
                          }}>
                          {value}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.MedicineContainer}>
                <View style={styles.MedicineHead}>
                  <Text style={styles.ModeText}>
                    {Language[language]['medicine']}
                  </Text>
                  {/* <InputText /> */}
                  <TextInput
                    style={styles.MedicineInput}
                    placeholder="Enter Medicine"
                    multiline={true}
                    value={medicine}
                    onChangeText={val => setMedicine(val)}
                  />
                  <Text style={styles.RecommdationText}>
                    {Language[language]['reccomedations']}
                  </Text>
                  <View style={styles.Modes}>
                    {recommdations?.map(value => (
                      <TouchableOpacity
                        key={value}
                        onPress={() => setMedicineValue(value)}>
                        <View
                          style={[
                            styles.ModesContainer,
                            {
                              backgroundColor:
                                setmedicine === value
                                  ? CUSTOMCOLOR.primary
                                  : CUSTOMCOLOR.white,
                            },
                          ]}>
                          <Text
                            style={{
                              color:
                                setmedicine === value
                                  ? CUSTOMCOLOR.white
                                  : CUSTOMCOLOR.primary,
                            }}>
                            {value}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.ModeContainer}>
                <Text style={styles.DoseText}>
                  {Language[language]['dose']}
                </Text>
                <View style={styles.TabInput}>
                  <Text style={styles.TextDose}>
                    {Language[language]['number']}:
                  </Text>
                  <TextInput
                    style={styles.tab}
                    value={dose_number}
                    onChangeText={value => setDose_number(value)}
                  />
                </View>
                <InputText
                  value={mgs}
                  setValue={setmg}
                  placeholder={'Enter Dosage eg: 100mg,200mg'}
                />
                <View style={styles.Modes}>
                  {mode === 'Injection' || mode === 'Syrup'
                    ? ml?.map((value, mgIndex) => (
                        <TouchableOpacity
                          key={mgIndex}
                          onPress={() => setMG(value)}>
                          <View
                            style={[
                              styles.ModesContainer,
                              {
                                backgroundColor:
                                  dose_quantity === value
                                    ? CUSTOMCOLOR.primary
                                    : CUSTOMCOLOR.white,
                              },
                            ]}>
                            <Text
                              style={{
                                color:
                                  dose_quantity === value
                                    ? CUSTOMCOLOR.white
                                    : CUSTOMCOLOR.primary,
                              }}>
                              {value}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))
                    : mg?.map((value, mgIndex) => (
                        <TouchableOpacity
                          key={mgIndex}
                          onPress={() => setMG(value)}>
                          <View
                            style={[
                              styles.ModesContainer,
                              {
                                backgroundColor:
                                  dose_quantity === value
                                    ? CUSTOMCOLOR.primary
                                    : CUSTOMCOLOR.white,
                              },
                            ]}>
                            <Text
                              style={{
                                color:
                                  dose_quantity === value
                                    ? CUSTOMCOLOR.white
                                    : CUSTOMCOLOR.primary,
                              }}>
                              {value}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                </View>
              </View>
              <View
                style={{paddingLeft: moderateScale(8), top: moderateScale(8)}}>
                <Text style={styles.ModeText}>
                  {Language[language]['timing']}
                </Text>
                <View style={styles.Modes}>
                  {timings?.map((value, timeIndex) => (
                    <TouchableOpacity
                      key={timeIndex}
                      onPress={() => setTime(value)}>
                      <View
                        style={[
                          styles.ModesContainer,
                          {
                            backgroundColor:
                              timing === value
                                ? CUSTOMCOLOR.primary
                                : CUSTOMCOLOR.white,
                          },
                        ]}>
                        <Text
                          style={{
                            color:
                              timing === value
                                ? CUSTOMCOLOR.white
                                : CUSTOMCOLOR.primary,
                          }}>
                          {value}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.frequencys}>
                <Text style={styles.ModeText}>
                  {Language[language]['frequency']}
                </Text>
                <View style={styles.Modes}>
                  {frequencys?.map((value, frequencyIndex) => (
                    <TouchableOpacity
                      key={frequencyIndex}
                      onPress={() => {
                        FrequencySelection(frequencyIndex);
                      }}>
                      <View
                        style={[
                          styles.ModesContainer,
                          {
                            backgroundColor: frequency.includes(frequencyIndex)
                              ? CUSTOMCOLOR.primary
                              : CUSTOMCOLOR.white,
                          },
                        ]}>
                        <Text
                          style={{
                            color: frequency.includes(frequencyIndex)
                              ? CUSTOMCOLOR.white
                              : CUSTOMCOLOR.primary,
                          }}>
                          {value}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.ModeContainer}>
                <Text style={styles.ModeText}>
                  {Language[language]['duration']}(inDays)
                </Text>
                <TextInput
                  style={styles.durationInput}
                  value={duration}
                  placeholder="Enter Days"
                  onChangeText={value => setDuration(value)}
                />
              </View>
              <View style={styles.ModeContainer}>
                <Text style={styles.ModeText}>
                  {Language[language]['quantity']}
                </Text>
                <View style={styles.total_quantity}>
                  {isNaN(total_quantity) ? (
                    <Text style={styles.numText}>{'00'}</Text>
                  ) : (
                    <Text style={styles.numText}>{total_quantity}</Text>
                  )}
                </View>
              </View>
              <View style={styles.line}></View>
            </View>
          </View>
          <TouchableOpacity onPress={handleAddPrescribe}>
            <Icon
              name="plus"
              size={moderateScale(32)}
              style={styles.PlusButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  prescribeConatiner: {
    width: '100%',
    gap: moderateScale(4),
  },
  ModeContainer: {
    //width: 635,
    gap: moderateScale(8),
    paddingLeft: moderateScale(8),
    //top: 8,
  },
  ModeText: {
    fontWeight: 400,
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h3,
    //fontWeight: '400',
    top: moderateScale(8),
    color: CUSTOMCOLOR.black,
  },
  DoseText: {
    fontWeight: 400,
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h3,
    //fontWeight: '400',
    top: moderateScale(16),
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
    paddingHorizontal: horizontalScale(16),
    top: moderateScale(8),
  },
  MedicineContainer: {
    // width: moderateScale(635),
    gap: moderateScale(12),
    top: moderateScale(8),
  },
  MedicineHead: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(8),
    gap: moderateScale(10),
  },
  MedicineInput: {
    width: '100%',
    paddingVertical: verticalScale(8),
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: moderateScale(8),
  },
  RecommdationText: {
    paddingHorizontal: horizontalScale(4),

    paddingVertical: verticalScale(8),
    fontWeight: 500,
    fontSize: CUSTOMFONTSIZE.h3,
    lineHeight: moderateScale(16),
    color: CUSTOMCOLOR.black,
  },
  reduxText: {
    flex: 1,
    width: '100%',
    marginBottom: moderateScale(5),
    borderWidth: 1,
    padding: moderateScale(8),
    borderColor: CUSTOMCOLOR.success,
    backgroundColor: CUSTOMCOLOR.white,
  },
  Dose: {
    padding: moderateScale(8),
  },
  DoseContainer: {
    width: moderateScale(635),
    gap: moderateScale(8),
  },
  TextDose: {
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h4,
    lineHeight: moderateScale(13.62),
    color: CUSTOMCOLOR.black,
    paddingTop: moderateScale(12),
  },
  TabInput: {
    padding: moderateScale(8),
    gap: moderateScale(8),
    flexDirection: 'row',
    textAlign: 'center',
  },
  tab: {
    borderRadius: 4,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    backgroundColor: CUSTOMCOLOR.white,
  },
  frequency: {
    width: moderateScale(635),
    gap: moderateScale(8),
  },
  DurationContainer: {
    // width: moderateScale(635),
    gap: moderateScale(8),
  },
  durationInput: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(24),
    backgroundColor: CUSTOMCOLOR.white,
    width: '25%',
    borderRadius: moderateScale(8),
  },
  QuantityContainer: {
    width: '100%',
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
    width: '100%',
    backgroundColor: 'blue',
  },
  PlusButton: {
    backgroundColor: CUSTOMCOLOR.primary,
    padding: moderateScale(16),
    borderRadius: moderateScale(32),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  search: {
    position: 'absolute',
    color: CUSTOMCOLOR.primary,
    padding: moderateScale(40),
    paddingLeft: moderateScale(560),
  },
  main: {padding: moderateScale(24), gap: moderateScale(24)},
  total_quantity: {
    height: moderateScale(40),
    width: '25%',
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CUSTOMCOLOR.white,
  },
  frequencys: {
    paddingLeft: moderateScale(8),
    top: moderateScale(8),
    paddingVertical: verticalScale(16),
  },
});
