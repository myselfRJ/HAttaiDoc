import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';

import PresComponent from '../components/presComponent';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {SelectorBtn, SlotChip} from '../components';
import ShowChip from '../components/showChip';
import PlusButton from '../components/plusbtn';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import InputText from '../components/inputext';
import HButton from '../components/button';
import {ScrollView} from 'react-native-gesture-handler';
import {
  StoreAsyncData,
  UpdateAsyncData,
  RetriveAsyncData,
} from '../utility/AsyncStorage';
import {
  addExamination,
  UpadteExamination,
} from '../redux/features/prescription/prescriptionSlice';
import {commonstyles} from '../styles/commonstyle';
import GalleryModel from '../components/GalleryModal';
import DocumentPicker from 'react-native-document-picker';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useRoute} from '@react-navigation/native';
import {fileurl} from '../utility/urls';
import {
  handleCamera,
  handleGallery,
  pickSingleFile,
  showToast,
} from '../utility/const';
const PhysicalExamination = ({navigation}) => {
  const token = useSelector(state => state.authenticate.auth.access);
  const route = useRoute();
  const {examinationDetails} = route.params;
  const appointment_id = examinationDetails?.appointment_id;

  const [value, setValue] = useState();
  const [modal, setModal] = useState(false);
  const [uploaddocument, SetUploadDocument] = useState([]);
  const [report, setreport] = useState('');
  // const [selectedFilename, setSelectedFilename] = useState([]);
  const [consent, setConsent] = useState(false);

  const postData = async url => {
    const formData = new FormData();
    formData.append('notes', `${value}`);
    formData.append('doctor_phone_number', `${examinationDetails?.doc_phone}`);
    formData.append(
      'patient_phone_number',
      `${examinationDetails?.patient_phone}`,
    );
    formData.append('clinic_id', `${examinationDetails?.clinic_id}`);
    formData.append('appointment_id', `${examinationDetails?.appointment_id}`);
    for (let i = 0; i < uploaddocument.length; i++) {
      formData.append(`file${i + 1}`, {
        uri: `${uploaddocument[i]?.uri}`,
        type: `${uploaddocument[i]?.type}`,
        name: `${uploaddocument[i]?.name}`,
      });
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    try {
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      if (responseData) {
        showToast('success', 'Succesfully saved');
        navigation.goBack();
        console.log('API Response:', responseData);
        const statusCosent = await fetch(URL.consent, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: consent,
            doctor_phone_number: examinationDetails?.doc_phone,
            patient_phone_number: examinationDetails?.patient_phone,
            clinic_id: examinationDetails?.clinic_id,
            appointment_id: examinationDetails?.appointment_id,
          }),
        });
        const json = await statusCosent.json();
        console.log(json);
      }
    } catch (error) {
      showToast('error', `${error}`);
      console.error('Error:', error);
    }
  };
  const apiUrl = URL.uploadPhysicalExamination;

  const handle = () => {
    if (report != undefined) {
      navigation?.goBack();
    } else {
      if (consent) {
        postData(apiUrl);
        handlePress();
      } else {
        showToast('error', 'Please take Declaration from Patient');
      }
    }
  };

  const onImagePress = async () => {
    try {
      const data = await handleGallery();
      SetUploadDocument([
        ...uploaddocument,
        {
          name: data?.name,
          type: data?.type,
          uri: data?.uri,
        },
      ]);
    } catch (error) {
      console.error('Error capturing data:', error);
    }
    setModal(false);
  };

  const openCamera = async () => {
    try {
      const data = await handleCamera();
      SetUploadDocument([
        ...uploaddocument,
        {
          name: data?.name,
          type: data?.type,
          uri: data?.uri,
        },
      ]);
    } catch (error) {
      console.error('Error capturing data:', error);
    }
    setModal(false);
  };

  const handleSelectFilename = async () => {
    try {
      const file = await pickSingleFile();
      SetUploadDocument([
        ...uploaddocument,
        {name: file?.name, type: file?.type, uri: file?.uri},
      ]);
    } catch (error) {}
    setModal(!modal);
  };
  const dispatch = useDispatch();
  const handlePress = () => {
    const examinations = {
      value: value,
      documents: JSON.stringify(uploaddocument),
    };
    dispatch(addExamination(examinations));
    setValue('');
  };
  const handleDelete = index => {
    if (uploaddocument?.length > 0) {
      const updatedfiles = uploaddocument?.filter((item, ind) => ind !== index);
      SetUploadDocument(updatedfiles);
    }
  };
  const handleModal = () => {
    if (uploaddocument?.length >= 5) {
    } else {
      setModal(!modal);
    }
  };
  const fetchPhysical = async () => {
    const response = await fetchApi(URL.get_physical(appointment_id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      // console.log('physical===',jsonData)
      setValue(
        jsonData?.data?.notes === undefined ? '' : jsonData?.data?.notes,
      );
      const value =
        jsonData?.data?.notes === undefined ? '' : jsonData?.data?.notes;
      dispatch(addExamination({value: value}));
      setreport(jsonData?.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchPhysical();
  }, []);
  const report_findings = [
    {name: report?.file1 ? report?.file1 : null},
    {name: report?.file2 ? report?.file2 : null},
    {name: report?.file3 ? report?.file3 : null},
    {name: report?.file4 ? report?.file4 : null},
    {name: report?.file5 ? report?.file5 : null},
  ];
  const handleReports_Physical = filepath => {
    const path = `${fileurl}${filepath}`;
    if (filepath?.includes('pdf')) {
      navigation.navigate('pdfhistory', {path});
    } else {
      navigation.navigate('img', {path});
    }
  };
  return (
    <View style={styles.main}>
      <PrescriptionHead heading={'Physical Examination'} />
      <InputText
        value={value}
        setValue={setValue}
        multiline={true}
        placeholder={'Write Your Notes.......'}
        textStyle={{
          height: moderateScale(200),
          textAlignVertical: 'top',
          color: CUSTOMCOLOR.black,
          fontWeight: '700',
        }}
      />
      {!report ? (
        uploaddocument?.length > 0 ? (
          <View style={{marginTop: verticalScale(16)}}>
            {uploaddocument?.map((item, index) => (
              <ShowChip
                key={index}
                onPress={() => handleDelete(index)}
                text={
                  <>
                    <Icon
                      color={CUSTOMCOLOR.error}
                      size={moderateScale(20)}
                      name={
                        item?.type === 'application/pdf'
                          ? 'file-pdf-box'
                          : 'image'
                      }
                    />{' '}
                    {item?.name?.includes('temp')
                      ? item?.name?.split('temp_')[1]?.toString()
                      : item?.name}
                  </>
                }
                main={{marginHorizontal: 0}}
              />
            ))}
          </View>
        ) : null
      ) : report_findings?.length > 0 ? (
        <View style={{marginTop: verticalScale(16)}}>
          {report_findings?.map(
            (item, index) =>
              item?.name !== null && (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleReports_Physical(item?.name)}>
                  <ShowChip
                    key={index}
                    text={
                      <>
                        <Icon
                          color={CUSTOMCOLOR.error}
                          size={moderateScale(20)}
                          name={
                            item?.name?.includes('pdf')
                              ? 'file-pdf-box'
                              : 'image'
                          }
                        />{' '}
                        {item?.name}
                      </>
                    }
                    main={{marginHorizontal: 0}}
                  />
                </TouchableOpacity>
              ),
          )}
        </View>
      ) : null}
      <TouchableOpacity
        onPress={() => setConsent(!consent)}
        style={{
          alignSelf: 'flex-end',
          paddingHorizontal: horizontalScale(16),
          paddingVertical: verticalScale(16),
        }}>
        <Icon
          name={consent ? 'eye' : 'eye-circle-outline'}
          color={CUSTOMCOLOR.primary}
          size={moderateScale(36)}></Icon>
      </TouchableOpacity>
      <PlusButton
        size={moderateScale(40)}
        style={{
          alignSelf: 'flex-end',
          marginTop: verticalScale(48),
          backgroundColor:
            uploaddocument?.length === 5 || report != undefined
              ? CUSTOMCOLOR.disable
              : CUSTOMCOLOR.primary,
        }}
        icon={'file-document-outline'}
        onPress={() => {
          if (report != undefined) {
            setModal(false);
          } else {
            handleModal();
          }
        }}
      />
      {modal && (
        <GalleryModel
          visible={modal}
          Close={setModal}
          OnGallery={onImagePress}
          OnCamera={openCamera}
          document={true}
          onDocument={handleSelectFilename}
        />
      )}
      <View
        style={{
          justifyContent: 'flex-end',
          flex: 1,
        }}>
        <HButton
          btnstyles={commonstyles.activebtn}
          onPress={handle}
          label={'Save'}
        />
      </View>
    </View>
  );
};

export default PhysicalExamination;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    flex: 1,
    backgroundColor: CUSTOMCOLOR.background,
  },
});
