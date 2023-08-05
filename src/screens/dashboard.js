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
import {useSelector} from 'react-redux';
import CustomIcon from '../components/icon';
import Logo from '../components/logo';
const Dashboard = ({navigation, route}) => {
  const ClinicRef = useRef(null);
  const token = useSelector(state => state.authenticate.auth.access);
  console.log('clini name...', selectedClinic);
  const [clinic, setClinic] = useState('');
  const [item, setItem] = useState();
  const [clinics, setDataClinic] = useState();
  const [selectedClinic, setSelectedClinic] = useState();
  const [clinicid, setClinicId] = useState('');
  console.log('clinic id ..', clinicid);

  const [setAppointment, setDataAppointment] = useState();
  console.log('apoointment===', setAppointment);

  const {phone} = useSelector(state => state?.phone?.data);
  console.log('====================================');
  console.log(
    phone,
    'phonenumber=++++++++++++++++++++===========================',
  );
  const handleChangeValue = e => {
    setClinic(e);
  };

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const formatDate = moment(date).format('YYYY-MM-DD');
  console.log('date', formatDate);
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
      console.log(jsonData);
      setDataClinic(jsonData.data);
      setSelectedClinic(jsonData.data[0].clinic_name);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [doc_name, setDoc_name] = useState();
  console.log('doc name===>', doc_name);

  const fetchClinic = async () => {
    const response = await fetchApi(URL.getPractitionerByNumber(phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('practitioner response====', response);
    if (response.ok) {
      const jsonData = await response.json();
      console.log(jsonData);
      setDoc_name(jsonData.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchClinic();
  }, []);

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
      console.log(jsonData.data);
      setDataAppointment(jsonData.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchAppointment();
  }, [formatDate, clinicid]);
  console.log(store.getState());
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
    ClinicRef?.current?.snapToIndex(0);
  };

  const [Appdata, setData] = useState([]);

  // useEffect(() => {
  //   {
  //     fetchData();
  //   }
  // }, [data.length]);

  // const fetchdata = async () => {
  //   const response = await fetchApi(URL.getPatientByClinic(1), {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   console.log('response===',response)
  //   if (response.ok) {
  //     const jsonData = await response.json();
  //     console.log(jsonData.data);
  //     setItem(jsonData.data);
  //   } else {
  //     console.error('API call failed:', response.status, response);
  //   }
  // };
  // useEffect(() => {
  //   fetchdata();
  // },[]);

  console.log(',......', selectedClinic);

  return (
    <View style={{flex: 1}}>
      <View>
        <ScrollView>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 24,
                paddingHorizontal: 8,
              }}>
              <View>
                <Logo/>
                <Text style={styles.title}>
                  {Language[language]['welcome']},{Language[language]['dr']}
                  {doc_name?.doctor_name}
                </Text>
              </View>
              <HeaderAvatar data={doc_name} />
            </View>

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
            </View>
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
            <View style={styles.appointment}>
              <Text style={styles.h2}>
                {Language[language]['appointments']}
              </Text>
              {setAppointment?.length >0 ?
              (setAppointment?.map((value, index) => {
                return (
                  <AppointmentCard
                    key={index}
                    appointment={value}
                    openVisit={() => navigation.navigate('visit')}
                  />
                );
              })): (<CustomIcon label='No Appointments'/>)}
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
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingHorizontal: 8,
              }}></View>
          </View>
        </ScrollView>
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
    paddingHorizontal: 24,
    paddingVertical: 24,
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
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
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
