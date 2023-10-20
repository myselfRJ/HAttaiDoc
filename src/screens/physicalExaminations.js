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
import { commonstyles } from '../styles/commonstyle';

const PhysicalExamination = () => {
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  //   const exam = useSelector(state => state.prescription?.physicalExamination);
  const handlePress = () => {
    dispatch(addExamination(value));
    setValue('');
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
    backgroundColor:CUSTOMCOLOR.background
  },
});
