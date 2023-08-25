import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import PresComponent from '../components/presComponent';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ShowChip from '../components/showChip';
import {
  addAllergies,
  updateAllergies,
} from '../redux/features/prescription/allergies';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../utility/scaleDimension';

const Allergies = () => {
  const nav = useNavigation();
  const [value, setValue] = useState('');
  console.log('value===', value);
  const dispatch = useDispatch();
  const prev = useSelector(state => state?.allergies?.allergies);
  console.log('prev-----', prev);

  const HandleAddValue = () => {
    if (value) {
      console.log('valuesssssssssss');
      dispatch(addAllergies([...prev, {allergies: value}]));
      setValue('');
    }
  };
  const handleDelete = index => {
    console.log('prescription index', index);
    if (prev) {
      const updatedPrescriptions = prev?.filter((item, ind) => ind !== index);

      dispatch(updateAllergies(updatedPrescriptions));
    }
  };
  return (
    <View style={styles.main}>
      <PrescriptionHead heading="Allergies" />

      {prev?.map((item, ind) =>
        prev.length > 0 ? (
          <ShowChip
            text={item?.allergies}
            onPress={() => handleDelete(ind)}
            ind={ind}
          />
        ) : null,
      )}
      <PresComponent
        label="Allergies"
        placeholder="Enter allergies"
        values={value}
        onChange={setValue}
        onPress={HandleAddValue}
      />
    </View>
  );
};
export default Allergies;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    gap: moderateScale(8),
  },
});
