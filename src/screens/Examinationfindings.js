import React from 'react';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  StyleSheet,
  Alert,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {
  addFindings,
  UpadteFindings,
} from '../redux/features/prescription/prescriptionSlice';
import PrescriptionHead from '../components/prescriptionHead';
import {HButton, InputText} from '../components';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {
  CUSTOMCOLOR,
  CUSTOMFONTSIZE,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import PlusButton from '../components/plusbtn';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {commonstyles} from '../styles/commonstyle';
import GalleryModel from '../components/GalleryModal';
import DocumentPicker from 'react-native-document-picker';
import ShowChip from '../components/showChip';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {fileurl, URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import {useNavigation, useRoute} from '@react-navigation/native';
import {stopUpload} from 'react-native-fs';
import CustomIcon from '../components/icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AlertMessage from './Alerts';
import {
  handleCamera,
  handleGallery,
  pickSingleFile,
  showToast,
} from '../utility/const';
import DropdownComponent from '../components/Dropdownbox';
import SelectorBtn from '../components/selector';
import DatePicker from 'react-native-date-picker';

const ExaminationFindings = ({navigation}) => {
  const token = useSelector(state => state.authenticate.auth.access);
  const route = useRoute();
  const {examinationDetails} = route.params;
  const [value, setValue] = useState('');
  const nav = useNavigation();
  const [describe, setDescribe] = useState('');
  const [modal, setModal] = useState(false);
  const [uploaddocument, SetUploadDocument] = useState([]);
  const [report, setreport] = useState();
  const appointment_id = examinationDetails?.appointment_id;
  const [recordstype, setRecordsType] = useState('');
  const recordItems = [
    {label: 'Prescription', value: 'Prescription'},
    {label: 'Scan', value: 'Scan'},
    {label: 'Lab', value: 'Lab'},
    {label: 'Others', value: 'Others'},
  ];
  const [otherstype, setOthersType] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const handleFiles = () => {
    setFiles([
      ...files,
      {
        type: recordstype === 'Others' ? otherstype : recordstype,
        date: date?.toISOString()?.split('T')[0],
        describe: describe,
      },
    ]);
    setOthersType('');
    setRecordsType('');
    setDate(new Date());
    setDescribe('');
  };
  const handleFilterFiles = ind => {
    const filesfilter = files?.filter((item, _) => ind !== _);
    setFiles(filesfilter);
  };
  const postData = async url => {
    const formData = new FormData();
    formData.append('finding', `${value ? value : 'NaN'}`);
    formData.append('description', `${JSON.stringify(files)}`);
    formData.append('doctor_phone_number', `${examinationDetails?.doc_phone}`);
    formData.append(
      'patient_phone_number',
      `${examinationDetails?.patient_phone}`,
    );
    formData.append('clinic_id', `${examinationDetails?.clinic_id}`);
    formData.append('appointment_id', `${examinationDetails?.appointment_id}`);
    for (let i = 0; i < uploaddocument.length; i++) {
      formData.append(`file${i + 1 + report_filter?.length}`, {
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
        // Alert.alert('Success', 'Succesfully Saved');
        showToast('success', 'Succesfully Saved');
        navigation.goBack();
        // console.log('API Response:', responseData);
      }
    } catch (error) {
      // Alert.alert('Error', `${error}`);
      showToast('error', `${error}`);
      console.error('Error:', error);
    }
  };
  const fetchReport = async () => {
    const response = await fetchApi(URL.get_reports(appointment_id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setValue(
        jsonData?.data?.finding === undefined ? '' : jsonData?.data?.finding,
      );
      try {
        const parsed = JSON.parse(jsonData?.data?.description);
        setFiles(parsed?.length > 0 ? parsed : []);
      } catch (err) {
        console.log(err);
      }
      setreport(jsonData?.data);
      dispatch(addFindings({describe: jsonData?.data?.description}));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchReport();
    // SetUploadDocument(report_findings)
  }, []);

  const report_findings = [
    {name: report?.file1 ? report?.file1 : null},
    {name: report?.file2 ? report?.file2 : null},
    {name: report?.file3 ? report?.file3 : null},
    {name: report?.file4 ? report?.file4 : null},
    {name: report?.file5 ? report?.file5 : null},
  ];
  const report_filter = report_findings?.filter(
    item => item?.name !== undefined && item?.name !== null,
  );
  // console.log([...uploaddocument, ...report_filter]);
  const apiUrl = URL.uploadExaminations;

  const handle = () => {
    postData(apiUrl);
    handlePress();
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
        {
          name: file?.name,
          type: file?.type,
          uri: file?.uri,
          base64: file?.base64uri,
        },
      ]);
    } catch (error) {}
    setModal(!modal);
  };
  const dispatch = useDispatch();
  const exam_findings = {
    value: value,
    describe: describe,
    documents: JSON.stringify(uploaddocument),
  };

  const handlePress = () => {
    dispatch(addFindings(exam_findings));
    setValue('');
    setDescribe('');
  };
  const handleDelete = index => {
    if (uploaddocument?.length > 0) {
      const updatedfiles = uploaddocument?.filter((item, ind) => ind !== index);
      SetUploadDocument(updatedfiles);
    }
  };

  const handleModal = () => {
    if ([...uploaddocument, ...report_filter]?.length >= 5) {
      setModal(false);
    } else {
      setModal(true);
    }
  };
  const handleReports_Physical = filepath => {
    const path = `${filepath}`;
    if (filepath?.includes('pdf') || filepath?.length > 250) {
      navigation.navigate('pdfhistory', {path});
    } else {
      navigation.navigate('img', {path});
    }
  };

  const colorCheck = [...uploaddocument, ...report_filter];
  return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <PrescriptionHead
          heading={'Report Findings'}
          headtext={{fontWeight: 'bold'}}
          head={{paddingHorizontal: 0}}
        />
      </View>
      {files?.map((item, index) => (
        <ShowChip
          text={`${item?.type ? `Type: ${item?.type} |` : ''} ${item?.date} ${
            item?.describe ? ` | Describe: ${item?.describe} ` : ''
          }`}
          onPress={() => handleFilterFiles(index)}
        />
      ))}
      <DropdownComponent
        style={{paddingHorizontal: 0}}
        value={recordstype}
        select={value => setRecordsType(value)}
        placeholder="Type of Record"
        data={recordItems}
      />
      {recordstype === 'Others' ? (
        <InputText
          label={'Enter Type'}
          value={otherstype}
          setValue={setOthersType}
          placeholder="Enter Type of Record"
        />
      ) : null}
      <View>
        <SelectorBtn
          label={'Issue Date'}
          select={{
            borderWidth: 1,
            borderColor: CUSTOMCOLOR.primary,
            // marginHorizontal: horizontalScale(4),
          }}
          input={date.toISOString().split('T')[0]}
          setValue={setDate}
          name={'calendar'}
          onPress={() => setOpen(true)}
        />
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <InputText
          value={describe}
          label={'Description'}
          setValue={setDescribe}
          multiline={true}
          placeholder={'Write Your Report findings.......'}
          textStyle={{
            height: moderateScale(100),
            textAlignVertical: 'top',
            color: CUSTOMCOLOR.black,
            fontWeight: '700',
          }}
          inputContainer={{width: '85%'}}
          lbltext={{
            fontSize: CUSTOMFONTSIZE.h3,
          }}
        />
        <PlusButton
          type={'add'}
          onPress={handleFiles}
          style={{marginTop: moderateScale(72)}}
          icon={'plus'}
          size={moderateScale(32)}
        />
      </View>
      {[...uploaddocument, ...report_filter]?.length > 0 ? (
        <View style={{marginTop: verticalScale(16)}}>
          {[...uploaddocument, ...report_filter]?.map((item, index) =>
            item?.type !== undefined ? (
              <ShowChip
                onNav={() =>
                  handleReports_Physical(
                    item?.type === 'application/pdf'
                      ? `data:application/pdf;base64,${item?.base64}`
                      : item?.type !== undefined
                      ? item?.uri
                      : `${fileurl}${item?.name}`,
                  )
                }
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
            ) : (
              <ShowChip
                onNav={() =>
                  handleReports_Physical(
                    item?.type === 'application/pdf'
                      ? `data:application/pdf;base64,${item?.base64}`
                      : item?.type !== undefined
                      ? item?.uri
                      : `${fileurl}${item?.name}`,
                  )
                }
                key={index}
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
                main={{paddingVertical: verticalScale(6)}}
              />
            ),
          )}
        </View>
      ) : null}
      <PlusButton
        size={moderateScale(40)}
        style={{
          alignSelf: 'flex-end',
          marginTop: verticalScale(48),
          backgroundColor:
            colorCheck?.length === 5
              ? CUSTOMCOLOR.disable
              : CUSTOMCOLOR.primary,
        }}
        icon={'file-document-outline'}
        onPress={() => {
          handleModal();
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
        <Text style={{color: CUSTOMCOLOR.black, fontSize: CUSTOMFONTSIZE.h5}}>
          Note: You can upload Upto 5 Files and each file less than 5mb
        </Text>
        <HButton
          btnstyles={commonstyles.activebtn}
          onPress={handle}
          label={'Save'}
        />
      </View>
      {/* <View
        style={{
          justifyContent: 'flex-end',
          // alignSelf:'center',
          flex: 1,
          // marginHorizontal: horizontalScale(80),
        }}>
        <HButton
          btnstyles={commonstyles.activebtn}
          onPress={handle}
          label={'Save'}
        />
      </View> */}
    </View>
  );
};

export default ExaminationFindings;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    flex: 1,
    gap: verticalScale(16),
    backgroundColor: CUSTOMCOLOR.background,
  },
  modalOverlay: {
    position: 'absolute',
    // width:'100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // borderWidth:1
    // backgroundColor: 'rgba(0,0,0,0.5)'
  },
});
