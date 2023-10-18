import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import PresComponent from '../components/presComponent';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addDiagnosis,
  updateDiagnosis,
} from '../redux/features/prescription/diagnosis';
import {useNavigation} from '@react-navigation/native';
import {SelectorBtn, SlotChip} from '../components';
import ShowChip from '../components/showChip';
import PlusButton from '../components/plusbtn';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import InputText from '../components/inputext';
import HButton from '../components/button';
import {ScrollView} from 'react-native-gesture-handler';
import {
  StoreAsyncData,
  UpdateAsyncData,
  RetriveAsyncData,
} from '../utility/AsyncStorage';

// import PlusButton from '../components';

const Diagnosis = ({navigation}) => {
  const dia_types = ['Provisional', 'Confirmed'];
  const option = 'finding';
  const term = 'diagnosis';
  const nav = useNavigation();
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState('');
  const [icon, setIcon] = useState('magnify');
  const [filtered, setFilteredData] = useState([]);
  // console.log('trem=====',filtered);
  const [data, setData] = useState([]);
  const [sug, setSug] = useState([]);
  // console.log('value===',value)
  const dispatch = useDispatch();
  const prev = useSelector(state => state?.diagnosis?.DiagnosisItems);
  // console.log('prev-----',prev)

  const HandleAddValue = () => {
    if (value) {
      dispatch(addDiagnosis([...prev, {diagnosis: value}]));
      setValue('');
    }
  };
  const handleDelete = index => {
    if (prev) {
      const updatedPrescriptions = prev?.filter((item, ind) => ind !== index);

      dispatch(updateDiagnosis(updatedPrescriptions));
    }
  };
  const fetchDiagnosis = async () => {
    const response = await fetchApi(URL.snomed(term, option), {
      method: 'GET',
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setData(jsonData);
      jsonData?.map(item => console.log('========>', item?.term));
      // dispatch(addDoctor_profile.addDoctor_profile(jsonData?.data));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchDiagnosis();
  }, [term, option]);

  useEffect(() => {
    if (value) {
      const filtered = data?.filter(
        item =>
          item?.term &&
          item?.term.toLowerCase().startsWith(value.toLowerCase()),
      );
      setFilteredData([...filtered, {term: value}]);
    } else {
      setFilteredData(data);
    }
  }, [data, value]);

  const [show, setShow] = useState(false);

  const HandlePress = value => {
    setValue(value);
    setSelected(value);
    dispatch(addDiagnosis([...prev, {diagnosis: value, type: dia_type}]));
    if (sug?.length > 0) {
      UpdateAsyncData('diagnosis', {diagnosis: value});
    }
    setValue('');
  };

  const handledata = () => {
    if (sug?.length === 0 || !sug) {
      StoreAsyncData('diagnosis', prev);
    }
    navigation.goBack();
  };
  const selectChange = value => {
    setSelected(value);
    dispatch(addDiagnosis([...prev, {diagnosis: value, type: dia_type}]));
    if (sug?.length > 0) {
      UpdateAsyncData('diagnosis', {diagnosis: value});
    }
  };
  useEffect(() => {
    RetriveAsyncData('diagnosis').then(array => {
      const uniqueArray = array?.filter((item, index) => {
        return (
          index === array?.findIndex(obj => obj.diagnosis === item?.diagnosis)
        );
      });
      setSug(uniqueArray);
    });
  }, []);
  const [dia_type, setDiaType] = useState(dia_types[1]);
  const ConfirmedData = prev.filter(item => item.type === 'Confirmed');
  const ProvisionalData = prev.filter(item => item.type === 'Provisional');
  return (
    <View style={styles.main}>
      <PrescriptionHead heading="Diagnosis" />
      <ScrollView>
        <View style={{flexDirection: 'row', gap: moderateScale(32)}}>
          {dia_types?.map((value, ind) => (
            <SelectorBtn
              key={ind}
              input={value}
              onPress={() => setDiaType(value)}
              select={{
                backgroundColor:
                  dia_type === value ? CUSTOMCOLOR.primary : CUSTOMCOLOR.white,
              }}
              inputstyle={{
                color:
                  dia_type === value ? CUSTOMCOLOR.white : CUSTOMCOLOR.primary,
                fontSize: moderateScale(14),
                fontWeight: '600',
              }}
            />
          ))}
        </View>
        <View style={{marginBottom: moderateScale(16)}}>
          <View style={styles.input}>
            <InputText
              inputContainer={styles.inputtext}
              label="Diagnosis"
              placeholder="Enter diagnosis"
              value={value}
              setValue={setValue}
              search={true}
              IconName={
                (show && filtered.length > 0) ||
                value === selected ||
                value.length === 0
                  ? 'magnify'
                  : 'close'
              }
              onPress={() => setShow(!show)}
            />
            {value.length >= 4 &&
              (value === selected || show ? null : (
                <View style={styles.dropdownContainer}>
                  <ScrollView persistentScrollbar={true}>
                    {filtered?.map((val, index) => (
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: horizontalScale(4),
                          paddingVertical: verticalScale(8),
                        }}
                        onPress={() => HandlePress(val?.term)}
                        key={index}>
                        <Text
                          style={{
                            fontSize: CUSTOMFONTSIZE.h3,
                            padding: moderateScale(10),
                            color: CUSTOMCOLOR.black,
                          }}>
                          {val.term}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              ))}
            <View
              style={{
                margin: moderateScale(16),
                flexDirection: 'row',
                gap: moderateScale(12),
                paddingHorizontal: horizontalScale(8),
              }}>
              {sug?.map((item, index) => (
                <SelectorBtn
                  input={item?.diagnosis}
                  key={index}
                  onPress={() => selectChange(item?.diagnosis)}
                  select={[
                    styles.recomend,
                    {
                      backgroundColor:
                        value === item
                          ? CUSTOMCOLOR.primary
                          : CUSTOMCOLOR.white,
                    },
                  ]}
                  inputstyle={{
                    color:
                      value === item ? CUSTOMCOLOR.white : CUSTOMCOLOR.black,
                  }}></SelectorBtn>
              ))}
            </View>
            {ConfirmedData?.length > 0 && (
              <Text style={styles.filterText}>Confirmed</Text>
            )}
            {ConfirmedData?.map((item, ind) =>
              prev.length > 0 ? (
                <ShowChip
                  main={{marginHorizontal: 0}}
                  key={ind}
                  text={item?.diagnosis}
                  onPress={() => handleDelete(ind)}
                  ind={ind}
                />
              ) : null,
            )}
            {ProvisionalData?.length > 0 && (
              <Text style={styles.filterText}>Provisional</Text>
            )}
            {ProvisionalData?.map((item, ind) =>
              prev.length > 0 ? (
                <ShowChip
                  key={ind}
                  main={{marginHorizontal: 0}}
                  text={item?.diagnosis}
                  onPress={() => handleDelete(ind)}
                  ind={ind}
                />
              ) : null,
            )}
          </View>
        </View>
      </ScrollView>
      <HButton
        label={'Save'}
        btnstyles={{
          backgroundColor:
            prev?.length > 0 ? CUSTOMCOLOR.primary : CUSTOMCOLOR.disable,
          justifyContent: 'center',
          marginHorizontal: moderateScale(144),
          borderRadius: moderateScale(10),
        }}
        onPress={() => {
          if (prev?.length > 0) {
            handledata();
          }
        }}
      />
    </View>
  );
};
export default Diagnosis;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    gap: moderateScale(8),
  },
  input: {
    // paddingHorizontal:24,
    // paddingVertical:24,
    gap: moderateScale(0),
  },
  child: {
    zIndex: moderateScale(4),
    backgroundColor: 'transparent',
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: moderateScale(16),
  },
  dropdownContainer: {
    height: moderateScale(300),
    backgroundColor: CUSTOMCOLOR.white,
    marginHorizontal: horizontalScale(8),
  },
  inputtext: {
    paddingVertical: verticalScale(0),
    // borderWidth:1
  },
  recomend: {
    padding: moderateScale(8),
    borderRadius: moderateScale(8),
    paddingHorizontal: horizontalScale(16),
  },
  filterText: {
    fontWeight: '400',
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    marginBottom: moderateScale(8),
  },
});
