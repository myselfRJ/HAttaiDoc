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
import CustomCalendar from '../components/calendar';

const ProfileCreate = ({navigation}) => {
  const GlRef = useRef(null);
  const [apiStatus, setApiStatus] = useState({});
  const appointmentCardRef = useRef(null);
  const [selectedFilename, setSelectedFilename] = useState({});
  const [uploaddocument, SetUploadDocument] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [show, setshow] = useState(false);
  const [del, setDel] = useState(false);
  const [searchstate, setsearchState] = useState('');
  const [pan, setPan] = useState({});
  const SuccesRef = useRef(null);
  const token = useSelector(state => state.authenticate.auth.access);
  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);
  const [loading, setLoading] = useState(false);
  const onDelete = () => {
    setSelectedImage('');
    setDel(false);
    setModal(false);
  };

  const progressData = useSelector(state => state.progress?.status);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    doctor_name: '',
    gender: 'male',
    medical_number: '',
    experience: '',
    degree: '',
  });
  const [filteredState, setFilteredState] = useState([]);
  useEffect(() => {
    const filteredState = CONSTANTS.state?.filter(item =>
      item.toLowerCase().startsWith(searchstate.toLowerCase()),
    );
    if (filteredState) {
      setFilteredState(filteredState);
    } else {
      setFilteredState(CONSTANTS.state);
    }
  }, [searchstate]);

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

  const prevScrn = console.log(values);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState(
    CONSTANTS.speciality[0],
  );
  const [selectedState, setState] = useState('Select');
  const [age, setAge] = useState('');

  const [DOB, setDOB] = useState(new Date());
  const [hide, setHide] = useState(false);
  const [formatDate, setFormatDate] = useState('');
  const [open, setOpen] = useState(false);
  const formattedDate = DOB.toISOString().split('T')[0];
  const handleAge = age => {
    setValue(age);
  };
  const [value, setValue] = useState('');

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
  const handleConfirm = date => {
    setDOB(date);
    setOpen(false);
    setHide(!hide);
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
        setDel(!del);
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
  const [latestRecord, setLatestRecord] = useState({});
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
    state: selectedState === 'select' ? null : selectedState,
    medical_doc_url: selectedFilename?.uri,
    pan_doc_url: pan?.uri,
    latest_doc_url: latestRecord?.uri,
    degree: values.degree ? value.degree : 'MBBS',
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

  const pickSingleFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      const originalFilename = result[0]?.name || '';
      const base64Document = await convertUriToBase64(result[0]?.uri || '');
      let fileDetails = {
        name: originalFilename,
        uri: base64Document,
      };
      return fileDetails;
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Handle cancel event
      } else {
        // Handle other errors
      }
    }
  };

  //  console.log('latest==',latestRecord?.uri)
  const handlelatest = async () => {
    try {
      const file = await pickSingleFile();
      setLatestRecord(file ? file : {});
    } catch (error) {}
  };
  const handleSelectFilename = async () => {
    try {
      const file = await pickSingleFile();
      setSelectedFilename(file ? file : {});
    } catch (error) {}
  };
  const handlePan = async () => {
    try {
      const file = await pickSingleFile();
      setPan(file ? file : {});
    } catch (error) {}
  };

  const handleClearFile = () => {
    setSelectedFilename('');
  };
  const handleClearpan = () => {
    setPan('');
  };
  const handleClearlatest = () => {
    setLatestRecord('');
  };

  const UploadShow = ({style, head, file, onUpload, onDelete, label}) => {
    return (
      <View style={styles.doc_upload}>
        <Text style={[styles.medtext, style]}>{head}</Text>
        {file ? (
          <View style={styles.selectedfilecontainer}>
            <Text style={styles.selectedFileInfo}>{file}</Text>
            <TouchableOpacity
              onPress={onDelete}
              style={{
                backgroundColor: CUSTOMCOLOR.white,
                borderRadius: moderateScale(24),
              }}>
              <Icon
                name="close"
                size={moderateScale(24)}
                color={CUSTOMCOLOR.delete}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <HButton
            label={label}
            onPress={onUpload}
            btnstyles={{
              backgroundColor: CUSTOMCOLOR.white,
              borderColor: CUSTOMCOLOR.primary,
              borderWidth: 0.5,
              borderRadius: 4,
              alignSelf: 'flex-start',
            }}
            textStyle={{color: CUSTOMCOLOR.primary, fontSize: 12}}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <ProgresHeader progressData={progressData} />
      {modal && (
        <GalleryModel
          visible={modal}
          Close={setModal}
          // closeModal={()=> setModal(false)}
          OnGallery={onImagePress}
          OnCamera={openCamera}
          // delete={del}
          // OnDelete={onDelete}
        />
      )}
      <Text style={commonstyles.h1}>Doctor Profile</Text>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.alignchild}>
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
          {!hide ? (
            <InputText
              inputContainer={{
                flex: 5,
              }}
              label="Age"
              placeholder="eg:25"
              input={value}
              setValue={setValue}
              numeric={true}
              keypad="numeric"
              // required={true}
            />
          ) : (
            <SelectorBtn
              label={'Age'}
              selectContainer={{flex: 5, gap: 0, paddingVertical: -1}}
              select={{paddingVertical: 4}}
            />
            // <InputText
            //   inputContainer={{
            //     flex: 5,
            //   }}
            //   textStyle={{backgroundColor: CUSTOMCOLOR.backgroundColor}}
            //   label="Age"
            //   // placeholder="eg:25"
            //   // input={value}
            //   setValue={setValue}
            //   numeric={true}
            //   keypad="numeric"
            // />
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
            // required={true}
            selectContainer={{flex: 5, gap: 0, paddingVertical: -1}}
            label={Language[language]['dob']}
            name="calendar"
            onPress={() => (value ? null : setOpen(true))}
            input={value ? '' : formattedDate}
            style={styles.DOBselect}
            select={{paddingVertical: verticalScale(4)}}
          />
        </View>
        <DatePicker
          modal
          open={open}
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
        <InputText
          inputContainer={{paddingHorizontal: moderateScale(0)}}
          label="Degree"
          placeholder="Eg : MBBS"
          value={values.degree}
          setValue={value => handleChangeValue('degree', value)}
        />
        <View style={styles.specialization}>
          <SelectorBtn
            required={true}
            selectContainer={{flex: 5, gap: 2, paddingVertical: 0}}
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
          keypad="numeric"
        />
        <View style={styles.btn}>
          <View style={{flex: 1}}>
            <InputText
              required={true}
              inputContainer={{
                // flex: 1,
                // paddingVertical:moderateScale(0),
                paddingHorizontal: moderateScale(0),
              }}
              label="Medical Council Registration Number"
              placeholder="Medical Council Registration number"
              value={values.medical_number}
              setValue={value => handleChangeValue('medical_number', value)}
            />
          </View>

          <View style={{flex: 1}}>
            <SelectorBtn
              required={true}
              selectContainer={{gap: 2, paddingVertical: -1}}
              label="State"
              name={show == true ? 'chevron-up' : 'chevron-down'}
              size={moderateScale(24)}
              select={{paddingVertical: verticalScale(4)}}
              onPress={() => {
                setshow(!show);
              }}
              input={selectedState}
            />

            {show === true && (
              <View style={styles.statecontainer}>
                <InputText
                  search={true}
                  placeholder={'Search state'}
                  value={searchstate}
                  IconName={'magnify'}
                  setValue={setsearchState}
                />
                <ScrollView
                  persistentScrollbar={true}
                  contentContainerStyle={{
                    zIndex: 4,
                    backgroundColor: CUSTOMCOLOR.white,
                  }}>
                  {/* <View style={{position:'absolute',zIndex:16,height:150,width:150,backgroundColor:"green"}}> */}

                  {filteredState?.map((state, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        handleStateSelection(state);
                        setshow(false);
                      }}
                      style={
                        {
                          // paddingHorizontal: horizontalScale(4),
                          // paddingVertical: verticalScale(4),
                        }
                      }>
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
                    </TouchableOpacity>
                  ))}
                  {/* </View>  */}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
        {/* <View
          style={{
            // alignSelf: 'flex-start',
            gap: verticalScale(4),
            // borderWidth:1,
            zIndex: -1,
          }}>
          <Text style={styles.medtext}>Medical Council Registration Certificate</Text>
          <View style={styles.doc_upload}>
            {selectedFilename ? (
              <View style={styles.selectedfilecontainer}>
                <Text style={styles.selectedFileInfo}>{selectedFilename}</Text>
                <TouchableOpacity
                  onPress={handleClearFile}
                  style={{
                    backgroundColor: CUSTOMCOLOR.white,
                    borderRadius: moderateScale(24),
                  }}>
                  <Icon
                    name="close"
                    size={moderateScale(24)}
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
                  alignSelf: 'flex-start',
                }}
                textStyle={{color: CUSTOMCOLOR.primary, fontSize: 12}}
              />
            )}
          </View>
        </View> */}

        <View
          style={{
            // alignSelf: 'flex-start',
            gap: verticalScale(8),
            // borderWidth:1,
            zIndex: -1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            // justifyContent: 'space-between',
          }}>
          <UploadShow
            head={'Registration Document'}
            file={selectedFilename && selectedFilename?.name}
            onDelete={handleClearFile}
            label={'Upload Registration Document'}
            onUpload={handleSelectFilename}
          />
          <UploadShow
            head={'Aadhar'}
            file={pan && pan?.name}
            label={' Upload Aadhar'}
            style={{alignSelf: 'center'}}
            onUpload={handlePan}
            onDelete={handleClearpan}
          />
          <UploadShow
            head={'Lastest Degree Certificate'}
            file={latestRecord && latestRecord?.name}
            label={'Upload Latest Degree'}
            onUpload={handlelatest}
            onDelete={handleClearlatest}
          />
        </View>
      </ScrollView>

      <View
        style={{
          paddingVertical: moderateScale(16),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}>
        <HButton
          textStyle={{fontSize: CUSTOMFONTSIZE.h2}}
          btnstyles={{
            paddingHorizontal: horizontalScale(96),

            backgroundColor:
              values.doctor_name &&
              values.gender &&
              formatDate &&
              selectedSpeciality &&
              selectedState !== 'Select' &&
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
            } else if (selectedState === 'Select') {
              Alert.alert('Please select State');
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
  main: {
    flex: 1,
    zIndex: 1,
    backgroundColor: CUSTOMCOLOR.white,
    //  CUSTOMCOLOR.white,
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(24),
    // borderWidth: 1,
    gap: verticalScale(16),
    zIndex: 1,
  },

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

    // height: '18%',
    // gap:moderateScale(0),

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
    zIndex: 14,
    width: '100%',
    height: moderateScale(200),
    // paddingHorizontal:horizontalScale(66),
    // zIndex: 10,
    borderWidth: 1,
    // borderRightWidth: 1.5,
    borderColor: CUSTOMCOLOR.primary,
    position: 'absolute',
    right: 1,
    // bottom: 8,
    top: verticalScale(68),
    borderRadius: moderateScale(2),
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
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(10),
  },
  DOBselect: {
    width: '100%',
    gap: moderateScale(8),
    // paddingHorizontal:horizontalScale(16)
  },
  selectedfilecontainer: {
    zIndex: 0,
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(8),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(4),
    borderColor: CUSTOMCOLOR.primary,
    // backgroundColor:'#000000',
  },
  selectedFileInfo: {
    fontFamily: CUSTOMFONTFAMILY.h4,
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.primary,
    paddingRight: moderateScale(8),
    fontWeight: '500',
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
    alignItems: 'center',
    backgroundColor: 'white',
    // borderWidth:1,
    // paddingHorizontal: horizontalScale(24),
    gap: verticalScale(8),
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
    fontWeight: '400',
    paddingVertical: verticalScale(8),
    alignSelf: 'flex-start',
  },
  doc_upload: {
    // zIndex:1,
    // alignSelf: 'flex-start',
    // width:'100%',
    // borderWidth:1,
    // paddingVertical: verticalScale(4),
    marginBottom: moderateScale(4),
    zIndex: 1,
  },
  bottext: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: 18,
    color: CUSTOMCOLOR.black,
  },
  container: {
    paddingBottom: verticalScale(120),
    zIndex: 2,
    gap: verticalScale(16),
  },
});

export default ProfileCreate;
