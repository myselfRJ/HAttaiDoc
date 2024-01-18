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
import Geolocation from '@react-native-community/geolocation';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {updateslots, addslots} from '../redux/features/slots/slotData';
// import {updateAddress} from '../redux/features/profiles/clinicAddress';
import GalleryModel from '../components/GalleryModal';
import {
  addAddress,
  updateAddress,
} from '../redux/features/profiles/clinicAddress';
import {mode} from '../redux/features/prescription/prescribeslice';
import SelectionTab from '../components/selectiontab';
import moment from 'moment';
import {checkNumber} from '../utility/checks';
import {handleCamera, handleGallery, showToast} from '../utility/const';

const AddClinic = ({navigation}) => {
  const addressRef = useRef(null);
  const GlRef = useRef(null);
  const google_api = useSelector(state => state?.phone?.googleApi);
  const [phramcyPhone, setPharmacyPhone] = useState('');
  const [apiStatus, setApiStatus] = useState({});
  const [visibleSlot, setVisibleSlot] = useState(true);
  const slotData = useSelector(state => state?.slotsData);
  const token = useSelector(state => state.authenticate.auth.access);
  const {phone} = useSelector(state => state?.phone?.data);
  const route = useRoute();
  const address = useSelector(state => state?.address?.address);
  // const {prevScrn} = route.params;
  const [cnFess, setCnFees] = useState('');
  const clinics = useSelector(state => state.clinic?.clinics);
  const [show, setShow] = useState(false);
  const [logoShow, setLogoShow] = useState(false);
  const dispatch = useDispatch();
  const [mergedSlots, setMergedSlots] = useState({});
  const [bottom, setBottom] = useState(false);
  const processClinics = () => {
    try {
      const mergedData = clinics?.reduce((acc, clinic) => {
        const AllslotData = JSON.parse(clinic?.slot_data?.slot);
        const keys = Object.keys(AllslotData);
        keys.forEach(key => {
          if (acc[key]) {
            acc[key].push(...AllslotData[key]);
          } else {
            acc[key] = [...AllslotData[key]];
          }
        });
        return acc;
      }, {});
      setMergedSlots(mergedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    processClinics();
  }, [clinics, phone]);

  const [slots, setSlots] = useState({
    M: [],
    T: [],
    W: [],
    TH: [],
    F: [],
    Sa: [],
    Su: [],
  });
  // console.log('pharmach',phramcyPhone);
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

  const [status, setStatus] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [ctype, setCtype] = useState(false);
  const [slottype, setSlotType] = useState(false);
  const [value, setValue] = useState({
    clinic: '',
    address: '',
    phone: '',
    fees: '',
    // slots: [],
  });
  const prevScrn = 'account';
  const Clinic_Data = [
    {
      clinic_name: value.clinic,
      clinic_Address: address,
      clinic_photo_url: selectedImage ? selectedImage : CONSTANTS.default_image,
      fees: cnFess === 'others' ? parseInt(value.fees) : parseInt(cnFess),
      slot: JSON.stringify(slots),
      clinic_phone_number: value.phone,
      clinic_logo_url: selectedLogo ? selectedLogo : CONSTANTS.default_image,
      pharmacyPhone: phramcyPhone ? phramcyPhone : '',
    },
  ];

  const ResetClinicRedux = () => {
    const ResetClinic = [];
    dispatch(updateclinics(ResetClinic));
  };
  // const prevScrn = 'undefine'
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchApi(URL.addclinic, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(Clinic_Data),
      });
      if (response.status === HttpStatusCode.Ok) {
        const jsonData = await response.json();
        if (jsonData.status === 'success') {
          setApiStatus({status: 'success', message: 'Successfully created'});
          setBottom(true);
          dispatch(headerStatus({index: 1, status: true}));
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
          setLoading(false);
          // ResetClinicRedux();
          // ;
        } else {
          setApiStatus({status: 'warning', message: jsonData.message});
          setBottom(true);
          console.error('API call failed:', response.status, response);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setApiStatus({status: 'error', message: 'Please try again'});
      setBottom(true);
      setLoading(false);
    }
  };
  const [showSlotChip, setShowSlotChip] = useState(false);

  const onImagePress = async () => {
    try {
      const data = await handleGallery();
      setSelectedImage(data?.base64);
      setShow(!show);
    } catch (error) {
      console.error('Error capturing data:', error);
    }
    setModal(false);
  };

  const openCamera = async () => {
    try {
      const data = await handleCamera();
      setSelectedImage(data?.base64);
    } catch (error) {
      console.error('Error capturing data:', error);
    }
    setModal(false);
  };
  const LogoCamera = async () => {
    try {
      const data = await handleCamera();
      setSelectedLogo(data?.base64);
      setModal(false);
    } catch (error) {
      console.error('Error capturing data:', error);
    }
    setlogo(false);
  };
  const onLogoPress = async () => {
    try {
      const data = await handleGallery();
      setSelectedLogo(data?.base64);
      setModal(false);
      setLogoShow(!logoShow);
    } catch (error) {
      console.error('Error capturing data:', error);
    }
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
  const [selectedConsultValue, setConsultValue] = useState(consultType[0]);
  const [selectedDurationValue, setDurationValue] = useState(durationMins[1]);

  const [selectedDay, setSelectedDay] = useState('M');

  // const DaySelection = index => {
  //   const isSelected = selectedDay.includes(index);
  //   if (isSelected) {
  //     setSelectedDay(selectedDay.filter(i => i !== index));
  //   } else {
  //     setSelectedDay([...selectedDay, index]);
  //   }
  // };

  // const handleSaveSlotData = () => {
  //   if (
  //     slots?.M.length > 0 ||
  //     slots?.T.length > 0 ||
  //     slots?.W.length > 0 ||
  //     slots?.TH.length > 0 ||
  //     slots?.F.length > 0 ||
  //     slots?.Sa.length > 0 ||
  //     slots?.Su.length > 0
  //   ) {
  //     dispatch(addslots(slots));
  //   }
  //   navigation.goBack();
  // };

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
    setSlotType(false);
    setShows(!shows);
  };

  const handleDurationSelect = value => {
    setDurationValue(value);
    slotDurationRef?.current?.snapToIndex(0);
    setShowDuration(!showduration);
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

  const [errorSlots, setErrorSlots] = useState();
  useEffect(() => {
    clinics?.map((item, index) => {
      if (item[0]?.slot_data?.slot) {
        try {
          const parsedSlot = JSON.parse(item[0]?.slot_data?.slot);
          setErrorSlots(parsedSlot);
        } catch (error) {
          console.error('JSON parsing error:', error);
        }
      }
    });
  }, []);
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

      const AllClinicSlotConflict = mergedSlots[selectedDay]?.some(
        slot =>
          (newSlot.fromTime >= slot.fromTime &&
            newSlot.fromTime < slot.toTime) ||
          (newSlot.toTime > slot.fromTime && newSlot.toTime <= slot.toTime),
      );

      const conflictingSlotExists = slots[selectedDay].some(
        slot =>
          (newSlot.fromTime >= slot.fromTime &&
            newSlot.fromTime < slot.toTime) ||
          (newSlot.toTime > slot.fromTime && newSlot.toTime <= slot.toTime),
      );
      if (!AllClinicSlotConflict && !conflictingSlotExists) {
        setAllSlots(prev => [...prev, newSlot]);
        setSlots(prevSlots => ({
          ...prevSlots,
          [selectedDay]: [...prevSlots[selectedDay], newSlot],
        }));
        setConsultValue(consultType[0]);
        setDurationValue(durationMins[0]);
      } else {
        // Alert.alert(
        //   'Warning',
        //   'A slot with conflicting time already exists. or Already these slot added in any clinic',
        // );
        showToast('error', 'A slot with conflicting time already exists');
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
      Sa: slots.M?.map((slot, index) => ({
        ...slot,
        index: `Sa-${index}`,
        day: 'Saturday',
      })),
      Su: slots.M?.map((slot, index) => ({
        ...slot,
        index: `Su-${index}`,
        day: 'Sunday',
      })),
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
      // Alert.alert('Warning', `Slots are deleted for ${weekdays[dayTodelete]}`);
      showToast('info', `Slots are deleted for ${weekdays[dayTodelete]}`);
      return updatedSlots;
    });
    setMergedSlots(prevSlots => {
      const updatedSlots = {};
      for (const day in prevSlots) {
        updatedSlots[day] = prevSlots[day].filter(slot => slot.index !== index);
      }
      // Alert.alert('Warning', `Slots are deleted for ${weekdays[dayTodelete]}`);
      return updatedSlots;
    });
  };

  const onDaySelectionChange = value => {
    setSelectedDay(value);
  };
  const onDeleteImage = () => {
    setSelectedImage('');
    setModal(false);
    setShow(false);
  };
  const onDeleteLogo = () => {
    setSelectedLogo('');
    setlogo(false);
    setLogoShow(false);
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
    const Slots = {
      M: [],
      T: [],
      W: [],
      TH: [],
      F: [],
      Sa: [],
      Su: [],
    };
    setSlots(Slots);
    setMergedSlots(Slots);
    setselectSlot([]);
    // Alert.alert('Success', 'All Slots are cleared');
    showToast('info', 'All Slots are cleared');
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
    setMergedSlots(prevSlots => {
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
  const {id} = route.params;
  const fetchClinic_slots = async () => {
    const response = await fetchApi(URL.get_clinic_slots_by_id(id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();

      setSlots(JSON.parse(jsonData.data?.slot));
      const clinicdata = {
        clinic: jsonData.data?.clinic_name,
        address: jsonData.data?.clinic_Address,
        phone: jsonData.data?.clinic_phone_number,
        fees: jsonData.data?.fees,
      };
      setValue(clinicdata);
      setCnFees(jsonData.data?.fees);
      setSelectedImage(jsonData.data?.clinic_photo_url);
      setSelectedLogo(jsonData.data?.clinic_logo_url);
      setPharmacyPhone(jsonData.data?.pharmacyPhone);
      dispatch(addAddress(jsonData?.data?.clinic_Address));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  const checkLocationPermission = async () => {
    const permissionStatus = await check(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    if (permissionStatus !== RESULTS.GRANTED) {
      const requestStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (requestStatus === RESULTS.GRANTED) {
        fetchCurrentLocation();
      }
    } else {
      fetchCurrentLocation();
    }
  };
  const fetchCurrentLocation = () => {
    Geolocation.getCurrentPosition(function (position) {
      const {latitude, longitude} = position.coords;
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${google_api}`,
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(data => dispatch(addAddress(data?.results[0].formatted_address)));
    });
  };
  useEffect(() => {
    if (id) {
      fetchClinic_slots();
    }
    checkLocationPermission();
  }, []);

  const Update_Clinic_slots = async () => {
    const updateClinic = {
      clinic_name: value.clinic,
      clinic_Address: address,
      doctor_phone_number: phone,
      clinic_phone_number: value.phone,
      clinic_photo_url: selectedImage,
      clinic_logo_url: selectedLogo,
      fees: cnFess === 'others' ? parseInt(value.fees) : parseInt(cnFess),
      pharmacyPhone: phramcyPhone ? phramcyPhone : '',
    };
    const slots_data = {
      slot: JSON.stringify(slots),
      clinic_id: id,
    };
    try {
      const response = await fetchApi(URL.update_clinic(id), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(updateClinic),
      });
      if (response.ok) {
        const jsonData = await response.json();
        if (jsonData.status === 'success') {
        } else {
          setApiStatus({status: 'warning', message: jsonData?.message});
          setBottom(true);
        }
      } else {
        setApiStatus({status: 'error', message: `${response.status}`});
        setBottom(true);
      }
      try {
        const response = await fetchApi(URL.update_slots(id), {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(slots_data),
        });
        if (response.ok) {
          const jsonData = await response.json();
          if (jsonData.status === 'success') {
            setApiStatus({
              status: 'success',
              message: 'Successfully Updated',
            });
            setBottom(true);
            setTimeout(() => {
              navigation.goBack();
            }, 2000);
          } else {
            setApiStatus({status: 'warning', message: jsonData?.message});
            setBottom(true);
          }
        } else {
          console.error('API call failed:', response.status);
        }
      } catch (error) {
        setApiStatus({status: 'error', message: error});
        setBottom(true);
      }
    } catch (error) {
      setApiStatus({status: 'error', message: error});
      setBottom(true);
    }
  };

  const handlePlusIconClick = () => {
    if (value.clinic) {
      if (!visibleSlot) {
        {
          id !== undefined ? Update_Clinic_slots() : fetchData();
        }
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
        // navigation.goBack();
      } else {
        // Alert.alert('Warning', '"Please Add Slots Details Also"');
        showToast('error', 'Please Add Slots Details Also');
      }
    } else {
      // Alert.alert('Warning', '"Please Enter All Details"');
      showToast('error', 'Please Enter All Details');
    }
  };
  const [shows, setShows] = useState(false);
  const [showduration, setShowDuration] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: horizontalScale(24),
        paddingVertical: verticalScale(12),
        backgroundColor: CUSTOMCOLOR.white,
      }}>
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
      <View style={styles.alignchild}>
        <Text style={commonstyles.h1}>
          {id !== undefined ? 'Update Clinic' : 'Add Clinic'}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          // borderWidth:1,
          // gap:verticalScale(16),
          paddingBottom: verticalScale(120),
        }}>
        <Keyboardhidecontainer>
          <View style={styles.content}>
            <InputText
              required={true}
              label={Language[language]['clinic']}
              maxLength={50}
              placeholder="Clinic"
              value={value.clinic}
              setValue={value => handleChangeValue('clinic', value)}
            />
            <View
              style={{
                // alignSelf: 'flex-start',
                width: '100%',
                // borderWidth:1,

                // paddingHorizontal: horizontalScale(8),
              }}>
              <SelectorBtn
                label={Language[language]['address']}
                selectContainer={{paddingVertical: 0}}
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
                // borderWidth:1,
                flexDirection: 'row',
                gap: horizontalScale(64),
                alignSelf: 'flex-start',
              }}>
              <View style={styles.alignchild}>
                <Text style={styles.logo}>Clinic Photo</Text>
                <AddImage
                  name={'home-plus'}
                  onPress={() => ModalVisible()}
                  encodedBase64={selectedImage}
                />
              </View>
              <View style={styles.alignchild}>
                <Text style={styles.logo}>Clinic Logo</Text>
                <AddImage
                  name={'star-box'}
                  onPress={() => setlogo(!logo)}
                  encodedBase64={selectedLogo}
                />
              </View>
            </View>
            <InputText
              label={Language[language]['phone_number']}
              placeholder="Enter clinic phone number"
              value={value.phone}
              required={true}
              setValue={value => handleChangeValue('phone', value)}
              // doubleCheck={[true, false]}
              maxLength={15}
              numeric={true}
              // check={checkNumber}
              // check={e => {
              //   var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~a-zA-Z]/;
              //   if (format.test(e)) {
              //     return false;
              //   } else {
              //     return true;
              //   }
              // }}
            />
            <View
              style={{
                // flexDirection: 'row',

                alignSelf: 'flex-start',
                // paddingHorizontal: horizontalScale(8),
              }}>
              <Text style={styles.labeltext}>{Language[language]['fees']}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: moderateScale(8),
                  paddingTop: moderateScale(2),
                }}>
                {CONSTANTS.clinic_fees?.map((val, ind) => (
                  <SelectorBtn
                    select={{
                      backgroundColor:
                        cnFess == val ? CUSTOMCOLOR.primary : CUSTOMCOLOR.white,
                    }}
                    inputstyle={{
                      color:
                        cnFess == val ? CUSTOMCOLOR.white : CUSTOMCOLOR.black,
                    }}
                    input={val}
                    key={ind}
                    onPress={() => setCnFees(val)}
                  />
                ))}
              </View>
            </View>
            {cnFess == 'others' ? (
              <InputText
                placeholder="Enter Fees"
                label="Fees"
                value={value.fees}
                setValue={value => handleChangeValue('fees', value)}
                // keypad="numeric"
              />
            ) : null}
            <InputText
              // required={true}
              label="Pharmacy WhatsApp No"
              placeholder="Eg : 9999999999"
              value={phramcyPhone}
              setValue={setPharmacyPhone}
            />
            <View
              style={{
                gap: verticalScale(8),
                // paddingHorizontal: horizontalScale(8),
              }}>
              <Text style={[styles.labeltext, {fontWeight: '700'}]}>
                Add Slots{' '}
              </Text>
              <View
                style={{
                  padding: moderateScale(24),
                  backgroundColor: CUSTOMCOLOR.white,
                  borderWidth: 0.5,
                  borderColor: CUSTOMCOLOR.primary,
                  borderRadius: 4,
                  shadowColor: CUSTOMCOLOR.primary,
                  // shadowOffset: {width: 4, height: 4},
                }}>
                <View style={{gap: verticalScale(8)}}>
                  <View style={styles.dayselector}>
                    <SelectionTab
                      slots={slots?.M?.length > 0}
                      label="M"
                      selected={selectedDay === 'M'}
                      onPress={() => onDaySelectionChange('M')}
                    />

                    <SelectionTab
                      slots={slots?.T?.length > 0}
                      label="T"
                      selected={selectedDay === 'T'}
                      onPress={() => onDaySelectionChange('T')}
                    />

                    <SelectionTab
                      slots={slots?.W?.length > 0}
                      label="W"
                      selected={selectedDay === 'W'}
                      onPress={() => onDaySelectionChange('W')}
                    />

                    <SelectionTab
                      slots={slots?.TH?.length > 0}
                      label="TH"
                      selected={selectedDay === 'TH'}
                      onPress={() => onDaySelectionChange('TH')}
                    />

                    <SelectionTab
                      slots={slots?.F?.length > 0}
                      label="F"
                      selected={selectedDay === 'F'}
                      onPress={() => onDaySelectionChange('F')}
                    />

                    <SelectionTab
                      slots={slots?.Sa?.length > 0}
                      label="Sa"
                      selected={selectedDay === 'Sa'}
                      onPress={() => onDaySelectionChange('Sa')}
                    />

                    <SelectionTab
                      slots={slots?.Su?.length > 0}
                      label="Su"
                      selected={selectedDay === 'Su'}
                      onPress={() => onDaySelectionChange('Su')}
                    />
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
                    <View>
                      <SelectorBtn
                        select={styles.select1}
                        label="Type"
                        name={shows === true ? 'chevron-up' : 'chevron-down'}
                        onPress={() => {
                          // slotTypeRef?.current?.snapToIndex(1);
                          setShows(!shows);
                        }}
                        input={selectedConsultValue}
                      />

                      {shows &&
                        (consultType?.length > 0 ? (
                          <View
                            style={{
                              borderWidth: 0.5,
                              borderColor: CUSTOMCOLOR.primary,
                              borderRadius: moderateScale(1),
                            }}>
                            {consultType?.map((item, index) => (
                              <TouchableOpacity
                                key={index}
                                style={{
                                  paddingHorizontal: horizontalScale(8),
                                  paddingVertical: verticalScale(8),
                                }}
                                onPress={() => handleTypeSelect(item)}>
                                <Text
                                  style={{
                                    color: CUSTOMCOLOR.black,
                                    fontSize: CUSTOMFONTSIZE.h3,
                                  }}>
                                  {item}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        ) : null)}
                    </View>
                    <View>
                      <SelectorBtn
                        select={styles.select1}
                        label="Duration"
                        name={
                          showduration === true ? 'chevron-up' : 'chevron-down'
                        }
                        onPress={() => {
                          // slotDurationRef?.current?.snapToIndex(1);
                          setShowDuration(!showduration);
                        }}
                        input={<Text>{selectedDurationValue} Mins</Text>}
                      />
                      {showduration &&
                        (durationMins?.length > 0 ? (
                          <View
                            style={{
                              borderWidth: 0.5,
                              borderColor: CUSTOMCOLOR.primary,
                              borderRadius: moderateScale(1),
                            }}>
                            {durationMins?.map((item, index) => (
                              <TouchableOpacity
                                key={index}
                                style={{
                                  paddingHorizontal: horizontalScale(16),
                                  paddingVertical: verticalScale(8),
                                }}
                                onPress={() => handleDurationSelect(item)}>
                                <Text
                                  style={{
                                    color: CUSTOMCOLOR.black,
                                    fontSize: CUSTOMFONTSIZE.h3,
                                  }}>
                                  {item} Mins
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        ) : null)}
                    </View>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <HButton
                      size={moderateScale(16)}
                      label="Add"
                      icon="plus"
                      type={'addtype'}
                      textStyle={{fontSize: CUSTOMFONTSIZE.h3}}
                      btnstyles={{
                        paddingHorizontal: horizontalScale(12),
                        paddingVertical: verticalScale(8),
                      }}
                      onPress={() => {
                        const isOk = handlewarnings();
                        if (isOk) {
                          handleAddSlot();
                        } else {
                          // Alert.alert(
                          //   'Warning',
                          //   '"From time" and "To time" are same',
                          // );
                          showToast(
                            'error',
                            '"From time" and "To time" are same',
                          );
                        }
                      }}
                    />
                  </View>
                </View>

                {/* <SelectorBtn
                  input={'View Slots'}
                  name={visible ? 'chevron-up' : 'chevron-down'}
                  onPress={() => setVisible(!visible)}
                /> */}
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    // borderWidth: 1,
                    paddingVertical: verticalScale(8),
                    paddingTop: verticalScale(8),
                  }}>
                  {!visibleSlot ? (
                    <Text style={[styles.labeltext, {fontWeight: '700'}]}>
                      View Slots
                    </Text>
                  ) : null}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}></View>
                  <View style={{flexDirection: 'row', gap: moderateScale(4)}}>
                    {slots && selectSlot.length > 1 && (
                      <HButton
                        color={CUSTOMCOLOR.primary}
                        label="Delete"
                        onPress={() => handleSelectedDelete(selectSlot)}
                        btnstyles={{
                          backgroundColor: CUSTOMCOLOR.delete,
                          paddingHorizontal: horizontalScale(12),
                          paddingVertical: verticalScale(8),
                        }}
                        textStyle={{
                          color: CUSTOMCOLOR.white,
                          fontSize: CUSTOMFONTSIZE.h4,
                        }}
                      />
                    )}
                    {Object.values(slots).some(
                      daySlots => daySlots.length > 0,
                    ) && (
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: horizontalScale(12),
                        }}>
                        <HButton
                          color={CUSTOMCOLOR.primary}
                          label="Clear All"
                          onPress={handleClearAllSlots}
                          btnstyles={{
                            // borderWidth:0.5,
                            // borderColor:CUSTOMCOLOR.primary,
                            backgroundColor: CUSTOMCOLOR.white,
                            paddingHorizontal: horizontalScale(12),
                            paddingVertical: verticalScale(8),
                          }}
                          textStyle={{
                            color: CUSTOMCOLOR.primary,
                            fontSize: CUSTOMFONTSIZE.h4,
                          }}
                        />
                        {slots.M.length > 0 ? (
                          <HButton
                            color={CUSTOMCOLOR.white}
                            label="Add to All days"
                            onPress={() => handleAddSlotCopyMonday()}
                            btnstyles={{
                              backgroundColor: CUSTOMCOLOR.primary,
                              paddingHorizontal: horizontalScale(12),
                              paddingVertical: verticalScale(8),
                            }}
                            textStyle={{
                              color: CUSTOMCOLOR.white,
                              fontSize: CUSTOMFONTSIZE.h4,
                            }}
                          />
                        ) : null}
                      </View>
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
                              : CUSTOMCOLOR.backgroundColor,
                          }}
                        />
                      </Pressable>
                    )),
                  )}
                </View>
              </View>
            </View>
          </View>
        </Keyboardhidecontainer>
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          position: 'absolute',
          alignSelf: 'center',
          alignItems: 'center',
          bottom: verticalScale(24),
        }}>
        <HButton
          btnstyles={{
            backgroundColor:
              value.clinic && value.phone && address && !visibleSlot
                ? CUSTOMCOLOR.primary
                : CUSTOMCOLOR.disable,
          }}
          label="Save"
          onPress={() => {
            handlePlusIconClick();
          }}
          loading={loading}
        />
      </View>
      {/* <BottomSheetView
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
      </BottomSheetView> */}
      <BottomSheetView
        visible={bottom}
        setVisible={setBottom}
        status={apiStatus.status}
        message={apiStatus.message}
      />
      {/* <BottomSheetView
        visible={ctype}
        setVisible={setCtype}
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
        visible={slottype}
        setVisible={setSlotType}
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
      </BottomSheetView> */}
      {/* {modal && (
        <GalleryModel
          visible={modal}
          Close={setModal}
          // closeModal={()=> setModal(false)}
          OnGallery={onImagePress}
          OnCamera={openCamera}
          // onPress={()=>setModal(false)}
          // dismiss={()=>setModal(false)}
        />
      )} */}

      {modal && (
        <View>
          <GalleryModel
            visible={modal}
            Close={setModal}
            OnGallery={onImagePress}
            OnCamera={openCamera}
            // delete={show}
            // OnDelete={onDeleteImage}
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
            // delete={logoShow}
            // OnDelete={onDeleteLogo}
          />
        </View>
      )}
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
    justifyContent: 'flex-start',
    gap: moderateScale(8),
  },
  ShowSchedule: {
    gap: moderateScale(8),
  },
  selector: {
    flexDirection: 'row',
    gap: moderateScale(64),
    width: '100%',
    justifyContent: 'flex-start',
  },
  alignchild: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    // gap: moderateScale(8),
    borderWidth: 1,
    // paddingHorizontal: horizontalScale(8),
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
    // paddingHorizontal: horizontalScale(16),
    // paddingVertical: verticalScale(8),
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
    // paddingHorizontal: horizontalScale(16),
  },
  deletedText: {
    fontFamily: CUSTOMFONTFAMILY.h4,
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
    // paddingHorizontal: horizontalScale(16),
    // paddingVertical: verticalScale(16),
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
    // fontWeight: '600',
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  content: {
    //paddingVertical: 24,
    width: '100%',
    // alignItems: 'center',
    gap: verticalScale(16),
  },
  container: {
    flexGrow: 1,
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
    // paddingHorizontal: horizontalScale(8),
    // paddingVertical: verticalScale(12),
  },
  clinic: {
    alignSelf: 'flex-start',
    // paddingVertical: verticalScale(16),
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
    // paddingHorizontal: horizontalScale(16),
  },
  addedText: {
    fontFamily: CUSTOMFONTFAMILY.h4,
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    // paddingHorizontal: horizontalScale(16),
    // paddingVertical: verticalScale(16),
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
    // paddingHorizontal: horizontalScale(8),
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
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: 400,
    marginBottom: moderateScale(4),
  },
});

export default AddClinic;
