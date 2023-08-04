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
  addPrescribe,
  updatePrescribe,
  deletePrescribe,
  setMode,
  setMedicine,
  setSelectedMedicine,
  setSelectedMg,
  setSelectedTime,
  toggleFrequency,
  setTab,
  setDuration,
} from '../redux/features/prescription/prescribeslice';
import {CONSTANTS} from '../utility/constant';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';

export default function Prescribe() {
  // const prescribe = useSelector(state => state.prescribe.prescribeItems[0]);

  const modes = CONSTANTS.modes;
  const [medicne, setMedicine] = useState('');
  const [mode, setMode] = useState('');
  const [setmedicine, selectedMedicine] = useState('');
  const [dose_quantity, setDose_quantity] = useState('');
  const [timing, setTiming] = useState('');
  const [frequenct, setFrequency] = useState('');
  const [dose_number, setDose_number] = useState('');
  const [duration, setDuration] = useState('');
  const recommdations = CONSTANTS.medicine_recomendation;
  const mg = CONSTANTS.dose;
  const timings = CONSTANTS.timing;
  const frequencys = CONSTANTS.frequency;
  const total_quantity = '100';
  const dispatch = useDispatch();
  const [prescribeInput, setPrescribeInput] = useState([prescribe]);
  const [prescribeList, setPrescribeList] = useState([]);

  useEffect(() => {
    console.log(prescribeInput.length);
  }, [prescribeInput]);

  const handleAddPrescribe = () => {
    const newPrescribe = {...prescribeInput[0]};
    setPrescribeList(prevState => [...prevState, newPrescribe]);
    dispatch(addPrescribe([...prescribeList, newPrescribe]));
  };

  const handlePrescribeChange = (text, index, field) => {
    setPrescribeInput(prevState => {
      const prescribeCopy = [...prevState];
      prescribeCopy[index][field] = text;
      return prescribeCopy;
    });
    dispatch(updatePrescribe({index, field, value: text}));
  };

  const handleDelete = index => {
    const updatedPrescribe = prescribeList?.filter(
      (item, ind) => ind !== index,
    );
    console.log(updatedPrescribe);
    setPrescribeList(updatedPrescribe);
  };

  const setSelectMode = (index, value) => {
    handlePrescribeChange(value, index, 'mode');
  };

  const setMedicineValue = (index, value) => {
    handlePrescribeChange(value, index, 'selectedMedicine');
    handlePrescribeChange(value, index, 'medicine');
  };

  const setMG = (index, value) => {
    handlePrescribeChange(value, index, 'dose_quantity');
  };

  const setTime = (index, value) => {
    handlePrescribeChange(value, index, 'timing');
  };

  const toggleFrequencyValue = (index, value) => {
    const frequency = prescribeInput[index].frequency;
    console.log('frequency', frequency);
    const updatedFrequency = frequency.includes(value)
      ? frequency.filter(item => item !== value)
      : JSON.stringify([...frequency, value]);
    handlePrescribeChange(updatedFrequency, index, 'frequency');
    console.log('upadtefrequency', updatedFrequency);
    // if (frequency === 'null') {
    //   const updatedFrequency = [value];
    //   handlePrescribeChange(updatedFrequency, index, 'frequency');
    //   console.log('=============', updatedFrequency);
    // } else {
    //   const updatedFrequency = frequency.includes(value)
    //     ? frequency.filter(item => item !== value)
    //     : [...frequency, value];
    //   handlePrescribeChange(updatedFrequency, index, 'frequency');
    //   console.log('update', JSON.stringify(updatedFrequency));
    // }
  };

  return (
    <ScrollView>
      <View style={{padding: 24, gap: 24}}>
        <View style={styles.mainHead}>
          <Text style={styles.mainText}>{Language[language]['prescribe']}</Text>
        </View>
        <View>
          {prescribeList?.map((item, ind) => (
            <View
              key={ind}
              style={{
                flexDirection: 'row',
                flex: 1,
                width: '100%',
                marginBottom: 5,
              }}>
              <Icon name="prescription" size={16} color={CUSTOMCOLOR.primary} />
              <View style={{width: '90%'}}>
                <Text style={{color: CUSTOMCOLOR.black}}>
                  {item.mode}|{item.medicine}|{item.dose_quantity}|{item.timing}
                  |{item.frequency}|{item.dose_number}|{item.total_quantity}|
                  {item.duration}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(ind)}>
                <Icon name="delete" size={24} color={CUSTOMCOLOR.primary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.prescribeConatiner}>
          {prescribeInput?.map((item, index) => (
            <View key={index}>
              <View key={item.uuid} style={styles.prescribeItemContainer}>
                <View style={styles.ModeContainer}>
                  <Text style={styles.ModeText}>
                    {Language[language]['mode']}
                  </Text>
                  <View style={styles.Modes}>
                    {item?.modes?.map(value => (
                      <TouchableOpacity
                        key={value}
                        onPress={() => setSelectMode(index, value)}>
                        <View
                          style={[
                            styles.ModesContainer,
                            {
                              backgroundColor:
                                item.mode === value ? '#4ba5fa' : '#fff',
                            },
                          ]}>
                          <Text
                            style={{
                              color: item.mode === value ? '#fff' : '#4ba5fa',
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
                    <TextInput
                      style={styles.MedicineInput}
                      placeholder="Enter Medicine"
                      multiline={true}
                      value={item.medicine}
                      onChangeText={val =>
                        handlePrescribeChange(val, index, 'medicine')
                      }
                    />
                    <Text style={styles.RecommdationText}>
                      {Language[language]['reccomedations']}
                    </Text>
                    <View style={styles.Modes}>
                      {item?.recommdations?.map(value => (
                        <TouchableOpacity
                          key={value}
                          onPress={() => setMedicineValue(index, value)}>
                          <View
                            style={[
                              styles.ModesContainer,
                              {
                                backgroundColor:
                                  item.selectedMedicine === value
                                    ? '#4ba5fa'
                                    : '#fff',
                              },
                            ]}>
                            <Text
                              style={{
                                color:
                                  item.selectedMedicine === value
                                    ? '#fff'
                                    : '#4ba5fa',
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
                  <Text style={styles.ModeText}>
                    {Language[language]['dose']}
                  </Text>
                  <View style={styles.TabInput}>
                    <Text style={styles.TextDose}>
                      {Language[language]['number']}:
                    </Text>
                    <TextInput
                      style={styles.tab}
                      value={item.tab}
                      onChangeText={value =>
                        handlePrescribeChange(value, index, 'dose_number')
                      }
                    />
                  </View>
                  <View style={styles.Modes}>
                    {item?.mg?.map((value, mgIndex) => (
                      <TouchableOpacity
                        key={mgIndex}
                        onPress={() => setMG(index, value)}>
                        <View
                          style={[
                            styles.ModesContainer,
                            {
                              backgroundColor:
                                item.dose_quantity === value
                                  ? CUSTOMCOLOR.primary
                                  : CUSTOMCOLOR.white,
                            },
                          ]}>
                          <Text
                            style={{
                              color:
                                item.dose_quantity === value
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
                <View style={{padding: 16, top: 8}}>
                  <Text style={styles.ModeText}>
                    {Language[language]['timing']}
                  </Text>
                  <View style={styles.Modes}>
                    {item?.timings?.map((value, timeIndex) => (
                      <TouchableOpacity
                        key={timeIndex}
                        onPress={() => setTime(index, value)}>
                        <View
                          style={[
                            styles.ModesContainer,
                            {
                              backgroundColor:
                                item.timing === value
                                  ? CUSTOMCOLOR.primary
                                  : CUSTOMCOLOR.white,
                            },
                          ]}>
                          <Text
                            style={{
                              color:
                                item.timing === value
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
                <View style={{padding: 16, top: 8}}>
                  <Text style={styles.ModeText}>
                    {Language[language]['frequency']}
                  </Text>
                  <View style={styles.Modes}>
                    {item?.frequencys?.map((value, frequencyIndex) => (
                      <TouchableOpacity
                        key={frequencyIndex}
                        onPress={() => toggleFrequencyValue(index, value)}>
                        <View
                          style={[
                            styles.ModesContainer,
                            {
                              backgroundColor: item.frequency.includes(value)
                                ? CUSTOMCOLOR.primary
                                : CUSTOMCOLOR.white,
                            },
                          ]}>
                          <Text
                            style={{
                              color: item.frequency.includes(value)
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
                    {Language[language]['duration']}
                  </Text>
                  <TextInput
                    style={styles.durationInput}
                    value={item.duration}
                    placeholder="Enter Duration"
                    onChangeText={value =>
                      handlePrescribeChange(value, index, 'duration')
                    }
                  />
                </View>
                <View style={styles.ModeContainer}>
                  <Text style={styles.ModeText}>
                    {Language[language]['quantity']}
                  </Text>
                  <View
                    style={{
                      height: 40,
                      width: '25%',
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: CUSTOMCOLOR.white,
                    }}>
                    <Text style={styles.numText}>{item.total_quantity}</Text>
                  </View>
                </View>
                <View style={styles.line}></View>
              </View>
            </View>
          ))}
          <TouchableOpacity onPress={handleAddPrescribe}>
            <Icon name="plus" size={32} style={styles.PlusButton} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainHead: {
    width: 651,
    justifyContent: 'space-between',
    padding: 8,
  },
  mainText: {
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 19,
    color: CUSTOMCOLOR.black,
  },
  prescribeConatiner: {
    width: '100%',
    gap: 4,
  },
  ModeContainer: {
    width: 635,
    gap: 8,
    paddingLeft: 16,
    top: 8,
  },
  ModeText: {
    fontWeight: 400,
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '400',
    lineHeight: 19.07,
    top: 8,
    color: CUSTOMCOLOR.black,
  },
  ModesContainer: {
    gap: 8,
    padding: 12,
    borderRadius: 8,
  },
  Modes: {
    flexDirection: 'row',
    gap: 16,
    paddingLeft: 8,
    paddingRight: 8,
    top: 8,
  },
  MedicineContainer: {
    width: 635,
    gap: 12,
    top: 8,
  },
  MedicineHead: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    gap: 10,
  },
  MedicineInput: {
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: 8,
  },
  RecommdationText: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: 600,
    fontSize: CUSTOMFONTSIZE.h4,
    lineHeight: 16,
    color: CUSTOMCOLOR.black,
  },
  Dose: {
    padding: 8,
  },
  DoseContainer: {
    width: 635,
    gap: 8,
  },
  TextDose: {
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h4,
    lineHeight: 13.62,
    color: CUSTOMCOLOR.black,
    paddingTop: 12,
  },
  TabInput: {
    padding: 8,
    gap: 8,
    flexDirection: 'row',
    textAlign: 'center',
  },
  tab: {
    borderRadius: 4,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: CUSTOMCOLOR.white,
  },
  frequency: {
    width: 635,
    gap: 8,
  },
  DurationContainer: {
    width: 635,
    gap: 8,
  },
  durationInput: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: CUSTOMCOLOR.white,
    width: '25%',
    borderRadius: 8,
  },
  QuantityContainer: {
    width: '100%',
    gap: 8,
  },
  numText: {
    padding: 8,
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 13,
    color: CUSTOMCOLOR.primary,
    gap: 10,
  },
  line: {
    margin: 8,
    height: 0.5,
    width: '100%',
    backgroundColor: 'blue',
  },
  PlusButton: {
    backgroundColor: CUSTOMCOLOR.primary,
    padding: 16,
    borderRadius: 32,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  search: {
    position: 'absolute',
    color: CUSTOMCOLOR.primary,
    padding: 40,
    paddingLeft: 560,
  },
});
