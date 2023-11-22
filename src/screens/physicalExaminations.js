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
import { fileurl } from '../utility/urls';
const PhysicalExamination = ({navigation}) => {
  const token = useSelector(state => state.authenticate.auth.access);
  const route = useRoute();
  const {examinationDetails} = route.params;
  const appointment_id = examinationDetails?.appointment_id;

  const [value, setValue] = useState();
  const [modal, setModal] = useState(false);
  const [uploaddocument, SetUploadDocument] = useState([]);
  const [report,setreport] = useState('')
  // const [selectedFilename, setSelectedFilename] = useState([]);

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
        Alert.alert("Success","Succesfully saved")
        navigation.goBack();
        console.log('API Response:', responseData);
      }
    } catch (error) {
      Alert.alert("Error",`${error}`)
      console.error('Error:', error);
    }
  };
  const apiUrl = URL.uploadPhysicalExamination;

  const handle = () => {
    if(report != undefined){
      nav?.goBack();
    }else{
      postData(apiUrl);
      handlePress();
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
        // console.log('=======>', response?.assets);
        SetUploadDocument([
          ...uploaddocument,
          {
            name: response?.assets?.[0]?.fileName,
            type: response?.assets?.[0]?.type,
            uri: response?.assets?.[0]?.uri,
          },
        ]);
      }
    });
    setModal(!modal);
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
        // console.log("=======>",response?.assets);
        SetUploadDocument([
          ...uploaddocument,
          {
            name: response?.assets?.[0]?.fileName,
            type: response?.assets?.[0]?.type,
            uri: response?.assets?.[0]?.uri,
          },
        ]);
      }
    });
    setModal(!modal);
  };

  const pickSingleFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: true,
      });
      // setSelectedFilename(result[0]?.name);
      // SetUploadDocument(result[0]?.uri);
      SetUploadDocument([
        ...uploaddocument,
        {name: result[0]?.name, type: result[0]?.type, uri: result[0]?.uri},
      ]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        // Handle other errors
      }
    }
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
      console.log('physical===',jsonData)
      setValue(jsonData?.data?.notes === undefined ? '' :jsonData?.data?.notes);
      // setDescribe(jsonData?.data?.description);nnnnn
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
      {!report ? (uploaddocument?.length > 0 ? (
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
      ) : null) : 
      report_findings?.length > 0 ? (
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
      ) : null
      }
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
        onPress={()=>{
          if(report != undefined){
            setModal(false)
          }else{
            handleModal()
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
          onDocument={pickSingleFile}
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
