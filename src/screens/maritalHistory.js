import {View, Text, StyleSheet, Dimensions} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {useDispatch, useSelector} from 'react-redux';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {HButton, InputText, SelectionTab, SelectorBtn} from '../components';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {addmartialHistory} from '../redux/features/prescription/pastHistory';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import {CONSTANTS} from '../utility/constant';
const height = Dimensions.get('window')?.height;
const width = Dimensions.get('window')?.width;
const MaritalHistory = ({route}) => {
  const nav = useNavigation();
  const [maried, setMarried] = useState('');
  const [maritalstatus, setmaritalStatus] = useState('');
  const selction = ['Yes', 'No'];
  const [status, setStatus] = useState('');
  const [cons, setCons] = useState('');
  const [others, setOthers] = useState('');
  const [hide, setHide] = useState(true);
  const {phone, patient_phone} = route.params;
  const token = useSelector(state => state.authenticate.auth.access);
  const dispatch = useDispatch();
  const marital = useSelector(state => state?.pasthistory?.martialHistory);
  console.log('marital=============', marital);
  const handleDispatch = () => {
    dispatch(
      addmartialHistory({
        married: maried,
        cons: status,
        others: others,
        maritalstatus: maritalstatus,
      }),
    );
    setMarried('');
    setCons('');
    setOthers('');
    nav.goBack();
  };
  const HandleSelect = val => {
    setStatus(val);
  };
  // console.log('marital', maritalstatus);
  const HandleSelectMarital = val => {
    setmaritalStatus(val);
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

  // useEffect(() => {
  //   fetchMaritalData();
  // }, []);
  useEffect(() => {
    setmaritalStatus(marital?.maritalstatus);
    setMarried(marital?.married);
    setStatus(marital?.cons);
    setOthers(marital?.others);
  }, []);
  return (
    <View style={styles.main}>
      <PrescriptionHead heading={'Marital History'} />
      <View style={{gap: verticalScale(4)}}>
        <Text style={styles.text}>Marital status</Text>
        <View style={{gap: horizontalScale(8), flexDirection: 'row'}}>
          {selction.map((item, ind) => (
            <SelectionTab
              label={item}
              key={ind}
              onPress={() => HandleSelectMarital(item)}
              selected={maritalstatus === item}
            />
          ))}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-around',
          alignSelf: 'flex-start',
          gap: horizontalScale(64),
        }}>
        {maritalstatus === 'Yes' ? (
          <InputText
            inputContainer={styles.input}
            label={'Married Since'}
            // required={true}
            value={maried}
            setValue={setMarried}
            placeholder={'Enter months,Year'}
          />
        ) : (
          <SelectorBtn
            label={'Married Since'}
            selectContainer={{
              // flex: ,
              gap: 0,
              paddingVertical: -1,
              width: horizontalScale(250),
            }}
          />
        )}

        {/* <InputText
          inputContainer={styles.input}
          label={'Consanguinity'}
          required={true}
          value={cons}
          setValue={setCons}
          placeholder={'Consanguinity'}
        /> */}
        <View style={{gap: verticalScale(4)}}>
          <Text style={styles.text}>Consanguinity</Text>
          <View style={{gap: horizontalScale(8), flexDirection: 'row'}}>
            {selction.map((item, ind) => (
              <SelectionTab
                label={item}
                key={ind}
                onPress={() => HandleSelect(item)}
                selected={status === item}
              />
            ))}
          </View>
        </View>
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
  text: {
    fontFamily: CUSTOMFONTFAMILY.body,
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    fontWeight: '400',
  },
});
export default MaritalHistory;
