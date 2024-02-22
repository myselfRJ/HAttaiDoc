import React, {useEffect, useState, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
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
import {AppointmentCard, HButton} from '../components';
import {URL} from '../utility/urls';
import {ScrollView} from 'react-native-gesture-handler';
import {Icon, InputText} from '../components';
import DatePicker from 'react-native-date-picker';
import BottomSheetView from '../components/bottomSheet';
import {CONSTANTS} from '../utility/constant';
import {
  AppointmentDatafilterAndSortData,
  CONSTANT,
  CompletedAppointmentDatafilterAndSortData,
} from '../utility/const';
import {ChartCard, HeaderAvatar} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {fetchApi} from '../api/fetchApi';
import {
  addclinic_id,
  addclinic_name,
  addclinic_Address,
  addclinic_phone,
  addPharmaPhone,
} from '../redux/features/profiles/clinicId';
import Logo from '../components/logo';
import {commonstyles} from '../styles/commonstyle';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import CustomIcon from '../components/icon';
import {disableBackButton} from '../utility/backDisable';
import {addclinic_data} from '../redux/features/profiles/clinicData';
import {LoadingElement} from '../components/LoadingElement';

const Appointment = ({navigation}) => {
  const refreshAppointmentApi = useSelector(
    state => state?.refreshApi.appointment,
  );
  const [refresh, setRefresh] = useState(false);
  const [name, setName] = useState('');
  const ClinicRef = useRef(null);
  const [selectedClinic, setSelectedClinic] = useState('');
  const [clinicID, setClinic] = useState('');
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [clinics, setDataClinic] = useState();
  const selections = CONSTANTS.selection;
  const [seletedType, setSelectedType] = useState(selections[0]);
  const [AppointmentFilterResult, setAppointmentFilterData] = useState([]);
  const [AllData, setAllData] = useState([]);

  const {phone} = useSelector(state => state?.phone?.data);
  const [pending, setPending] = useState(false);

  const handleChangeValue = e => {
    setClinic(e);
  };
  const [setAppointment, setDataAppointment] = useState([]);

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
    setPending(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClinicSelection = clinic => {
    setSelectedClinic(clinic.clinic_name);
    handleChangeValue(clinic.id);
    dispatch(addclinic_id(clinic.id));
    dispatch(addclinic_name(clinic.clinic_name));
    dispatch(addclinic_Address(clinic.clinic_Address));
    dispatch(addclinic_phone(clinic?.clinic_phone_number));
    dispatch(addPharmaPhone(clinic?.pharmacyPhone));
    // ClinicRef?.current?.snapToIndex(0);
    setShow(false);
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
  const Clinic_id = useSelector(state => state?.clinicid?.clinic_id);
  const Clinic_name = useSelector(state => state?.clinicid?.clinic_name);
  const appointment_date = formatDate;
  const fetchAppointment = async () => {
    setRefresh(true);
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
      setCompletedAppointments(
        CompletedAppointmentDatafilterAndSortData(jsonData?.data),
      );
      setPending(true);
      setRefresh(false);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    try {
      if (name) {
        const filtered = AppointmentFilterResult?.filter(
          item =>
            item?.patient_data?.patient_name &&
            item?.patient_name?.toLowerCase()?.startsWith(name?.toLowerCase()),
        );
        setFilteredData(filtered);
      } else if (
        seletedType &&
        seletedType !== 'All' &&
        seletedType !== 'Completed'
      ) {
        const filtered = AppointmentFilterResult?.filter(
          item =>
            item?.appointment_type &&
            item?.appointment_type?.toLowerCase() ===
              (seletedType === 'New' ? 'walkin' : seletedType.toLowerCase()),
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(AppointmentFilterResult);
      }
      if (seletedType === 'Completed') {
        setFilteredData(completedAppointments);
      }
    } catch (error) {
      console.error('Error in useEffect:', error);
    }
  }, [AppointmentFilterResult, name, seletedType]);
  const clinics_data = useSelector(state => state?.clinic?.clinics);
  const handlePlusBUtton = () => {
    dispatch(addclinic_id(Clinic_id));
    navigation.navigate('addnew');
  };

  const handleSelect = value => {
    setSelectedType(value);
  };

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        fetchAppointment();
      }, 1000);
    }, [Clinic_id, appointment_date, refreshAppointmentApi]),
  );

  useEffect(() => {
    disableBackButton();
  }, []);
  const renderItems = ({item, index}) => {
    return (
      <AppointmentCard
        key={index}
        appointment={item}
        openVisit={() => navigation.navigate('visit')}
      />
    );
  };
  return (
    <View style={styles.main}>
      <View>
        <View style={styles.select}>
          <View>
            <SelectorBtn
              selectContainer={{
                // gap: verticalScale(4),
                paddingVertical: verticalScale(0),
              }}
              //label={Language[language]['clinic']}
              name="chevron-down"
              onPress={() => {
                // ClinicRef?.current?.snapToIndex(1);
                setShow(!show);
              }}
              input={Clinic_name}
            />
            {show && (
              <View style={styles.modalContainer}>
                {/* <Text style={styles.clinicText}>{Language[language]['clinic']}</Text> */}
                {clinics_data &&
                  clinics_data?.map((clinic, index) => (
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
            selectContainer={{
              gap: verticalScale(4),
              paddingVertical: verticalScale(0),
            }}
            //label={Language[language]['dob']}
            name="calendar"
            onPress={() => setOpen(true)}
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

          <InputText
            input
            placeholder="Search name"
            value={name}
            setValue={ChangeNameValue}
            textStyle={styles.input}
            search={true}
            IconName="magnify"
          />
          {/* <Icon name="search" size={16} style={styles.searchIcon} /> */}
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
        <Text style={[commonstyles.h2, styles.appointment]}>
          {Language[language]['appointments']}
        </Text>
        <View style={styles.appointmentCard}>
          {!pending && filteredData <= 0 ? (
            <LoadingElement />
          ) : (
            <>
              {filteredData?.length > 0 ? (
                <FlatList
                  data={
                    seletedType === 'All'
                      ? [...AppointmentFilterResult, ...completedAppointments]
                      : filteredData
                  }
                  renderItem={renderItems}
                  style={styles.appointmentCard}
                  refreshing={refresh}
                  onRefresh={fetchAppointment}
                />
              ) : (
                <CustomIcon label="Add Your Appointments" />
              )}
            </>
          )}
        </View>
      </View>

      <HButton
        label="Book Appointment"
        btnstyles={{alignSelf: 'center'}}
        onPress={handlePlusBUtton}
      />

      {/* <BottomSheetView
        bottomSheetRef={ClinicRef}
        snapPoints={'50%'}
        backgroundStyle={'#000000aa'}>
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
      </BottomSheetView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(24),
    flex: 1,
    backgroundColor: CUSTOMCOLOR.background,
  },

  appointmentCard: {
    height:
      Dimensions.get('window').height >= 900
        ? moderateScale(600)
        : moderateScale(400),
    marginHorizontal: horizontalScale(8),
    gap: moderateScale(16),
    // borderWidth: 1,
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
  },
  select: {
    gap: moderateScale(16),
    justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // paddingHorizontal: horizontalScale(8),
    // borderWidth: 1,
  },
  tab: {
    flexDirection: 'row',
    gap: moderateScale(16),

    //paddingHorizontal: horizontalScale(4),
  },
  // appointment: {
  //   height: 400,
  //   paddingHorizontal: 8,
  //   gap: 16,
  // },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.heading,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
  },

  searchIcon: {
    top: moderateScale(10),
    height: moderateScale(51),
    right: moderateScale(30),
    padding: moderateScale(16),
    color: CUSTOMCOLOR.primary,
  },
  DOBselect: {
    width: '100%',
    gap: moderateScale(8),
    //paddingHorizontal: 2,
  },
  modalContainer: {
    borderWidth: 1,
    borderColor: CUSTOMCOLOR.borderColor,
    // height: verticalScale(1000),
    // width: '50%',
    //justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: CUSTOMCOLOR.white,
    // alignSelf: 'center',
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
  appointment: {
    gap: moderateScale(4),
    // paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(16),
  },
});
export default Appointment;
