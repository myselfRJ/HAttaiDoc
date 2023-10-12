import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  startTransition,
} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {commonstyles} from '../styles/commonstyle';
import Keyboardhidecontainer from '../components/keyboardhidecontainer';
import InputText from '../components/inputext';
import HButton from '../components/button';
import AddImage from '../components/addimage';
import Option from '../components/option';
import {PlusButton, SelectorBtn, SlotChip} from '../components';
import {CONSTANTS} from '../utility/constant';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {URL} from '../utility/urls';
import {HttpStatusCode} from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ClinicAddress from '../components/clinic_address';
import BottomSheetView from '../components/bottomSheet';
import StatusMessage from '../components/statusMessage';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {fetchApi} from '../api/fetchApi';
import {
  addclinic_data,
  updateclinics,
} from '../redux/features/profiles/clinicData';
import {useFocusEffect} from '@react-navigation/native';
import ProgresHeader from '../components/progressheader';
import {headerStatus} from '../redux/features/headerProgress/headerProgress';
import {disableBackButton} from '../utility/backDisable';
import {useRoute} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {updateslots, addslots} from '../redux/features/slots/slotData';
// import {updateAddress} from '../redux/features/profiles/clinicAddress';
import GalleryModel from '../components/GalleryModal';
import {updateAddress} from '../redux/features/profiles/clinicAddress';
import {mode} from '../redux/features/prescription/prescribeslice';
import SelectionTab from '../components/selectiontab';
import moment from 'moment';

const AddClinic = ({navigation}) => {
  const addressRef = useRef(null);
  const GlRef = useRef(null);
  const [apiStatus, setApiStatus] = useState({});
  const [visibleSlot, setVisibleSlot] = useState(true);
  const slotData = useSelector(state => state?.slotsData);
  const token = useSelector(state => state.authenticate.auth.access);
  const route = useRoute();
  const address = useSelector(state => state?.address?.address);
  const {prevScrn} = route.params;
  const {index} = route.params;
  const [cnFess, setCnFees] = useState('');
  const clinics = useSelector(state => state.clinic?.clinics);
  console.log('==============>clinic.log', clinics[index]?.clinic_name);

  const dispatch = useDispatch();

  const [slots, setSlots] = useState({
    M: [],
    T: [],
    W: [],
    TH: [],
    F: [],
    Sa: [],
    Su: [],
  });

  const ResetReduxSlots = () => {
    const newSlotsss = {
      slots: {
        M: [],
        T: [],
        W: [],
        TH: [],
        F: [],
        Sa: [],
        Su: [],
      },
    };
    const newAddress = '';
    dispatch(updateslots(newSlotsss?.slots));
    dispatch(updateAddress(newAddress));
  };

  const [loading, setLoading] = useState(false);

  const Slotadded = () => {
    const m = slots?.M?.length === 0;
    const t = slots?.T?.length === 0;
    const w = slots?.W?.length === 0;
    const th = slots?.TH?.length === 0;
    const f = slots?.F?.length === 0;
    const sa = slots?.Sa?.length === 0;
    const su = slots?.Su?.length === 0;

    !(m && t && w && th && f && sa && su)
      ? setVisibleSlot(false)
      : setVisibleSlot(true);
  };

  useFocusEffect(
    useCallback(() => {
      Slotadded();
    }, [slots]),
  );

  const handleClear = () => {
    setVisibleSlot(true);
    const newSlotsss = {
      slots: {
        M: [],
        T: [],
        W: [],
        TH: [],
        F: [],
        Sa: [],
        Su: [],
      },
    };
    dispatch(updateslots(newSlotsss?.slots));
  };

  const SuccesRef = useRef(null);
  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);

  const [status, setStatus] = useState(false);

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedLogo, setSelectedLogo] = useState('');
  const [value, setValue] = useState({
    clinic: '',
    address: '',
    phone: '',
    fees: '',
    // slots: [],
  });
  const prevScrn1 = 'undefineed';

  const Clinic_Data = {
    clinic_name: value.clinic,
    clinic_Address: address,
    clinic_photo_url: selectedImage ? selectedImage : CONSTANTS.default_image,
    fees: cnFess === 'others' ? parseInt(value.fees) : parseInt(cnFess),
    slot: JSON.stringify(slots),
    clinic_phone_number: value.phone,
    clinic_logo_url: selectedLogo ? selectedLogo : CONSTANTS.default_image,
  };

  const ResetClinicRedux = () => {
    const ResetClinic = [];
    dispatch(updateclinics(ResetClinic));
  };

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetchApi(URL.addclinic, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //       body: JSON.stringify(clinics?.clinics),
  //     });
  //     if (response.status === HttpStatusCode.Ok) {
  //       const jsonData = await response.json();
  //       if (jsonData.status === 'success') {
  //         setApiStatus({status: 'success', message: 'Successfully created'});
  //         SuccesRef?.current?.snapToIndex(1);
  //         dispatch(headerStatus({index: 1, status: true}));
  //         {
  //           prevScrn === 'account'
  //             ? setTimeout(() => {
  //                 navigation.navigate('tab');
  //               }, 1000)
  //             : setTimeout(() => {
  //                 navigation.navigate('adduser', {prevScrn1});
  //               }, 1000);
  //         }
  //         setTimeout(() => {
  //           SuccesRef?.current?.snapToIndex(0);
  //         }, 2000);
  //         setLoading(false);
  //         ResetClinicRedux();
  //         // SuccesRef?.current?.snapToIndex(0);
  //       } else {
  //         setApiStatus({status: 'warning', message: jsonData.message});
  //         SuccesRef?.current?.snapToIndex(1);
  //         console.error('API call failed:', response.status, response);
  //         setLoading(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error occurred:', error);
  //     setApiStatus({status: 'error', message: 'Please try again'});
  //     SuccesRef?.current?.snapToIndex(1);
  //     setLoading(false);
  //   }
  // };
  const [showSlotChip, setShowSlotChip] = useState(false);

  const onImagePress = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        setSelectedImage(response?.assets?.[0]?.base64);
      }
    });
    setModal(false);
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        setSelectedImage(response?.assets?.[0]?.base64);
      }
    });
    setModal(false);
  };
  const LogoCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        setSelectedLogo(response?.assets?.[0]?.base64);
      }
    });
    setlogo(false);
  };
  const onLogoPress = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        setSelectedLogo(response?.assets?.[0]?.base64);
      }
    });
    setlogo(false);
  };

  const progressData = useSelector(state => state.progress?.status);

  const handleChangeValue = (field, value) => {
    setValue(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };

  useEffect(() => {
    disableBackButton();
  }, []);
  const [modal, setModal] = useState(false);
  const [logo, setlogo] = useState(false);
  const ModalVisible = () => {
    setModal(true);
  };
  const LogoVisible = () => {
    setlogo(true);
    GlRef?.current?.snapToIndex(1);
  };
  const [addSlots, setAddSlots] = useState(false);
  const [visible, setVisible] = useState(false);
  const slotTypeRef = useRef(null);
  const [allSlots, setAllSlots] = useState([]);

  const slotDurationRef = useRef(null);
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const consultType = CONSTANTS.consultTypes;
  const durationMins = CONSTANTS.duration;
  const [selectSlot, setselectSlot] = useState([]);
  // console.log('length===', selectSlot);
  const [selectedConsultValue, setConsultValue] = useState(consultType[0]);
  const [selectedDurationValue, setDurationValue] = useState(durationMins[1]);

  const [selectedDay, setSelectedDay] = useState('M');

  const DaySelection = index => {
    const isSelected = selectedDay.includes(index);
    if (isSelected) {
      setSelectedDay(selectedDay.filter(i => i !== index));
    } else {
      setSelectedDay([...selectedDay, index]);
    }
  };

  const handleSaveSlotData = () => {
    if (
      slots?.M.length > 0 ||
      slots?.T.length > 0 ||
      slots?.W.length > 0 ||
      slots?.TH.length > 0 ||
      slots?.F.length > 0 ||
      slots?.Sa.length > 0 ||
      slots?.Su.length > 0
    ) {
      dispatch(addslots(slots));
    }
    navigation.goBack();
  };

  const handleConfirm = time => {
    if (open === 'from') {
      setFromTime(time);
    } else {
      setToTime(time);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const ToformattedTime = moment(toTime).utcOffset(330).format('HH:mm');
  const FromformattedTime = moment(fromTime).utcOffset(330).format('HH:mm');
  const handleTypeSelect = value => {
    setConsultValue(value);
    slotTypeRef?.current?.snapToIndex(0);
  };

  const handleDurationSelect = value => {
    setDurationValue(value);
    slotDurationRef?.current?.snapToIndex(0);
  };
  const [weekdays, setWeekdays] = useState({
    M: 'Monday',
    T: 'Tuesday',
    W: 'Wednesday',
    TH: 'Thursday',
    F: 'Friday',
    Sa: 'Saturday',
    Su: 'Sunday',
  });

  const handleAddSlot = () => {
    if (selectedConsultValue && selectedDurationValue) {
      const newSlot = {
        index: Date.now().toLocaleString(),
        fromTime: FromformattedTime,
        toTime: ToformattedTime,
        consultType: selectedConsultValue,
        duration: selectedDurationValue,
        day: weekdays[selectedDay],
      };
      const conflictingSlotExists = slots[selectedDay].some(
        slot =>
          (newSlot.fromTime >= slot.fromTime &&
            newSlot.fromTime < slot.toTime) ||
          (newSlot.toTime > slot.fromTime && newSlot.toTime <= slot.toTime),
      );

      if (!conflictingSlotExists) {
        setAllSlots(prev => [...prev, newSlot]);
        setSlots(prevSlots => ({
          ...prevSlots,
          [selectedDay]: [...prevSlots[selectedDay], newSlot],
        }));
        setConsultValue(consultType[0]);
        setDurationValue(durationMins[0]);
      } else {
        Alert.alert('Warning', 'A slot with conflicting time already exists.');
      }
    }
  };

  const handleAddSlotCopyMonday = () => {
    const weekdaysToUpdate = {
      M: slots.M?.map((slot, index) => ({...slot, index, day: 'Monday'})),
      T: slots.M?.map((slot, index) => ({
        ...slot,
        index: `T-${index}`,
        day: 'Tuesday',
      })),
      W: slots.M?.map((slot, index) => ({
        ...slot,
        index: `W-${index}`,
        day: 'Wednesday',
      })),
      TH: slots.M?.map((slot, index) => ({
        ...slot,
        index: `TH-${index}`,
        day: 'Thursday',
      })),
      F: slots.M?.map((slot, index) => ({
        ...slot,
        index: `F-${index}`,
        day: 'Friday',
      })),
      Sa: [],
      Su: [],
    };
    setSlots(weekdaysToUpdate);
    setConsultValue(consultType[0]);
    setDurationValue(durationMins[0]);
  };
  // const slotData = useSelector(state => state?.slotsData?.slots);

  const handleDelete = (dayTodelete, index) => {
    setAllSlots(prevAllSlots =>
      prevAllSlots.filter(slot => slot.index !== index),
    );
    setSlots(prevSlots => {
      const updatedSlots = {};
      for (const day in prevSlots) {
        updatedSlots[day] = prevSlots[day].filter(slot => slot.index !== index);
      }
      Alert.alert('Warning', `Slots are deleted for ${weekdays[dayTodelete]}`);
      return updatedSlots;
    });
    // if (slotData) {
    //   const updatedSlots = {};
    //   for (const day in slotData) {
    //     updatedSlots[day] = slotData[day].filter(slot => slot.index !== index);
    //   }
    //   Alert.alert('Warning', `Slots are deleted for ${weekdays[dayTodelete]}`);
    //   dispatch(updateslots(updatedSlots));
    // }
  };

  const onDaySelectionChange = value => {
    setSelectedDay(value);
  };

  const handlewarnings = () => {
    const TimeCheck = fromTime !== toTime;
    const difference =
      parseInt(ToformattedTime.split(':')[0]) * 60 +
      parseInt(ToformattedTime.split(':')[1]) -
      (parseInt(FromformattedTime.split(':')[0]) * 60 +
        parseInt(FromformattedTime.split(':')[1]));
    const differenceCheck = difference >= selectedDurationValue;
    return TimeCheck && differenceCheck;
  };

  const handleSlotSelect = (day, slotIndex) => {
    const isSelected = selectSlot.includes(slotIndex);
    if (isSelected) {
      setselectSlot(selectSlot.filter(index => index !== slotIndex));
    } else {
      setselectSlot([...selectSlot, slotIndex]);
    }
  };
  const handleClearAllSlots = () => {
    setSlots({
      M: [],
      T: [],
      W: [],
      TH: [],
      F: [],
      Sa: [],
      Su: [],
    });
    setselectSlot([]);
    Alert.alert('Success', 'All Slots are cleared');
  };
  const handleSelectedDelete = selectedIndices => {
    setAllSlots(prevAllSlots =>
      prevAllSlots.filter(slot => !selectedIndices.includes(slot.index)),
    );

    setSlots(prevSlots => {
      const updatedSlots = {...prevSlots};
      for (const day in prevSlots) {
        updatedSlots[day] = prevSlots[day].filter(
          slot => !selectedIndices.includes(slot.index),
        );
      }
      return updatedSlots;
    });
    setselectSlot([]);
  };
  console.log('==========>index', index);
  const handlePlusIconClick = () => {
    if (value.clinic) {
      // console.log('===========>visible', visibleSlot);
      if (!visibleSlot) {
        {
          index !== undefined
            ? dispatch(
                updateclinics({index: index, updatedClinic: Clinic_Data}),
              )
            : dispatch(addclinic_data(Clinic_Data));
        }
        Alert.alert('Success', '"Clinic data added successfully"');
        setShowSlotChip(true);
        (value.clinic = ''),
          (value.address = ''),
          (value.fees = ''),
          (value.phone = '');
        setSelectedImage('');
        setSelectedLogo('');
        setVisibleSlot(true);
        ResetReduxSlots();
        setCnFees('');
        setSlots({
          M: [],
          T: [],
          W: [],
          TH: [],
          F: [],
          Sa: [],
          Su: [],
        });
        navigation.goBack();
      } else {
        Alert.alert('Warning', '"Please Add Slots Details Also"');
      }
    } else {
      Alert.alert('Warning', '"Please Enter All Details"');
    }
  };

  if (index !== undefined) {
    useEffect(() => {
      const clinicData = {
        clinic: clinics[index]?.clinic_name,
        address: clinics[index]?.clinic_Address,
        phone: clinics[index]?.clinic_phone_number,
        fees: clinics[index]?.fees,
      };

      setValue(clinicData);
      setCnFees(clinics[index]?.fees);
      setSelectedImage(clinics[index]?.clinic_photo_url);
      setSelectedLogo(clinics[index]?.clinic_logo_url);

      try {
        const slots = JSON.parse(clinics[index]?.slot);
        setSlots(slots);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }, []);
  }
  return (
    <View style={{flex: 1}}>
      {/* {prevScrn !== 'account' && (
        <View>
          <ProgresHeader progressData={progressData} />
        </View>
      )} */}

      {/* {prevScrn === 'account' && ( */}
      <View>
        <PlusButton
          icon="close"
          style={styles.clsbtn}
          color={CUSTOMCOLOR.primary}
          size={moderateScale(32)}
          onPress={() => navigation.goBack()}
        />
      </View>
      {/* )} */}

      <ScrollView>
        <Keyboardhidecontainer>
          <View style={styles.content}>
            <View style={styles.alignchild}>
              <View style={styles.alignchild}>
                <Text style={commonstyles.h1}>Add Clinic</Text>
              </View>
            </View>
            <InputText
              required={true}
              label={Language[language]['clinic']}
              maxLength={30}
              placeholder="Clinic"
              value={value.clinic}
              setValue={value => handleChangeValue('clinic', value)}
            />
            <View
              style={{
                alignSelf: 'flex-start',
                width: '100%',
                paddingHorizontal: horizontalScale(8),
              }}>
              <SelectorBtn
                label={Language[language]['address']}
                name="map-marker"
                input={address}
                onPress={() => {
                  // addressRef?.current?.snapToIndex(1);
                  navigation.navigate('address');
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: moderateScale(16),
                alignSelf: 'flex-start',
              }}>
              <View style={styles.alignchild}>
                <Text style={styles.logo}>Clinic Photo</Text>
                <AddImage
                  // onPress={() => {
                  //   ModalVisible();
                  // }}
                  OnGallery={onImagePress}
                  OnCamera={openCamera}
                  encodedBase64={selectedImage}
                />
              </View>
              <View style={styles.alignchild}>
                <Text style={styles.logo}>Clinic Logo</Text>
                <AddImage
                  OnGallery={onLogoPress}
                  OnCamera={LogoCamera}
                  // onPress={() => LogoVisible()}
                  encodedBase64={selectedLogo}
                />
              </View>
            </View>
            <InputText
              label={Language[language]['phone_number']}
              placeholder="Enter clinic phone number"
              value={value.phone}
              setValue={value => handleChangeValue('phone', value)}
              doubleCheck={[true, false]}
              numeric={true}
              check={e => {
                var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~a-zA-Z]/;
                if (format.test(e)) {
                  return false;
                } else {
                  return true;
                }
              }}
            />
            <View
              style={{
                // flexDirection: 'row',
                gap: moderateScale(8),
                alignSelf: 'flex-start',
                paddingHorizontal: horizontalScale(8),
              }}>
              <Text style={styles.labeltext}>{Language[language]['fees']}</Text>
              <View style={{flexDirection: 'row', gap: moderateScale(8)}}>
                {CONSTANTS.clinic_fees?.map((val, ind) => (
                  <SelectorBtn
                    select={{
                      backgroundColor:
                        cnFess === val
                          ? CUSTOMCOLOR.primary
                          : CUSTOMCOLOR.white,
                    }}
                    inputstyle={{
                      color:
                        cnFess === val ? CUSTOMCOLOR.white : CUSTOMCOLOR.black,
                    }}
                    input={val}
                    key={ind}
                    onPress={() => setCnFees(val)}
                  />
                ))}
              </View>
            </View>
            {cnFess === 'others' ? (
              <InputText
                placeholder="Enter Fees"
                label="Fees"
                value={value.fees}
                setValue={value => handleChangeValue('fees', value)}
                // keypad="numeric"
              />
            ) : null}
            {/* {!visibleSlot && (
              <View style={styles.slotadded}>
                <Text style={styles.addedText}>Slots are added!!!</Text>
                <PlusButton
                  icon="close"
                  size={moderateScale(12)}
                  onPress={handleClear}
                />
              </View>
            )} */}
            <SelectorBtn
              input={'Add Slots'}
              name={addSlots ? 'chevron-up' : 'chevron-down'}
              onPress={() => setAddSlots(!addSlots)}
            />
            {addSlots && (
              <View>
                <View style={styles.dayselector}>
                  <View
                    style={[
                      styles.data,
                      {
                        backgroundColor:
                          slots.M?.length > 0 ? CUSTOMCOLOR.success : null,
                      },
                    ]}>
                    <SelectionTab
                      label="M"
                      selected={selectedDay === 'M'}
                      onPress={() => onDaySelectionChange('M')}
                    />
                  </View>
                  <View
                    style={[
                      styles.data,
                      {
                        backgroundColor:
                          slots.T?.length > 0 ? CUSTOMCOLOR.success : null,
                      },
                    ]}>
                    <SelectionTab
                      label="T"
                      selected={selectedDay === 'T'}
                      onPress={() => onDaySelectionChange('T')}
                    />
                  </View>
                  <View
                    style={[
                      styles.data,
                      {
                        backgroundColor:
                          slots.W?.length > 0 ? CUSTOMCOLOR.success : null,
                      },
                    ]}>
                    <SelectionTab
                      label="W"
                      selected={selectedDay === 'W'}
                      onPress={() => onDaySelectionChange('W')}
                    />
                  </View>
                  <View
                    style={[
                      styles.data,
                      {
                        backgroundColor:
                          slots.TH?.length > 0 ? CUSTOMCOLOR.success : null,
                      },
                    ]}>
                    <SelectionTab
                      label="TH"
                      selected={selectedDay === 'TH'}
                      onPress={() => onDaySelectionChange('TH')}
                    />
                  </View>
                  <View
                    style={[
                      styles.data,
                      {
                        backgroundColor:
                          slots.F?.length > 0 ? CUSTOMCOLOR.success : null,
                      },
                    ]}>
                    <SelectionTab
                      label="F"
                      selected={selectedDay === 'F'}
                      onPress={() => onDaySelectionChange('F')}
                    />
                  </View>
                  <View
                    style={[
                      styles.data,
                      {
                        backgroundColor:
                          slots.Sa?.length > 0 ? CUSTOMCOLOR.success : null,
                      },
                    ]}>
                    <SelectionTab
                      label="Sa"
                      selected={selectedDay === 'Sa'}
                      onPress={() => onDaySelectionChange('Sa')}
                    />
                  </View>
                  <View
                    style={[
                      styles.data,
                      {
                        backgroundColor:
                          slots.Su?.length > 0 ? CUSTOMCOLOR.success : null,
                      },
                    ]}>
                    <SelectionTab
                      label="Su"
                      selected={selectedDay === 'Su'}
                      onPress={() => onDaySelectionChange('Su')}
                    />
                  </View>
                </View>
                <View style={styles.selector}>
                  <SelectorBtn
                    select={styles.select1}
                    label="From"
                    name="clock"
                    onPress={() => setOpen('from')}
                    input={FromformattedTime}
                  />
                  <SelectorBtn
                    select={styles.select1}
                    label="To"
                    name="clock"
                    onPress={() => setOpen('to')}
                    input={ToformattedTime}
                  />
                  <DatePicker
                    modal
                    open={open !== false}
                    date={open === 'from' ? fromTime : toTime}
                    theme="auto"
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    minuteInterval={15}
                  />
                </View>

                <View style={styles.selector}>
                  <SelectorBtn
                    select={styles.select1}
                    label="Type"
                    name="alpha-t-box"
                    onPress={() => {
                      slotTypeRef?.current?.snapToIndex(1);
                    }}
                    input={selectedConsultValue}
                  />
                  <SelectorBtn
                    select={styles.select1}
                    label="Duration"
                    name="timer-sand-full"
                    onPress={() => {
                      slotDurationRef?.current?.snapToIndex(1);
                    }}
                    input={<Text>{selectedDurationValue} Mins</Text>}
                  />
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <HButton
                    label="Add"
                    icon="plus"
                    btnstyles={{marginTop: verticalScale(12)}}
                    onPress={() => {
                      const isOk = handlewarnings();
                      if (isOk) {
                        handleAddSlot();
                      } else {
                        Alert.alert(
                          'Warning',
                          '"From time" and "To time" are same',
                        );
                      }
                    }}
                  />
                </View>
              </View>
            )}
            <SelectorBtn
              input={'View Slots'}
              name={visible ? 'chevron-up' : 'chevron-down'}
              onPress={() => setVisible(!visible)}
            />
            {visible && (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{flexDirection: 'row', alignItems: 'center'}}></View>
                  <View style={{flexDirection: 'row', gap: moderateScale(4)}}>
                    {slots && selectSlot.length > 1 && (
                      <HButton
                        color={CUSTOMCOLOR.primary}
                        label="Delete"
                        onPress={() => handleSelectedDelete(selectSlot)}
                        btnstyles={{
                          backgroundColor: CUSTOMCOLOR.delete,
                          paddingHorizontal: horizontalScale(4),
                        }}
                        textStyle={{
                          color: CUSTOMCOLOR.white,
                        }}
                      />
                    )}
                    {Object.values(slots).some(
                      daySlots => daySlots.length > 0,
                    ) && (
                      <HButton
                        color={CUSTOMCOLOR.primary}
                        label="Clear"
                        onPress={handleClearAllSlots}
                        btnstyles={{
                          backgroundColor: CUSTOMCOLOR.white,
                          paddingHorizontal: horizontalScale(8),
                        }}
                        textStyle={{
                          color: CUSTOMCOLOR.primary,
                        }}
                      />
                    )}
                  </View>
                </View>

                <View style={styles.ShowSchedule}>
                  {Object.entries(slots).map(([day, daySlots]) =>
                    daySlots?.map((slot, ind) => (
                      <Pressable
                        key={ind}
                        onPress={() => handleSlotSelect(day, slot.index)}>
                        <SlotChip
                          key={slot.index}
                          index={slot.index}
                          onPress={() => handleDelete(day, slot.index)}
                          time={slot.fromTime + '-' + slot.toTime}
                          type={<Text>Type: {slot.consultType}</Text>}
                          duration={
                            <Text>
                              Duration: {slot.duration} | {slot.day} |{' '}
                              {slot.fromTime >= '06:00' &&
                              slot.toTime <= '17:59' &&
                              slot.fromTime <= '18:00' ? (
                                <Icon
                                  name="white-balance-sunny"
                                  size={moderateScale(20)}
                                  color={CUSTOMCOLOR.warn}
                                />
                              ) : (
                                <Icon
                                  name="weather-night-partly-cloudy"
                                  size={moderateScale(20)}
                                  color={CUSTOMCOLOR.primary}
                                />
                              )}
                            </Text>
                          }
                          style={{
                            backgroundColor: selectSlot.includes(slot.index)
                              ? '#C5FFBC'
                              : 'white',
                          }}
                        />
                      </Pressable>
                    )),
                  )}
                </View>
              </View>
            )}

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <HButton
                label="Save"
                onPress={() => {
                  handlePlusIconClick();
                }}
                loading={loading}
              />
            </View>
          </View>
        </Keyboardhidecontainer>
      </ScrollView>
      <BottomSheetView
        bottomSheetRef={addressRef}
        snapPoints={'100%'}
        backgroundStyle={CUSTOMCOLOR.white}>
        <View style={styles.modalcontainer}>
          <ClinicAddress
            onPress={() => {
              addressRef?.current?.snapToIndex(0);
            }}
          />
        </View>
      </BottomSheetView>
      <BottomSheetView
        bottomSheetRef={SuccesRef}
        snapPoints={'50%'}
        backgroundStyle={'#fff'}>
        <StatusMessage status={apiStatus.status} message={apiStatus.message} />
      </BottomSheetView>
      <BottomSheetView
        bottomSheetRef={slotTypeRef}
        snapPoints={'40%'}
        backgroundStyle={CUSTOMCOLOR.white}>
        <ScrollView>
          <View style={styles.bottomSheet}>
            {consultType.map((consTypes, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleTypeSelect(consTypes)}>
                <View style={styles.valuesContainer}>
                  <Text style={styles.values}>{consTypes}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </BottomSheetView>
      <BottomSheetView
        bottomSheetRef={slotDurationRef}
        snapPoints={'40%'}
        backgroundStyle={CUSTOMCOLOR.white}>
        <ScrollView>
          <View style={styles.bottomSheet}>
            {durationMins.map((mins, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleDurationSelect(mins)}>
                <View style={styles.valuesContainer}>
                  <Text style={styles.values}>{mins} minutes</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </BottomSheetView>

      {/* {modal && (
        <View>
          <GalleryModel
            visible={modal}
            Close={setModal}
            OnGallery={onImagePress}
            OnCamera={openCamera}
          />
        </View>
      )}
      {logo && (
        <View>
          <GalleryModel
            visible={logo}
            Close={setlogo}
            OnGallery={onLogoPress}
            OnCamera={LogoCamera}
          />
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  save: {
    top: moderateScale(16),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    // borderRadius: 2,
  },
  saveText: {
    padding: moderateScale(16),
    backgroundColor: CUSTOMCOLOR.primary,
    borderRadius: moderateScale(4),
    //  borderWidth: moderateScale(2),
    // borderColor: CUSTOMCOLOR.success,
  },
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    gap: moderateScale(16),
    padding: moderateScale(24),
  },
  dayselector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(8),
  },
  ShowSchedule: {
    gap: moderateScale(8),
  },
  selector: {
    flexDirection: 'row',
    gap: moderateScale(64),
    width: '100%',
    justifyContent: 'center',
  },
  alignchild: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    gap: moderateScale(8),
    paddingHorizontal: horizontalScale(8),
  },
  bottomSheet: {
    flex: 1,
    alignItems: 'center',
    gap: moderateScale(32),
    paddingVertical: verticalScale(16),
  },
  values: {
    fontSize: CUSTOMFONTSIZE.h4,
    fontWeight: '400',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    color: CUSTOMCOLOR.black,
  },
  valuesContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    //flexDirection:'row',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    borderRadius: 4,
    backgroundColor: '#C6E3FF',
  },
  slotdelete: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //borderWidth:1,
    borderRadius: 5,
    borderColor: CUSTOMCOLOR.primary,
    backgroundColor: CUSTOMCOLOR.white,
    paddingHorizontal: horizontalScale(16),
  },
  deletedText: {
    fontFamily: CUSTOMFONTFAMILY.h4,
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
  },
  select1: {
    width: horizontalScale(240),
  },
  Close: {
    zIndex: 4,
    backgroundColor: 'transparent',
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: moderateScale(16),
  },
  data: {
    paddingHorizontal: horizontalScale(4),
    paddingVertical: verticalScale(4),
  },
  number: {
    fontSize: CUSTOMFONTSIZE.h2,
    color: CUSTOMCOLOR.black,
  },
  labeltext: {
    fontWeight: '400',
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  content: {
    paddingHorizontal: 24,
    //paddingVertical: 24,
    width: '100%',
    // alignItems: 'center',
    gap: moderateScale(8),
  },
  container: {
    flexGrow: 1,
    paddingVertical: verticalScale(20),
  },
  addslot: {
    alignSelf: 'flex-start',
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
  },
  radiogroup: {
    padding: moderateScale(16),
    flexDirection: 'row',
    gap: moderateScale(48),
    justifyContent: 'flex-start',
  },
  alignchild: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    // width: '100%',
    paddingHorizontal: horizontalScale(8),
    // paddingVertical: verticalScale(12),
  },
  clinic: {
    alignSelf: 'flex-start',
    paddingVertical: verticalScale(16),
    //width:"100%"
  },
  modalcontainer: {
    //borderWidth:1,
    margin: moderateScale(20),
    height: '100%',
    borderRadius: moderateScale(10),
  },
  slotadded: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //borderWidth:1,
    borderRadius: moderateScale(5),
    borderColor: CUSTOMCOLOR.primary,
    backgroundColor: CUSTOMCOLOR.white,
    paddingHorizontal: horizontalScale(16),
  },
  addedText: {
    fontFamily: CUSTOMFONTFAMILY.h4,
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
  },
  clsbtn: {
    zIndex: moderateScale(4),
    backgroundColor: 'transparent',
    // position: 'absolute',
    alignSelf: 'flex-end',
    padding: moderateScale(16),
  },
  save: {
    alignSelf: 'flex-end',
    bottom: 0,
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(8),
    top: 0,
  },
  clinicText: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h2,
    color: CUSTOMCOLOR.black,
    paddingVertical: verticalScale(4),
  },
  logo: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h4,
    fontWeight: 400,
    marginBottom: moderateScale(4),
  },
});

export default AddClinic;
