import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTSIZE,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {commonstyles} from '../styles/commonstyle';
import Keyboardhidecontainer from '../components/keyboardhidecontainer';
import InputText from '../components/inputext';
import HButton from '../components/button';
import AddImage from '../components/addimage';
import Option from '../components/option';
import {CONSTANTS} from '../utility/constant';
import {fetchApi} from '../api/fetchApi';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {BottomSheetView, StatusMessage, SelectorBtn} from '../components';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {URL} from '../utility/urls';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import {checkNumber} from '../utility/checks';
import DOBselect from '../components/dob';
import GalleryModel from '../components/GalleryModal';

const PatientCreate = ({navigation}) => {
  const token = useSelector(state => state.authenticate.auth.access);
  const [selected, setSelected] = useState('male');
  const [selectedAbha, setSelectedAbha] = useState(CONSTANTS.abhaOption[0]);
  const default_image = CONSTANTS.default_image;

  // console.log('====================================');
  // console.log('-----------default', default_image);
  // console.log('====================================');

  const handleOptions = value => {
    setSelected(value);
  };
  const selectedBtn = value => {
    setSelectedAbha(value);
  };

  const [name, setName] = useState('');
  const gender = selected;
  const [patient_phone_number, setPatient_Phone_number] = useState('');
  const [birth_date, setBirth_date] = useState('');
  const [age, setAge] = useState('');
  const [blood_group, setBlood_group] = useState('');
  const [spouse_name, setSpouse_nmae] = useState('');
  const [ABHA_ID, setABHA_ID] = useState('');
  const [aadhar_no, setAadhar_no] = useState('');
  const [address, setAddress] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formatDate, setFormatDate] = useState('');
  const formattedDate = date.toISOString().split('T')[0];

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
  const [value, setValue] = useState('');
  const HandleInput = () => {
    if (age) {
      setValue(age);
      setAge(age);
    } else {
      {
        open && setValue(formattedDate);
      }
    }
  };
  useEffect(() => {
    HandleInput();
  }, [date, age]);

  const HandleCheck = () => {
    if (value.length <= 3) {
      const current = parseInt(new Date().getFullYear()) - parseInt(value);
      console.log('current====>', `${current}-${'01'}-${'01'}`);
      setFormatDate(`${current}-${'01'}-${'01'}`);
    } else {
      setFormatDate(formattedDate);
    }
  };
  useEffect(() => {
    HandleCheck();
  }, [value]);

  const handleDate = () => {
    setOpen(!open);
  };

  const handleConfirm = selectedDate => {
    setDate(selectedDate);
    setValue(selectedDate);
  };

  const handleCancel = () => {
    setOpen(open);
  };
  const dayOfBirth = date.toISOString().split('T')[0].split('-')[2];
  const dayOfMonth = date.toISOString().split('T')[0].split('-')[1];
  const dayOfYear = date.toISOString().split('T')[0].split('-')[0];
  const DOB = `${dayOfBirth}-${dayOfMonth}-${dayOfYear}`;
  const current = parseInt(new Date().getFullYear()) - parseInt(age);
  const patientDetails = {
    patient_name: name,
    gender: gender,
    patient_phone_number: patient_phone_number,
    birth_date: formatDate,
    // age: age,
    bloodgroup: blood_group,
    spouse_name: spouse_name,
    // ABHA_ID: ABHA_ID,
    aadhar_no: aadhar_no,
    patient_address: address,
    patient_pic_url: selectedImage ? selectedImage : default_image,
  };

  const [apiStatus, setApiStatus] = useState({});
  const RoleRef = useRef(null);
  const SuccesRef = useRef(null);
  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);

  const patient_phone = patient_phone_number;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchApi(URL.addPatient, {
        method: 'POST',
        headers: {
          Prefer: '',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json, application/xml',
        },
        body: JSON.stringify(patientDetails),
      });
      if (response.ok) {
        const jsonData = await response.json();
        // console.log('---------------', jsonData);
        if (jsonData?.status === 'success') {
          setApiStatus({status: 'success', message: 'Successfully created'});
          SuccesRef?.current?.snapToIndex(1);
          setTimeout(() => {
            navigation.navigate('bookslot', {patient_phone});
          }, 1000);
          setName('');
          setPatient_Phone_number('');
          setAddress('');
          setAadhar_no('');
          setBlood_group('');
          setSpouse_nmae('');
          setAge();
          setLoading(false);
        } else {
          setApiStatus({status: 'warning', message: 'Enter all Values'});
          SuccesRef?.current?.snapToIndex(1);
          console.error('API call failed:', response.status, response);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setApiStatus({status: 'error', message: 'Please try again'});
      SuccesRef?.current?.snapToIndex(1);
      console.error('Error occurred:', error);
      setLoading(false);
    }
  };
  const [modal, setModal] = useState(false);
  const ModalVisible = () => {
    setModal(true);
  };

  return (
    <View style={{flex: moderateScale(1)}}>
      <ScrollView>
        <Keyboardhidecontainer>
          <View style={commonstyles.content}>
            <View style={styles.alignchild}>
              <AddImage onPress={ModalVisible} encodedBase64={selectedImage} />
            </View>
            {/* <View style={styles.CnfAbhaView}>
            {CONSTANTS.abhaOption.map((val, ind) => (
              <TouchableOpacity
                key={ind}
                style={[
                  styles.CnfAbha,
                  {
                    backgroundColor:
                      selectedAbha === val
                        ? CUSTOMCOLOR.primary
                        : CUSTOMCOLOR.white,
                    alignItems: 'center',
                  },
                ]}
                onPress={() => selectedBtn(val)}>
                <View>
                  <Text>{val}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View> */}
            <InputText
              required={true}
              label="Name"
              placeholder="Full Name"
              value={name}
              setValue={setName}
              doubleCheck={[true, false]}
              check={e => {
                var format =
                  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~11234567890]/;
                if (format.test(e)) {
                  return false;
                } else {
                  return true;
                }
              }}
            />
            <InputText
              required={true}
              label="Phone Number"
              placeholder="10 digit phone number"
              value={patient_phone_number}
              setValue={setPatient_Phone_number}
              keypad={'numeric'}
              maxLength={10}
              doubleCheck={[true, false]}
              check={checkNumber}
            />
            {/* <InputText
              label="Age"
              placeholder="eg:25"
              value={age}
              setValue={setAge}
              keypad={'numeric'}
              required={true}
            /> */}
            <View style={styles.btn}>
              <DOBselect
                required={true}
                label="Age/ Date of Birth"
                name="calendar"
                onPress={() => setOpen('to')}
                input={value}
                style={styles.DOBselect}
                setValue={setValue}
              />
            </View>
            <DatePicker
              modal
              open={open !== false}
              date={date}
              theme="auto"
              mode="date"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />

            <View style={styles.alignchild}>
              <Text style={styles.genderText}>Gender</Text>
              <View style={styles.radiogroup}>
                <Option
                  label="Male"
                  value="male"
                  selected={selected === 'male'}
                  onPress={() => handleOptions('male')}
                />
                <Option
                  label="Female"
                  value="female"
                  selected={selected === 'female'}
                  onPress={() => handleOptions('female')}
                />
                <Option
                  label="Others"
                  value="others"
                  selected={selected === 'others'}
                  onPress={() => handleOptions('others')}
                />
              </View>
            </View>
            {/* <View style={{width: '100%', paddingHorizontal: 8}}>
              <SelectorBtn
                required={true}
                label="Date of Birth"
                onPress={handleDate}
                name={'calendar'}
                input={DOB}
              />
              {open && (
                <DatePicker
                  modal
                  open={open}
                  date={date}
                  theme="auto"
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                />
              )}
            </View> */}
            <InputText
              label="Father/Husband Name"
              placeholder="Enter Father/husband Name"
              value={spouse_name}
              setValue={setSpouse_nmae}
            />
            <InputText
              label="Blood Group"
              placeholder="eg:O+"
              value={blood_group}
              setValue={setBlood_group}
            />
            <InputText
              required={true}
              label="Address"
              placeholder="Enter your address"
              value={address}
              setValue={setAddress}
            />

            <InputText
              label="Aadhar Number"
              placeholder="12-digit Aadhar Number"
              value={aadhar_no}
              setValue={setAadhar_no}
              keypad={'numeric'}
              doubleCheck={[true, false]}
              check={e => {
                var format = /[(A-Z)(a-z)]/;
                if (format.test(e)) {
                  return false;
                } else {
                  return true;
                }
              }}
            />
            <HButton
              label="Save"
              loading={loading}
              onPress={() => {
                if (patient_phone_number.length === 10 && value) {
                  fetchData();
                } else {
                  Alert.alert('"Warning"', '"Please Enter Correct Details"');
                }
              }}
            />

            {/* {selectedAbha === CONSTANTS.abhaOption[1] ? (
            <View style={styles.alignchild}>
              <InputText
                label="ABHA-Id"
                placeholder="Enter your ABHA-ID"
                value={ABHA_ID}
                setValue={setABHA_ID}
              />
              <View style={{left: '40%'}}>
                <HButton
                  label="Create Account"
                  onPress={() => navigation.navigate('bookslot')}
                />
              </View>
            </View>
          ) : null} */}
            {/* {selectedAbha === CONSTANTS.abhaOption[0] ? (
            <HButton
              label="Create ABHA ID"
              onPress={() => navigation.navigate('bookslot')}
            />
          ) : null} */}
          </View>
        </Keyboardhidecontainer>
      </ScrollView>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingTop: moderateScale(16),
  },
  genderText: {
    fontFamily: CUSTOMFONTFAMILY.body,
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h4,
    fontWeight: '400',
  },
  CnfAbhaView: {
    flexDirection: 'row',
    width: '100%',
    height: moderateScale(30),
    justifyContent: 'space-around',
  },
  CnfAbha: {
    width: '50%',
    height: moderateScale(30),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    justifyContent: 'center',
  },
  DOBselect: {
    width: '100%',
    paddingHorizontal: horizontalScale(8),
  },
  btn: {
    alignSelf: 'flex-start',
    width: '100%',
    paddingHorizontal: horizontalScale(8),
  },
});
export default PatientCreate;
