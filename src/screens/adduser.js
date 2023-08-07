import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
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
import {launchImageLibrary} from 'react-native-image-picker';
import {URL} from '../utility/urls';
import {ScrollView} from 'react-native-gesture-handler';
import {fetchApi} from '../api/fetchApi';
import {useDispatch, useSelector} from 'react-redux';

import {
  addclinic_users,
  updateclinic_users,
} from '../redux/features/profiles/ClinicUsers';

const AddUser = ({navigation}) => {
  const [clinics, setDataClinic] = useState();
  console.log('clinic---', clinics);
  const RoleRef = useRef(null);
  const ClinicRef = useState(null);
  const [showRoleModal, setRoleModal] = useState(false);
  const [ShowClinicModal, setClinicModal] = useState(false);
  const token = useSelector(state => state.authenticate.auth.access);
  const clinic_users = useSelector(state => state.clinic_users?.clinic_users);

  console.log(clinic_users, '------------------------,users');
  const dispatch = useDispatch();
  const {phone} = useSelector(state => state?.phone?.data);
  console.log('phone==', phone);
  //const clinics = CONSTANTS.clinic;

  const clinicsData = useSelector(state => state.clinic?.clinic_data);

  console.log('================================+++++++++clinic', clinicsData);

  const roles = CONSTANTS.role;
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [selectedClinic, setSelectedClinic] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [values, setValues] = useState({
    name: '',
    phone: '',
    gender: 'male',
    role: '',
    clinic: '',
    slots: [],
    user_profile_pic_url: selectedImage,
  });
  console.log('phone', values.phone);
  const [apiStatus, setApiStatus] = useState({});

  const Clinic_users = {
    clinic_user_name: values.name,
    role: values.role,
    user_profile_pic_url: values.user_profile_pic_url,
    gender: values.gender,
    user_phone_number: values.phone,
    clinic_id: selectedClinic,
  };

  const SuccesRef = useRef(null);
  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);

  const fetchData = async () => {
    try {
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
      if (response.ok) {
        const jsonData = await response.json();
        // navigation.navigate('tab');
        console.log('1');
        console.log(jsonData);
        setApiStatus({status: 'success', message: 'Successfully created'});
        SuccesRef?.current?.snapToIndex(1);
        setTimeout(() => {
          navigation.navigate('tab');
        }, 1000);
        setSelectedClinic(jsonData.data[0]?.clinic_name);
      } else {
        setApiStatus({status: 'warning', message: 'Enter all Values'});
        SuccesRef?.current?.snapToIndex(1);
        console.error('API call failed:', response.status, response);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setApiStatus({status: 'error', message: 'Please try again'});
      SuccesRef?.current?.snapToIndex(1);
      console.error('Error occurred:', error);
    }
  };
  const [showSlotChip, setShowSlotChip] = useState(false);

  const handlePlusIconClick = () => {
    console.log('users--------------------------------------');
    if (values.name) {
      dispatch(addclinic_users(Clinic_users));
    }
    setShowSlotChip(true);
  };

  console.log(values.slots);

  const handleDeleteSlotChip = index => {
    console.log('...', index);
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

  const handleRoleSelection = role => {
    setSelectedRole(role);
    handleChangeValue('role', role);
    RoleRef?.current?.snapToIndex(0);
  };

  const handleClinicSelection = clinic => {
    setSelectedClinic(clinic.clinic_name);
    handleChangeValue('clinic', clinic.clinic_name);
    ClinicRef?.current?.snapToIndex(0);
  };

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
  const fetchclinic = async () => {
    const response = await fetchApi(URL.getClinic(phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      console.log(jsonData);
      setDataClinic(jsonData.data);
      setSelectedClinic(jsonData?.data[0]?.clinic_name);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchclinic();
  }, []);

  console.log('selecte Image', '=============', selectedImage);

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Keyboardhidecontainer>
          <View style={styles.content}>
            <View style={styles.alignchild}>
              <View style={styles.alignchild}>
                <Text style={commonstyles.h1}>Add User</Text>
                <AddImage
                  onPress={onImagePress}
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
              label={Language[language]['phone_number']}
              placeholder="Phone Number"
              value={values.phone}
              setValue={value => handleChangeValue('phone', value)}
            />
            <View style={styles.alignchild}>
              <Text>{Language[language]['gender']}</Text>
              <View style={styles.radiogroup}>
                <Option
                  label="male"
                  value="male"
                  selected={values.gender === 'male'}
                  onPress={() => handleOptions('male')}
                />
                <Option
                  label="female"
                  value="female"
                  selected={values.gender === 'female'}
                  onPress={() => handleOptions('female')}
                />
                <Option
                  label="others"
                  value="others"
                  selected={values.gender === 'others'}
                  onPress={() => handleOptions('others')}
                />
              </View>
            </View>
            <View
              style={{
                alignSelf: 'flex-start',
                width: '100%',
                paddingHorizontal: 8,
              }}>
              <SelectorBtn
                label={Language[language]['role']}
                name="chevron-down"
                onPress={() => {
                  RoleRef?.current?.snapToIndex(1);
                }}
                input={selectedRole}
              />
            </View>
            <View
              style={{
                alignSelf: 'flex-start',
                width: '100%',
                paddingHorizontal: 8,
              }}>
              <SelectorBtn
                label={Language[language]['clinic']}
                name="chevron-down"
                onPress={() => {
                  ClinicRef?.current?.snapToIndex(1);
                }}
                input={selectedClinic}
              />
            </View>
            <View
              style={{
                alignSelf: 'flex-end',
                bottom: 0,
                paddingVertical: 8,
                paddingHorizontal: 8,
              }}>
              <PlusButton icon="plus" onPress={handlePlusIconClick} />
            </View>
            <View style={styles.users}>
              <View>
                {values?.slots?.length > 0 && (
                  <Text
                    style={{
                      fontFamily: CUSTOMFONTFAMILY.heading,
                      fontSize: CUSTOMFONTSIZE.h2,
                      color: CUSTOMCOLOR.black,
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                    }}>
                    Users
                  </Text>
                )}
                {showSlotChip &&
                  clinic_users?.map((item, index) => (
                    <View style={{margin: 5}} key={index}>
                      <SlotChip
                        style={{justifyContent: 'space-between', gap: 4}}
                        type={
                          <Text style={{gap: 8}}>
                            Name:{item.clinic_user_name},Role:{item.role}
                            ,Clinic:
                            {item.clinic}
                          </Text>
                        }
                        onPress={() => handleDeleteSlotChip(index)}
                      />
                    </View>
                  ))}
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={() => navigation.navigate('tab')}>
                <Text
                  style={{
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    fontSize: CUSTOMFONTSIZE.h3,
                    fontWeight: '700',
                    borderRadius: 4,
                    borderWidth: 0.5,
                    borderColor: CUSTOMCOLOR.white,
                    borderBottomColor: CUSTOMCOLOR.black,
                    borderBottomWidth: 1.5,
                    backgroundColor: CUSTOMCOLOR.white,
                    // Set the border underline width
                    //borderColor: 'black', // Set the border color
                    paddingBottom: 5,
                  }}>
                  Skip
                </Text>
              </TouchableOpacity>
              <HButton
                label="Done"
                onPress={() => {
                  fetchData();
                  SuccesRef?.current?.snapToIndex(1);
                }}
              />
            </View>
          </View>
        </Keyboardhidecontainer>
      </ScrollView>
      <BottomSheetView bottomSheetRef={RoleRef} snapPoints={'50%'}>
        <View style={styles.modalContainer}>
          <Text
            style={{
              fontFamily: CUSTOMFONTFAMILY.heading,
              fontSize: 18,
              color: CUSTOMCOLOR.black,
            }}>
            Role
          </Text>
          {CONSTANTS.role.map((role, index) => (
            <Pressable key={index} onPress={() => handleRoleSelection(role)}>
              <Text style={styles.modalfields}>{role}</Text>
            </Pressable>
          ))}
        </View>
      </BottomSheetView>
      <BottomSheetView bottomSheetRef={ClinicRef} snapPoints={'50%'}>
        <View style={styles.modalContainer}>
          <Text
            style={{
              fontFamily: CUSTOMFONTFAMILY.heading,
              fontSize: 18,
              color: CUSTOMCOLOR.black,
            }}>
            {Language[language]['clinic']}
          </Text>
          {clinics &&
            clinics?.map((clinic, index) => (
              <Pressable
                key={index}
                onPress={() => handleClinicSelection(clinic)}>
                <Text style={styles.modalfields}>{clinic.clinic_name}</Text>
              </Pressable>
            ))}
        </View>
      </BottomSheetView>
      <BottomSheetView bottomSheetRef={SuccesRef} snapPoints={'50%'}>
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
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    width: '100%',
    //alignItems: 'center',
    gap: 8,
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
  modalContainer: {
    height: 400,
    width: '100%',
    //justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: CUSTOMCOLOR.white,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 16,
  },
  modalfields: {
    color: CUSTOMCOLOR.primary,
    fontSize: 14,
    fontWeight: 400,
    fontFamily: CUSTOMFONTFAMILY.body,
    padding: 4,
  },
  users: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  skip: {
    // color:CUSTOMCOLOR.black,
    // //backgroundColor:CUSTOMCOLOR.white,
    // borderColor:CUSTOMCOLOR.black,
    // height:200
  },
});
export default AddUser;
