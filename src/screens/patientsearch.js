import {
  Text,
  View,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
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
import {
  addPharmaPhone,
  addclinic_Address,
  addclinic_id,
  addclinic_logo,
  addclinic_name,
  addclinic_phone,
} from '../redux/features/profiles/clinicId';
import {commonstyles} from '../styles/commonstyle';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';
import {useFocusEffect} from '@react-navigation/native';
import CustomIcon from '../components/icon';
import {LoadingElement} from '../components/LoadingElement';

const PatientSearch = ({navigation}) => {
  const [clinics, setDataClinic] = useState();

  const token = useSelector(state => state.authenticate.auth.access);
  const ClinicRef = useRef(null);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [selectedClinic, setSelectedClinic] = useState();
  const [clinicID, setClinicId] = useState('');
  const [pending, setPending] = useState(false);

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
      dispatch(addclinic_id(jsonData.data[0].id));
      dispatch(addclinic_name(jsonData.data[0]?.clinic_name));
      dispatch(addclinic_Address(jsonData.data[0]?.clinic_Address));
      dispatch(addclinic_logo(jsonData?.data[0]?.clinic_logo_url));
      dispatch(addclinic_phone(jsonData?.data[0]?.clinic_phone_number));
      dispatch(addPharmaPhone(jsonData?.data[0]?.pharmacyPhone));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  // useEffect(() => {
  //   fetchClincs();
  // }, [phone]);
  const Clinic_data = useSelector(state => state?.clinic?.clinics);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState('');

  const ChangeNameValue = e => {
    setName(e);
  };
  const Clinic_id = useSelector(state => state?.clinicid?.clinic_id);
  const Clinic_name = useSelector(state => state?.clinicid?.clinic_name);
  const fetchData = async () => {
    const response = await fetchApi(URL.getPatientByClinic(Clinic_id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setData(jsonData.data);
      setPending(true);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    if (Clinic_id) {
      setTimeout(() => {
        fetchData();
      }, 1000);
    }
  }, [Clinic_id]);

  useEffect(() => {
    if (name) {
      const filtered = data?.filter(
        item =>
          (item?.patient_name &&
            item?.patient_name.toLowerCase().startsWith(name.toLowerCase())) ||
          item?.patient_phone_number.startsWith(name),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, name]);

  const handleClinicSelection = clinic => {
    setSelectedClinic(clinic.clinic_name);
    setClinicId(clinic.id);
    dispatch(addclinic_id(clinic?.id));
    dispatch(addclinic_name(clinic?.clinic_name));
    dispatch(addclinic_Address(clinic?.clinic_Address));
    dispatch(addclinic_logo(clinic?.clinic_logo_url));
    dispatch(addclinic_phone(clinic?.clinic_phone_number));
    dispatch(addPharmaPhone(clinic.pharmacyPhone));
    setShow(false);

    // setTimeout(() => {
    //   ClinicRef?.current?.snapToIndex(0);
    // }, 1000);
  };
  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchClincs();
  //   }, []),
  // );
  useFocusEffect(
    React.useCallback(() => {
      if (Clinic_id) {
        setTimeout(() => {
          fetchData();
        }, 1000);
      }
    }, [Clinic_id]),
  );

  const renderItems = ({item, index}) => {
    return (
      <PatientSearchCard
        doctor={true}
        meta={'value'}
        key={index}
        patient_data={item}
      />
    );
  };
  const [show, setShow] = useState(false);
  return (
    <View style={styles.main}>
      <View style={styles.select}>
        <View>
          <SelectorBtn
            name="chevron-down"
            input={Clinic_name}
            // onPress={() => ClinicRef?.current?.snapToIndex(1)}
            onPress={() => setShow(!show)}
          />
          {show && (
            <View style={styles.modalContainer}>
              {Clinic_data?.map((clinic, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleClinicSelection(clinic)}>
                  <Text style={[styles.modalfields]}>{clinic.clinic_name}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
        <InputText
          placeholder="Search By Name/Phone"
          value={name}
          setValue={ChangeNameValue}
          textStyle={styles.input}
          search={true}
          IconName="magnify"
        />
        {/* <SearchBox label='Patient name/phone number' action={()=>console.log('clicked')}/> */}
      </View>
      {/* <View style={styles.searchname}>
        <InputText
          placeholder="Search name"
          value={name}
          setValue={ChangeNameValue}
          textStyle={styles.input}
        />
        <Icon name="search" size={20} style={styles.searchIcon} />
      </View> */}
      <Text style={styles.h2}>My Patients</Text>
      {!pending ? (
        <LoadingElement />
      ) : (
        <View>
          {filteredData?.length > 0 ? (
            <FlatList
              data={filteredData}
              renderItem={renderItems}
              style={styles.appointmentCard}
            />
          ) : (
            <CustomIcon label="No Patients Found" />
          )}
        </View>
      )}

      {/* <PlusButton icon='plus'style={{position:'absolute',right:24,bottom:24}}/> */}
      {/* <BottomSheetView
        bottomSheetRef={ClinicRef}
        snapPoints={'50%'}
        backgroundStyle={'#000000aa'}>
        <View style={styles.modalContainer}>
          <Text style={styles.clinicText}>{Language[language]['clinic']}</Text>
          {clinics?.map((clinic, index) => (
            <Pressable
              key={index}
              onPress={() => handleClinicSelection(clinic)}>
              <Text
                style={[
                  styles.modalfields,
                  {
                    color:
                      selectedClinic === clinic
                        ? CUSTOMCOLOR.primary
                        : CUSTOMCOLOR.black,
                  },
                ]}>
                {clinic.clinic_name}
              </Text>
            </Pressable>
          ))}
        </View>
      </BottomSheetView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: moderateScale(24),
    gap: moderateScale(24),
    backgroundColor: CUSTOMCOLOR.background,
    // borderWidth:1
  },
  select: {
    gap: moderateScale(8),
    // alignItems:'center'
  },
  clinicText: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h2,
    color: CUSTOMCOLOR.black,
  },
  searchname: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom: moderateScale(16),
    paddingHorizontal: horizontalScale(8),
    //marginRight:moderateScale(8)
  },
  // patientCard: {
  //   height: horizontalScale(550),
  //   paddingHorizontal: horizontalScale(8),
  //   gap: moderateScale(16),
  // },
  tab: {
    flexDirection: 'row',
    gap: moderateScale(24),
  },
  appointment: {
    marginBottom: moderateScale(28),
  },
  appointmentCard: {
    height:
      Dimensions.get('window').height >= 900
        ? moderateScale(800)
        : moderateScale(600),
    marginHorizontal: horizontalScale(8),
    gap: moderateScale(16),
  },
  h2: {
    fontSize: CUSTOMFONTSIZE.h2,
    fontWeight: '600',
    fontFamily: CUSTOMFONTFAMILY.heading,
    color: CUSTOMCOLOR.black,
  },
  input: {
    padding: moderateScale(16),
    gap: moderateScale(4),
    paddingHorizontal: horizontalScale(8),
  },
  searchIcon: {
    top: moderateScale(10),
    height: moderateScale(20),
    right: moderateScale(8),
    //padding: moderateScale(16),
    paddingHorizontal: moderateScale(24),
  },
  modalContainer: {
    // height: moderateScale(510),
    // width: '100%',
    //justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: CUSTOMCOLOR.white,
    borderWidth: 1,
    borderColor: CUSTOMCOLOR.borderColor,
    //alignSelf: 'center',
    borderRadius: moderateScale(10),
    padding: moderateScale(16),
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
