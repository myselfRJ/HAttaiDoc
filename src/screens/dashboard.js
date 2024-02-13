import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  Dimensions,
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
  addclinic_phone,
  addPharmaPhone,
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
import DButton from '../components/DButton';
import AppointmentStatusCard from '../components/appointmentStatusCard';
import {addclinic_data} from '../redux/features/profiles/clinicData';
import {
  AppointmentDatafilterAndSortData,
  AppointmentsInAMonth,
  AppointmentsInAYear,
  feeDataIneachday,
  feeDataInyear,
  generateMonthSeries,
  WeekdaysData,
} from '../utility/const';
import {addpastHospitalization} from '../redux/features/prescription/pastHistory';
import {LoadingElement} from '../components/LoadingElement';

const Dashboard = React.memo(({navigation, route}) => {
  const months = CONSTANTS.months;
  const ClinicRef = useRef(null);
  const token = useSelector(state => state.authenticate.auth.access);
  const [clinic, setClinic] = useState('');
  const [item, setItem] = useState();
  const [clinics, setDataClinic] = useState();
  const [selectedClinic, setSelectedClinic] = useState();
  const [clinicid, setClinicId] = useState('');
  const [rangeAppointment, setRangeAppointment] = useState('Monthly');
  const [rangeFees, setRangeFees] = useState('Monthly');
  const [visible, setVisible] = useState(false);
  const [LoadAppoData, setLoadAppoData] = useState(false);
  const [AppointmentFilterdata, setAppointmentFilterData] = useState([]);

  const handleChart = () => {
    setVisible(!visible);
  };

  const [setAppointment, setDataAppointment] = useState([]);
  const {phone} = useSelector(state => state?.phone?.data);
  const fcmToken = useSelector(state => state?.phone?.fcmtoken);
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
    setLoadAppoData(false);
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
      dispatch(addclinic_data(jsonData?.data));
      dispatch(addclinic_id(jsonData.data[0]?.id));
      dispatch(addclinic_name(jsonData.data[0]?.clinic_name));
      dispatch(addclinic_Address(jsonData.data[0]?.clinic_Address));
      dispatch(addclinic_logo(jsonData?.data[0]?.clinic_logo_url));
      dispatch(addclinic_phone(jsonData?.data[0]?.clinic_phone_number));
      dispatch(addPharmaPhone(jsonData?.data[0]?.pharmacyPhone));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };

  const [doc_name, setDoc_name] = useState();
  const Clinic_data = useSelector(state => state?.clinic?.clinics);
  const fetchDoctors = async () => {
    const response = await fetchApi(URL.getPractitionerByNumber(phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      dispatch(addDoctor_profile.addDoctor_profile(jsonData?.data));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };

  const doc_prof = useSelector(state => state?.doctor_profile?.doctor_profile);
  const savingFcmToken = async () => {
    const response = await fetchApi(URL.addFcmToken, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        doctor_phone: phone,
        fcmtoken: fcmToken,
        user_phone: '',
        patient_phone: '',
      }),
    });
    try {
      const jsonData = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const appointment_date = formatDate;
  const Clinic_id = useSelector(state => state?.clinicid?.clinic_id);
  const Clinic_name = useSelector(state => state?.clinicid?.clinic_name);
  const [Appointmentdatainrange, setAppointmentdatainrange] = useState([]);
  const [Appointmentdatainmonths, setAppointmentdatainmonths] = useState([]);
  const [fesscollection, setFesscollection] = useState([]);
  const [feescollectionmonth, setFeescollectionMonth] = useState([]);
  const fetchAppointment = async () => {
    const apiUrl = `${
      URL.get_all_appointments_of_clinic
    }?appointment_date=${encodeURIComponent(
      appointment_date,
    )}&clinic_id=${encodeURIComponent(Clinic_id)}`;
    const response = await fetchApi(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setDataAppointment(jsonData.data);
      setAppointmentFilterData(
        AppointmentDatafilterAndSortData(jsonData?.data),
      );
      setLoadAppoData(true);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     fetchAppointment();
  //   }, 1000);
  // }, [formatDate, Clinic_id, clinicid]);

  const AppointmentChartData = {
    labels:
      Appointmentdatainmonths?.length > 0
        ? Appointmentdatainmonths
        : ['JAN', 'FEB', 'MAR', 'APR'],
    datasets: [
      {
        data:
          Appointmentdatainrange?.length > 0
            ? Appointmentdatainrange
            : [99, 100, 20, 0],
      },
    ],
  };
  const feeChartData = {
    labels:
      feescollectionmonth?.length > 0
        ? feescollectionmonth
        : ['JAN', 'FEB', 'MAR', 'APR'],
    datasets: [
      {
        data: fesscollection?.length > 0 ? fesscollection : [99, 100, 20, 0],
      },
    ],
  };
  const [show, setShow] = useState(false);
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
    // ClinicRef?.current?.snapToIndex(0);
  };

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        fetchAppointment();
      }, 1000);
    }, [Clinic_id, appointment_date, clinicid]),
  );
  useEffect(() => {
    disableBackButton();
  }, []);

  let completedAppointments = setAppointment.filter(
    appointment => appointment.status === 'completed',
  );
  let pendingAppointments = setAppointment.filter(
    appointment => appointment.status === 'pending',
  );
  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate);
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
  const oneMonthAgo = new Date(currentDate);
  oneMonthAgo.setMonth(currentDate.getMonth() - 1);
  const oneWeekAgo = new Date(currentDate);
  oneWeekAgo.setDate(currentDate.getDate() - 7);
  let totalAppointments = setAppointment.length;
  const FetchRangeAppointments = async () => {
    const start_date = encodeURIComponent(
      rangeAppointment === 'Monthly'
        ? oneYearAgo.toISOString()?.split('T')[0]
        : oneWeekAgo.toISOString()?.split('T')[0],
    );
    const end_date = encodeURIComponent(
      currentDate?.toISOString()?.split('T')[0],
    );
    try {
      const response = await fetchApi(
        URL.getAppointmentsForStats(start_date, end_date, phone),
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        const jsonData = await response.json();
        if (rangeAppointment === 'Monthly') {
          const data = AppointmentsInAYear(
            jsonData?.data,
            start_date,
            end_date,
          );
          let weekdata = data?.map((item, index) => {
            return item?.count;
          });
          setAppointmentdatainrange(weekdata);
          let months = data?.map((item, index) => {
            return item?.month?.split('-')[0];
          });
          setAppointmentdatainmonths(months);
        } else {
          const weeklydata = WeekdaysData(
            AppointmentsInAMonth(jsonData?.data, start_date, end_date),
          );
          let weekdata = weeklydata?.map((item, index) => {
            return item?.value;
          });
          setAppointmentdatainrange(weekdata);
          let months = weeklydata?.map((item, index) => {
            return item?.day;
          });
          setAppointmentdatainmonths(months);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const FetchRangeFees = async () => {
    const start_date = encodeURIComponent(
      rangeAppointment === 'Monthly'
        ? oneYearAgo.toISOString()?.split('T')[0]
        : oneWeekAgo.toISOString()?.split('T')[0],
    );
    const end_date = encodeURIComponent(
      currentDate?.toISOString()?.split('T')[0],
    );
    try {
      const response = await fetchApi(
        URL.getRangeFess(start_date, end_date, phone),
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        const jsonData = await response.json();
        if (rangeAppointment === 'Monthly') {
          const data = feeDataInyear(jsonData?.data, start_date, end_date);
          let months = data?.map(item => {
            return item?.month?.split('-')[0];
          });
          setFeescollectionMonth(months);
          let feesdata = data?.map(item => {
            return item?.fees;
          });
          setFesscollection(feesdata);
        } else {
          const data = WeekdaysData(
            feeDataIneachday(jsonData?.data, start_date, end_date),
          );
          let days = data?.map(item => {
            return item?.day;
          });
          setFeescollectionMonth(days);
          let feesdata = data?.map(item => {
            return item?.value;
          });
          setFesscollection(feesdata);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      FetchRangeAppointments();
      FetchRangeFees();
      setDoc_name(doc_prof);
      fetchClinic();
    }, [doc_prof, rangeAppointment, rangeFees]),
  );
  useEffect(() => {
    FetchRangeFees();
    FetchRangeAppointments();
    fetchDoctors();
    setDoc_name(doc_prof);
    savingFcmToken();
  }, [rangeAppointment, rangeFees]);
  // console.log(fees);
  const handleSelectRange = value => {
    const newRange = rangeAppointment === value ? '' : value;
    const newRangeFees = rangeFees === value ? '' : value;
    setRangeFees(newRangeFees);
    setRangeAppointment(newRange);
  };
  return (
    <View style={{flex: 1, backgroundColor: CUSTOMCOLOR.background}}>
      <View style={styles.container}>
        <View style={styles.main}>
          <View>
            <Logo />
            {doc_name && doc_name?.doctor_name?.includes('Dr') ? (
              <Text style={styles.title}>
                {Language[language]['welcome']},{doc_name?.doctor_name}
              </Text>
            ) : (
              <Text style={styles.title}>
                {Language[language]['welcome']},{Language[language]['dr']}
                {doc_name?.doctor_name}
              </Text>
            )}
          </View>
          <HeaderAvatar data={doc_name} />
        </View>

        <View>
          <ToggleSwitch value={visible} onValueChange={handleChart} />

          {visible && (
            <View style={styles.cardContainer}>
              <ChartCard
                values={['Monthly', 'Weekly']}
                onSelect={() => handleSelectRange('Monthly')}
                data={AppointmentChartData}
                title={Language[language]['total_patient']}
              />
              <ChartCard
                dropdown={true}
                values={['Monthly', 'Weekly']}
                data={feeChartData}
                title={Language[language]['earnings']}
                label="₹ "
              />
            </View>
          )}
        </View>
        <View style={styles.select}>
          <View>
            <SelectorBtn
              label={'Clinic :'}
              name={show ? 'chevron-up' : 'chevron-down'}
              onPress={() => {
                setShow(!show);
              }}
              input={Clinic_name}
            />
            {show && (
              <View style={styles.modalContainer}>
                {/* <Text style={styles.clinicText}>
                {Language[language]['clinic']}
              </Text> */}
                {Clinic_data &&
                  Clinic_data?.map((clinic, index) => (
                    <Pressable
                      key={index}
                      onPress={() => handleClinicSelection(clinic)}>
                      <Text style={styles.modalfields}>
                        {clinic.clinic_name}
                      </Text>
                    </Pressable>
                  ))}
              </View>
            )}
          </View>
          <SelectorBtn
            label={'Select Date :'}
            name="calendar"
            onPress={() => setOpen(true)}
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
          <View style={styles.status}>
            <AppointmentStatusCard
              text={'Total appointments'}
              count={totalAppointments}
            />
            <AppointmentStatusCard
              text={'Pending'}
              count={pendingAppointments?.length}
            />
            <AppointmentStatusCard
              text={'Completed'}
              count={completedAppointments?.length}
            />
          </View>

          {/* <SearchBox label='Patient name/phone number' action={()=>console.log('clicked')}/> */}
        </View>
        <Text style={[commonstyles.h2, styles.appointment]}>
          {Language[language]['appointments']}
        </Text>

        <View style={styles.appointmentcard}>
          {!LoadAppoData ? (
            <LoadingElement />
          ) : (
            <ScrollView
              style={styles.appointmentcard}
              contentContainerStyle={{gap: moderateScale(8)}}>
              {AppointmentFilterdata?.length > 0 ? (
                AppointmentFilterdata?.map((value, index) => {
                  return (
                    <AppointmentCard
                      key={index}
                      appointment={value}
                      // openVisit={() => navigation.navigate('visit')}
                    />
                  );
                })
              ) : (
                <CustomIcon label="Add Your Appointments" />
              )}
            </ScrollView>
          )}
        </View>
        <View>
          <HButton
            // type="addtype"
            label="Book Appointment"
            btnstyles={commonstyles.activebtn}
            // textStyle={{bottom:verticalScale(4),borderWidth:1}}
            onPress={() => navigation.navigate('addnew')}
            // onPress={() => navigation.navigate('alert')}
          />
        </View>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(24),
  },
  main: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(24),
    paddingHorizontal: horizontalScale(8),
    // borderWidth: 2,
  },
  status: {
    flexDirection: 'row',
    paddingTop: verticalScale(12),
    // paddingHorizontal:horizontalScale(8),
    justifyContent: 'space-between',
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
    // flexDirection: 'row',
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
    height:
      Dimensions.get('window').height >= 900
        ? moderateScale(492)
        : moderateScale(400),
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
    // height: verticalScale(1000),
    // width: '50%',
    //justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: CUSTOMCOLOR.white,
    // alignSelf: 'center',
    borderRadius: moderateScale(10),
    borderColor: CUSTOMCOLOR.borderColor,
    borderWidth: 1,
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
  DOBselect: {
    width: '100%',
    gap: moderateScale(8),
    //paddingHorizontal: 2,
  },
});
export default Dashboard;
