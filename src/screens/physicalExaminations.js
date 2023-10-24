import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
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

const PhysicalExamination = () => {
  const [value, setValue] = useState();
  const [modal, setModal] = useState(false);
  const [uploaddocument, SetUploadDocument] = useState([]);
  // const [selectedFilename, setSelectedFilename] = useState([]);

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
        SetUploadDocument([...uploaddocument,{name:response?.assets?.[0]?.fileName,type:response?.assets?.[0]?.type,uri:response?.assets?.[0]?.uri}])
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
        SetUploadDocument([...uploaddocument,{name:response?.assets?.[0]?.fileName,type:response?.assets?.[0]?.type,uri:response?.assets?.[0]?.uri}])
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
      SetUploadDocument([...uploaddocument,{name:result[0]?.name,type:result[0]?.type,uri:result[0]?.uri}])
      console.log('result===', result[0]);
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
  //   const exam = useSelector(state => state.prescription?.physicalExamination);
  const handlePress = () => {
    dispatch(addExamination(value));
    setValue('');
  };
  const handleDelete = index => {
    if (uploaddocument?.length > 0) {
      const updatedfiles = uploaddocument?.filter(
        (item, ind) => ind !== index,
      );
      SetUploadDocument(updatedfiles)
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
      {uploaddocument?.length>0 ? (
        <View style={{marginTop:verticalScale(16)}}>
          {uploaddocument?.map((item,index)=>(
          <ShowChip 
          key={index} 
          onPress={()=>handleDelete(index)} 
          text={<><Icon color={CUSTOMCOLOR.error} size={moderateScale(20)} name={item?.type === "application/pdf" ? 'file-pdf-box':'image'} /> {item?.name?.includes('temp')?item?.name?.split('temp_')[1]?.toString():item?.name}</>} 
         main={{marginHorizontal:0}}
          />
   
         ))}
        </View>
      ):null}
      <PlusButton
        size={moderateScale(40)}
        style={{alignSelf: 'flex-end', marginTop: verticalScale(48)}}
        icon={'file-document-outline'}
        onPress={() => setModal(!modal)}
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
          onPress={handlePress}
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
