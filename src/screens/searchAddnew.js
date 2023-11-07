import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {useState, useEffect} from 'react';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import SelectorBtn from '../components/selector';
import SearchBox from '../components/searchBox';
import SelectionTab from '../components/selectiontab';
import AppointmentCard from '../components/appointmentcard';
import PlusButton from '../components/plusbtn';
import PatientSearchCard from '../components/patientsearchcard';
import HButton from '../components/button';
import {Icon, InputText} from '../components';
import {fetchApi} from '../api/fetchApi';
import {useSelector, useDispatch} from 'react-redux';
import {URL} from '../utility/urls';
import {addclinic_id} from '../redux/features/profiles/clinicId';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import CustomIcon from '../components/icon';

const SearchAddnew = ({navigation}) => {
  const token = useSelector(state => state.authenticate.auth.access);
  const clinic_id = useSelector(state => state.clinicid?.clinic_id);

  // console.log('====================================');
  // console.log('clinc----------ID,---------------', clinic_id);
  // console.log('====================================');
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');

  const fetchData = async () => {
    const response = await fetchApi(URL.getPatientsAll(phoneNumber), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setData(jsonData.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };

  useEffect(() => {
    if (phoneNumber) {
      fetchData();
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (phoneNumber) {
      const filtered = data?.filter(
        item =>
          item?.patient_phone_number &&
          item?.patient_phone_number.startsWith(phoneNumber),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, phoneNumber]);

  const ChangePhoneValue = e => {
    setPhoneNumber(e);
  };
  const handleNavigate = () => {
    const phoneRoute = phoneNumber?.length > 7 ? phoneNumber : '';
    navigation.navigate('patientcreate', {phoneRoute});
    setPhoneNumber('');
  };

  return (
    <View style={styles.main}>
      <InputText
        label="Search"
        placeholder="Enter Phone Number"
        value={phoneNumber}
        setValue={ChangePhoneValue}
        search={true}
        IconName="magnify"
      />
      <HButton
        btnstyles={{paddingVertical: verticalScale(8), alignSelf: 'flex-end'}}
        label="Add"
        icon="plus"
        onPress={handleNavigate}
      />

      <Text style={styles.h2}>Search Results..</Text>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: verticalScale(24),
        }}>
        <View style={styles.appointment}>
          {data?.length > 0 && phoneNumber?.length > 1 ? (
            data?.map((val, ind) => (
              <PatientSearchCard
                key={ind}
                patient_data={val}
                onPress={() => navigation.navigate('visit')}
              />
            ))
          ) : (
            <CustomIcon label="No Patients Found" />
          )}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 24,
    gap: 16,
    backgroundColor: CUSTOMCOLOR.background,
  },
  searchName: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: moderateScale(51),
    // top: moderateScale(30),
    left: moderateScale(20),
    padding: moderateScale(16),
  },
  searchIcon: {
    height: moderateScale(51),
    top: moderateScale(40),
    right: moderateScale(10),
    padding: moderateScale(16),
  },
  appointment: {
    gap: moderateScale(8),
    // paddingHorizontal: horizontalScale(8),
    // paddingVertical: verticalScale(8),
  },
  h2: {
    fontSize: CUSTOMFONTSIZE.h2,
    fontWeight: '600',
    fontFamily: CUSTOMFONTFAMILY.heading,
    // lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
  },
  btn: {
    // gap: moderateScale(8),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingVertical: verticalScale(8),
  },
});
export default SearchAddnew;
