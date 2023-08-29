import {Text, View, StyleSheet, Pressable} from 'react-native';
import {useState, useRef, useEffect} from 'react';
import React from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import {addclinic_id} from '../redux/features/profiles/clinicId';
import {commonstyles} from '../styles/commonstyle';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';
import {useFocusEffect} from '@react-navigation/native';

const PatientSearch = ({navigation}) => {
  const [clinics, setDataClinic] = useState();

  const token = useSelector(state => state.authenticate.auth.access);
  const ClinicRef = useRef(null);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [selectedClinic, setSelectedClinic] = useState();
  const [clinicID, setClinicId] = useState('');
  // const [uniquePatient,setUniquePatient]=useState([...new Set(data)])

  // console.log('====================================');
  // console.log('-----------------id', uniquePatient);
  // console.log('====================================');

  const {phone} = useSelector(state => state?.phone?.data);

  const fetchClincs = async () => {
    const response = await fetchApi(URL.getClinic(phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setDataClinic(jsonData.data);
      setSelectedClinic(jsonData.data[0]?.clinic_name);
      setClinicId(jsonData?.data[0]?.id);
      dispatch(addclinic_id.addclinic_id(jsonData.data[0].id));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchClincs();
  }, [phone]);

  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState('');

  const ChangeNameValue = e => {
    setName(e);
  };

  const fetchData = async () => {
    const response = await fetchApi(URL.getPatientByClinic(clinicID), {
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
  }, [clinicID]);

  useEffect(() => {
    if (name) {
      const filtered = data?.filter(
        item =>
          item?.patient_name &&
          item?.patient_name.toLowerCase().startsWith(name.toLowerCase()),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, name]);

  const handleClinicSelection = clinic => {
    setSelectedClinic(clinic.clinic_name);
    setClinicId(clinic.id);
    dispatch(addclinic_id(clinic.id));
    ClinicRef?.current?.snapToIndex(0);
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchClincs();
    }, []),
  );
  // console.log('====================================');
  // console.log('clinics', clinicID, '==============', clinics);
  // console.log('====================================');
  return (
    <View style={styles.main}>
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
          paddingHorizontal: 8,
        }}>
        <InputText
          placeholder="Search name"
          value={name}
          setValue={ChangeNameValue}
          textStyle={styles.input}
        />
        <Icon name="search" size={20} style={styles.searchIcon} />
      </View>

      <View style={styles.appointment}>
        <Text style={commonstyles.h2}>My Patients</Text>
        <ScrollView
          contentContainerStyle={{gap: 8}}
          style={{height: horizontalScale(550), paddingHorizontal: 8, gap: 16}}>
          {filteredData?.map((val, ind) => (
            <PatientSearchCard
              key={ind}
              patient_data={val}
              onPress={() => navigation.navigate('visit')}
            />
          ))}
        </ScrollView>
      </View>

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
    gap: 4,
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
    paddingHorizontal: 8,
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
    alignItems: 'center',
    backgroundColor: CUSTOMCOLOR.white,
    //alignSelf: 'center',
    borderRadius: 10,
    padding: 32,
    gap: 16,
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
