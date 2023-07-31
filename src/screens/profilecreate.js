import React, {useState, useRef, useEffect} from 'react';
import {Text, View, StyleSheet, Modal, Pressable} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
import {SelectorBtn} from '../components';
import {CONSTANTS} from '../utility/constant';
import {launchImageLibrary} from 'react-native-image-picker';
import {URL} from '../utility/urls';
import {HttpStatusCode} from 'axios';
import BottomSheetView from '../components/bottomSheet';
import {ScrollView} from 'react-native-gesture-handler';
import StatusMessage from '../components/statusMessage';
import {fetchApi} from '../api/fetchApi';
import {getAccessToken} from '../redux/features/authenticate/authenticateSlice';
import {useSelector} from 'react-redux';

const ProfileCreate = ({navigation}) => {
  const [apiStatus, setApiStatus] = useState({});
  const appointmentCardRef = useRef(null);
  const SuccesRef = useRef(null);
  const token = useSelector(state => state.authenticate.auth.access);
  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);

  const [values, setValues] = useState({
    doctor_name: '',
    gender: 'male',
    medical_number: '',
    experience: '',
  });

  console.log(values);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [DOB, setDOB] = useState(new Date());
  const [open, setOpen] = useState(false);
  const formattedDate = DOB.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const handleConfirm = date => {
    setDOB(date);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const onImagePress = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('response====>', response?.assets?.[0]?.uri);
        setSelectedImage(response?.assets?.[0]?.uri);
      }
    });
  };

  const handleChangeValue = (field, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSpecialitySelection = speciality => {
    setSelectedSpeciality(speciality);
    handleChangeValue('speciality', speciality);
    appointmentCardRef?.current?.snapToIndex(0);
    console.log(speciality);
  };

  const handleOptions = value => {
    handleChangeValue('gender', value);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  console.log(token);
  const fetchData = async () => {
    try {
      const response = await fetchApi(URL.profileUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept:
            'application/json, application/xml, multipart/form-data, text/html, text/plain, application/EDI-X12',
        },
        body: JSON.stringify({
          doctor_name: values.doctor_name,
          experience: values.experience,
          gender: values.gender,
          DOB: DOB.toString(),
          specialization: selectedSpeciality,
          medical_number: values.medical_number,
          profile_pic_url: selectedImage,
          medical_doc_url: 'jsdjsbgjkd',
        }),
      });
      if (response.status === HttpStatusCode.Ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setApiStatus({
          status: 'success',
          message: 'Successfully created',
        });
        SuccesRef?.current?.snapToIndex(1);
        setTimeout(() => {
          navigation.navigate('addclinic');
        }, 1000);
      } else {
        setApiStatus({status: 'warning', message: 'Enter all Values'});
        SuccesRef?.current?.snapToIndex(1);
        console.error('API call failed:', response.status);
      }
    } catch (error) {
      setApiStatus({status: 'error', message: 'Please try again'});
      SuccesRef?.current?.snapToIndex(1);
      console.error('Error occurred:', error);
    }
  };
  console.log(values.formattedDate);
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Keyboardhidecontainer>
          <View style={commonstyles.content}>
            <View style={styles.alignchild}>
              <Text style={commonstyles.h1}>Fill Profile</Text>
              <AddImage onPress={onImagePress} url={selectedImage} />
            </View>
            <InputText
              label={Language[language]['name']}
              placeholder="Full Name"
              value={values.doctor_name}
              setValue={value => handleChangeValue('doctor_name', value)}
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
              }}>
              <SelectorBtn
                label={Language[language]['dob']}
                name="calendar"
                onPress={() => setOpen('to')}
                input={formattedDate}
                style={styles.DOBselect}
              />
            </View>
            <DatePicker
              modal
              open={open !== false}
              date={DOB}
              theme="auto"
              mode="date"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
            <InputText
              label={Language[language]['medical_number']}
              placeholder="Medical number"
              value={values.medical_number}
              setValue={value => handleChangeValue('medical_number', value)}
            />
            <View
              style={{
                alignSelf: 'flex-start',
                width: '100%',
                paddingHorizontal: 8,
              }}>
              <SelectorBtn
                label={Language[language]['specialization']}
                name="chevron-down"
                // onPress={toggleModal}
                onPress={() => {
                  appointmentCardRef?.current?.snapToIndex(1);
                }}
                input={selectedSpeciality}
              />
            </View>
            <InputText
              label={Language[language]['experience']}
              placeholder="experience in years"
              value={values.experience}
              setValue={value => handleChangeValue('experience', value)}
            />
            <Text
              style={{
                fontFamily: CUSTOMFONTFAMILY.h4,
                fontSize: 12,
                color: CUSTOMCOLOR.black,
                paddingHorizontal: 8,
                paddingVertical: 8,
                alignSelf: 'flex-start',
              }}>
              Medical Document
            </Text>
            <View
              style={{
                alignSelf: 'flex-start',
                paddingHorizontal: 8,
                paddingVertical: 8,
              }}>
              <HButton label="Upload Document" />
            </View>
            <HButton
              label={Language[language]['save']}
              onPress={() => {
                fetchData();
              }}
            />
          </View>
        </Keyboardhidecontainer>
      </ScrollView>
      <BottomSheetView bottomSheetRef={appointmentCardRef} snapPoints={'50%'}>
        <View style={styles.modalContainer}>
          <Text
            style={{
              fontFamily: CUSTOMFONTFAMILY.heading,
              fontSize: 18,
              color: CUSTOMCOLOR.black,
            }}>
            Select Speciality
          </Text>
          {CONSTANTS.speciality.map((speciality, index) => (
            <Pressable
              key={index}
              onPress={() => handleSpecialitySelection(speciality)}
              style={{height: 30}}>
              <Text style={styles.modalfields}>{speciality}</Text>
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
    //flex: 1,
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: CUSTOMCOLOR.white,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
  },
  modalfields: {
    color: CUSTOMCOLOR.primary,
    fontSize: 14,
    fontWeight: 400,
    fontFamily: CUSTOMFONTFAMILY.body,
    padding: 4,
  },
  DOBselect: {
    width: '100%',
    paddingHorizontal: 8,
  },
});

export default ProfileCreate;
