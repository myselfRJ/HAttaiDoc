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
import {useSelector, useDispatch} from 'react-redux';
import {addclinic_id} from '../redux/features/profiles/clinicId';
import {commonstyles} from '../styles/commonstyle';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';
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
        style={styles.searchname}>
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
          contentContainerStyle={{gap: moderateScale(8)}}
          style={styles.patientCard}>
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
            style={styles.clinicText}>
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
    flex: moderateScale(1),
    padding: moderateScale(24),
    gap: moderateScale(4),
  },
  select: {
    gap: moderateScale(8),
  },
  clinicText:{
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h2,
    color: CUSTOMCOLOR.black,
  },
  searchname:{
    flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          bottom: moderateScale(16),
          paddingHorizontal: horizontalScale(8),
          //marginRight:moderateScale(8)
  },
  patientCard:{
    height: horizontalScale(550), 
    paddingHorizontal: horizontalScale(8), 
    gap: moderateScale(16)
  },
  tab: {
    flexDirection: 'row',
    gap: moderateScale(24),
  },
  appointment: {
    gap: moderateScale(4),
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
    padding: moderateScale(16),
    gap: moderateScale(4),
    paddingHorizontal: horizontalScale(8),
  },
  searchIcon: {
    top: moderateScale(10),
    height: moderateScale(20),
    right: moderateScale(8),
    //padding: moderateScale(16),
    paddingHorizontal:moderateScale(24)
  },
  modalContainer: {
    height: moderateScale(400),
    width: '100%',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CUSTOMCOLOR.white,
    //alignSelf: 'center',
    borderRadius: moderateScale(10),
    padding: moderateScale(32),
    gap: moderateScale(16),
  },
  modalfields: {
    color: CUSTOMCOLOR.primary,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '400',
    fontFamily: CUSTOMFONTFAMILY.body,
    padding: moderateScale(4),
  },
});

export default PatientSearch;
