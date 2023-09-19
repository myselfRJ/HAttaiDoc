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
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import DatePicker from 'react-native-date-picker';
import SlotCreate from './SlotCreate';
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
  addclinic_logo,
} from '../redux/features/profiles/clinicId';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../utility/scaleDimension';
import HButton from '../components/button';
import {useFocusEffect} from '@react-navigation/native';
import {commonstyles} from '../styles/commonstyle';
import {disableBackButton} from '../utility/backDisable';

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

  const fetchClinic = async () => {
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
      dispatch(addclinic_id(jsonData.data[0]?.id));
      dispatch(addclinic_name(jsonData.data[0]?.clinic_name));
      dispatch(addclinic_Address(jsonData.data[0]?.clinic_Address));
      dispatch(addclinic_logo(jsonData?.data[0]?.clinic_logo_url));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchClinic();
  }, [phone]);
  const [doc_name, setDoc_name] = useState();
  const Clinic_id = useSelector(state => state?.clinicid?.clinic_id);
  // console.log('====================================');
  // console.log(Clinic_id, '-------clinic');
  // console.log('====================================');

  const fetchDoctors = async () => {
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
    fetchDoctors();
  }, []);

  // const handleAddData = () => {
  //   dispatch(addDoctor_profile.addDoctor_profile(doctor_profile_data));
  // };

  const appointment_date = formatDate;

  const fetchAppointment = async () => {
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
  // useFocusEffect(())
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
    dispatch(addclinic_logo(clinic?.clinic_logo_url))

    ClinicRef?.current?.snapToIndex(0);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAppointment();
    }, [clinicid, appointment_date]),
  );
  useFocusEffect(
    React.useCallback(() => {
      fetchClinic();
    }, []),
  );
  useEffect(() => {
    disableBackButton();
  }, []);

  return (
    <View style={{flex: moderateScale(1)}}>
      <View style={styles.container}>
        <View style={styles.main}>
          <View>
            <Logo />
            <Text style={styles.title}>
              {Language[language]['welcome']},{Language[language]['dr']}
              {doc_name?.doctor_name}
            </Text>
          </View>
          <HeaderAvatar data={doc_name} />
        </View>

        <View>
          <ToggleSwitch value={visible} onValueChange={handleChart} />

          {visible && (
            <View style={styles.cardContainer}>
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
          )}
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
        <Text style={[commonstyles.h2, styles.appointment]}>
          {Language[language]['appointments']}
        </Text>

        {/* <View style={styles.appointment}> */}
        <ScrollView
          style={styles.appointmentcard}
          contentContainerStyle={{gap: moderateScale(8)}}>
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
        <View>
          <HButton
            label="Book Appointment"
            btnstyles={{alignSelf: 'center', marginTop: moderateScale(16)}}
            // textStyle={{color: CUSTOMCOLOR.primary}}
            onPress={() => navigation.navigate('addnew')}
          />
        </View>
      </View>

      {/* </View> */}

      <BottomSheetView bottomSheetRef={ClinicRef} snapPoints={'50%'}>
        <View style={styles.modalContainer}>
          <Text style={styles.clinicText}>{Language[language]['clinic']}</Text>
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
    flex: moderateScale(1),
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(24),
  },
  main: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(24),
    paddingHorizontal: horizontalScale(8),
  },
  clinicText: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h2,
    color: CUSTOMCOLOR.black,
  },

  title: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h2,
    lineHeight: moderateScale(26),
    fontWeight: '600',
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: moderateScale(8),
    paddingHorizontal: horizontalScale(8),
    marginTop: moderateScale(16),
    paddingBottom: moderateScale(8),
  },
  select: {
    gap: moderateScale(8),
    paddingHorizontal: horizontalScale(8),
  },
  appointment: {
    gap: moderateScale(4),
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
  },
  appointmentcard: {
    height: moderateScale(400),
    paddingHorizontal: horizontalScale(8),
    gap: moderateScale(16),
  },
  h2: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(8),
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.heading,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
  },
  modalContainer: {
    height: verticalScale(1000),
    width: '100%',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CUSTOMCOLOR.white,
    alignSelf: 'center',
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
  DOBselect: {
    width: '100%',
    gap: moderateScale(8),
    //paddingHorizontal: 2,
  },
});
export default Dashboard;
