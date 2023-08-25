import {View, Text, TouchableOpacity} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import PresComponent from '../components/presComponent';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ShowChip from '../components/showChip';
import {
  addpastHistory,
  updatepastHistory,
} from '../redux/features/prescription/pastHistory';

const PastHistory = () => {
  const nav = useNavigation();
  const [value, setValue] = useState('');
  console.log('value===', value);
  const dispatch = useDispatch();
  const prev = useSelector(state => state?.pasthistory?.pasthistory);
  console.log('prev-----', prev);

  const HandleAddValue = () => {
    if (value) {
      console.log('valuesssssssssss');
      dispatch(addpastHistory([...prev, {past_history: value}]));
      setValue('');
    }
  };
  const handleDelete = index => {
    console.log('prescription index', index);
    if (prev) {
      const updatedPrescriptions = prev?.filter((item, ind) => ind !== index);

      dispatch(updatepastHistory(updatedPrescriptions));
    }
  };
  return (
    <View style={{paddingHorizontal: 24, paddingVertical: 16, gap: 8}}>
      <PrescriptionHead heading="Past History" />

      {prev?.map((item, ind) =>
        prev.length > 0 ? (
          <ShowChip
            text={item?.past_history}
            onPress={() => handleDelete(ind)}
            ind={ind}
          />
        ) : null,
      )}
      <PresComponent
        label="Past Hospilization"
        placeholder="Eg: Previous hosplilization like reason ,date,duration"
        values={value}
        onChange={setValue}
        onPress={HandleAddValue}
      />
    </View>
  );
};
export default PastHistory;
