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
import {InputText, HButton, SelectionTab} from '../components';
import {fetchApi} from '../api/fetchApi';
import {
  CUSTOMFONTSIZE,
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import {
  StoreAsyncData,
  UpdateAsyncData,
  RetriveAsyncData,
  clearStorage,
} from '../utility/AsyncStorage';
import {CONSTANT} from '../utility/const';
import {commonstyles} from '../styles/commonstyle';

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
  const [sug, setSug] = useState([]);
  const [seletedType, setSelectedType] = useState();

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
  const handleSelect = value => {
    setSelectedType(value);
  };

  const term = 'test';
  const fetchTests = async () => {
    const response = await fetchApi(URL.snomed(value ? value : 'NA', option), {
      method: 'GET',
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      const snomed_data = jsonData?.map(item => ({term: item}));
      setData(snomed_data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchTests();
  }, [value, term, option]);

  useEffect(() => {
    const filtering_data = [
      ...data,
      ...CONSTANT?.micro_biology,
      ...CONSTANT?.clinical_pathology,
    ];
    if (value) {
      const filtered = filtering_data?.filter(
        item =>
          item?.term && item?.term.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredData([...filtered, {term: value}]);
    } else {
      setFilteredData(filtering_data);
    }
  }, [data, value]);
  console.log('==========>filtering', filtered);

  const HandlePress = value => {
    setValue(value);
    setSelected(value);
    dispatch(addLabReport([...prev, {lab_test: value}]));
    if (sug?.length > 0) {
      UpdateAsyncData('labs', {lab_test: value});
    }
    setValue('');
  };

  const handledata = () => {
    if (sug?.length === 0 || !sug) {
      StoreAsyncData('labs', prev);
    }
    navigation.goBack();
  };
  const selectChange = value => {
    setSelected(value);
    dispatch(addLabReport([...prev, {lab_test: value}]));
    if (sug?.length > 0) {
      UpdateAsyncData('labs', {lab_test: value});
    }
  };
  useEffect(() => {
    RetriveAsyncData('labs').then(array => {
      const uniqueArray = array?.filter((item, index) => {
        return (
          index === array?.findIndex(obj => obj.lab_test === item?.lab_test)
        );
      });
      if (uniqueArray?.length>15){
        uniqueArray?.splice(15)
        setSug(uniqueArray);
      }else{ setSug(uniqueArray);}
    });
  }, []);

  return (
    <View style={styles.main}>
      <PrescriptionHead heading="Investigation Prescribed" />
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View>
          <View style={styles.tab}>
            {CONSTANT.test?.map((val, ind) => (
              <SelectionTab
                selectContainer={{
                  paddingHorizontal: horizontalScale(64),
                  paddingVertical: verticalScale(8),
                  borderColor: CUSTOMCOLOR.primary,
                }}
                label={val}
                key={ind}
                onPress={() => handleSelect(val)}
                selected={seletedType === val}
              />
            ))}
          </View>
          <View style={styles.input}>
            <InputText
              inputContainer={styles.inputtext}
              label="Search"
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
            {value.length > 1 &&
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
                padding: moderateScale(16),
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: moderateScale(8),
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
                        value === item
                          ? CUSTOMCOLOR.primary
                          : CUSTOMCOLOR.white,
                    },
                  ]}>
                  <Text
                    style={{
                      color:
                        value === item
                          ? CUSTOMCOLOR.white
                          : CUSTOMCOLOR.primary,
                    }}>
                    {item?.lab_test}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* <View
              style={{
                alignSelf: 'flex-end',
                marginTop: moderateScale(32),
                paddingHorizontal: horizontalScale(8),
              }}>
              <HButton
                // btnstyles={{paddingHorizontal:horizontalScale(12)}}
                type="addtype"
                icon="plus"
                label={'Add'}
                onPress={() => {
                  HandleAddValue();
                }}
              />
            </View> */}
            <View style={{top: moderateScale(32), gap: moderateScale(4)}}>
              {prev?.map((item, ind) =>
                prev.length > 0 ? (
                  <ShowChip
                    text={item?.lab_test}
                    onPress={() => handleDelete(ind)}
                    ind={ind}
                  />
                ) : null,
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View>
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
export default LabReports;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    gap: moderateScale(8),
    backgroundColor: CUSTOMCOLOR.background,
  },

  inputtext: {
    paddingVertical: verticalScale(0),
    // borderWidth:1
  },
  dropdownContainer: {
    height: moderateScale(300),
    backgroundColor: CUSTOMCOLOR.white,
    // marginHorizontal: horizontalScale(8),
  },
  recomend: {
    padding: moderateScale(8),
    borderRadius: moderateScale(4),
    // paddingHorizontal: horizontalScale(16),

    paddingVertical: verticalScale(12),
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
  },
  tab: {
    flexDirection: 'row',
    gap: moderateScale(8),
    // paddingHorizontal:horizontalScale(8),
    paddingVertical: verticalScale(16),
    // top:moderateScale(24)
  },
});
