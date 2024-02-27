import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import SelectorBtn from '../components/selector';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {useSelector, useDispatch} from 'react-redux';
import {
  updatePrescribe1,
  addPrescribe,
  updateIndexPrescribe,
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
import {HButton, InputText, Option, PlusButton} from '../components';
import {Host, URL, fileurl} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import {ScrollView} from 'react-native-gesture-handler';
import {
  StoreAsyncData,
  RetriveAsyncData,
  UpdateAsyncData,
  clearStorage,
  RemoveKeyFromAsync,
} from '../utility/AsyncStorage';
import CustomIcon from '../components/icon';
import ShowChip from '../components/showChip';
import {commonstyles} from '../styles/commonstyle';
import CustomModal from '../components/CustomModal';
import {capitalizeWord, showToast} from '../utility/const';
import {SliderComponent} from '../components/slider';

export default function NewPrescribe({navigation}) {
  const appointmentID = useSelector(state => state?.address?.appointment_id);
  const {phone} = useSelector(state => state?.phone?.data);
  const [data, setData] = useState([]);
  const token = useSelector(state => state.authenticate.auth.access);
  const option = 'real clinical drug++clinical drug';
  const modes = CONSTANTS.modes;
  const [medicine, setMedicine] = useState('');
  const [mode, setMode] = useState('');
  const [setmedicine, selectedMedicine] = useState(null);
  const [selectedgeneric, setSelectedGeneric] = useState(null);
  const [mgs, setmg] = useState('');
  const [setmgs, setSelectedMgs] = useState(false);
  const [dose_quantity, setDose_quantity] = useState('');
  const [timing, setTiming] = useState('');
  const [frequency, setFrequency] = useState([]);
  const [dose_number, setDose_number] = useState(0);
  const [generic, setGeneric] = useState('');
  const [setgeneric, setselectedGeneric] = useState(false);
  const [duration, setDuration] = useState(0);
  const recommdations = CONSTANTS.medicine_recomendation;
  const mg = CONSTANTS.dose;
  const ml = CONSTANTS.dose_ml;
  const timings = CONSTANTS.timing;
  const frequencys = CONSTANTS.frequency;
  const [total_quantity, setTotalQuantity] = useState();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [sug, setSug] = useState([]);
  const [durationSelect, setDurationSelect] = useState('days');
  const [newMedicine, setnewMedicine] = useState([]);
  const [filtered, setFilteredData] = useState([]);
  const [modal, setModal] = useState(false);
  const [template, setTemplate] = useState('');
  const [othersMed, setOthersMed] = useState('');
  const prevPres = useSelector(state => state.pres.prescribeItems);
  const redux =
    prevPres?.length > 0
      ? prevPres?.filter(item => item?.appointment_id === appointmentID)
      : [];
  const checkOthersmed =
    prevPres?.length > 0
      ? prevPres?.filter(item => item?.mode === 'Others')
      : [];
  const [others, setOthers] = useState('');

  const [indexToUpdate, setIndextoUpdate] = useState('');
  const handleAddPrescribe = () => {
    if ((medicine && frequency) || othersMed) {
      if (newMedicine?.length > 1) {
        // const new1 = newMedicine?.filter((item)=> item?.term)
        const newmed = `${medicine} ${mgs}`;
        setMedicine(newmed);
      }
      if (parseInt(indexToUpdate) >= 0 && indexToUpdate < prevPres.length) {
        updateIndexvaluePrescribe();
      } else {
        dispatch(
          addPrescribe([
            ...prevPres,
            {
              medicine:
                mode === 'Others'
                  ? othersMed
                  : generic
                  ? `${medicine.toUpperCase()} (${generic.toUpperCase()}) ${
                      generic &&
                      (generic.includes('mg') ||
                        generic.includes('ml') ||
                        generic.includes('g'))
                        ? ''
                        : `${generic.toUpperCase()} ${mgs}`
                    }`
                  : medicine &&
                    (medicine.includes('mg') ||
                      medicine.includes('ml') ||
                      medicine.includes('g'))
                  ? medicine.toUpperCase()
                  : `${medicine ? medicine.toUpperCase() : ''} ${mgs}`,
              mode: mode,
              dose_quantity: '',
              timing: timing,
              frequency: selectedDaysString,
              dose_number: dose_number,
              duration: `${duration} ${
                durationSelect === 'week'
                  ? 'Week (once in a Week)'
                  : durationSelect
              }`,
              total_quantity:
                mode?.toLowerCase() === 'syrup'
                  ? 1
                  : isNaN(total_quantity)
                  ? '00'
                  : total_quantity,
              others: others ? others : '',
              appointment_id: appointmentID,
            },
          ]),
        );
      }
      if (prevPres?.length > 0) {
        const medicineName = `${medicine} ${mgs}`;
        UpdateAsyncData(`prescribe${phone}`, {
          medicine: generic
            ? `${medicine}(${generic})`
            : setmedicine
            ? setmedicine
            : medicineName,
          mode: mode,
        });
      } else {
        StoreAsyncData(`prescribe${phone}`, prevPres);
      }
      setMedicine('');
      if (mode === 'Others') {
        setOthersMed('');
      } else {
        setMode('');
      }
      setDose_number(0);
      setDose_quantity('');
      setTiming('');
      setFrequency([]);
      setDuration(0);
      setmg('');
      setOthers('');
    }
  };
  const updateIndexvaluePrescribe = () => {
    dispatch(
      updateIndexPrescribe({
        index: indexToUpdate,
        updatedItem: {
          medicine: generic
            ? `${medicine.toUpperCase()} (${generic.toUpperCase()}) ${
                generic &&
                (generic.includes('mg') ||
                  generic.includes('ml') ||
                  generic.includes('g'))
                  ? ''
                  : `${generic.toUpperCase()} ${mgs}`
              }`
            : medicine &&
              (medicine.includes('mg') ||
                medicine.includes('ml') ||
                medicine.includes('g'))
            ? medicine.toUpperCase()
            : `${medicine ? medicine.toUpperCase() : ''} ${mgs}`,
          mode: mode,
          dose_quantity: '',
          timing: timing,
          frequency: selectedDaysString,
          dose_number: dose_number,
          duration: `${duration} ${
            durationSelect === 'week' ? 'Week (once in a Week)' : durationSelect
          }`,
          total_quantity:
            mode?.toLowerCase() === 'syrup'
              ? 1
              : isNaN(total_quantity)
              ? '00'
              : total_quantity,
          others: others ? others : '',
          appointment_id: appointmentID,
        },
      }),
    );
    setIndextoUpdate('');
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
    if (medicine === value) {
      setMedicine('');
      selectedMedicine('');
    } else {
      setMedicine(value);
      selectedMedicine(value);
    }
    setselectedGeneric(true);
    setSelectedMgs(true);
  };

  const setMG = value => {
    if (mgs === value) {
      setDose_quantity('');
      setmg('');
    } else {
      setDose_quantity(value);
      setmg(value);
    }
  };

  const setTime = value => {
    if (timing === value) {
      setTiming('');
    } else {
      setTiming(value);
    }
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
      // Alert.alert('', 'Please give Atleast One Medication');
      showToast('error', 'Please give Atleast One Medication');
    }
  };
  const snomedModeSearch =
    mode === modes[0]
      ? 'inj'
      : mode === modes[1]
      ? 'cap'
      : mode === modes[2]
      ? 'syr'
      : mode === modes[3]
      ? 'tab'
      : '';
  const fetchMedicine = async () => {
    const response = await fetchApi(
      URL.snomed(
        generic
          ? `${snomedModeSearch} ${generic}`
          : medicine
          ? `${snomedModeSearch} ${medicine}`
          : 'NA',
        generic ? 'clinical drug' : option,
      ),
      {
        method: 'GET',
        headers: {
          // Host: Host,
        },
      },
    );
    if (response.ok) {
      const jsonData = await response.json();
      const snomed_data = jsonData?.map(item => ({type: 'sno', term: item}));
      setData(snomed_data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  const [Allmed, SetAllmed] = useState([]);
  const fetchAllmed = async () => {
    try {
      const response = await fetch(URL.getAllmed(medicine), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      const data =
        jsonData?.data?.length > 0
          ? jsonData?.data?.map(item => ({
              term: item?.medicine?.toLowerCase(),
              type: 'sno',
            }))
          : [];
      SetAllmed(data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchMedicine();
    fetchAllmed();
  }, [medicine, generic, mode]);

  const fetchFilterDataofSnomed = value => {
    let combinedData = [...CONSTANTS.medicine, ...Allmed];
    if (medicine || generic) {
      const filtered = combinedData.filter(item =>
        item?.term?.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  useEffect(() => {
    const searchTerm = generic || medicine;
    if (searchTerm) {
      fetchFilterDataofSnomed(searchTerm);
    }
  }, [medicine, generic]);
  useEffect(() => {
    if (
      medicine &&
      !data?.find(item => item.term.toLowerCase() === medicine.toLowerCase())
    ) {
      setnewMedicine([{term: medicine}]);
    } else {
      setnewMedicine(null);
    }
  }, [medicine]);

  const HandlePress = value => {
    setMedicine(value?.term);
    selectedMedicine(value?.term);
    if (value?.type === 'nsno') {
      setselectedGeneric(false);
      setnewMedicine([{term: value?.term}]);
    }
  };
  const HandleSelectGeneric = value => {
    setGeneric(value?.term);
    setSelectedGeneric(value?.term);
  };
  const handleBack = () => {
    if (sug?.length === 0 || sug === undefined) {
      StoreAsyncData(`prescribe${phone}`, prevPres);
    }
  };
  useEffect(() => {
    // clearStorage();
    RetriveAsyncData(`prescribe${phone}`)
      .then(array => {
        const uniqueArray = array?.filter((item, index) => {
          const currentMedicine = item?.medicine.toLowerCase(); // Convert to lowercase for case-insensitive comparison
          return (
            index ===
            array.findIndex(
              obj => obj.medicine.toLowerCase() === currentMedicine,
            )
          );
        });
        if (uniqueArray?.length > 10) {
          uniqueArray?.splice(10);
          setSug(uniqueArray);
        } else {
          setSug(uniqueArray);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    checkOthersmed?.length > 0 ? setMode('Others') : setMode('');
  }, []);

  const handleOptions = value => {
    setDurationSelect(value);
  };
  const [loading, setLoading] = useState(false);
  const savingTemplate = async () => {
    const previous_data = prevPres?.map(item => ({
      medicine: item?.medicine,
      mode: item?.mode,
      dose_quantity: '',
      timing: item?.timing,
      frequency: item?.selectedDaysString,
      dose_number: item?.dose_number,
      duration: item?.duration,
      total_quantity: item?.total_quantity,
      others: item?.others,
    }));
    const bodyData = {
      key: 'prescribe',
      temp_name: template,
      temp_data: JSON.stringify(previous_data),
      doc_phone: phone,
    };
    setLoading(true);
    try {
      const response = await fetchApi(URL.savingTemplate, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });
      if (response.ok) {
        const jsonData = await response.json();
        if (jsonData?.status === 'success') {
          setModal(!modal);
          // Alert.alert('success', 'Succesfully saved');
          showToast('success', 'Succesfully saved');
          setLoading(false);
        } else {
          // Alert.alert('warn', jsonData?.message);
          showToast('error', jsonData?.message);
          setLoading(false);
          setModal(!modal);
        }
      }
    } catch (error) {
      // Alert.alert('error', JSON.stringify(error));
      showToast('error', JSON.stringify(error));
      setLoading(false);
      setModal(!modal);
    }
  };
  const [templatesData, setTemplatesData] = useState([]);
  const HandleTemplates = () => {
    if (!template) {
      // Alert.alert('', 'Please Enter Template Name');
      showToast('error', 'Please Enter Template Name');
      setModal(true);
    } else {
      savingTemplate();
    }
  };
  const fetchData = async () => {
    const response = await fetchApi(URL.getTemplates('prescribe', phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();
    setTemplatesData(jsonData?.data);
  };
  useEffect(() => {
    fetchData();
  }, [prevPres]);
  const [selectedTemplate, setSelectedTemplate] = useState();
  const handleDispatch = data => {
    if (selectedTemplate === data) {
      setSelectedTemplate('');
      // const parsedData = JSON.parse(data);
      dispatch(addPrescribe([]));
    } else {
      setSelectedTemplate(data);
      const parsedData = JSON.parse(data);
      const lstdata = parsedData?.map(item => ({
        ...item,
        appointment_id: appointmentID,
      }));
      dispatch(addPrescribe(lstdata));
    }
  };
  console.log(dose_number, duration);
  const DispatchEdit = (data, ind) => {
    setMode(data?.mode);
    setIndextoUpdate(ind);
    setselectedGeneric(true);
    setShow(!false);
    selectedMedicine('');
    if (mode === 'Others') {
      setOthersMed(data?.medicine);
    } else {
      setMedicine(data?.medicine);
    }
    setnewMedicine(data?.medicine);
    setDose_number(parseInt(data?.dose_number));
    setTiming(data?.timing);
    let frequencyList = data?.frequency?.split('-');
    let newVal = [];
    for (let i = 0; i < frequencyList?.length; i++) {
      if (frequencyList[i] !== '0') {
        newVal.push(i);
      }
    }
    setFrequency(newVal);
    setDuration(parseInt(data?.duration?.split(' ')[0]));
    setDurationSelect(data?.duration?.split(' ')[1]);
    setTotalQuantity(parseInt(data?.total_quantity));
    setOthers(data?.others);
  };
  const [info, setInfo] = useState(false);
  const ShowInfo = () => {
    // showToast(
    //   'error',
    //   'Enter medicine format "name <>space<> dosage <>space<> frequency,',
    // );
    setInfo(!info);
  };

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={styles.prescribeConatiner}>
        <View style={styles.body}>
          <View style={styles.leftContainer}>
            {templatesData?.length > 0 && (
              <View
                style={{
                  //   marginTop: moderateScale(20),
                  gap: moderateScale(8),
                }}>
                <Text style={styles.ModeText}> Your Templates</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: moderateScale(16),
                    flexWrap: 'wrap',
                  }}>
                  {templatesData?.map((item, inbdex) => (
                    <SelectorBtn
                      key={inbdex}
                      select={{
                        backgroundColor: CUSTOMCOLOR.lightgreen,
                        borderColor: 'transparent',
                        //   selectedTemplate === item?.temp_data
                        //     ? CUSTOMCOLOR.primary
                        //     : CUSTOMCOLOR.recent,
                      }}
                      inputstyle={{
                        color: CUSTOMCOLOR.success,
                        //   selectedTemplate === item?.temp_data
                        //     ? CUSTOMCOLOR.white
                        //     : CUSTOMCOLOR.primary,
                        fontWeight: '700',
                        paddingHorizontal: horizontalScale(12),
                        paddingVertical: verticalScale(8),
                      }}
                      input={capitalizeWord(item?.temp_name)}
                      onPress={() => handleDispatch(item?.temp_data)}
                    />
                  ))}
                </View>
              </View>
            )}
            <View style={{gap: verticalScale(6)}}>
              <Text style={styles.ModeText}>{Language[language]['mode']}</Text>
              <View style={styles.Modes}>
                {modes?.map(value => (
                  <SelectorBtn
                    key={value}
                    onPress={() => {
                      if (mode === value) {
                        setMode('');
                      } else {
                        setMode(value);
                      }
                    }}
                    input={value}
                    select={{
                      backgroundColor:
                        mode === value
                          ? CUSTOMCOLOR.selectionTab
                          : CUSTOMCOLOR.disableslot,
                      borderColor: 'transparent',
                      borderWidth: 0,
                    }}
                    inputstyle={{
                      color:
                        mode === value
                          ? CUSTOMCOLOR.white
                          : CUSTOMCOLOR.selectionText,
                      fontSize: moderateScale(14),
                      fontWeight: '400',
                    }}
                  />
                ))}
              </View>
            </View>
            <View style={{gap: verticalScale(12)}}>
              <View style={[styles.body, {alignItems: 'center'}]}>
                <Text style={styles.ModeText}>
                  {Language[language]['medicine']}
                </Text>
                <TouchableOpacity onPress={ShowInfo}>
                  <Icon
                    name={info ? 'menu-up' : 'menu-down'}
                    size={moderateScale(24)}
                    color={CUSTOMCOLOR.black}
                  />
                </TouchableOpacity>
              </View>

              {info && sug?.length > 0 && (
                <ScrollView
                  //   horizontal={true}
                  contentContainerStyle={{
                    ...styles.Modes,
                    flexWrap: 'wrap',

                    // borderWidth: 1,
                  }}
                  style={{height: moderateScale(150)}}>
                  {sug?.map(value => (
                    <Pressable
                      key={value?.medicine}
                      onPress={() => setMedicineValue(value?.medicine)}
                      style={{
                        padding: verticalScale(8),
                        borderRadius: moderateScale(8),
                        backgroundColor:
                          medicine === value?.medicine
                            ? CUSTOMCOLOR.fadeBlue
                            : CUSTOMCOLOR.white,
                        borderColor:
                          medicine === value?.medicine
                            ? 'transparent'
                            : CUSTOMCOLOR.primary,
                        borderWidth: 0.5,
                      }}>
                      <Text
                        style={{
                          fontSize: moderateScale(10),
                          fontFamily: CUSTOMFONTFAMILY.body,
                          color:
                            medicine === value?.medicine
                              ? CUSTOMCOLOR.black
                              : CUSTOMCOLOR.primary,
                        }}>
                        {value?.medicine}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              )}
              <InputText
                //   lbltext={{fontSize: moderateScale(14)}}
                inputContainer={{paddingHorizontal: 0, paddingVertical: 0}}
                //   label={Language[language]['medicine']}
                placeholder="Eg : paracetamol  oral tablet"
                multiline={true}
                value={medicine}
                setValue={val => {
                  setMedicine(val);
                  setShow(false);
                }}
                search={true}
                IconName={
                  (show && filtered.length > 0) ||
                  medicine === setmedicine ||
                  medicine.length === 0
                    ? 'magnify'
                    : medicine?.length > 0 && 'close'
                }
                onPress={() => {
                  // setShow(!show);
                  setMedicine('');
                }}
              />
              {medicine?.length > 1 &&
                (medicine === setmedicine || show ? null : (
                  <View style={styles.dropdownContainer}>
                    <ScrollView persistentScrollbar={true}>
                      {[
                        {term: medicine, type: 'nsno'},
                        ...data,
                        ...filtered,
                      ]?.map((val, index) => (
                        <SelectorBtn
                          select={{
                            paddingHorizontal: horizontalScale(4),
                            paddingVertical: verticalScale(8),
                            borderWidth: 0,
                            backgroundColor: null,
                          }}
                          onPress={() => HandlePress(val)}
                          key={index}
                          input={val?.term}></SelectorBtn>
                      ))}
                    </ScrollView>
                  </View>
                ))}
            </View>

            {newMedicine != null && setgeneric === false ? (
              <View>
                <InputText
                  lbltext={{
                    fontSize: moderateScale(14),
                    color: CUSTOMCOLOR.black,
                  }}
                  inputContainer={{
                    //   gap: verticalScale(6),
                    paddingHorizontal: moderateScale(0),
                  }}
                  label="Generic Name"
                  placeholder="Medicine generic name"
                  value={generic}
                  setValue={txt => setGeneric(txt)}
                />
                {generic?.length > 1 &&
                  (generic === selectedgeneric || show ? null : (
                    <View style={styles.dropdownContainer}>
                      <ScrollView persistentScrollbar={true}>
                        {data?.map((val, index) => (
                          <SelectorBtn
                            select={{
                              paddingHorizontal: horizontalScale(4),
                              paddingVertical: verticalScale(8),
                              borderWidth: 0,
                              backgroundColor: null,
                            }}
                            onPress={() => HandleSelectGeneric(val)}
                            key={index}
                            input={val?.term}></SelectorBtn>
                        ))}
                      </ScrollView>
                    </View>
                  ))}
              </View>
            ) : null}

            <View style={{gap: moderateScale(4)}}>
              <Text style={styles.ModeText}>
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
                          : CUSTOMCOLOR.disableslot,
                      borderWidth: 0,
                    }}
                    inputstyle={{
                      color:
                        timing === value
                          ? CUSTOMCOLOR.white
                          : CUSTOMCOLOR.disableslotText,
                      fontSize: moderateScale(14),
                      fontWeight: '400',
                    }}></SelectorBtn>
                ))}
              </View>
            </View>
            <View style={{gap: verticalScale(4)}}>
              <Text style={styles.ModeText}>
                {Language[language]['frequency']}
              </Text>
              <View style={styles.Modes}>
                {frequencys?.map((value, frequencyIndex) => (
                  <SelectorBtn
                    select={{
                      backgroundColor: frequency.includes(frequencyIndex)
                        ? CUSTOMCOLOR.primary
                        : CUSTOMCOLOR.disableslot,
                      borderWidth: 0,
                    }}
                    inputstyle={{
                      color: frequency.includes(frequencyIndex)
                        ? CUSTOMCOLOR.white
                        : CUSTOMCOLOR.disableslotText,
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

            {/* <View style={styles.ModeContainer}>
            <InputText
              keypad="numeric"
              // style={styles.durationInput}
              label={Language[language]['number']}
              inputContainer={{
                paddingHorizontal: moderateScale(0),
                paddingVertical: moderateScale(0),
                width: '24%',
                gap: verticalScale(6),
              }}
              value={dose_number}
              setValue={value => setDose_number(value)}
            />
          </View> */}
            <SliderComponent
              label={'Number'}
              value={dose_number}
              setValue={setDose_number}
              max={10}
            />

            <View style={{gap: verticalScale(12)}}>
              <View style={{gap: verticalScale(6)}}>
                <Text style={styles.ModeText}>
                  {Language[language]['duration']}
                </Text>
                <View style={styles.radiogroup}>
                  <Option
                    label="days"
                    value="days"
                    selected={durationSelect === 'days'}
                    onPress={() => handleOptions('days')}
                  />
                  <Option
                    label="week"
                    value="week"
                    selected={durationSelect === 'week'}
                    onPress={() => handleOptions('week')}
                  />
                </View>
              </View>

              {/* <InputText
              keypad="numeric"
              
              inputContainer={{
                width: '24%',
              }}
              value={duration}
              placeholder="Enter Days"
              setValue={value => setDuration(value)}
            /> */}
              <SliderComponent
                label={durationSelect === 'days' ? 'Days' : 'Week'}
                value={duration}
                setValue={setDuration}
                max={10}
                text={true}
              />
            </View>

            <InputText
              placeholder={'Enter any Remarks......'}
              // inputContainer={{gap: verticalScale(6)}}
              value={others}
              setValue={setOthers}
              label={'Others (optional):'}
            />
            <View
              style={{
                gap: horizontalScale(6),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={[styles.ModeText]}>
                {Language[language]['quantity']} :
              </Text>

              <Text style={styles.numText}>
                {mode?.toLowerCase() === 'syrup'
                  ? 1
                  : isNaN(total_quantity)
                  ? '00'
                  : total_quantity}
              </Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <Text
              style={[
                styles.ModeText,
                {paddingHorizontal: horizontalScale(8)},
              ]}>
              Medications
            </Text>
            {redux?.length > 0 ? (
              <View style={{gap: -8}}>
                {redux?.map((item, ind) => {
                  if (mode === 'Others') {
                    return (
                      <ShowChip
                        align={{width: '85%'}}
                        key={ind}
                        text={`${item.medicine}`}
                        onPress={() => handleDelete(ind)}
                        onEdit={() => DispatchEdit(item, ind)}
                        color={
                          parseInt(indexToUpdate) === ind
                            ? CUSTOMCOLOR.success
                            : CUSTOMCOLOR.primary
                        }
                      />
                    );
                  } else {
                    return (
                      <ShowChip
                        main={{
                          backgroundColor: CUSTOMCOLOR.white,
                          borderColor: CUSTOMCOLOR.fadeBlue,
                          borderWidth: 4,
                          alignItems: 'flex-start',
                          //   flexWrap: 'wrap',
                          //   width: 100,
                        }}
                        align={{
                          width: '90%',
                          paddingHorizontal: 0,
                        }}
                        key={ind}
                        text={
                          <View>
                            <View
                              style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: horizontalScale(4),
                              }}>
                              <Icon
                                name={
                                  item?.medicine?.includes(
                                    'injection'?.toUpperCase(),
                                  )
                                    ? 'needle'
                                    : item?.medicine?.includes(
                                        'syrup'?.toUpperCase(),
                                      )
                                    ? 'bottle-tonic-plus-outline'
                                    : item?.medicine?.includes(
                                        'capsule'?.toUpperCase(),
                                      )
                                    ? 'pill'
                                    : 'minus-circle'
                                }
                                size={moderateScale(16)}
                                color={CUSTOMCOLOR.primary}
                              />
                              <Text
                                style={{
                                  ...styles.medText,
                                  flexWrap: 'wrap',
                                }}>
                                {item.medicine}
                              </Text>
                            </View>
                            <Text style={styles.subText}>
                              {item.timing} | {item.frequency} |{' '}
                              {item.dose_number} | {item.duration} | Quantity:{' '}
                              {item.total_quantity}
                            </Text>
                            <Text style={styles.subText}>{item.others}</Text>
                          </View>
                          // `${item.medicine} | ${item.timing} | ${item.frequency} | ${item.dose_number} | ${item.duration} | ${item.total_quantity} | ${item.others}`
                        }
                        onPress={() => handleDelete(ind)}
                        edit={() => DispatchEdit(item, ind)}
                        color={
                          parseInt(indexToUpdate) === ind
                            ? CUSTOMCOLOR.success
                            : CUSTOMCOLOR.primary
                        }
                      />
                    );
                  }
                })}
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Icon
                  name="medical-bag"
                  size={moderateScale(64)}
                  color={CUSTOMCOLOR.fadeBlue}
                />
                <Text>Add Medications</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          //   borderWidth: 1,
          paddingVertical: verticalScale(24),
          paddingHorizontal: horizontalScale(16),
          borderTopColor: CUSTOMCOLOR.fadeBlue,
          borderTopWidth: 1,
          borderRadius: moderateScale(8),
        }}>
        <HButton
          btnstyles={{
            backgroundColor: CUSTOMCOLOR.white,
            borderColor: CUSTOMCOLOR.darkgreen,
            borderWidth: 1,
          }}
          textStyle={{
            color: CUSTOMCOLOR.darkgreen,
            paddingHorizontal: horizontalScale(24),
            paddingVertical: verticalScale(12),
            fontSize: moderateScale(16),
          }}
          label={'Save Template'}
          onPress={() => {
            setModal(!modal);
          }}
        />
        <HButton
          type="addtype"
          label={indexToUpdate?.length > 0 ? 'Update' : 'Add'}
          icon="plus"
          // size={moderateScale(16)}
          onPress={handleAddPrescribe}
          color={
            (medicine && frequency) || othersMed
              ? CUSTOMCOLOR.white
              : CUSTOMCOLOR.disableslotText
          }
          textStyle={{
            color:
              (medicine && frequency) || othersMed
                ? CUSTOMCOLOR.white
                : CUSTOMCOLOR.disableslotText,
            paddingHorizontal: horizontalScale(24),
            paddingVertical: verticalScale(12),
            fontSize: moderateScale(16),
          }}
          btnstyles={{
            backgroundColor:
              (medicine && frequency) || othersMed
                ? CUSTOMCOLOR.darkgreen
                : CUSTOMCOLOR.disableslot,
            width: '35%',
          }}
        />
        {/* <HButton
          label={'Save'}
          btnstyles={{
            ...commonstyles.activebtn,
            backgroundColor:
              prevPres?.length > 0 ? CUSTOMCOLOR.primary : CUSTOMCOLOR.disable,
          }}
          onPress={() => {
            if (prevPres?.length > 0) {
              handleAlert();
              handleBack();
            }
          }}
        /> */}
      </View>
      {modal && (
        <CustomModal visible={modal} Close={setModal}>
          <View style={{backgroundColor: CUSTOMCOLOR.white}}>
            <InputText
              label={'Template Name:'}
              required={true}
              value={template}
              setValue={setTemplate}
              placeholder={'Enter Template Name'}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: moderateScale(24),
            }}>
            <HButton
              loading={loading}
              label={'save'}
              onPress={HandleTemplates}
            />
          </View>
        </CustomModal>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
    // borderWidth: 1,
    backgroundColor: CUSTOMCOLOR.background,
  },
  prescribeConatiner: {
    gap: moderateScale(16),
    paddingBottom: verticalScale(24),
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
  },
  leftContainer: {
    width: '49%',
    gap: moderateScale(16),
    // borderWidth: 1,
  },
  rightContainer: {
    width: '49%',
    gap: moderateScale(4),
    borderLeftWidth: 2,
    borderLeftColor: CUSTOMCOLOR.fadeBlue,
  },
  ModeText: {
    fontWeight: '400',
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
  },
  medText: {
    fontWeight: '400',
    fontSize: CUSTOMFONTSIZE.h5,
    color: CUSTOMCOLOR.black,
  },
  subText: {
    fontWeight: '300',
    fontSize: CUSTOMFONTSIZE.h5,
    color: CUSTOMCOLOR.black,
  },
  Modes: {
    flexDirection: 'row',
    gap: horizontalScale(4),
  },
  selectTab: {
    backgroundColor: CUSTOMCOLOR.disableslot,
    borderColor: CUSTOMCOLOR.white,
  },
  numText: {
    color: CUSTOMCOLOR.black,
    fontWeight: '600',
  },
  radiogroup: {
    flexDirection: 'row',
    gap: moderateScale(16),
    justifyContent: 'flex-start',
  },
  dropdownContainer: {
    // top: moderateScale(130),
    // position: 'absolute',
    // zIndex: 1,
    width: '100%',
    height: moderateScale(300),
    backgroundColor: CUSTOMCOLOR.white,
    paddingHorizontal: horizontalScale(8),
    borderWidth: 1,
    borderColor: CUSTOMCOLOR.borderColor,
  },
});
