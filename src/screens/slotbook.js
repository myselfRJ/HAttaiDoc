import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import SelectorBtn from '../components/selector';
import Option from '../components/option';
import SelectionTab from '../components/selectiontab';
import SuggestionTab from '../components/suggestiontab';
import HButton from '../components/button';
import {useState, useEffect, useRef, version} from 'react';
import moment, {min} from 'moment';
import DatePicker from 'react-native-date-picker';
import {CONSTANTS} from '../utility/constant';
import {Host, URL} from '../utility/urls';
import {Icon, BottomSheetView, StatusMessage} from '../components';
import {fetchApi} from '../api/fetchApi';
import {HttpStatusCode} from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {addPatient} from '../redux/features/patient/patientslice';
import {addPhone} from '../redux/features/authenticate/PhoneNumber';
import {forceTouchGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/ForceTouchGestureHandler';
import InputText from '../components/inputext';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {disableBackButton} from '../utility/backDisable';
import CustomIcon from '../components/icon';
import {capitalizeWord} from '../utility/const';
import {
  addPharmaPhone,
  addclinic_Address,
  addclinic_id,
  addclinic_logo,
  addclinic_name,
  addclinic_phone,
} from '../redux/features/profiles/clinicId';

const SlotBook = ({navigation, route}) => {
  const option = 'procedure++situation++finding';
  const dispatch = useDispatch();
  const {id} = route.params;
  const [data, setData] = useState([]);
  const [filtered, setFilteredData] = useState([]);
  const [selected, setSelected] = useState('');
  const [show, setShow] = useState(false);
  const [complaint, setComplaint] = useState('');
  const [token_id, setTokenID] = useState('');

  const [bookedSlots, setBookedSlots] = useState([]);

  const [slotDetails, setSlotDetails] = useState({});
  const [selectedSlot, setSelectedSlot] = useState();

  const selections = CONSTANTS.selections;

  const [selectedTypeAppointment, setSelectedTypeAppointment] = useState();
  const [bottom, setBottom] = useState(false);
  const payment_modes = ['Cash', 'UPI'];
  const [paymentMode, setPaymentMode] = useState('');
  const [selectedMode, setSelectedMode] = useState('In clinic');
  const [clinicShow, setClinicShow] = useState(false);
  const handleOptions = value => {
    setSelectedMode(value);
  };
  const [fee, setFee] = useState(false);
  const handleFee = value => {
    setFee(value);
  };

  const handleSelectSlot = (value, id) => {
    setSelectedSlot(value);
    setTokenID(id);
  };

  const handleSelectType = value => {
    setSelectedTypeAppointment(value);
  };
  const handleSelectPaymentMode = val => {
    if (val === paymentMode) {
      setPaymentMode('');
    } else {
      setPaymentMode(val);
    }
  };
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [formatDate, setFormatDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const handleConfirm = date => {
    setDate(date);
    setFormatDate(moment(date).format('YYYY-MM-DD').toString());
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const Clinic_data = useSelector(state => state?.clinic?.clinics);
  const Clinic_id = useSelector(state => state?.clinicid?.clinic_id);
  const Clinic_name = useSelector(state => state?.clinicid?.clinic_name);
  const handleClinicSelection = clinic => {
    dispatch(addclinic_id(clinic?.id));
    dispatch(addclinic_name(clinic?.clinic_name));
    dispatch(addclinic_Address(clinic?.clinic_Address));
    dispatch(addclinic_logo(clinic?.clinic_logo_url));
    dispatch(addclinic_phone(clinic?.clinic_phone_number));
    dispatch(addPharmaPhone(clinic.pharmacyPhone));
    setClinicShow(!clinicShow);
    // ClinicRef?.current?.snapToIndex(0);
  };
  const {phone} = useSelector(state => state?.phone?.data);
  const speciality = useSelector(
    state => state?.doctor_profile?.doctor_profile?.specialization,
  );

  const weekDys = {
    0: 'Su',
    1: 'M',
    2: 'T',
    3: 'W',
    4: 'TH',
    5: 'F',
    6: 'Sa',
  };
  const Day = weekDys[new Date(date).getDay()];

  const fetchAppointment = async () => {
    const appointment_date = formatDate;
    const clinic_id = Clinic_id;
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

      setBookedSlots(
        jsonData.data?.map((item, index) => item?.appointment_slot),
      );
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchAppointment();
  }, [formatDate, Clinic_id, clinicShow]);

  const fetchslots = async () => {
    const response = await fetchApi(URL.SlotsAvailable(Clinic_id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const jsonData = await response.json();
      const slot = jsonData?.data[0]?.slot;
      const slots = JSON.parse(slot);
      setSlotDetails(slots);
      // setSlotDetails(jsonData.data?.map(val => JSON.parse(val?.slot)));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchslots();
  }, [formatDate, Clinic_id, clinicShow]);

  useEffect(() => {}, [selectedSlot]);

  const getMinute = time => {
    let value = time.split(':');
    let hour = parseInt(value[0]);
    let minute = parseInt(value[1]);
    let totalMin = parseInt(hour * 60 + minute);
    return totalMin;
  };

  const getTime = time => {
    let hour = parseInt((time / 60).toString().split('.')[0]);
    let min = time % 60;
    let totalHour = hour.toString().padStart(2, '0');
    let totalMinutes = min.toString().padStart(2, '0');
    return totalHour + ':' + totalMinutes;
  };
  const getTimeList = data => {
    let timeList = [];
    data?.forEach(item => {
      const initialTime = getMinute(item.fromTime);

      const endTime = getMinute(item.toTime);
      const duration = parseInt(item.duration);
      const loopLength = (endTime - initialTime) / duration;
      for (let i = 0; i < loopLength; i++) {
        const startTime = getTime(initialTime + duration * i);
        const endTime = getTime(initialTime + duration * (i + 1));
        const Today = moment(new Date()).format('YYYY-MM-DD');
        const PresentTime = new Date().toString().split(' ')[4].substring(0, 5);
        const slot = startTime + '-' + endTime;
        const bookedSlot = bookedSlots;
        // if (!bookedSlot.includes(slot)) {
        //   if (formatDate === Today) {
        //     if (startTime >= PresentTime) {
        timeList.push({
          slot: slot,
          duration: item.duration,
        });
        // }
        //     } else {
        //       timeList.push({
        //         slot: slot,
        //         duration: item.duration,
        //       });
        //     }
        //   }
        // }
      }
    });
    return timeList;
  };
  const filterSlots = slotDetails?.[Day]?.filter(
    item => item?.consultType === selectedMode,
  );
  let list = getTimeList(filterSlots);
  const token = useSelector(state => state.authenticate.auth.access);

  const renderItems = ({item, index}) => {
    const Today = moment(new Date()).format('YYYY-MM-DD');
    const PresentTime = new Date().toString().split(' ')[4].substring(0, 5);
    const startTime = item?.slot?.split('-')[0]?.toString();
    const bookedSlot = bookedSlots;

    return (
      <View key={item.id} style={styles.item}>
        {!bookedSlot?.includes(item?.slot) &&
        (formatDate !== Today || startTime >= PresentTime) ? (
          <SelectionTab
            id={(parseInt(index) + 1).toString().padStart(2, '0')}
            label={item?.slot}
            onPress={() => handleSelectSlot(item, parseInt(index) + 1)}
            selected={selectedSlot?.slot === item?.slot}
          />
        ) : (
          <SelectionTab
            selectContainer={{backgroundColor: CUSTOMCOLOR.disable}}
            text={{color: CUSTOMCOLOR.white}}
            id={(parseInt(index) + 1).toString().padStart(2, '0')}
            label={item?.slot}
            // onPress={() => handleSelectSlot(item)}
            // selected={selectedSlot?.slot === item?.slot}
          />
        )}
      </View>
    );
  };

  const [loading, setLoading] = useState(false);
  const {patient_phone} = route.params;

  let today = moment().toISOString().split('T')[0] + 'T';

  const [apiStatus, setApiStatus] = useState({});

  const getApoointment = async () => {
    const response = await fetchApi(URL.reschedule_appointment(id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      if (jsonData?.data) {
        setFormatDate(jsonData?.data?.appointment_date);
        setComplaint(jsonData?.data?.complaint);
        setPaymentMode(jsonData?.data?.payment_mode);
        // setSelectedMode(jsonData?.data?.mode_of_consultation);
        setSelectedTypeAppointment(
          jsonData?.data?.appointment_type === 'walkin'
            ? 'New'
            : capitalizeWord(jsonData?.data?.appointment_type),
        );
      }
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    if (id) {
      getApoointment();
    }
  }, []);

  const updateAppointment = async () => {
    try {
      const response = await fetchApi(URL.reschedule_appointment(id), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          appointment_date: formatDate,
          mode_of_consultation: selectedMode,
          appointment_type:
            selectedTypeAppointment === 'New'
              ? 'walkin'
              : selectedTypeAppointment?.toLowerCase(),
          appointment_token: token_id.toString(),
          appointment_slot: selectedSlot?.slot,
          clinic_id: Clinic_id,
          complaint: complaint,
          patient_phone_number: patient_phone,
          doctor_phone_number: phone,
          is_paid: fee,
          payment_mode: paymentMode,
          // complaint: complaint,
          patient_reference: patient_phone,
          practitioner_reference: phone,
          start: today + selectedSlot?.slot.split('-')[0] + ':00Z',
          end: today + selectedSlot?.slot.split('-')[1] + ':00Z',
          speciality: speciality,
          type:
            selectedTypeAppointment === 'New'
              ? 'walkin'
              : selectedTypeAppointment?.toLowerCase(),
        }),
      });
      if (response.status === HttpStatusCode.Ok) {
        const jsonData = await response.json();
        if (jsonData.status === 'success') {
          setApiStatus({
            status: 'success',
            message: jsonData.mesaage,
          });
          setBottom(true);
          setTimeout(() => {
            navigation.navigate('dashboard');
          }, 1000);
          setLoading(false);
        } else {
          setApiStatus({
            status: 'warning',
            message: 'Please Enter Complaint and Slot Timings',
          });
          setBottom(true);
          console.error('API call failed:', response.status);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error occurred:', error);
      setApiStatus({
        status: 'error',
        message: 'Something Went Wrong Please Try After Sometime',
      });
      setBottom(true);
      console.error('API call failed:', response.status);
    }
  };
  const Appointment_Booking = async () => {
    try {
      setLoading(true);
      const response = await fetchApi(URL.Appointment_Booking, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointment_date: formatDate,
          mode_of_consultation: selectedMode,
          appointment_type:
            selectedTypeAppointment === 'New'
              ? 'walkin'
              : selectedTypeAppointment?.toLowerCase(),
          appointment_token: token_id.toString(),
          appointment_slot: selectedSlot?.slot,
          clinic_id: Clinic_id,
          complaint: complaint,
          //patient_phone_number: patientPhoneNumber.patient.phone_number,
          patient_phone_number: patient_phone,
          doctor_phone_number: phone,
          is_paid: fee,
          payment_mode: paymentMode,
          meta_data: {
            complaint: complaint,
            patient_reference: patient_phone,
            practitioner_reference: phone,
            start: today + selectedSlot?.slot.split('-')[0] + ':00Z',
            end: today + selectedSlot?.slot.split('-')[1] + ':00Z',
            speciality: speciality,
            type:
              selectedTypeAppointment === 'New'
                ? 'walkin'
                : selectedTypeAppointment?.toLowerCase(),
          },
        }),
      });
      if (response.status === HttpStatusCode.Ok) {
        const jsonData = await response.json();
        if (jsonData.status === 'success') {
          setApiStatus({
            status: 'success',
            message: jsonData.mesaage,
          });
          setBottom(true);
          setTimeout(() => {
            navigation.navigate('dashboard');
          }, 1000);
          setLoading(false);
        } else {
          setApiStatus({
            status: 'warning',
            message: 'Please Enter Complaint and Slot Timings',
          });
          setBottom(true);
          console.error('API call failed:', response.status);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error occurred:', error);
      setApiStatus({
        status: 'error',
        message: 'Something Went Wrong Please Try After Sometime',
      });
      setBottom(true);
      console.error('API call failed:', response.status);
    }
  };

  useEffect(() => {
    disableBackButton();
  }, []);
  useEffect(() => {
    if (id) {
      setShow(!show);
    }
  }, [complaint]);
  const fetchComplaints = async () => {
    const response = await fetchApi(
      URL.snomed(complaint ? complaint : 'NA', option),
      {
        method: 'GET',
        headers: {
          // Host: Host,
        },
      },
    );
    if (response.ok) {
      const jsonData = await response.json();
      const snomed_data = jsonData?.map(item => ({term: item}));
      setData([...snomed_data, {term: complaint}]);
      // dispatch(addDoctor_profile.addDoctor_profile(jsonData?.data));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchComplaints();
  }, [complaint]);

  const HandlePress = value => {
    setComplaint(value);
    setSelected(value);
  };

  return (
    <View style={styles.main}>
      <View style={styles.select}>
        <View>
          <SelectorBtn
            label={'Clinic :'}
            name={clinicShow ? 'chevron-up' : 'chevron-down'}
            onPress={() => {
              setClinicShow(!clinicShow);
            }}
            input={Clinic_name}
          />
          {clinicShow && (
            <View style={styles.modalContainer}>
              {/* <Text style={styles.clinicText}>
                {Language[language]['clinic']}
              </Text> */}
              {Clinic_data &&
                Clinic_data?.map((clinic, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleClinicSelection(clinic)}>
                    <Text style={styles.modalfields}>{clinic.clinic_name}</Text>
                  </Pressable>
                ))}
            </View>
          )}
        </View>
      </View>
      <View style={{gap: verticalScale(8)}}>
        <SelectorBtn
          label="Date"
          name="calendar"
          onPress={() => setOpen('to')}
          input={formatDate}
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
        <View style={{zIndex: 2}}>
          <InputText
            required={true}
            label="Reason for Visit"
            placeholder="Chief complaint / Purpose"
            value={complaint}
            setValue={setComplaint}
            multiline={true}
            search={true}
            IconName={
              (show && filtered.length > 0) ||
              complaint === selected ||
              complaint.length === 0
                ? 'magnify'
                : 'close'
            }
            onPress={() => setShow(!show)}
          />
          {complaint.length > 1 &&
            (complaint === selected || show ? null : (
              <View style={styles.dropdownContainer}>
                <ScrollView>
                  {data?.map((val, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.touch}
                      onPress={() => HandlePress(val?.term)}>
                      <Text
                        style={{
                          fontSize: CUSTOMFONTSIZE.h3,
                          padding: moderateScale(10),
                          color: CUSTOMCOLOR.black,
                        }}
                        key={index}>
                        {val.term}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ))}
        </View>

        <View style={styles.type}>
          <Option
            label="Offline"
            value="Offline"
            selected={selectedMode === 'In clinic'}
            onPress={() => handleOptions('In clinic')}
          />
          <Option
            label="Telephonic"
            value="TelePhonic"
            selected={selectedMode === 'Telephonic'}
            onPress={() => handleOptions('Telephonic')}
          />
        </View>
        <Text style={{color: CUSTOMCOLOR.black, fontSize: CUSTOMFONTSIZE.h3}}>
          Appointment Type{' '}
          <Text style={{color: 'red', fontSize: CUSTOMFONTSIZE.h4}}>*</Text>
        </Text>
        <View style={styles.selection}>
          {selections?.map((val, ind) => (
            <View key={ind}>
              <SelectionTab
                label={val}
                onPress={() => handleSelectType(val)}
                selected={selectedTypeAppointment === val}
              />
            </View>
          ))}
        </View>
        <View>
          <Text style={{color: CUSTOMCOLOR.black, fontSize: CUSTOMFONTSIZE.h3}}>
            Fees
          </Text>
          <View style={styles.type}>
            <Option
              label="UnPaid"
              value={false}
              selected={fee === false}
              onPress={() => handleFee(false)}
            />
            <Option
              label="Paid"
              value={true}
              selected={fee === true}
              onPress={() => handleFee(true)}
            />
          </View>
        </View>
        <Text style={{color: CUSTOMCOLOR.black, fontSize: CUSTOMFONTSIZE.h3}}>
          Payment mode{' '}
          <Text style={{color: 'red', fontSize: CUSTOMFONTSIZE.h4}}>*</Text>
        </Text>
        <View style={styles.selection}>
          {payment_modes?.map((val, ind) => (
            <View key={ind}>
              <SelectionTab
                label={val}
                onPress={() => handleSelectPaymentMode(val)}
                selected={paymentMode === val}
              />
            </View>
          ))}
        </View>
        <View style={styles.child}>
          {list.length > 0 ? (
            <>
              <View>
                <Text style={styles.h2}>Available Slots</Text>
                <FlatList
                  style={{height: verticalScale(500)}}
                  data={list}
                  renderItem={renderItems}
                  numColumns={4}
                />
              </View>
              <View style={styles.btn}>
                <HButton
                  label="Book Slot"
                  //onPress={() => navigation.navigate('dashboard')}
                  onPress={() => {
                    if (id === undefined && !loading) {
                      selectedTypeAppointment
                        ? Appointment_Booking()
                        : Alert.alert(
                            'Warn',
                            'Please Select Type Of Appointment',
                          );
                    } else {
                      if (!loading) {
                        updateAppointment();
                      }
                    }
                  }}
                  loading={loading}
                />
              </View>
            </>
          ) : (
            <CustomIcon label="No Slots Available" />
          )}
        </View>
      </View>
      <BottomSheetView
        visible={bottom}
        setVisible={setBottom}
        status={apiStatus.status}
        message={apiStatus.message}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    gap: moderateScale(16),
    flex: 1,
    padding: moderateScale(24),
    zIndex: 1,
    backgroundColor: CUSTOMCOLOR.background,
  },
  modalContainer: {
    backgroundColor: CUSTOMCOLOR.white,
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
  type: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(88),
  },
  MainHeadContainer: {
    backgroundColor: CUSTOMCOLOR.primary,
    // height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
    padding: moderateScale(24),
  },
  MainText: {
    color: CUSTOMCOLOR.white,
    // top: 43,
    // left: 37,
    gap: moderateScale(33),
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 21.79,
  },
  selection: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    gap: moderateScale(56),
  },
  child: {
    zIndex: 1,
    // paddingVertical: moderateScale(16),
    gap: moderateScale(8),
    // borderWidth:1,
  },
  h2: {
    marginVertical: verticalScale(16),
    fontSize: CUSTOMFONTSIZE.h2,
    fontWeight: '600',
    fontFamily: CUSTOMFONTFAMILY.heading,

    color: CUSTOMCOLOR.black,
  },
  item: {
    // borderWidth:1,
    margin: moderateScale(8),
    paddingHorizontal: horizontalScale(4),
  },
  btn: {
    height: moderateScale(400),
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'absolute',
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
    left: 0,
    top: verticalScale(76),
    width: '100%',
    backgroundColor: CUSTOMCOLOR.white,
    height: verticalScale(300),
    borderRadius: moderateScale(4),
  },
  touch: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
  },
});

export default SlotBook;
