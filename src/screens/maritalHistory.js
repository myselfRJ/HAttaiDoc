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
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {addmartialHistory} from '../redux/features/prescription/pastHistory';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
const height = Dimensions.get('window')?.height;
const width = Dimensions.get('window')?.width;
const MaritalHistory = ({route}) => {
  const nav = useNavigation();
  const [maried, setMarried] = useState('');
  const [cons, setCons] = useState('');
  const [others, setOthers] = useState('');
  const {phone, patient_phone} = route.params;
  const token = useSelector(state => state.authenticate.auth.access);
  const dispatch = useDispatch();
  const marital = useSelector(state => state?.pasthistory?.martialHistory);
  const handleDispatch = () => {
    dispatch(addmartialHistory({married: maried, cons: cons, others: others}));
    setMarried('');
    setCons('');
    setOthers('');
    nav.goBack();
  };
  const fetchMaritalData = async () => {
    try {
      const response = await fetchApi(URL.getMedical(phone, patient_phone), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        if (jsonData?.data[0]?.martial_history) {
          const mens = JSON.parse(jsonData.data[0].martial_history);
          setMarried(mens?.married);
          setCons(mens?.cons);
          setOthers(mens?.others);
          dispatch(addmartialHistory(mens));
        }
      } else {
        console.error('API call failed:', response.status, response);
      }
    } catch (error) {
      console.error('Error in fetchMedicalData:', error);
    }
  };

  useEffect(() => {
    fetchMaritalData();
  }, []);
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
