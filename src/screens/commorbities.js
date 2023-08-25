import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import PresComponent from '../components/presComponent';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ShowChip from '../components/showChip';
import {
  addCommorbities,
  updateCommorbities,
} from '../redux/features/prescription/commorbities';
import {CONSTANTS} from '../utility/constant';
import {CUSTOMCOLOR} from '../settings/styles';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';

const Commorbities = () => {
  const nav = useNavigation();
  const [value, setValue] = useState('');
  console.log('value===', value);
  const dispatch = useDispatch();
  const prev = useSelector(state => state?.commorbities?.commorbitiesItems);
  console.log('prev-----', prev);
  const [select, setSelect] = useState('');
  console.log('select>>>>>>', select);

  const selectChange = value => {
    console.log('12223325555');
    setValue(value);
    setSelect(value);
  };

  const constants = (
    <View style={{flexDirection: 'row', gap: moderateScale(12)}}>
      {CONSTANTS.comorbidities?.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => selectChange(item)}
          style={[
            styles.recomend,
            {
              backgroundColor:
                select === item ? CUSTOMCOLOR.primary : CUSTOMCOLOR.white,
            },
          ]}>
          <Text style={{color: CUSTOMCOLOR.black}}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  const HandleAddValue = () => {
    if (value) {
      dispatch(addCommorbities([...prev, {commoribities: value}]));
      setValue('');
    }
  };
  const handleDelete = index => {
    if (prev) {
      const updatedPrescriptions = prev?.filter((item, ind) => ind !== index);

      dispatch(updateCommorbities(updatedPrescriptions));
    }
  };

  return (
    <View style={styles.main}>
      <PrescriptionHead heading="Comorbidities" />

      {prev?.map((item, ind) =>
        prev.length > 0 ? (
          <ShowChip
            text={item?.commoribities}
            onPress={() => handleDelete(ind)}
            ind={ind}
          />
        ) : null,
      )}
      <PresComponent
        // style={{backgroundColor:CUSTOMCOLOR.white}}
        label="Comorbidities"
        placeholder="Enter comorbidities"
        values={value}
        onChange={setValue}
        onPress={HandleAddValue}
        suggestion={constants}
        // data={CONSTANTS.comorbidities}
        // select={selectChange}
      />
    </View>
  );
};

export default Commorbities;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    gap: moderateScale(8),
  },
  recomend: {
    padding: moderateScale(8),
    borderRadius: moderateScale(8),
  },
});
