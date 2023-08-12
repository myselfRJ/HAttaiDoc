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

const SearchAddnew = ({navigation}) => {
  const token = useSelector(state => state.authenticate.auth.access);
  const clinic_id = useSelector(state => state.clinicid?.clinic_id);

  console.log('====================================');
  console.log('clinc----------ID,---------------', clinic_id);
  console.log('====================================');
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');

  const fetchData = async () => {
    const response = await fetchApi(URL.getPatientsAll, {
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
    fetchData();
  }, []);

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

  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <InputText
          placeholder="phone number"
          value={phoneNumber}
          setValue={ChangePhoneValue}
          textStyle={styles.input}
          keypad="numeric"
        />
        <Icon name="search" size={20} style={styles.searchIcon} />
      </View>
      <ScrollView>
        <View style={styles.appointment}>
          <Text style={styles.h2}>Search Results</Text>

          {filteredData?.map((val, ind) => (
            <PatientSearchCard
              key={ind}
              patient_data={val}
              onPress={() => navigation.navigate('visit')}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.btn}>
        <HButton
          label="Add New"
          icon="plus"
          onPress={() => navigation.navigate('patientcreate')}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  input: {
    width: '100%',
    height: 51,
    top: 30,
    left: 20,
    padding: 16,
  },
  searchIcon: {
    height: 51,
    top: 40,
    right: 10,
    padding: 16,
  },
  appointment: {
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.primary,
    top: 16,
    paddingVertical: 16,
  },
  btn: {
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SearchAddnew;
