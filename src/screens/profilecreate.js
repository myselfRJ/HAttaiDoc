import React, {useState, useRef, useEffect, startTransition} from 'react';
import {Text, View, StyleSheet, Modal, Pressable} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import DocumentPicker from 'react-native-document-picker';
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
import {useDispatch, useSelector} from 'react-redux';
import {addDoctor_profile} from '../redux/features/profiles/doctorprofile';
import UploadDocument from '../components/uploadDocument';
import PlusButton from '../components/plusbtn';
import ProgresHeader from '../components/progressheader';
import {headerStatus} from '../redux/features/headerProgress/headerProgress';

const ProfileCreate = ({navigation}) => {
  const [apiStatus, setApiStatus] = useState({});
  const appointmentCardRef = useRef(null);
  const [selectedFilename, setSelectedFilename] = useState('');
  const [uploaddocument, SetUploadDocument] = useState('');
  console.log('document...', uploaddocument);
  const SuccesRef = useRef(null);
  const token = useSelector(state => state.authenticate.auth.access);
  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);
  const [loading, setLoading] = useState(false);

  const progressData = useSelector(state => state.progress?.status);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    doctor_name: '',
    gender: 'male',
    medical_number: '',
    experience: '',
  });

  const [status, setStatus] = useState(false);

  const pickSingleFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFilename(result[0]?.name || '');
      SetUploadDocument(result[0]?.uri || '');
      console.log('result===', result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        // Handle other errors
      }
    }
  };
  const handleClearFile = () => {
    setSelectedFilename('');
  };

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
      includeBase64: true,
      quality: 0.5,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('response====>', response?.assets?.[0].base64);
        setSelectedImage(response?.assets?.[0]?.base64);
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

  // const toggleDatePicker = () => {
  //   setShowDatePicker(!showDatePicker);
  // };

  const doctor_profile_data = {
    doctor_name: values.doctor_name,
    experience: values.experience,
    gender: values.gender,
    DOB: DOB.toString(),
    specialization: selectedSpeciality,
    medical_number: values.medical_number,
    profile_pic_url: selectedImage,
    medical_doc_url: uploaddocument,
  };

  console.log(token);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchApi(URL.profileUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept:
            'application/json, application/xml, multipart/form-data, text/html, text/plain, application/EDI-X12',
        },
        body: JSON.stringify(doctor_profile_data),
      });
      if (response.status === HttpStatusCode.Ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setApiStatus({
          status: 'success',
          message: 'Successfully created',
        });
        SuccesRef?.current?.snapToIndex(1);
        dispatch(headerStatus.headerStatus({index: 0, status: true}));
        // setStatus(!status);
        setTimeout(() => {
          navigation.navigate('addclinic');
        }, 1000);
        setLoading(false);
      } else {
        setApiStatus({status: 'warning', message: 'Enter all Values'});
        SuccesRef?.current?.snapToIndex(1);
        console.error('API call failed:', response.status);
        setLoading(false);
      }
    } catch (error) {
      setApiStatus({status: 'error', message: 'Please try again'});
      SuccesRef?.current?.snapToIndex(1);
      console.error('Error occurred:', error);
      setLoading(false);
    }
  };
  console.log(values.formattedDate);

  return (
    <View style={{flex: 1}}>
      <ProgresHeader progressData={progressData} />
      <ScrollView>
        <Keyboardhidecontainer>
          <View style={commonstyles.content}>
            <View style={styles.alignchild}>
              <Text style={commonstyles.h1}>Fill Profile</Text>
              <AddImage onPress={onImagePress} encodedBase64={selectedImage} />
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

            <View
              style={{
                alignSelf: 'flex-start',
                width: '100%',
                paddingHorizontal: 8,
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
              keypad='numeric'
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
              {selectedFilename ? (
                <View style={styles.selectedfilecontainer}>
                  <Text style={styles.selectedFileInfo}>
                    {selectedFilename}
                  </Text>
                  {/* <Icon
              name="close"
              size={20}
              color={CUSTOMCOLOR.black}
              onPress={handleClearFile}
            /> */}
                  <PlusButton
                    icon="close"
                    size={12}
                    onPress={handleClearFile}
                  />
                </View>
              ) : (
                <HButton label="Upload Document" onPress={pickSingleFile} />
              )}
            </View>
            <HButton
              label={Language[language]['save']}
              loading={loading}
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
    height:'100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: CUSTOMCOLOR.white,
    alignSelf: 'center',
    borderRadius: 10,
    gap:16,
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
  selectedfilecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth:1,
    borderRadius: 5,
    borderColor: CUSTOMCOLOR.primary,
    backgroundColor: CUSTOMCOLOR.white,
  },
  selectedFileInfo: {
    fontFamily: CUSTOMFONTFAMILY.h4,
    fontSize: 14,
    color: CUSTOMCOLOR.black,
    paddingRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default ProfileCreate;
