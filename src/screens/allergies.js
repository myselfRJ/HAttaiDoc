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
import { CONSTANTS } from '../utility/constant';
import { CUSTOMCOLOR,CUSTOMFONTFAMILY,CUSTOMFONTSIZE } from '../settings/styles';

const Allergies = () => {
  const nav = useNavigation();
  const [value, setValue] = useState('');
  const [select, setSelect] = useState('');
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
  const selectChange = value => {
    console.log('12223325555');
    setValue(value);
    setSelect(value);
  };
  const constants = (
    <View style={{flexDirection: 'row', gap: moderateScale(12),paddingHorizontal:horizontalScale(8)}}>
      {CONSTANTS.allergy?.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => selectChange(item)}
          style={[
            styles.recomend,
            {
              backgroundColor:
                value === item ? CUSTOMCOLOR.primary : CUSTOMCOLOR.white,
            },
          ]}>
          <Text style={{color: value === item ? CUSTOMCOLOR.white: CUSTOMCOLOR.black}}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  console.log('=======>',CONSTANTS['allergy'])
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
        suggestion={constants}
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
  recomend: {
    padding: moderateScale(8),
    borderRadius: moderateScale(8),
    paddingHorizontal:horizontalScale(16)
  },
});
