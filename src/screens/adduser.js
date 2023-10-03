import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
  Alert,
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
import {
  PlusButton,
  SelectorBtn,
  SlotChip,
  StatusMessage,
  BottomSheetView,
} from '../components';
import {CONSTANTS} from '../utility/constant';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {URL} from '../utility/urls';
import {ScrollView} from 'react-native-gesture-handler';
import {fetchApi} from '../api/fetchApi';
import {useDispatch, useSelector} from 'react-redux';
import {headerStatus} from '../redux/features/headerProgress/headerProgress';
import {
  addclinic_users,
  updateclinic_users,
} from '../redux/features/profiles/ClinicUsers';
import ProgresHeader from '../components/progressheader';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';
import {HttpStatusCode} from 'axios';
import {disableBackButton} from '../utility/backDisable';
import {useRoute} from '@react-navigation/native';
import {checkNumber} from '../utility/checks';
import GalleryModel from '../components/GalleryModal';

const AddUser = ({navigation}) => {
  const GlRef = useRef(null);
  const route = useRoute();
  const [clinics, setDataClinic] = useState();
  // console.log('clinic---', clinics);
  const RoleRef = useRef(null);
  const ClinicRef = useState(null);
  const token = useSelector(state => state.authenticate.auth.access);
  const clinic_users = useSelector(state => state.clinic_users?.clinic_users);

  console.log();

  console.log('----------------users', clinic_users);
  const dispatch = useDispatch();
  const {phone} = useSelector(state => state?.phone?.data);

  const clinicsData = useSelector(state => state.clinic?.clinic_data);

  // console.log('================================+++++++++clinic', clinicsData);

  const [loading, setLoading] = useState(false);

  const roles = CONSTANTS.role;
  const [selectedRole, setSelectedRole] = useState();
  const [selectedClinic, setSelectedClinic] = useState();
  const [otherRole, setOtherRole] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [values, setValues] = useState({
    name: '',
    phone: '',
    gender: 'male',
    role: selectedRole,
    clinic: '',
    slots: [],
    user_profile_pic_url: selectedImage
      ? selectedImage
      : CONSTANTS.default_image,
  });
  const [apiStatus, setApiStatus] = useState({});

  const progressData = useSelector(state => state.progress?.status);
  const {prevScrn} = route.params;
  console.log('----prevvvv', prevScrn);
  const [modal, setModal] = useState(false);
  const ModalVisible = () => {
    setModal(true);
    GlRef?.current?.snapToIndex(1);
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
  const Clinic_users = {
    clinic_user_name: values.name,
    role: selectedRole !== 'Others' ? selectedRole : otherRole,
    user_profile_pic_url: values.user_profile_pic_url,
    gender: values.gender,
    user_phone_number: values.phone,
    clinic_id: selectedClinic,
    doctor_phone_number: phone,
  };

  const SuccesRef = useRef(null);
  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);

  const ResetClinic_Users_Redux = () => {
    const ResetClinic_users = [];
    dispatch(updateclinic_users(ResetClinic_users));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchApi(URL.adduser, {
        method: 'POST',
        headers: {
          Prefer: '',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json, application/xml',
        },
        body: JSON.stringify(clinic_users),
      });
      if (response.status === HttpStatusCode.Ok) {
        const jsonData = await response.json();
        // console.log(jsonData);
        if (jsonData.status === 'success') {
          setApiStatus({status: 'success', message: jsonData.message});
          SuccesRef?.current?.snapToIndex(1);
          dispatch(headerStatus({index: 2, status: true}));
          setTimeout(() => {
            navigation.navigate('tab');
          }, 1000);
          setTimeout(() => {
            SuccesRef?.current?.snapToIndex(0);
          }, 2000);
          setSelectedClinic(jsonData.data[0]?.clinic_name);
          setLoading(false);
          ResetClinic_Users_Redux();
          // SuccesRef?.current?.snapToIndex(0);
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
  const [showSlotChip, setShowSlotChip] = useState(false);

  const handlePlusIconClick = () => {
    if (
      values.name &&
      values.gender &&
      values.phone.length === 10 &&
      selectedClinic &&
      selectedRole
    ) {
      dispatch(addclinic_users(Clinic_users));
      Alert.alert('Success', '"User data added successfully"');
      setShowSlotChip(true);
      setSelectedImage('');
      setValues({name: '', phone: '', gender: 'male'});
      setSelectedClinic('');
      setSelectedRole('');
    } else {
      Alert.alert('"Warning"', '"Please Enter Correct Details"');
    }
  };

  const handleDeleteSlotChip = index => {
    const newClinic_users = clinic_users?.filter((_, i) => i !== index);
    dispatch(updateclinic_users(newClinic_users));
  };

  const handleChangeValue = (field, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleOptions = value => {
    handleChangeValue('gender', value);
  };

  // const handleRoleSelection = role => {
  //   setSelectedRole(role);
  //   handleChangeValue('role', role);
  //   setTimeout(() => {
  //     RoleRef?.current?.snapToIndex(0);
  //   }, 500);
  // };

  // const handleClinicSelection = clinic => {
  //   setSelectedClinic(clinic.clinic_name);
  //   handleChangeValue('clinic', clinic.clinic_name);
  //   ClinicRef?.current?.snapToIndex(0);
  // };

  const onImagePress = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else {
        // console.log('response====>', response?.assets?.[0]?.base64);
        setSelectedImage(response?.assets?.[0]?.base64);
      }
    });
    setModal(false);
  };
  const fetchclinic = async () => {
    const response = await fetchApi(URL.getClinic(phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setDataClinic(jsonData.data);
      // setSelectedClinic(jsonData?.data[0]?.clinic_name);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchclinic();
  }, []);

  useEffect(() => {
    disableBackButton();
  }, []);
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
            style={styles.clsx}
            color={CUSTOMCOLOR.primary}
            size={moderateScale(32)}
            onPress={() => navigation.navigate('tab')}
          />
        </View>
      )}
      <ScrollView contentContainerStyle={styles.container}>
        <Keyboardhidecontainer>
          <View style={styles.content}>
            <View style={styles.alignchild}>
              <View style={styles.alignchild}>
                <Text style={commonstyles.h1}>Add User</Text>
                <AddImage
                  onPress={() => ModalVisible()}
                  encodedBase64={selectedImage}
                />
              </View>
            </View>
            <InputText
              label={Language[language]['name']}
              maxLength={30}
              placeholder="Name"
              value={values.name}
              setValue={value => handleChangeValue('name', value)}
            />
            <InputText
              doubleCheck={[true, false]}
              check={checkNumber}
              maxLength={10}
              label={Language[language]['phone_number']}
              placeholder="Phone Number"
              numeric={true}
              value={values.phone}
              setValue={value => handleChangeValue('phone', value)}
              // keypad="numeric"
            />
            <View style={styles.alignchild}>
              <Text style={styles.gender}>{Language[language]['gender']}</Text>
              <View style={styles.radiogroup}>
                <Option
                  label="Male"
                  value="male"
                  selected={values.gender === 'male'}
                  onPress={() => handleOptions('male')}
                />
                <Option
                  label="Female"
                  value="female"
                  selected={values.gender === 'female'}
                  onPress={() => handleOptions('female')}
                />
                <Option
                  label="Others"
                  value="others"
                  selected={values.gender === 'others'}
                  onPress={() => handleOptions('others')}
                />
              </View>
            </View>
            <View style={styles.clinicselect}>
              <Text style={styles.labeltext}>Role</Text>
              <View style={{flexDirection: 'row', gap: moderateScale(8)}}>
                {CONSTANTS.role?.map((val, ind) => (
                  <SelectorBtn
                    select={{
                      backgroundColor:
                        selectedRole === val
                          ? CUSTOMCOLOR.primary
                          : CUSTOMCOLOR.white,
                    }}
                    inputstyle={{
                      color:
                        selectedRole === val
                          ? CUSTOMCOLOR.white
                          : CUSTOMCOLOR.black,
                    }}
                    key={ind}
                    onPress={() => setSelectedRole(val)}
                    input={val}
                  />
                ))}
              </View>
            </View>
            {selectedRole === 'Others' && (
              <InputText
                label={'Please Enter Role'}
                maxLength={30}
                placeholder="Enter Role"
                value={otherRole}
                setValue={setOtherRole}
              />
            )}
            <View style={styles.clinicselect}>
              <Text style={styles.labeltext}>Clinic:</Text>
              <View style={{flexDirection: 'row', gap: moderateScale(8)}}>
                {clinics?.map((val, ind) => (
                  <SelectorBtn
                    select={{
                      backgroundColor:
                        selectedClinic === val?.clinic_name
                          ? CUSTOMCOLOR.primary
                          : CUSTOMCOLOR.white,
                    }}
                    inputstyle={{
                      color:
                        selectedClinic === val?.clinic_name
                          ? CUSTOMCOLOR.white
                          : CUSTOMCOLOR.black,
                    }}
                    input={val?.clinic_name}
                    key={ind}
                    onPress={() => setSelectedClinic(val?.clinic_name)}
                  />
                ))}
              </View>
              {/* <SelectorBtn
                label={Language[language]['clinic']}
                name="chevron-down"
                onPress={() => {
                  ClinicRef?.current?.snapToIndex(1);
                }}
                input={selectedClinic}
              /> */}
            </View>
            <View style={styles.save}>
              <HButton
                btnstyles={{
                  backgroundColor:
                    values.name &&
                    values.gender &&
                    values.phone.length === 10 &&
                    selectedClinic &&
                    selectedRole
                      ? CUSTOMCOLOR.primary
                      : CUSTOMCOLOR.disable,
                }}
                label="save"
                onPress={handlePlusIconClick}
              />
            </View>
            <View style={styles.users}>
              <View>
                {values?.slots?.length > 0 && (
                  <Text style={styles.UsersText}>Users</Text>
                )}
                <View
                  style={{
                    gap: moderateScale(4),
                    marginBottom: moderateScale(4),
                  }}>
                  {showSlotChip &&
                    clinic_users?.map((item, index) => (
                      <View
                        style={{marginBottom: moderateScale(4)}}
                        key={index}>
                        <SlotChip
                          key={item.index}
                          index={item.index}
                          onPress={() => handleDeleteSlotChip(index)}
                          time={<Text>Name: {item.clinic_user_name}</Text>}
                          type={<Text>Role: {item.role}</Text>}
                          duration={<Text>Clinic: {item.clinic_id}</Text>}
                        />
                      </View>
                    ))}
                </View>
              </View>
            </View>
            <View style={styles.bottom}>
              <HButton
                rightIcon="arrow-right-thin"
                color={CUSTOMCOLOR.primary}
                label="Skip"
                onPress={() => navigation.navigate('tab')}
                btnstyles={{
                  backgroundColor: CUSTOMCOLOR.white,
                }}
                textStyle={{
                  color: CUSTOMCOLOR.primary,
                }}
              />
              <HButton
                btnstyles={{
                  backgroundColor:
                    clinic_users.length > 0
                      ? CUSTOMCOLOR.primary
                      : CUSTOMCOLOR.disable,
                }}
                label="Done"
                onPress={() => {
                  if (clinic_users.length > 0) {
                    fetchData();
                  } else {
                    Alert.alert('Please Add Atleast One User');
                  }
                }}
                loading={loading}
              />
            </View>
          </View>
        </Keyboardhidecontainer>
      </ScrollView>
      {/* <BottomSheetView
        bottomSheetRef={RoleRef}
        snapPoints={'20%'}
        backgroundStyle={CUSTOMCOLOR.white}>
        <View style={styles.modalContainer}>
          {CONSTANTS.role.map((role, index) => (
            <Pressable key={index} onPress={() => handleRoleSelection(role)}>
              <Text
                style={[
                  styles.modalfields,
                  {
                    color:
                      selectedRole === role
                        ? CUSTOMCOLOR.primary
                        : CUSTOMCOLOR.black,
                  },
                ]}>
                {role}
              </Text>
            </Pressable>
          ))}
        </View>
      </BottomSheetView> */}
      {/* <BottomSheetView
        bottomSheetRef={ClinicRef}
        snapPoints={'35%'}
        backgroundStyle={CUSTOMCOLOR.white}>
        <View style={styles.modalContainer}>
          <Text style={styles.clinicsname}>{Language[language]['clinic']}</Text>
          {clinics &&
            clinics?.map((clinic, index) => (
              <Pressable
                key={index}
                onPress={() => handleClinicSelection(clinic)}>
                <Text
                  style={[
                    styles.modalfields,
                    {
                      color:
                        selectedClinic === clinic
                          ? CUSTOMCOLOR.primary
                          : CUSTOMCOLOR.black,
                    },
                  ]}>
                  {clinic.clinic_name}
                </Text>
              </Pressable>
            ))}
        </View>
      </BottomSheetView> */}
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
  content: {
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(24),
    width: '100%',
    //alignItems: 'center',
    gap: moderateScale(8),
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(6),
  },
  UsersText: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h2,
    color: CUSTOMCOLOR.black,
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(8),
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
  modalContainer: {
    // height: '100%',
    // width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: CUSTOMCOLOR.white,
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    gap: moderateScale(16),
    padding: moderateScale(24),
  },
  modalfields: {
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: 400,
    fontFamily: CUSTOMFONTFAMILY.body,
    padding: moderateScale(4),
  },
  users: {
    alignSelf: 'flex-start',
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(8),
  },
  skip: {
    // color:CUSTOMCOLOR.black,
    // //backgroundColor:CUSTOMCOLOR.white,
    // borderColor:CUSTOMCOLOR.black,
    // height:2moderateScale(00
  },
  clsx: {
    zIndex: moderateScale(4),
    backgroundColor: 'transparent',
    // position: 'absolute',
    alignSelf: 'flex-end',
    padding: moderateScale(16),
  },
  gender: {
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
    fontSize: CUSTOMFONTSIZE.h4,
  },
  btn: {
    alignSelf: 'flex-start',
    width: '100%',
    paddingHorizontal: horizontalScale(6),
  },
  clinicselect: {
    gap: moderateScale(16),
    alignSelf: 'flex-start',
    // flexDirection: 'row',
    width: '100%',
    paddingHorizontal: horizontalScale(8),
  },
  save: {
    alignSelf: 'flex-end',
    bottom: 0,
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(8),
  },
  role: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h2,
    color: CUSTOMCOLOR.black,
  },
  clinicsname: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h2,
    color: CUSTOMCOLOR.black,
  },
});
export default AddUser;
