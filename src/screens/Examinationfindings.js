import React from 'react';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, Alert} from 'react-native';
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
import {URL} from '../utility/urls';
import {useRoute} from '@react-navigation/native';

const ExaminationFindings = ({navigation}) => {
  const token = useSelector(state => state.authenticate.auth.access);
  const route = useRoute();
  const {examinationDetails} = route.params;
  const [value, setValue] = useState('');
  const [describe, setDescribe] = useState('');
  const [modal, setModal] = useState(false);
  const [uploaddocument, SetUploadDocument] = useState([]);
  // const [selectedFilename, setSelectedFilename] = useState([]);
  const postData = async url => {
    const formData = new FormData();
    formData.append('finding', `${value}`);
    formData.append('description', `${describe}`);
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
      if (responseData){
        navigation.goBack()
        console.log('API Response:', responseData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const apiUrl = URL.uploadPhysicalExamination;

  const handle = () => {
    postData(apiUrl);
    handlePress();
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
      // console.log('result===', result[0]);
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
  return (
    <View style={styles.main}>
      <PrescriptionHead
        heading={'Examination Findings'}
        headtext={{fontWeight: 'bold'}}
        head={{paddingHorizontal: 0}}
      />
      <InputText
        value={value}
        label={'Examination Finding'}
        setValue={setValue}
        multiline={true}
        placeholder={'Write Your Notes.......'}
        textStyle={{
          //   height: moderateScale(200),
          //   textAlignVertical: 'top',

          color: CUSTOMCOLOR.black,
          fontWeight: '700',
        }}
        lbltext={{
          fontSize: CUSTOMFONTSIZE.h3,
        }}
      />
      <InputText
        value={describe}
        label={'Description'}
        setValue={setDescribe}
        multiline={true}
        placeholder={'Write Your Notes.......'}
        textStyle={{
          height: moderateScale(200),
          textAlignVertical: 'top',
          color: CUSTOMCOLOR.black,
          fontWeight: '700',
        }}
        lbltext={{
          fontSize: CUSTOMFONTSIZE.h3,
        }}
      />
      {uploaddocument?.length > 0 ? (
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
      ) : null}
      <PlusButton
        size={moderateScale(40)}
        style={{
          alignSelf: 'flex-end',
          marginTop: verticalScale(48),
          backgroundColor:
            uploaddocument?.length === 5
              ? CUSTOMCOLOR.disable
              : CUSTOMCOLOR.primary,
        }}
        icon={'file-document-outline'}
        onPress={
          uploaddocument?.length <= 5
            ? () => setModal(!modal)
            : Alert.alert('You Have Reached Maximum Limit')
        }
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
          // alignSelf:'center',
          flex: 1,
          // marginHorizontal: horizontalScale(80),
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

export default ExaminationFindings;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    flex: 1,
    gap: verticalScale(16),
  },
});
