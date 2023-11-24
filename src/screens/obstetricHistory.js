import {View, Text, StyleSheet} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {HButton, InputText} from '../components';
import {CUSTOMCOLOR} from '../settings/styles';
import {commonstyles} from '../styles/commonstyle';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addobstericHistory} from '../redux/features/prescription/pastHistory';

const ObstetricHistory = () => {
  const dispatch = useDispatch();
  const obs = useSelector(state => state?.pasthistory?.obstericHistory);
  const [value, setvalue] = useState({
    year: '',
    anc: '',
    delivery: '',
    pn: '',
    baby: '',
    age: '',
    others: '',
  });
  const handlevalue = (name, value) => {
    setvalue(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log('values==', obs);
  const handledata = () => {
    dispatch(
      addobstericHistory({
        year: value?.year,
        anc: value?.anc,
        delivery: value?.delivery,
        pn: value?.pn,
        baby: value?.baby,
        age: value?.age,
        others: value?.others,
      }),
    );
  };
  return (
    <View style={styles.main}>
      <PrescriptionHead heading={'Past Obstetric History(GPLA)'} />
      <View style={styles.fields}>
        <InputText
          label={'Year'}
          placeholder={'Year'}
          inputContainer={styles.input}
          value={value.year}
          setValue={val => handlevalue('year', val)}
        />
        <InputText
          label={'ANC'}
          placeholder={'ANC'}
          inputContainer={styles.input}
          value={value.anc}
          setValue={val => handlevalue('anc', val)}
        />
        <InputText
          label={'Delivery'}
          placeholder={'Delivery'}
          inputContainer={styles.input}
          value={value.delivery}
          setValue={val => handlevalue('delivery', val)}
        />
        <InputText
          label={'PN'}
          placeholder={'PN'}
          inputContainer={styles.input}
          value={value.pn}
          setValue={val => handlevalue('pn', val)}
        />
        <InputText
          label={'Baby'}
          placeholder={'Baby'}
          inputContainer={styles.input}
          value={value.baby}
          setValue={val => handlevalue('baby', val)}
        />
        <InputText
          label={'Age'}
          placeholder={'Age'}
          inputContainer={styles.input}
          value={value.age}
          setValue={val => handlevalue('age', val)}
        />
      </View>
      <InputText
        label={'Others'}
        placeholder={'Others'}
        value={value.others}
        setValue={val => handlevalue('others', val)}
      />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <HButton
          btnstyles={commonstyles.activebtn}
          label={'Save'}
          onPress={() => {
            handledata();
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    gap: moderateScale(16),
    backgroundColor: CUSTOMCOLOR.background,
  },
  fields: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  input: {
    width: horizontalScale(100),
  },
});
export default ObstetricHistory;
