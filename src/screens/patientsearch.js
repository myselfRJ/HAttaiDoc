import {Text, View, StyleSheet, Pressable} from 'react-native';
import {useState, useRef, useEffect} from 'react';
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
import {ScrollView} from 'react-native-gesture-handler';
import {Icon, InputText} from '../components';
import {CONSTANTS} from '../utility/constant';
import {BottomSheetView} from '../components';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import {useSelector} from 'react-redux';

const PatientSearch = ({navigation}) => {
  const [clinics, setDataClinic] = useState();

  const token = useSelector(state => state.authenticate.auth.access);
  const ClinicRef = useRef(null);

  const [selectedClinic, setSelectedClinic] = useState();

  const [data, setData] = useState();

  const phone_number = useSelector(state => state?.phone?.phone);

  const fetchClincs = async () => {
    const response = await fetchApi(URL.getClinic(phone_number), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setDataClinic(jsonData.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchClincs();
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState('');

  const ChangeNameValue = e => {
    setName(e);
  };

  const fetchData = async () => {
    const response = await fetchApi(URL.getPatientByClinic(1), {
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
    if (name) {
      const filtered = data?.filter(
        item => item?.patient_name && item?.patient_name.startsWith(name),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, name]);

  const handleClinicSelection = clinic => {
    setSelectedClinic(clinic.clinic_name);
    ClinicRef?.current?.snapToIndex(0);
  };

  console.log('====================================');
  console.log('clinics', '==============', clinics);
  console.log('====================================');
  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.select}>
          <SelectorBtn
            name="chevron-down"
            input={selectedClinic}
            onPress={() => ClinicRef?.current?.snapToIndex(1)}
          />
          {/* <SearchBox label='Patient name/phone number' action={()=>console.log('clicked')}/> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            bottom: 16,
          }}>
          <InputText
            placeholder="Search name"
            value={name}
            setValue={ChangeNameValue}
            textStyle={styles.input}
            keypad="numeric"
          />
          <Icon name="search" size={20} style={styles.searchIcon} />
        </View>

        <View style={styles.appointment}>
          <Text style={styles.h2}>My Patients</Text>
          {filteredData?.map((val, ind) => (
            <PatientSearchCard
              key={ind}
              patient_data={val}
              onPress={() => navigation.navigate('visit')}
            />
          ))}
        </View>
      </ScrollView>

      {/* <PlusButton icon='plus'style={{position:'absolute',right:24,bottom:24}}/> */}
      <BottomSheetView bottomSheetRef={ClinicRef} snapPoints={'50%'}>
        <View style={styles.modalContainer}>
          <Text
            style={{
              fontFamily: CUSTOMFONTFAMILY.heading,
              fontSize: 18,
              color: CUSTOMCOLOR.black,
            }}>
            {Language[language]['clinic']}
          </Text>
          {clinics?.map((clinic, index) => (
            <Pressable
              key={index}
              onPress={() => handleClinicSelection(clinic)}>
              <Text style={styles.modalfields}>{clinic.clinic_name}</Text>
            </Pressable>
          ))}
        </View>
      </BottomSheetView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 24,
    gap: 4,
  },
  select: {
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    gap: 24,
  },
  appointment: {
    gap: 8,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
  },
  input: {
    width: '105%',
    padding: 16,
    gap: 4,
  },
  searchIcon: {
    top: 10,
    height: 51,
    right: 10,
    padding: 16,
  },
  modalContainer: {
    height: 400,
    width: '100%',
    //justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: CUSTOMCOLOR.white,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 16,
  },
  modalfields: {
    color: CUSTOMCOLOR.primary,
    fontSize: 14,
    fontWeight: 400,
    fontFamily: CUSTOMFONTFAMILY.body,
    padding: 4,
  },
});

export default PatientSearch;
