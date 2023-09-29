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
import {SlotChip} from '../components';
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

// import PlusButton from '../components';

const Diagnosis = ({navigation}) => {
  const option = 'finding';
  const nav = useNavigation();
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState('');
  const [icon, setIcon] = useState('magnify');
  const [filtered, setFilteredData] = useState([]);
  // console.log('trem=====',filtered);
  const [data, setData] = useState([]);
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
    const response = await fetchApi(URL.snomed(value, option), {
      method: 'GET',
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setData(jsonData);
      // dispatch(addDoctor_profile.addDoctor_profile(jsonData?.data));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchDiagnosis();
  }, [value, option]);

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
  const HandlePress = value => {
    setValue(value);
    setSelected(value);
    dispatch(addDiagnosis([...prev, {diagnosis: value}]));
    setValue('');
  };

  const [show, setShow] = useState(false);

  return (
    <View style={styles.main}>
      <PrescriptionHead heading="Diagnosis" />
      {prev?.map((item, ind) =>
        prev.length > 0 ? (
          <ShowChip
            text={item?.diagnosis}
            onPress={() => handleDelete(ind)}
            ind={ind}
          />
        ) : null,
      )}

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
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: moderateScale(32),
            }}>
            <HButton
              label={'Save'}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </View>
      </View>
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
});
