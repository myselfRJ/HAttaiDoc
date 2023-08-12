import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from 'react-native';
import moment, {min} from 'moment';
import React, {useState, useEffect, useRef} from 'react';
import {SvgXml} from 'react-native-svg';
import {hattailogo} from '../assets/svgs/svg';
import {CONSTANTS} from '../utility/constant';
import {
  ChartCard,
  AppointmentCard,
  HeaderAvatar,
  SelectorBtn,
  BottomSheetView,
} from '../components';
import store from '../redux/stores/store';
import {Language} from '../settings/customlanguage';
import {CUSTOMCOLOR, CUSTOMFONTFAMILY} from '../settings/styles';
import {language} from '../settings/userpreferences';
import DatePicker from 'react-native-date-picker';
import SlotCreate from './slotcreate';
import {URL} from '../utility/urls';
import {ScrollView} from 'react-native-gesture-handler';
import {fetchApi} from '../api/fetchApi';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomIcon from '../components/icon';
import Logo from '../components/logo';
import {addDoctor_profile} from '../redux/features/profiles/doctorprofile';
import ToggleSwitch from '../components/switch';
import {
  addclinic_id,
  addclinic_name,
  addclinic_Address,
} from '../redux/features/profiles/clinicId';
import HButton from '../components/button';

const Dashboard = ({navigation, route}) => {
  const ClinicRef = useRef(null);
  const token = useSelector(state => state.authenticate.auth.access);
  const [clinic, setClinic] = useState('');
  const [item, setItem] = useState();
  const [clinics, setDataClinic] = useState();
  const [selectedClinic, setSelectedClinic] = useState();
  const [clinicid, setClinicId] = useState('');


  const [visible, setVisible] = useState(false);

  const handleChart = () => {
    setVisible(!visible);
  };

  const [setAppointment, setDataAppointment] = useState([]);
  const {phone} = useSelector(state => state?.phone?.data);
  const handleChangeValue = e => {
    setClinic(e);
  };

  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const formatDate = moment(date).format('YYYY-MM-DD');
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const handleConfirm = date => {
    setDate(date);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const fetchData = async () => {
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
      setClinicId(jsonData.data[0]?.id);
      dispatch(addclinic_id.addclinic_id(jsonData.data[0]?.id));
      dispatch(addclinic_name.addclinic_name(jsonData.data[0]?.clinic_name));
      dispatch(
        addclinic_Address.addclinic_Address(jsonData.data[0]?.clinic_Address),
      );
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [doc_name, setDoc_name] = useState();

  const fetchClinic = async () => {
    const response = await fetchApi(URL.getPractitionerByNumber(phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setDoc_name(jsonData.data);
      dispatch(addDoctor_profile.addDoctor_profile(jsonData?.data));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchClinic();
  }, []);

  // const handleAddData = () => {
  //   dispatch(addDoctor_profile.addDoctor_profile(doctor_profile_data));
  // };

  const fetchAppointment = async () => {
    const appointment_date = formatDate;
    const clinic_id = clinicid;
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
      setDataAppointment(jsonData.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchAppointment();
  }, [formatDate, clinicid]);


  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [90, 45, 28, 80, 99, 43],
      },
    ],
  };

  const handleClinicSelection = clinic => {
    setSelectedClinic(clinic.clinic_name);
    // handleChangeValue('clinic', clinic.clinic_name);
    setClinicId(clinic.id);
    dispatch(addclinic_id(clinic?.id));
    dispatch(addclinic_name(clinic?.clinic_name));
    dispatch(addclinic_Address(clinic?.clinic_Address));

    ClinicRef?.current?.snapToIndex(0);
  };

  const [Appdata, setData] = useState([]);


  return (
    <View style={{flex: 1}}>
      
        
          <View style={styles.container}>
            <View style={{flex:1}}>
            <View
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
            </View>

           
            <ToggleSwitch value = {visible} onValueChange={handleChart} />
         
            {visible && (
               <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 8,
                paddingHorizontal: 8,
                paddingBottom: 8,
              }}>
              
                  <ChartCard
                    data={data}
                    title={Language[language]['total_patient']}
                  />
                  <ChartCard
                    data={data}
                    title={Language[language]['earnings']}
                    label="₹ "
                  />
                
              
            </View>)}
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
                input={formatDate}
                style={styles.DOBselect}
              />
              <DatePicker
                modal
                open={open !== false}
                date={date}
                theme="auto"
                mode="date"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />

              {/* <SearchBox label='Patient name/phone number' action={()=>console.log('clicked')}/> */}
            </View>
            </View>
            <View style={styles.appointment}>
            <ScrollView>
              <Text style={styles.h2}>
                {Language[language]['appointments']}
              </Text>
              {setAppointment?.length > 0 ? (
                setAppointment?.map((value, index) => {
                  return (
                    <AppointmentCard
                      key={index}
                      appointment={value}
                      openVisit={() => navigation.navigate('visit')}
                    />
                  );
                })
              ) : (
                <CustomIcon label="No Appointments" />
              )}
              </ScrollView>
              <HButton label='see all' 
              onPress={() => navigation.navigate('myappointment') }/>
            </View>

            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingHorizontal: 8,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('myappointment')}
                style={{
                  borderWidth: 0.5,
                  borderRadius: 4,
                  borderColor: CUSTOMCOLOR.primary,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}>
                <Text style={{color: CUSTOMCOLOR.primary}}>
                  {Language[language]['view_more']}
                </Text>
              </TouchableOpacity>
            </View>
       
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
  container: {
    flex:1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderWidth:1
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
  appointment: {
    flex:2,
    gap: 8,
     paddingHorizontal: 8,
     paddingVertical: 64,
     justifyContent:'center',
     alignItems:'center'
    //height:500
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
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
  DOBselect: {
    width: '100%',
    gap: 8,
    //paddingHorizontal: 2,
  },
});
export default Dashboard;
