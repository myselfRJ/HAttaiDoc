import React, {useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import moment, {min} from 'moment';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import PlusButton from '../components/plusbtn';
import SelectionTab from '../components/selectiontab';
import SelectorBtn from '../components/selector';
import {AppointmentCard} from '../components';
import {URL} from '../utility/urls';
import {ScrollView} from 'react-native-gesture-handler';
import {Icon, InputText} from '../components';
import DatePicker from 'react-native-date-picker';
import BottomSheetView from '../components/bottomSheet';
import {CONSTANTS} from '../utility/constant';
import {CONSTANT} from '../utility/const';
import {ChartCard, HeaderAvatar} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {fetchApi} from '../api/fetchApi';
import {
  addclinic_id,
  addclinic_name,
  addclinic_Address,
} from '../redux/features/profiles/clinicId';
import Logo from '../components/logo';
const Appointment = ({navigation}) => {
  const [name, setName] = useState('');
  const ClinicRef = useRef(null);
  const [selectedClinic, setSelectedClinic] = useState('');
  const [clinicID, setClinic] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [clinics, setDataClinic] = useState();
  const selections = CONSTANTS.selection;
  const [seletedType, setSelectedType] = useState(selections[0]);
  console.log('====================================');
  console.log('--------selected', seletedType);
  console.log('====================================');

  const {phone} = useSelector(state => state?.phone?.data);
  console.log('====================================');
  console.log(
    phone,
    'phonenumber=++++++++++++++++++++===========================',
    clinicID,
  );
  const handleChangeValue = e => {
    setClinic(e);
  };
  const [setAppointment, setDataAppointment] = useState();
  console.log('==>setappointmnet', setAppointment);
  const [DOB, setDOB] = useState(new Date());
  const [open, setOpen] = useState(false);
  const formatDate = moment(DOB).format('YYYY-MM-DD');
  const formattedDate = DOB.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const handleConfirm = date => {
    setDOB(date);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  const handleClinicSelection = clinic => {
    setSelectedClinic(clinic.clinic_name);
    handleChangeValue(clinic.id);
    dispatch(addclinic_id(clinic.id));
    dispatch(addclinic_name(clinic.clinic_name));
    dispatch(addclinic_Address(clinic.clinic_Address));
    ClinicRef?.current?.snapToIndex(0);
  };
  const ChangeNameValue = e => {
    setName(e);
  };
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await fetch(URL.get_all_appointments_of_clinic);
    const jsonData = await response.json();
    jsonData && setData(jsonData);
  };
  useEffect(() => {
    {
      fetchData();
    }
  }, []);

  const token = useSelector(state => state.authenticate.auth.access);
  console.log(token);
  const fetchClinic = async () => {
    const response = await fetchApi(URL.getClinic(phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      console.log(jsonData);
      setDataClinic(jsonData.data);
      setSelectedClinic(jsonData.data[0].clinic_name);
      setClinic(jsonData?.data[0]?.id);
      dispatch(addclinic_id.addclinic_id(jsonData?.data[0]?.id));
      dispatch(addclinic_name.addclinic_name(jsonData?.data[0]?.clinic_name));
      dispatch(
        addclinic_Address.addclinic_Address(jsonData?.data[0]?.clinic_Address),
      );
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchClinic();
  }, []);

  const fetchAppointment = async () => {
    const appointment_date = formatDate;
    const clinic_id = clinicID;
    const apiUrl = `${
      URL.get_all_appointments_of_clinic
    }?appointment_date=${encodeURIComponent(
      appointment_date,
    )}&clinic_id=${encodeURIComponent(clinic_id)}`;
    const response = await fetchApi(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      console.log(jsonData.data);
      setDataAppointment(jsonData.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchAppointment();
  }, [formatDate, clinicID]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    try {
      if (name) {
        const filtered = setAppointment?.filter(
          item =>
            item?.patient_data?.patient_name &&
            item?.patient_data?.patient_name.startsWith(name.toUpperCase()),
        );
        setFilteredData(filtered);
      } else if (seletedType && seletedType !== 'All') {
        const filtered = setAppointment?.filter(
          item =>
            item?.appointment_type && item?.appointment_type === seletedType,
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(setAppointment);
      }
    } catch (error) {
      console.error('Error in useEffect:', error);
    }
  }, [setAppointment, name, seletedType]);

  const [doc_name, setDoc_name] = useState();

  const fetchname = async () => {
    const response = await fetchApi(URL.getPractitionerByNumber(phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      console.log(jsonData);
      setDoc_name(jsonData.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchname();
  }, []);

  console.log('====================================');
  console.log('filtered data', clinicID);
  console.log('====================================');

  const handlePlusBUtton = () => {
    dispatch(addclinic_id(clinicID));
    navigation.navigate('addnew');
  };

  const handleSelect = value => {
    setSelectedType(value);
  };

  return (
    <View style={styles.main}>
      <View>
        <ScrollView>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 24,
              paddingHorizontal: 8,
            }}>
            <View>
              <Logo />
              <Text style={styles.title}>
                {Language[language]['welcome']},{Language[language]['dr']}
                {doc_name?.doctor_name}
              </Text>
            </View>
            <HeaderAvatar data={doc_name} />
          </View> */}
          <View style={styles.select}>
            <SelectorBtn
              //label={Language[language]['clinic']}
              name="chevron-down"
              onPress={() => {
                ClinicRef?.current?.snapToIndex(1);
              }}
              input={selectedClinic}
            />
            <SelectorBtn
              //label={Language[language]['dob']}
              name="calendar"
              onPress={() => setOpen('to')}
              input={formattedDate}
              style={styles.DOBselect}
            />
            <DatePicker
              modal
              open={open !== false}
              date={DOB}
              theme="auto"
              mode="date"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
            {/* <SearchBox label='Patient name/phone number' action={()=>console.log('clicked')}/> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                bottom: 24,
                width: '103%',
              }}>
              <InputText
                placeholder="Search name"
                value={name}
                setValue={ChangeNameValue}
                textStyle={styles.input}
              />
              <Icon name="search" size={20} style={styles.searchIcon} />
            </View>
            <View style={styles.tab}>
              {selections?.map((val, ind) => (
                <SelectionTab
                  label={val}
                  key={ind}
                  onPress={() => handleSelect(val)}
                  selected={seletedType === val}
                />
              ))}
            </View>
          </View>
          <View style={styles.appointment}>
            <Text style={styles.h2}>Appointments</Text>
            {filteredData?.map((value, index) => {
              return (
                <AppointmentCard
                  key={index}
                  appointment={value}
                  openVisit={() => navigation.navigate('visit')}
                />
              );
            })}
          </View>
      
        </ScrollView>
        <PlusButton
            icon="plus"
            style={{position: 'absolute', left:24,bottom:16}}
            onPress={handlePlusBUtton}
          />
      </View>
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
          {clinics &&
            clinics?.map((clinic, index) => (
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
    paddingHorizontal: 24,
    paddingVertical: 24,
    flex: 1,
  },
  title: {
    color: CUSTOMCOLOR.black,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
  },
  select: {
    gap: 8,
    paddingHorizontal: 8,
  },
  tab: {
    bottom: 16,
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 8,
  },
  appointment: {
    gap: 8,
    paddingHorizontal: 8,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
  },
  input: {
    gap: 4,
    paddingVertical: 16,
    left: 4,
  },
  searchIcon: {
    top: 10,
    height: 51,
    right: 24,
    padding: 16,
  },
  DOBselect: {
    width: '100%',
    gap: 8,
    //paddingHorizontal: 2,
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
export default Appointment;
