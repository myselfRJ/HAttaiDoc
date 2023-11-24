import {View, Text, StyleSheet, Dimensions} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {useDispatch, useSelector} from 'react-redux';
import {CUSTOMCOLOR} from '../settings/styles';
import {HButton, InputText} from '../components';
import {useState} from 'react';
import {addmartialHistory} from '../redux/features/prescription/pastHistory';
const height = Dimensions.get('window')?.height;
const width = Dimensions.get('window')?.width;
const MaritalHistory = () => {
  const [maried, setMarried] = useState('');
  const [cons, setCons] = useState('');
  const [others, setOthers] = useState('');
  const dispatch = useDispatch();
  const handleDispatch = () => {
    dispatch(addmartialHistory({married: maried, cons: cons, others: others}));
    setMarried('');
    setCons('');
    setOthers('');
  };
  return (
    <View style={styles.main}>
      <PrescriptionHead heading={'Marital History'} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <InputText
          inputContainer={styles.input}
          label={'Married Since'}
          required={true}
          value={maried}
          setValue={setMarried}
          placeholder={'Enter months,Year'}
        />
        <InputText
          inputContainer={styles.input}
          label={'Consanguinity'}
          required={true}
          value={cons}
          setValue={setCons}
          placeholder={'Consanguinity'}
        />
      </View>
      <InputText
        value={others}
        setValue={setOthers}
        label={'Others'}
        placeholder={'Others'}
      />
      <View style={{flex: 1, justifyContent: 'flex-end', alignSelf: 'center'}}>
        <HButton label={'Save'} onPress={handleDispatch} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    backgroundColor: CUSTOMCOLOR.white,
    gap: moderateScale(32),
  },
  input: {
    width: moderateScale(width) / 2.5,
  },
});
export default MaritalHistory;
