import React, {useState, useRef, useEffect, useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
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
import {launchImageLibrary} from 'react-native-image-picker';
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

const AddClinic = ({navigation}) => {
  const addressRef = useRef(null);
  const [apiStatus, setApiStatus] = useState({});
  const [visibleSlot, setVisibleSlot] = useState(true);
  const slotData = useSelector(state => state?.slotsData);
  const token = useSelector(state => state.authenticate.auth.access);
  const clinics = useSelector(state => state.clinic);

  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      Slotadded();
    }, [slotData]),
  );

  const [loading, setLoading] = useState(false);

  const Slotadded = () => {
    const m = slotData?.slots?.M?.length === 0;
    const t = slotData?.slots?.T?.length === 0;
    const w = slotData?.slots?.W?.length === 0;
    const th = slotData?.slots?.TH?.length === 0;
    const f = slotData?.slots?.F?.length === 0;
    const sa = slotData?.slots?.Sa?.length === 0;
    const su = slotData?.slots?.Su?.length === 0;
    console.log('........slot', m, t, w, th, f, sa, su);

    !(m && t && w && th && f && sa && su)
      ? setVisibleSlot(false)
      : setVisibleSlot(true);
  };

  const handleClear = () => {
    setVisibleSlot(true);
  };

  // useEffect(()=>{

  //   Slotadded()
  //   console.log(visibleSlot)
  // },[slotData])

  // const checkSlotAdded = Slotadded()

  // console.log(checkSlotAdded);

  const SuccesRef = useRef(null);
  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);

  console.log('slotData==========================', slotData?.slots);

  const [status, setStatus] = useState(false);

  const [selectedImage, setSelectedImage] = useState('');
  const [value, setValue] = useState({
    clinic: '',
    address: '',
    fees: '',
    // slots: [],
  });

  const Clinic_Data = {
    clinic_name: value.clinic,
    clinic_Address: value.address,
    clinic_photo_url: selectedImage,
    fees: parseInt(value.fees),
    slot: JSON.stringify(slotData.slots),
  };
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
        body: JSON.stringify(clinics?.clinics),
      });
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setApiStatus({status: 'success', message: 'Successfully created'});
        SuccesRef?.current?.snapToIndex(1);
        dispatch(headerStatus.headerStatus({index: 1, status: true}));
        setTimeout(() => {
          navigation.navigate('adduser');
        }, 1000);
        setLoading(false);
      } else {
        setApiStatus({status: 'warning', message: 'Enter all Values'});
        SuccesRef?.current?.snapToIndex(1);
        console.error('API call failed:', response.status, response);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setApiStatus({status: 'error', message: 'Please try again'});
      SuccesRef?.current?.snapToIndex(1);
      setLoading(false);
    }
  };
  const [showSlotChip, setShowSlotChip] = useState(false);

  const handlePlusIconClick = () => {
    if (value.clinic) {
      dispatch(addclinic_data(Clinic_Data));
    }
    setShowSlotChip(true);
    (value.clinic = ''), (value.address = ''), (value.fees = '');
  };
  console.log(slotData, '-------------------------------------------------');
  const onImagePress = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('response====>', response?.assets?.[0]?.base64);
        setSelectedImage(response?.assets?.[0]?.base64);
      }
    });
  };

  const progressData = useSelector(state => state.progress?.status);

  const handleChangeValue = (field, value) => {
    setValue(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleDeleteSlotChip = index => {
    console.log('...', index);
    const newClinics = clinics?.clinics?.filter((_, i) => i !== index);
    dispatch(updateclinics(newClinics));
    // setValue(prevValues => ({
    //   ...prevValues,
    //   slots: prevValues.slots.filter((_, i) => i !== index),
    // }));
  };

  const handleAddClinicData = () => {
    dispatch(addclinic_data(Clinic_Data));
  };

  console.log('clinics', '============', clinics);
  return (
    <View style={{flex: 1}}>
      <ProgresHeader progressData={progressData} />
      <ScrollView>
        <Keyboardhidecontainer>
          <View style={commonstyles.content}>
            <View style={styles.alignchild}>
              <View style={styles.alignchild}>
                <Text style={commonstyles.h1}>Add Clinic</Text>
                <AddImage
                  onPress={onImagePress}
                  encodedBase64={selectedImage}
                />
              </View>
            </View>
            <InputText
              label={Language[language]['clinic']}
              maxLength={30}
              placeholder="Clinic"
              value={value.clinic}
              setValue={value => handleChangeValue('clinic', value)}
            />
            <InputText
              label={Language[language]['address']}
              multiline={true}
              placeholder="address"
              value={value.address}
              setValue={value => handleChangeValue('address', value)}
            />
            {/* <View
              style={{
                alignSelf: 'flex-start',
                width: '100%',
                paddingHorizontal: 8,
              }}>
              <SelectorBtn
                label={Language[language]['address']}
                name="map-marker"
                onPress={() => {
                  addressRef?.current?.snapToIndex(1);
                }}
              />
            </View> */}
            <InputText
              label={Language[language]['fees']}
              placeholder="Consultation Fees"
              value={value.fees}
              setValue={value => handleChangeValue('fees', value)}
            />
            <View
              style={{
                alignSelf: 'flex-start',
                paddingHorizontal: 8,
                paddingVertical: 8,
              }}>
              <HButton
                label="Add Slots"
                onPress={() => navigation.navigate('createslot')}
              />
            </View>
            {!visibleSlot && (
              <View style={styles.slotadded}>
                <Text style={styles.addedText}>Slots are added!!!</Text>
                <PlusButton icon="close" size={12} onPress={handleClear} />
              </View>
            )}

            <View
              style={{
                alignSelf: 'flex-end',
                bottom: 0,
                paddingVertical: 8,
                paddingHorizontal: 8,
                top: 0,
              }}>
              <PlusButton
                icon="plus"
                onPress={() => {
                  handlePlusIconClick();
                  // handleAddClinicData();
                }}
              />
            </View>

            <View style={styles.clinic}>
              {value?.slots?.length > 0 && (
                <Text
                  style={{
                    fontFamily: CUSTOMFONTFAMILY.heading,
                    fontSize: CUSTOMFONTSIZE.h2,
                    color: CUSTOMCOLOR.black,
                    paddingVertical: 4,
                  }}>
                  Clinics
                </Text>
              )}

              {showSlotChip &&
                clinics?.clinics.map((item, index) => (
                  <View key={index} style={{margin: 5}}>
                    <SlotChip
                      type={<Text>Clinic: {item.clinic_name}</Text>}
                      onPress={() => handleDeleteSlotChip(index)}
                    />
                  </View>
                ))}
            </View>
            <View>
              <HButton
                label="Next"
                onPress={() => {
                  fetchData();
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
        backgroundStyle={'#fff'}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  radiogroup: {
    padding: 16,
    flexDirection: 'row',
    gap: 48,
    justifyContent: 'flex-start',
  },
  alignchild: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 8,
  },
  clinic: {
    alignSelf: 'flex-start',
    paddingVertical: 16,
    //width:"100%"
  },
  modalcontainer: {
    //borderWidth:1,
    margin: 20,
    height: '100%',
    borderRadius: 10,
  },
  slotadded: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //borderWidth:1,
    borderRadius: 5,
    borderColor: CUSTOMCOLOR.primary,
    backgroundColor: CUSTOMCOLOR.white,
    paddingHorizontal: 16,
  },
  addedText: {
    fontFamily: CUSTOMFONTFAMILY.h4,
    fontSize: 14,
    color: CUSTOMCOLOR.black,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default AddClinic;
