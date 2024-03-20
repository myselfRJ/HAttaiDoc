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
import {handleCamera, handleGallery} from '../utility/const';

const PatientCreate = ({navigation, route}) => {
  const {phoneRoute} = route.params;
  const {patient_data} = route.params;
  const {phone} = useSelector(state => state?.phone?.data);

  const token = useSelector(state => state.authenticate.auth.access);
  const [selected, setSelected] = useState('male');
  const [check, setCheck] = useState('');
  const [selectedAbha, setSelectedAbha] = useState(CONSTANTS.abhaOption[0]);
  const default_image = CONSTANTS.default_image;

  const handleOptions = value => {
    setSelected(value);
  };
  const handleCheck = value => {
    setCheck(value);
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
  const [spouseBloodGroup, setSpouseBloodGrp] = useState('');
  const [find, setFind] = useState([]);
  const [refer, setRefer] = useState('');
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
  const [reference_id, setReference_id] = useState('');

  const onImagePress = async () => {
    try {
      const data = await handleGallery();
      setSelectedImage(data?.base64);
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

  const [value, setValue_Age] = useState('');
  console.log(value);
  useEffect(() => {
    if (patient_data) {
      setSelectedImage(patient_data?.patient_pic_url);
      setName(patient_data?.patient_name);
      setPatient_Phone_number(patient_data?.patient_phone_number);
      setReference_id(patient_data?.reference_id);
      const year = new Date().getFullYear();
      setValue_Age(
        year - parseInt(patient_data?.birth_date?.split('-')[0]).toString(),
      );
      setSelected(patient_data?.gender);
      setBlood_group(patient_data?.bloodgroup);
      setSpouseBloodGrp(patient_data?.spousegroup);
      setAddress(patient_data?.patient_address);
      setAadhar_no(patient_data?.aadhar_no);
      setSpouse_nmae(patient_data?.spouse_name);
    }
  }, []);
  console.log(value);
  const HandleCheck = () => {
    if (value?.length > 0 && value.length <= 3) {
      const current = parseInt(new Date().getFullYear()) - parseInt(value);
      setFormatDate(`${current}-${'01'}-${'01'}`);
    } else {
      setFormatDate(formattedDate);
    }
  };
  useEffect(() => {
    HandleCheck();
  }, [value, formattedDate]);

  const handleDate = () => {
    if (value?.length === 0) {
      setOpen(true);
    }
  };
  const [hide, setHide] = useState(false);
  const handleConfirm = selectedDate => {
    setDate(selectedDate);
    setOpen(false);
    setHide(true);
    // setValue(selectedDate);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const dayOfBirth = date.toISOString().split('T')[0].split('-')[2];
  const dayOfMonth = date.toISOString().split('T')[0].split('-')[1];
  const dayOfYear = date.toISOString().split('T')[0].split('-')[0];
  const DOB = `${dayOfBirth}-${dayOfMonth}-${dayOfYear}`;
  const current = parseInt(new Date().getFullYear()) - parseInt(age);
  const patientDetails = {
    patient_name: name?.toLowerCase(),
    gender: gender,
    patient_phone_number: patient_phone_number,
    birth_date: formatDate,
    // age: age,
    reference_id: reference_id,
    doctor_phone_number: patient_data
      ? patient_data?.doctor_phone_number
      : phone,
    bloodgroup: blood_group,
    spouse_name: patient_data
      ? spouse_name
      : selected === 'male' && check === 'father'
      ? `S/o ${spouse_name}`
      : selected === 'female' && check === 'father'
      ? `D/o ${spouse_name}`
      : check === 'husband'
      ? `W/o ${spouse_name}`
      : spouse_name,
    // ABHA_ID: ABHA_ID,
    aadhar_no: aadhar_no,
    patient_address: address,
    patient_pic_url: selectedImage ? selectedImage : default_image,
    spousegroup: spouseBloodGroup,
  };
  const [apiStatus, setApiStatus] = useState({});
  const RoleRef = useRef(null);
  const [bottom, setBottom] = useState(false);

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
        if (jsonData?.status === 'success') {
          setApiStatus({status: 'success', message: 'Successfully created'});
          setBottom(true);
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
          setApiStatus({status: 'warning', message: jsonData?.message});
          setBottom(true);
          console.error('API call failed:', response.status, response);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setApiStatus({status: 'error', message: 'Please try again'});
      setBottom(true);
      console.error('Error occurred:', error);
      setLoading(false);
    }
  };
  const UpdatePatientData = async () => {
    try {
      setLoading(true);
      const response = await fetchApi(URL.updatePatient(patient_data?.id), {
        method: 'PUT',
        headers: {
          Prefer: '',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json, application/xml',
        },
        body: JSON.stringify({
          ...patientDetails,
          fhir_patient_id: patient_data?.fhir_patient_id,
        }),
      });
      if (response.ok) {
        const jsonData = await response.json();
        if (jsonData?.status === 'success') {
          setApiStatus({status: 'success', message: 'Successfully Updated'});
          setBottom(true);
          setTimeout(() => {
            navigation.goBack();
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
          setApiStatus({status: 'warning', message: jsonData?.message});
          setBottom(true);
          console.error('API call failed:', response.status, response);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setApiStatus({status: 'error', message: 'Please try again'});
      setBottom(true);
      console.error('Error occurred:', error);
      setLoading(false);
    }
  };
  const [modal, setModal] = useState(false);
  const ModalVisible = () => {
    setModal(true);
  };

  const findUsSelection = value => {
    const isSelected = find.includes(value);

    if (isSelected) {
      setFind(find.filter(i => i !== value));
    } else {
      setFind([...find, value]);
    }
  };
  return (
    <View style={styles.main}>
      <ScrollView>
        <Keyboardhidecontainer>
          <View style={{gap: verticalScale(16)}}>
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
                  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~11234567890]/;
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
              // keypad={'numeric'}
              numeric={true}
              maxLength={10}
              doubleCheck={[true, false]}
              check={checkNumber}
            />
            <InputText
              label="Patient Reference Id"
              placeholder="Eg:xxxxxxxxxx"
              value={reference_id}
              setValue={setReference_id}
              // keypad={'numeric'}
              numeric={true}
              maxLength={16}
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
              {!hide ? (
                <InputText
                  inputContainer={{
                    flex: 5,
                  }}
                  label="Age"
                  placeholder="eg:25"
                  input={value}
                  setValue={setValue_Age}
                  numeric={true}
                  keypad="numeric"
                  required={true}
                />
              ) : (
                <SelectorBtn
                  label={'Age'}
                  selectContainer={{flex: 5, gap: 0, paddingVertical: -1}}
                />
              )}
              <View
                style={{
                  flex: 1,
                  // borderWidth:1,
                  alignSelf: 'center',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: CUSTOMFONTSIZE.h4,
                    marginTop: verticalScale(24),
                    fontWeight: '600',
                    color: CUSTOMCOLOR.black,
                  }}>
                  (OR)
                </Text>
              </View>

              <SelectorBtn
                //  select={{paddingVertical:verticalScale(4),borderWidth:1}}
                required={true}
                // inputstyle={{padding:4}}
                selectContainer={{flex: 5, gap: verticalScale(4)}}
                label={Language[language]['dob']}
                name="calendar"
                onPress={handleDate}
                input={value ? '' : formattedDate}
                style={styles.DOBselect}
              />
            </View>
            <DatePicker
              modal
              open={open}
              date={date}
              theme="auto"
              mode="date"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
            {/* <View style={styles.btn}>
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
            /> */}

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

            {/* <View style={{flexDirection: 'row', gap: 8}}>
              {CONSTANTS.blood_Groups?.map((bld_grp, index) => (
                <SelectorBtn
                  key={index}
                  input={bld_grp}
                  onPress={() => setBlood_group(bld_grp)}
                />
              ))}
            </View> */}
            {/* <InputText
              label="Blood Group"
              placeholder="eg: O+"
              value={blood_group}
              setValue={setBlood_group}
            /> */}
            <View
              style={{
                alignSelf: 'flex-start',
                gap: verticalScale(4),
              }}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  color: CUSTOMCOLOR.black,
                  fontSize: CUSTOMFONTSIZE.h3,
                }}>
                Blood Group
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: moderateScale(16),
                  alignSelf: 'flex-start',
                }}>
                {CONSTANTS.blood_Groups?.map((bld_grp, index) => (
                  <SelectorBtn
                    selectContainer={{
                      paddingVertical: 0,
                      paddingHorizontal: 0,
                    }}
                    select={{
                      backgroundColor:
                        blood_group === bld_grp
                          ? CUSTOMCOLOR.primary
                          : CUSTOMCOLOR.white,
                    }}
                    inputstyle={{
                      color:
                        blood_group === bld_grp
                          ? CUSTOMCOLOR.white
                          : CUSTOMCOLOR.primary,
                    }}
                    // label="Blood Group"
                    key={index}
                    input={bld_grp}
                    onPress={() => setBlood_group(bld_grp)}
                  />
                ))}
              </View>
            </View>
            {!patient_data && (
              <View style={styles.alignchild}>
                <Text style={styles.genderText}>Relation Name</Text>
                <View style={styles.radiogroup}>
                  <Option
                    label="Father"
                    value="father"
                    selected={check === 'father'}
                    onPress={() => handleCheck('father')}
                  />
                  <Option
                    label="Husband"
                    value="husband"
                    selected={check === 'husband'}
                    onPress={() => handleCheck('husband')}
                  />
                </View>
              </View>
            )}
            {check ||
              (patient_data && (
                <InputText
                  label={patient_data ? 'Father / Husband Name' : ''}
                  placeholder={
                    check === 'father'
                      ? 'Enter Father Name'
                      : 'Enter Husband Name'
                  }
                  value={spouse_name}
                  setValue={setSpouse_nmae}
                />
              ))}
            <View
              style={{
                alignSelf: 'flex-start',
                gap: verticalScale(4),
              }}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  color: CUSTOMCOLOR.black,
                  fontSize: CUSTOMFONTSIZE.h3,
                }}>
                Spouse Blood Group
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: moderateScale(16),
                  alignSelf: 'flex-start',
                }}>
                {CONSTANTS.blood_Groups?.map((bld_grp, index) => (
                  <SelectorBtn
                    selectContainer={{
                      paddingVertical: 0,
                      paddingHorizontal: 0,
                    }}
                    select={{
                      backgroundColor:
                        spouseBloodGroup === bld_grp
                          ? CUSTOMCOLOR.primary
                          : CUSTOMCOLOR.white,
                    }}
                    inputstyle={{
                      color:
                        spouseBloodGroup === bld_grp
                          ? CUSTOMCOLOR.white
                          : CUSTOMCOLOR.primary,
                    }}
                    // label="Blood Group"
                    key={index}
                    input={bld_grp}
                    onPress={() => setSpouseBloodGrp(bld_grp)}
                  />
                ))}
              </View>
            </View>
            <InputText
              required={true}
              label="Address / Locality / Pincode"
              placeholder="Address or locality or Pincode"
              value={address}
              setValue={setAddress}
            />

            <InputText
              keypad="numeric"
              label="Aadhaar Number"
              placeholder="12-digit Aadhaar Number"
              value={aadhar_no}
              setValue={setAadhar_no}
              // keypad={'numeric'}
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
            <View style={{gap: moderateScale(8)}}>
              <Text style={styles.genderText}>How did you find us?</Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: moderateScale(16),
                  alignSelf: 'flex-start',
                  flexWrap: 'wrap',
                }}>
                {CONSTANTS.find_us?.map((finds, index) => (
                  <SelectorBtn
                    selectContainer={{
                      paddingVertical: 0,
                      paddingHorizontal: 0,
                    }}
                    select={{
                      backgroundColor: find.includes(finds)
                        ? CUSTOMCOLOR.primary
                        : CUSTOMCOLOR.white,
                    }}
                    inputstyle={{
                      color: find.includes(finds)
                        ? CUSTOMCOLOR.white
                        : CUSTOMCOLOR.primary,
                    }}
                    // label="Blood Group"
                    key={index}
                    input={finds}
                    onPress={() => findUsSelection(finds)}
                  />
                ))}
              </View>
            </View>
            {/* <View style={{gap:moderateScale(8)}}>
            <View style={{gap: moderateScale(8)}}>
              <Text style={styles.genderText}>Reffered by</Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: moderateScale(16),
                  alignSelf: 'flex-start',
                }}>
                {CONSTANTS.refer?.map((item, index) => (
                  <SelectorBtn
                    selectContainer={{
                      paddingVertical: 0,
                      paddingHorizontal: 0,
                    }}
                    select={{
                      backgroundColor:
                        refer === item
                          ? CUSTOMCOLOR.primary
                          : CUSTOMCOLOR.white,
                    }}
                    inputstyle={{
                      color:
                        refer === item
                          ? CUSTOMCOLOR.white
                          : CUSTOMCOLOR.primary,
                    }}
                    // label="Blood Group"
                    key={index}
                    input={item}
                    onPress={() => setRefer(item)}
                  />
                ))}
              </View>
            </View> */}
            <HButton
              label={patient_data ? 'Update' : 'Save'}
              btnstyles={{
                alignSelf: 'center',
                backgroundColor:
                  name && patient_phone_number?.length === 10 && address
                    ? CUSTOMCOLOR.primary
                    : CUSTOMCOLOR.disable,
              }}
              loading={loading}
              onPress={() => {
                if (patient_phone_number.length === 10 && formattedDate) {
                  if (patient_data) {
                    UpdatePatientData();
                  } else {
                    fetchData();
                  }
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
        visible={bottom}
        setVisible={setBottom}
        status={apiStatus.status}
        message={apiStatus.message}
      />

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
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(24),
    backgroundColor: CUSTOMCOLOR.background,
  },
  radiogroup: {
    padding: moderateScale(8),
    flexDirection: 'row',
    gap: moderateScale(48),

    justifyContent: 'flex-start',
  },
  alignchild: {
    // justifyContent: 'center',
    alignItems: 'flex-start',
    // width: '100%',
    // paddingHorizontal: horizontalScale(8),
    // paddingTop: moderateScale(16),
  },
  genderText: {
    fontFamily: CUSTOMFONTFAMILY.body,
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h3,
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
    // gap: moderateScale(8),
    // paddingHorizontal:horizontalScale(16)
  },
  btn: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(8),
    // borderWidth:1
  },
});
export default PatientCreate;
