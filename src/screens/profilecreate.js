import React, {useState, useRef, useEffect, startTransition} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
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
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
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
import {disableBackButton} from '../utility/backDisable';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {checkNumber} from '../utility/checks';
import DOBselect from '../components/dob';
import GalleryModel from '../components/GalleryModal';
import RNFS, {stat} from 'react-native-fs';
import Modal from 'react-native-modal';
import {mode} from '../redux/features/prescription/prescribeslice';

const ProfileCreate = ({navigation}) => {
  const GlRef = useRef(null);
  const [apiStatus, setApiStatus] = useState({});
  const appointmentCardRef = useRef(null);
  const [selectedFilename, setSelectedFilename] = useState('');
  const [uploaddocument, SetUploadDocument] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [show, setshow] = useState(false);
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

  const convertUriToBase64 = async documentUri => {
    try {
      const base64Data = await RNFS.readFile(documentUri, 'base64');
      return base64Data;
    } catch (error) {
      console.error('Error converting document to base64:', error);
      return null;
    }
  };

  const pickSingleFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const originalFilename = result[0]?.name || '';
      setSelectedFilename(originalFilename);
      const base64Document = await convertUriToBase64(result[0]?.uri || '');
      SetUploadDocument(base64Document);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
      }
    }
  };
  const handleClearFile = () => {
    setSelectedFilename('');
  };
  const prevScrn = console.log(values);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState(
    CONSTANTS.speciality[0],
  );
  const [selectedState, setState] = useState('Select');
  const [age, setAge] = useState('');

  const [DOB, setDOB] = useState(new Date());
  const [formatDate, setFormatDate] = useState('');
  const [open, setOpen] = useState(false);
  // const formattedDate = DOB.toLocaleDateString('en-US', {
  //   day: 'numeric',
  //   month: 'long',
  //   year: 'numeric',
  // });
  const formattedDate = DOB.toISOString().split('T')[0];
  const handleAge = age => {
    setValue(age);
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
  }, [DOB, age]);
  console.log('age===', formatDate);

  const HandleCheck = () => {
    if (value.length <= 3) {
      const current = parseInt(new Date().getFullYear()) - parseInt(value);
      setFormatDate(`${current}-${'01'}-${'01'}`);
    } else {
      setFormatDate(formattedDate);
    }
  };
  useEffect(() => {
    HandleCheck();
  }, [value]);
  const handleConfirm = date => {
    setValue(date);
    setDOB(date);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const [modal, setModal] = useState(false);
  const ModalVisible = () => {
    setModal(true);
    GlRef?.current?.snapToIndex(1);
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
  const handleOptions = value => {
    handleChangeValue('gender', value);
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
    setTimeout(() => {
      appointmentCardRef?.current?.snapToIndex(0);
    }, 500);
  };
  const handleStateSelection = state => {
    setState(state);
    handleChangeValue('state', state);
  };

  const handlePressIn = () => {
    setIsHovered(true);
  };

  const handlePressOut = () => {
    setIsHovered(false);
  };

  // const handleOptions = value => {
  //   handleChangeValue('gender', value);
  // };
  // const handleCheck=()=>{
  //   if(value == age){
  //     const current = parseInt(new Date().getFullYear()) - parseInt(age);
  //     console.log('year===>',current)
  //   }
  // }
  // useEffect(()=>{
  //   handleCheck()
  // },[age])

  // const current = parseInt(new Date().getFullYear()) - parseInt(age);
  const doctor_profile_data = {
    doctor_name: values.doctor_name,
    experience: values.experience,
    gender: values.gender,
    // DOB: `${current}-${'01'}-${'01'}`,
    // DOB: formattedDate,
    DOB: formatDate ? formatDate : formattedDate,
    specialization: selectedSpeciality,
    medical_number: values.medical_number,
    profile_pic_url: selectedImage ? selectedImage : CONSTANTS.default_image,
    medical_doc_url: uploaddocument,
    state: selectedState === 'select' ? null : selectedState,
  };

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
        if (jsonData.status === 'success') {
          setApiStatus({
            status: 'success',
            message: 'Successfully created',
          });
          SuccesRef?.current?.snapToIndex(1);
          dispatch(headerStatus({index: 0, status: true}));
          // setStatus(!status);
          setTimeout(() => {
            navigation.navigate('clinic', {prevScrn});
          }, 1000);

          setLoading(false);
          // SuccesRef?.current?.snapToIndex(0);
        } else {
          setApiStatus({status: 'warning', message: jsonData.message});
          SuccesRef?.current?.snapToIndex(1);
          // setTimeout(() => {
          //   navigation.navigate('pro');
          // }, 1000)
          console.error('API call failed:', response.status);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      setApiStatus({status: 'error', message: 'Please try again'});
      SuccesRef?.current?.snapToIndex(1);
      console.error('Error occurred:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    disableBackButton();
  }, []);
  // backgroundColor: modal ? '#000000aa' : null
  return (
    <View
      style={{
        flex: 1,
        borderWidth:4,
        backgroundColor: CUSTOMCOLOR.white,
        paddingVertical: verticalScale(8),
      }}>
      <ProgresHeader progressData={progressData} />
      {modal && (
        <GalleryModel
          visible={modal}
          Close={setModal}
          // closeModal={()=> setModal(false)}
          OnGallery={onImagePress}
          OnCamera={openCamera}
          // onPress={()=>setModal(false)}
          // dismiss={()=>setModal(false)}
        />
      )}
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <View style={styles.alignchild}>
            <Text style={commonstyles.h1}>Fill Profile</Text>
            <AddImage
              onPress={() => ModalVisible()}
              encodedBase64={selectedImage}
            />
          </View>
          <InputText
            inputContainer={{paddingHorizontal: moderateScale(0)}}
            required={true}
            label={Language[language]['name']}
            placeholder="Full Name"
            value={values.doctor_name}
            setValue={value => handleChangeValue('doctor_name', value)}
          />

          <View style={styles.alignchild1}>
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
          {/* <InputText
              label="Age/DOB"
              placeholder="eg:25 / YYYY-MM-DD"
              value={age}
              setValue={setAge}
              keypad={'numeric'}
              required={true}
            /> */}

          <View style={styles.btn}>
            
            <InputText
              inputContainer={{
                flex: 5,
                paddingHorizontal: horizontalScale(0),
              }}
              label="Age"
              placeholder="eg:25"
              input={value}
              setValue={setValue}
              numeric={true}
              required={true}
            />
            <View
              style={{
                flex: 1,
                // borderWidth:1,
                alignSelf:"center",
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Text style={{fontSize:CUSTOMFONTSIZE.h4,
                marginTop:verticalScale(24),
                fontWeight:'600',
                color:CUSTOMCOLOR.black
                }}>(OR)</Text>
            </View>

            <SelectorBtn
              //  select={{paddingVertical:verticalScale(4),borderWidth:1}}
              required={true}
              // inputstyle={{padding:4}}
              selectContainer={{flex: 5,gap:verticalScale(4)}}
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

          {/* <InputText
              required={true}
              label="Medical Registration Number"
              placeholder="Medical Registration number"
              value={values.medical_number}
              setValue={value => handleChangeValue('medical_number', value)}
            /> */}
          <View style={styles.specialization}>
            <SelectorBtn
              required={true}
              selectContainer={{flex: 5,gap:verticalScale(4)}}
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
            inputContainer={{paddingHorizontal: moderateScale(0)}}
            label={Language[language]['experience']}
            placeholder="experience in years"
            value={values.experience}
            setValue={value => handleChangeValue('experience', value)}
            numeric={true}
          />
          <View style={styles.btn}>
            <View style={{  flex: 1}}>
            <InputText
              required={true}
              inputContainer={{
                // flex: 1,
                // paddingVertical:moderateScale(0),
                paddingHorizontal: moderateScale(0),
              }}
              label="Medical Registration Number"
              placeholder="Medical Registration number"
              value={values.medical_number}
              setValue={value => handleChangeValue('medical_number', value)}
            />
            </View>

            <View style={{flex: 1}}>
              <SelectorBtn
                required={true}
                label="State"
                name="menu-down"
                size={moderateScale(24)}
                // onPress={toggleModal}
                onPress={() => {
                  setshow(!show);
                }}
                input={selectedState}
              />

              {show === true && (
                <View style={styles.statecontainer}>
                  <ScrollView persistentScrollbar={true}>
                    {CONSTANTS.state.map((state, index) => (
                      <Pressable
                        key={index}
                        onPress={() => {
                          handleStateSelection(state);
                          setshow(false);
                        }}>
                        <Text
                          style={[
                            styles.statefields,
                            {
                              color:
                                selectedState === state
                                  ? CUSTOMCOLOR.primary
                                  : CUSTOMCOLOR.black,
                            },
                          ]}>
                          {state}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
          <View style={{alignSelf: 'flex-start',gap:verticalScale(4),paddingVertical:verticalScale(8)}}>
            <Text style={styles.medtext}>Medical Document</Text>
            <View style={styles.doc_upload}>
              {selectedFilename ? (
                <View style={styles.selectedfilecontainer}>
                  <Text style={styles.selectedFileInfo}>
                    {selectedFilename}
                  </Text>
                  <TouchableOpacity onPress={handleClearFile}>
                    <Icon
                      name="delete"
                      size={moderateScale(20)}
                      color={CUSTOMCOLOR.delete}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <HButton
                  label="Upload Document"
                  onPress={pickSingleFile}
                  btnstyles={{
                    backgroundColor: CUSTOMCOLOR.white,
                    borderColor: CUSTOMCOLOR.primary,
                    borderWidth: 0.5,
                    borderRadius: 4,
                  }}
                  textStyle={{color: CUSTOMCOLOR.primary}}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          padding: moderateScale(32),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <HButton
          textStyle={{fontSize: CUSTOMFONTSIZE.h2}}
          btnstyles={{
            paddingHorizontal: horizontalScale(96),
            paddingVertical: verticalScale(16),
            borderRadius: moderateScale(8),
            backgroundColor:
              values.doctor_name &&
              values.gender &&
              formatDate &&
              selectedSpeciality &&
              values.medical_number
                ? CUSTOMCOLOR.primary
                : CUSTOMCOLOR.disable,
          }}
          label={Language[language]['save']}
          loading={loading}
          onPress={() => {
            if (!values.doctor_name) {
              Alert.alert('Please enter Name');
            } else if (!values.medical_number) {
              Alert.alert('Please Enter Your Medical Number ');
            } else {
              fetchData();
            }
          }}
        />
      </View>
      <BottomSheetView
        bottomSheetRef={appointmentCardRef}
        snapPoints={'50%'}
        backgroundStyle={'#000000aa'}>
        <View style={styles.modalContainer}>
          <Text style={styles.bottext}>Select Speciality</Text>
          <ScrollView persistentScrollbar={true}>
            {CONSTANTS.speciality.map((speciality, index) => (
              <Pressable
                key={index}
                onPress={() => handleSpecialitySelection(speciality)}
                // style={{height: verticalScale(30)}}
              >
                <Text
                  style={[
                    styles.modalfields,
                    {
                      color:
                        selectedSpeciality === speciality
                          ? CUSTOMCOLOR.primary
                          : CUSTOMCOLOR.black,
                    },
                  ]}>
                  {speciality}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
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
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(6),
    flexDirection: 'row',
    gap: moderateScale(48),
    // borderWidth:1,
    justifyContent: 'flex-start',
  },
  alignchild: {
    // justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 24,
    // height: '18%',
    // gap:moderateScale(0),

    // borderWidth:1,
    paddingVertical: moderateScale(0),
  },
  alignchild1: {
    // justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    // height:'20%',
    // gap:moderateScale(0),
    //
    // borderWidth:1,
    paddingVertical: moderateScale(0),
  },
  modalContainer: {
    height: '100%',
    // width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: CUSTOMCOLOR.white,
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    gap: moderateScale(16),
    padding: moderateScale(10),
    borderWidth: 1,
  },
  statecontainer: {
    height: moderateScale(250),
    position: 'absolute',
    top: 72,
    // width: '100%',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: CUSTOMCOLOR.white,
    // alignSelf: 'center',
    borderRadius: moderateScale(4),
    gap: moderateScale(6),
    // padding: moderateScale(4),
  },
  content: {
    // paddingHorizontal: 24,
    //paddingVertical: 24,

    alignItems: 'center',
    // gap: moderateScale(4),
    // borderWidth:1,
  },
  modalfields: {
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: 400,
    fontFamily: CUSTOMFONTFAMILY.body,
    paddingHorizontal: moderateScale(32),
    paddingVertical: moderateScale(12),
  },
  statefields: {
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: 400,
    fontFamily: CUSTOMFONTFAMILY.body,
    paddingHorizontal: moderateScale(32),
    paddingVertical: moderateScale(10),
  },
  DOBselect: {
    width: '100%',
    gap: moderateScale(8),
    // paddingHorizontal:horizontalScale(16)
  },
  selectedfilecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth:1,
    borderRadius: moderateScale(4),
    borderColor: CUSTOMCOLOR.primary,
    backgroundColor: CUSTOMCOLOR.white,
  },
  selectedFileInfo: {
    fontFamily: CUSTOMFONTFAMILY.h4,
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    paddingRight: moderateScale(8),

    paddingVertical: verticalScale(4),
  },
  contact: {
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
  },
  mail: {
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.primary,
  },
  ContactMail: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: CUSTOMCOLOR.white,
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    // padding: moderateScale(10),
    bottom: moderateScale(20),
  },
  gender: {
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
    fontSize: CUSTOMFONTSIZE.h3,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'flex-start',

    // paddingHorizontal: horizontalScale(24),
    gap: moderateScale(8),
  },
  btn1: {
    flexDirection: 'row',
    width: '100%',

    gap: moderateScale(8),
  },
  specialization: {
    alignSelf: 'flex-start',
    width: '100%',
  },
  medtext: {
    fontFamily: CUSTOMFONTFAMILY.h3,
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,

    // paddingVertical: verticalScale(8),
    alignSelf: 'flex-start',
  },
  doc_upload: {
    alignSelf: 'flex-start',

    // paddingVertical: verticalScale(4),
    marginBottom: moderateScale(4),
  },
  bottext: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: 18,
    color: CUSTOMCOLOR.black,
  },
  container: {
    // paddingVertical: verticalScale(20),
   

    margin: moderateScale(32),
  },
});

export default ProfileCreate;
