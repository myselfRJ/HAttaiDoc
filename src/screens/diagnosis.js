import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import PresComponent from '../components/presComponent';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addDiagnosis,
  updateDiagnosis,
} from '../redux/features/prescription/diagnosis';
import {useNavigation} from '@react-navigation/native';
import {SlotChip} from '../components';
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

const Diagnosis = ({navigation}) => {
  const nav = useNavigation();
  const [value, setValue] = useState('');
  // console.log('value===',value)
  const dispatch = useDispatch();
  const prev = useSelector(state => state?.diagnosis?.DiagnosisItems);
  // console.log('prev-----',prev)

  const HandleAddValue = () => {
    if (value) {
      dispatch(addDiagnosis([...prev, {diagnosis: value}]));
      setValue('');
    }
  };
  const handleDelete = index => {
    if (prev) {
      const updatedPrescriptions = prev?.filter((item, ind) => ind !== index);

      dispatch(updateDiagnosis(updatedPrescriptions));
    }
  };
  // const [showSlotChip, setShowSlotChip] = useState(false);
  return (
    <View style={styles.main}>
      {/* <PlusButton
        icon="close"
        style={styles.child}
        color="#000000aa"
        size={moderateScale(32)}
        onPress={() => navigation.goBack()}
      /> */}

      <PrescriptionHead heading="Diagnosis" />
      {prev?.map((item, ind) =>
        prev.length > 0 ? (
          <ShowChip
            text={item?.diagnosis}
            onPress={() => handleDelete(ind)}
            ind={ind}
          />
        ) : null,
      )}

      <View style={{marginBottom: moderateScale(16)}}>
        <PresComponent
          label="Diagnosis"
          placeholder="Enter diagnosis"
          values={value}
          onChange={setValue}
          onPress={HandleAddValue}
        />
      </View>
    </View>
  );
};
export default Diagnosis;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    gap: moderateScale(8),
  },
  child: {
    zIndex: moderateScale(4),
    backgroundColor: 'transparent',
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: moderateScale(16),
  },
});
