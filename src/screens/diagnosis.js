import {View, Text, TouchableOpacity} from 'react-native';
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

const Diagnosis = ({navigation}) => {
  const nav = useNavigation();
  const [value, setValue] = useState('');
  // console.log('value===',value)
  const dispatch = useDispatch();
  const prev = useSelector(state => state?.diagnosis?.DiagnosisItems);
  // console.log('prev-----',prev)

  const HandleAddValue = () => {
    if (value) {
      // console.log('valuesssssssssss');
      dispatch(addDiagnosis([...prev, {diagnosis: value}]));
      setValue('');
    }
  };
  // const handlePress = () => {
  //     console.log(value);
  //     nav.goBack();
  // };
  // const handleDeleteSlotChip = index => {
  //     console.log('...', index);
  //     const newData = prev?.filter((_, i) => i !== index);
  //     dispatch(updateDiagnosis.updateDiagnosis(newData));
  //   };
  const handleDelete = index => {
    // console.log('prescription index', index);
    if (prev) {
      const updatedPrescriptions = prev?.filter((item, ind) => ind !== index);

      dispatch(updateDiagnosis(updatedPrescriptions));
    }
  };
  // const [showSlotChip, setShowSlotChip] = useState(false);
  return (
    <View style={{paddingHorizontal: 24, paddingVertical: 16, gap: 8}}>
      <PlusButton
        icon="close"
        style={{
          zIndex: 4,
          backgroundColor: 'transparent',
          position: 'absolute',
          alignSelf: 'flex-end',
          padding: 16,
        }}
        color="#000000aa"
        size={32}
        onPress={() => navigation.goBack()}
      />

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

      <View style={{marginBottom: 16}}>
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
