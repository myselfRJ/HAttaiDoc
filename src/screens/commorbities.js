import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import PresComponent from '../components/presComponent';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ShowChip from '../components/showChip';
import {
  addCommorbities,
  updateCommorbities,
} from '../redux/features/prescription/commorbities';
import {CONSTANTS} from '../utility/constant';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
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
  clearStorage,
} from '../utility/AsyncStorage';

const Commorbities = ({navigation}) => {
  const option = 'finding';
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('');
  const [filtered, setFilteredData] = useState([]);
  const nav = useNavigation();
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const prev = useSelector(state => state?.commorbities?.commorbitiesItems);

  const [select, setSelect] = useState('');
  const [sug, setSug] = useState([]);

  const selectChange = value => {
    setSelected(value);
    dispatch(addCommorbities([...prev, {commoribities: value}]));
    if (sug?.length > 0) {
      UpdateAsyncData('commoribities', {commoribities: value});
    }
  };
  const handleDelete = index => {
    if (prev) {
      const updatedPrescriptions = prev?.filter((item, ind) => ind !== index);

      dispatch(updateCommorbities(updatedPrescriptions));
    }
  };
  const fetchComorbidities = async () => {
    const response = await fetchApi(URL.snomed(value ? value : 'NA', option), {
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
    fetchComorbidities();
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
  // const HandlePress=(value)=>{
  //    setValue(value);
  //    setSelected(value)
  //    dispatch(addCommorbities([...prev, {commoribities: value}]));
  //    setValue('')
  // }

  const [show, setShow] = useState(false);
  const HandlePress = value => {
    setValue(value);
    setSelected(value);
    dispatch(addCommorbities([...prev, {commoribities: value}]));
    if (sug?.length > 0) {
      UpdateAsyncData('commoribities', {commoribities: value});
    }
    setValue('');
  };

  const handledata = () => {
    if (sug?.length === 0 || !sug) {
      StoreAsyncData('commoribities', prev);
    }
    navigation.goBack();
  };

  useEffect(() => {
    RetriveAsyncData('commoribities').then(array => {
      const uniqueArray = array?.filter((item, index) => {
        return (
          index ===
          array?.findIndex(obj => obj.commoribities === item?.commoribities)
        );
      });
      setSug(uniqueArray);
    });
  }, []);

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
      {/* <PresComponent
        // style={{backgroundColor:CUSTOMCOLOR.white}}
        label="Comorbidities"
        placeholder="Enter comorbidities"
        values={value}
        onChange={setValue}
        onPress={HandleAddValue}
        suggestion={constants}
        // data={CONSTANTS.comorbidities}
        // select={selectChange}
      /> */}
      <View style={styles.input}>
        <InputText
          inputContainer={styles.inputtext}
          label="Comorbidities"
          placeholder="Enter comorbidities"
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
              <ScrollView>
                {filtered?.map((val, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.touch}
                    onPress={() => HandlePress(val?.term)}>
                    <Text
                      style={{
                        fontSize: CUSTOMFONTSIZE.h3,
                        padding: moderateScale(10),
                        color: CUSTOMCOLOR.black,
                      }}
                      key={index}>
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
              onPress={() => selectChange(item?.commoribities)}
              style={[
                styles.recomend,
                {
                  backgroundColor:
                    value === item ? CUSTOMCOLOR.primary : CUSTOMCOLOR.white,
                },
              ]}>
              <Text
                style={{
                  color: value === item ? CUSTOMCOLOR.white : CUSTOMCOLOR.black,
                }}>
                {item?.commoribities}
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
              handledata();
            }}
          />
        </View>
      </View>
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
    paddingHorizontal: horizontalScale(16),
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
  input: {
    // paddingHorizontal:24,
    // paddingVertical:24,
    gap: moderateScale(0),
  },
  touch: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
  },
});
