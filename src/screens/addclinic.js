import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  startTransition,
} from 'react';
import {Text, View, StyleSheet, Alert, Modal} from 'react-native';
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
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {updateslots} from '../redux/features/slots/slotData';
// import {updateAddress} from '../redux/features/profiles/clinicAddress';
import GalleryModel from '../components/GalleryModal';
import {updateAddress} from '../redux/features/profiles/clinicAddress';
import {mode} from '../redux/features/prescription/prescribeslice';

const AddClinic = ({navigation}) => {
  const addressRef = useRef(null);
  const GlRef = useRef(null);
  const [apiStatus, setApiStatus] = useState({});
  const [visibleSlot, setVisibleSlot] = useState(true);
  const slotData = useSelector(state => state?.slotsData);
  const token = useSelector(state => state.authenticate.auth.access);
  const clinics = useSelector(state => state.clinic);
  const route = useRoute();
  const address = useSelector(state => state?.address?.address);
  const {prevScrn} = route.params;
  const [cnFess, setCnFees] = useState('');

  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      Slotadded();
    }, [slotData]),
  );

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
    const m = slotData?.slots?.M?.length === 0;
    const t = slotData?.slots?.T?.length === 0;
    const w = slotData?.slots?.W?.length === 0;
    const th = slotData?.slots?.TH?.length === 0;
    const f = slotData?.slots?.F?.length === 0;
    const sa = slotData?.slots?.Sa?.length === 0;
    const su = slotData?.slots?.Su?.length === 0;

    !(m && t && w && th && f && sa && su)
      ? setVisibleSlot(false)
      : setVisibleSlot(true);
  };

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
    slot: JSON.stringify(slotData.slots),
    clinic_phone_number: value.phone,
    clinic_logo_url: selectedLogo ? selectedLogo : CONSTANTS.default_image,
  };

  const ResetClinicRedux = () => {
    const ResetClinic = [];
    dispatch(updateclinics(ResetClinic));
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
      if (response.status === HttpStatusCode.Ok) {
        const jsonData = await response.json();
        if (jsonData.status === 'success') {
          setApiStatus({status: 'success', message: 'Successfully created'});
          SuccesRef?.current?.snapToIndex(1);
          dispatch(headerStatus({index: 1, status: true}));
          {
            prevScrn === 'account'
              ? setTimeout(() => {
                  navigation.navigate('tab');
                }, 1000)
              : setTimeout(() => {
                  navigation.navigate('adduser', {prevScrn1});
                }, 1000);
          }
          setTimeout(() => {
            SuccesRef?.current?.snapToIndex(0);
          }, 2000);
          setLoading(false);
          ResetClinicRedux();
          // SuccesRef?.current?.snapToIndex(0);
        } else {
          setApiStatus({status: 'warning', message: jsonData.message});
          SuccesRef?.current?.snapToIndex(1);
          console.error('API call failed:', response.status, response);
          setLoading(false);
        }
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
      if (!visibleSlot) {
        dispatch(addclinic_data(Clinic_Data));
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
        setCnFees('')
      } else {
        Alert.alert('Warning', '"Please Add Slots Details Also"');
      }
    } else {
      Alert.alert('Warning', '"Please Check Once Again"');
    }
  };

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

  const handleDeleteSlotChip = index => {
    const newClinics = clinics?.clinics?.filter((_, i) => i !== index);
    dispatch(updateclinics(newClinics));
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

  return (
    <View style={{flex: 1}}>
      {prevScrn !== 'account' && (
        <View>
          <ProgresHeader progressData={progressData} />
        </View>
      )}

      {prevScrn === 'account' && (
        <View>
          <PlusButton
            icon="close"
            style={styles.clsbtn}
            color={CUSTOMCOLOR.primary}
            size={moderateScale(32)}
            onPress={() => navigation.navigate('tab')}
          />
        </View>
      )}

      <ScrollView>
        <Keyboardhidecontainer>
          <View style={commonstyles.content}>
            <View style={styles.alignchild}>
              <View style={styles.alignchild}>
                <Text style={commonstyles.h1}>Add Clinic</Text>
                <AddImage
                  onPress={() => {
                    // onImagePress();
                    // openCamera();
                    ModalVisible();
                  }}
                  encodedBase64={selectedImage}
                />
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
            {/* <InputText
              required={true}
              label={Language[language]['address']}
              multiline={true}
              placeholder="Address"
              value={value.address}
              setValue={value => handleChangeValue('address', value)}
            /> */}
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
                paddingHorizontal: horizontalScale(8)
              }}>
              <Text style={styles.labeltext}>
                {Language[language]['fees']}
              </Text>
              <View style={{flexDirection:'row',gap:moderateScale(8)}}>
              {CONSTANTS.clinic_fees?.map((val, ind) => (
                
                  
                  <SelectorBtn
                  select={{
                    backgroundColor:
                      cnFess === val ? CUSTOMCOLOR.primary : CUSTOMCOLOR.white,
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
                value={value.fees}
                setValue={value => handleChangeValue('fees', value)}
                // keypad="numeric"
              />
            ) : null}
            <View style={styles.alignchild}>
              <Text style={styles.logo}>Clinic Logo</Text>
              <AddImage
                onPress={() => LogoVisible()}
                encodedBase64={selectedLogo}
              />
            </View>
            <View style={styles.addslot}>
              <HButton
                label="Add Slots"
                onPress={() => navigation.navigate('createslot')}
              />
            </View>
            {!visibleSlot && (
              <View style={styles.slotadded}>
                <Text style={styles.addedText}>Slots are added!!!</Text>
                <PlusButton
                  icon="close"
                  size={moderateScale(12)}
                  onPress={handleClear}
                />
              </View>
            )}

            <View style={styles.save}>
              <HButton
                label="save"
                onPress={() => {
                  handlePlusIconClick();
                  // handleAddClinicData();
                }}
              />
            </View>

            <View style={styles.clinic}>
              {value?.slots?.length > 0 && (
                <Text style={styles.clinicText}>Clinics</Text>
              )}

              {showSlotChip &&
                clinics?.clinics.map((item, index) => (
                  <View key={index} style={{margin: moderateScale(5)}}>
                    <SlotChip
                      type={<Text>Clinic: {item.clinic_name}</Text>}
                      onPress={() => handleDeleteSlotChip(index)}
                    />
                  </View>
                ))}
            </View>
            <View>
              <HButton
                // rightIcon='arrow-right-thin'
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

      {modal && (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labeltext: {
    fontWeight: '400',
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
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
    width: '100%',
    paddingHorizontal: horizontalScale(8),
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
