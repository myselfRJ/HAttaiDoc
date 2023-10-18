import React, {useEffect, useState, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
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
import {AppointmentCard, HButton} from '../components';
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
import {commonstyles} from '../styles/commonstyle';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import CustomIcon from '../components/icon';
import {disableBackButton} from '../utility/backDisable';

const Appointment = ({navigation}) => {
  const [name, setName] = useState('');
  const ClinicRef = useRef(null);
  const [selectedClinic, setSelectedClinic] = useState('');
  const [clinicID, setClinic] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [clinics, setDataClinic] = useState();
  const selections = CONSTANTS.selection;
  const [seletedType, setSelectedType] = useState(selections[0]);

  const {phone} = useSelector(state => state?.phone?.data);

  const handleChangeValue = e => {
    setClinic(e);
  };
  const [setAppointment, setDataAppointment] = useState();

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
      setSelectedClinic(jsonData.data[0].clinic_name);
      setClinic(jsonData?.data[0]?.id);
      dispatch(addclinic_id(jsonData?.data[0]?.id));
      dispatch(addclinic_name(jsonData?.data[0]?.clinic_name));
      dispatch(addclinic_Address(jsonData?.data[0]?.clinic_Address));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchClinic();
  }, [phone]);

  const appointment_date = formatDate;
  const fetchAppointment = async () => {
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
            item?.patient_name.toLowerCase().startsWith(name.toLowerCase()),
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
      setDoc_name(jsonData.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchname();
  }, []);

  const Clinic_id = useSelector(state => state?.clinicid?.clinic_id);

  const handlePlusBUtton = () => {
    dispatch(addclinic_id(clinicID));
    navigation.navigate('addnew');
  };

  const handleSelect = value => {
    setSelectedType(value);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAppointment();
    }, [clinicID, appointment_date]),
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
    <View style={styles.main}>
      <View>
        <View style={styles.select}>
          <SelectorBtn
            selectContainer={{
              gap: verticalScale(4),
              paddingVertical: verticalScale(0),
            }}
            //label={Language[language]['clinic']}
            name="chevron-down"
            onPress={() => {
              ClinicRef?.current?.snapToIndex(1);
            }}
            input={selectedClinic}
          />
          <SelectorBtn
            selectContainer={{
              gap: verticalScale(4),
              paddingVertical: verticalScale(0),
            }}
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
        <ScrollView
          style={styles.appointmentCard}
          contentContainerStyle={{gap: moderateScale(8)}}>
          {filteredData?.length > 0 ? (
            filteredData?.map((value, index) => {
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
      </View>
      <View>
        <HButton
          label="Book Appointment"
          btnstyles={{alignSelf: 'center'}}
          onPress={handlePlusBUtton}
        />
      </View>
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
  main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(24),
    flex: 1,
    backgroundColor: CUSTOMCOLOR.background,
  },

  appointmentCard: {
    height: moderateScale(400),
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
  appointment: {
    gap: moderateScale(4),
    // paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(16),
  },
});
export default Appointment;
