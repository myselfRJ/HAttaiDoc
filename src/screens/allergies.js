import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import PresComponent from '../components/presComponent';
import {useState, useEffect} from 'react';
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
import {CONSTANTS} from '../utility/constant';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {InputText, HButton} from '../components';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import {ScrollView} from 'react-native-gesture-handler';
import {
  StoreAsyncData,
  RetriveAsyncData,
  UpdateAsyncData,
} from '../utility/AsyncStorage';
import {commonstyles} from '../styles/commonstyle';
import CustomCalendar from '../components/calendar';

const Allergies = () => {
  const {phone} = useSelector(state => state?.phone?.data);
  const navigation = useNavigation();
  const [select, setSelect] = useState('');
  const option = 'finding';
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [filtered, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [sug, setSug] = useState([]);
  const dispatch = useDispatch();
  const prev = useSelector(state => state?.allergies?.allergies);

  const HandleAddValue = () => {
    if (value) {
      dispatch(addAllergies([...prev, {allergies: value}]));
      setValue('');
    }
  };
  const selectChange = value => {
    setSelect(value);
    UpdateAsyncData(`allergies${phone}`, {allergies: value});
    dispatch(addAllergies([...prev, {allergies: value}]));
  };
  const handleDelete = index => {
    if (prev) {
      const updatedPrescriptions = prev?.filter((item, ind) => ind !== index);

      dispatch(updateAllergies(updatedPrescriptions));
    }
  };

  const term = 'allergy';
  const fetchAllergies = async () => {
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
    fetchAllergies();
  }, [term, option, value]);

  useEffect(() => {
    if (value) {
      const filtered = data?.filter(
        item =>
          item?.term && item?.term.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredData([...filtered, {term: value}]);
    } else {
      setFilteredData(data);
    }
  }, [data, value]);

  const HandlePress = value => {
    setValue(value);
    setSelected(value);
    UpdateAsyncData(`allergies${phone}`, {allergies: value});
    dispatch(addAllergies([...prev, {allergies: value}]));
    setValue('');
  };

  const handleBack = () => {
    if (sug?.length === 0 || !sug) {
      StoreAsyncData(`allergies${phone}`, prev);
    }
    navigation.goBack();
  };
  useEffect(() => {
    RetriveAsyncData(`allergies${phone}`).then(array => {
      const uniqueArray = array?.filter((item, index) => {
        return (
          index === array?.findIndex(obj => obj.allergies === item?.allergies)
        );
      });
      if (uniqueArray?.length > 20) {
        uniqueArray?.splice(20);
        setSug(uniqueArray);
      } else {
        setSug(uniqueArray);
      }
    });
  }, []);

  return (
    <View style={styles.main}>
      <PrescriptionHead heading="Allergies" />
      <ScrollView>
        {prev?.map((item, ind) =>
          prev.length > 0 ? (
            <ShowChip
              text={item?.allergies}
              onPress={() => handleDelete(ind)}
              ind={ind}
            />
          ) : null,
        )}
        <View style={{marginBottom: moderateScale(16)}}>
          <View style={styles.input}>
            <InputText
              inputContainer={styles.inputtext}
              label="Allergies"
              placeholder="Enter allergies"
              value={value}
              setValue={setValue}
              // value={query}
              // setValue={setQuery}
              search={true}
              IconName={
                (show && filtered.length > 0) ||
                value === selected ||
                value.length === 0
                  ? 'magnify'
                  : 'close'
              }
              onPress={() => setValue('')}
            />
            {value.length >= 3 &&
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
                flexWrap: 'wrap',
                gap: moderateScale(12),
                paddingHorizontal: horizontalScale(8),
              }}>
              {sug?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectChange(item?.allergies)}
                  style={[
                    styles.recomend,
                    {
                      backgroundColor:
                        value === item
                          ? CUSTOMCOLOR.primary
                          : CUSTOMCOLOR.recent,
                    },
                  ]}>
                  <Text
                    style={{
                      fontWeight: '400',
                      color:
                        value === item
                          ? CUSTOMCOLOR.white
                          : CUSTOMCOLOR.primary,
                    }}>
                    {item?.allergies}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <HButton
          label={'Save'}
          onPress={handleBack}
          btnstyles={commonstyles.activebtn}
        />
      </View>
    </View>
  );
};
export default Allergies;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    gap: moderateScale(8),
    backgroundColor: CUSTOMCOLOR.background,
  },
  recomend: {
    padding: moderateScale(12),
    borderRadius: moderateScale(4),
    borderWidth: 1,
    borderColor: CUSTOMCOLOR.primary,
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
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
    height: moderateScale(300),
    backgroundColor: CUSTOMCOLOR.white,
    // marginHorizontal: horizontalScale(8),
  },
});
