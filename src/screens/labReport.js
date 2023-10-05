import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import PrescriptionHead from '../components/prescriptionHead';
import PresComponent from '../components/presComponent';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ShowChip from '../components/showChip';
import {
  addLabReport,
  updateLabReport,
} from '../redux/features/prescription/labreport';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {URL} from '../utility/urls';
import {InputText, HButton} from '../components';
import {fetchApi} from '../api/fetchApi';
import {
  CUSTOMFONTSIZE,
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import { StoreAsyncData,UpdateAsyncData,RetriveAsyncData } from '../utility/AsyncStorage';

const LabReports = () => {
  const navigation = useNavigation();
  const option = 'procedure';
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [filtered, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState('');
  const dispatch = useDispatch();
  const prev = useSelector(state => state?.labreport?.labReport);

  const HandleAddValue = () => {
    if (value) {
      dispatch(addLabReport([...prev, {lab_test: value}]));
      setValue('');
    }
  };
  const handleDelete = index => {
    if (prev) {
      const updatedPrescriptions = prev?.filter((item, ind) => ind !== index);

      dispatch(updateLabReport(updatedPrescriptions));
    }
  };

  const fetchTests = async () => {
    const response = await fetchApi(URL.snomed(value, option), {
      method: 'GET',
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setData(jsonData);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchTests();
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
    dispatch(addLabReport([...prev, {lab_test: value}]));
    setValue('');
  };

  const [sug,setSug] = useState([])

  const handleBack = () => {
    if (sug?.length > 0) {
      UpdateAsyncData('labs', {lab_test: selected});
      // StoreAsyncData('allergies', prev);
    } else {
      StoreAsyncData('labs', prev);
    }
    navigation.goBack();
  };
  const selectChange = value => {
    setSelected(value);
    dispatch(addAllergies([...prev, {lab_test: value}]));
  };
  useEffect(() => {
    RetriveAsyncData('labs').then(array => {
      setSug(array);
    });
  }, []);
  return (
    <View style={styles.main}>
      <PrescriptionHead heading="Test Prescribes" />

      {prev?.map((item, ind) =>
        prev.length > 0 ? (
          <ShowChip
            text={item?.lab_test}
            onPress={() => handleDelete(ind)}
            ind={ind}
          />
        ) : null,
      )}
      <View style={{marginBottom: moderateScale(16)}}>
        <View style={styles.input}>
          <InputText
            inputContainer={styles.inputtext}
            label="Test Prescribes"
            placeholder="Eg: blood test"
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
              marginTop: moderateScale(16),
              flexDirection: 'row',
              gap: moderateScale(12),
              paddingHorizontal: horizontalScale(8),
            }}>
            {sug?.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => selectChange(item?.lab_test)}
                style={[
                  styles.recomend,
                  {
                    backgroundColor:
                      value === item ? CUSTOMCOLOR.primary : CUSTOMCOLOR.white,
                  },
                ]}>
                <Text
                  style={{
                    color:
                      value === item ? CUSTOMCOLOR.white : CUSTOMCOLOR.black,
                  }}>
                  {item?.lab_test}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: moderateScale(32),
            }}>
            <HButton
              label={'Save'}
              onPress={() => {
                handleBack()
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default LabReports;

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
  inputtext: {
    paddingVertical: verticalScale(0),
    // borderWidth:1
  },
  dropdownContainer: {
    height: moderateScale(300),
    backgroundColor: CUSTOMCOLOR.white,
    marginHorizontal: horizontalScale(8),
  },
});
