import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../utility/scaleDimension';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {HButton, InputText, SelectorBtn} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownComponent from '../components/Dropdownbox';
import DatePicker from 'react-native-date-picker';
import UploadCard from '../components/UploadCard';
import PrescribeHead from '../components/prescriptionHead';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import PlusButton from '../components/plusbtn';
import GalleryModel from '../components/GalleryModal';
import ShowChip from '../components/showChip';
import {commonstyles} from '../styles/commonstyle';
import {useRoute} from '@react-navigation/native';
import {URL} from '../utility/urls';
import {useSelector} from 'react-redux';

const Uploadrecord = ({navigation}) => {
  const route = useRoute();
  const token = useSelector(state => state.authenticate.auth.access);
  const {patient_phone_number, doctor_phone_number, clinic_id, appointment_id} =
    route.params;
  const [description, setDescription] = useState('');
  const [recordstype, setRecordsType] = useState('');
  const [otherstype, setOthersType] = useState('');
  console.log('===recotsd', recordstype, otherstype);
  const recordItems = [
    {label: 'Prescription', value: 'Prescription'},
    {label: 'Scan', value: 'Scan'},
    {label: 'Lab', value: 'Lab'},
    {label: 'Others', value: 'Others'},
  ];
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  // const [selectedFilename, setSelectedFilename] = useState();
  const [uploaddocument, SetUploadDocument] = useState([]);
  const [modal, setModal] = useState(false);
  // console.log('========>', date, description, recordstype, uploaddocument);
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

  const handleDelete = index => {
    if (uploaddocument.length > 0) {
      const updatedfiles = uploaddocument?.filter((item, ind) => ind !== index);
      SetUploadDocument(updatedfiles);
    }
  };

  const handleModal = () => {
    if (uploaddocument.length === 1) {
    } else {
      setModal(!modal);
    }
  };

  const postData = async url => {
    const formData = new FormData();
    formData.append(
      'type_report',
      `${recordstype === 'Others' ? otherstype : recordstype}`,
    );
    formData.append('issued_date', `${date.toISOString().split('T')[0]}`);
    formData.append('record_description', `${description}`);
    formData.append('doctor_phone_number', `${doctor_phone_number}`);
    formData.append('patient_phone_number', `${patient_phone_number}`);
    formData.append('clinic_id', `${clinic_id}`);
    formData.append('appointment_id', `${appointment_id}`);
    formData.append(`report_url`, {
      uri: `${uploaddocument[0]?.uri}`,
      type: `${uploaddocument[0]?.type}`,
      name: `${uploaddocument[0]?.name}`,
    });
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
        Alert.alert('SuccesFully saved');
        navigation.goBack();
        console.log('API Response:', responseData);
      }
    } catch (error) {
      Alert.alert(`${error}`);
      console.error('Error:', error);
    }
  };
  const apiUrl = URL.upload_reports;

  const handle = () => {
    postData(apiUrl);
  };

  return (
    <View
      style={{
        paddingHorizontal: horizontalScale(24),
        flex: 1,
        gap: moderateScale(8),
        paddingVertical: verticalScale(16),
      }}>
      <PrescribeHead heading={'Upload Records'} />
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
      <InputText
        label={'Description'}
        placeholder="Type your description here"
        value={description}
        setValue={setDescription}
        // maxLength={1000}
        multiline
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
            uploaddocument?.length === 1
              ? CUSTOMCOLOR.disable
              : CUSTOMCOLOR.primary,
        }}
        icon={'file-document-outline'}
        onPress={handleModal}
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
      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <HButton
          label={'Save'}
          btnstyles={{
            backgroundColor:
              recordstype && description && uploaddocument?.length === 1
                ? CUSTOMCOLOR.primary
                : CUSTOMCOLOR.disable,
          }}
          onPress={
            recordstype && description && uploaddocument?.length === 1
              ? handle
              : null
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h2,
    fontWeight: 'bold',
    paddingBottom: moderateScale(16),
  },
  txt: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h4,
    fontWeight: '400',
  },
  icon: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
});

export default Uploadrecord;
