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
  const dispatch = useDispatch();
  const prev = useSelector(state => state?.pasthistory?.pasthistory);

  const HandleAddValue = () => {
    if (value) {
      dispatch(addpastHistory([...prev, {past_history: value}]));
      setValue('');
    }
  };
  const handleDelete = index => {
    if (prev) {
      const updatedPrescriptions = prev?.filter((item, ind) => ind !== index);

      dispatch(updatepastHistory(updatedPrescriptions));
    }
  };
  return (
    <View style={{paddingHorizontal: 24, paddingVertical: 16, gap: 8}}>
      <PrescriptionHead heading="Past Hospitalization" />

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
        label="Past Hospitalization"
        placeholder="Eg: Previous hospitalization like reason, date, duration"
        values={value}
        onChange={setValue}
        onPress={HandleAddValue}
      />
    </View>
  );
};
export default PastHistory;
