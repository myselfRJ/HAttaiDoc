import {Text, View, StyleSheet, FlatList} from 'react-native';
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
import {URL} from '../utility/urls';
import {Icon, BottomSheetView, StatusMessage} from '../components';
import {fetchApi} from '../api/fetchApi';
import {HttpStatusCode} from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {addPatient} from '../redux/features/patient/patientslice';
import {addPhone} from '../redux/features/authenticate/PhoneNumber';
import {forceTouchGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/ForceTouchGestureHandler';
import InputText from '../components/inputext';
import {horizontalScale, moderateScale, verticalScale} from '../utility/scaleDimension';
import {disableBackButton} from '../utility/backDisable';
import CustomIcon from '../components/icon';

const SlotBook = ({navigation, route}) => {
  const [complaint, setComplaint] = useState('');

  const [bookedSlots, setData] = useState([]);

  const [slotDetails, setSlotDetails] = useState({});
  const [selectedSlot, setSelectedSlot] = useState();

  const selections = CONSTANTS.selections;

  const [selectedTypeAppointment, setSelectedTypeAppointment] = useState(
    selections[0],
  );

  const [selectedMode, setSelectedMode] = useState('offline');

  const handleOptions = value => {
    setSelectedMode(value);
  };

  const handleSelectSlot = value => {
    setSelectedSlot(value);
  };

  const handleSelectType = value => {
    setSelectedTypeAppointment(value);
  };

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const formatDate = moment(date).format('YYYY-MM-DD');

  const handleConfirm = date => {
    setDate(date);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const Clinic_id = useSelector(state => state?.clinicid?.clinic_id);

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
      setData(jsonData.data?.map((item, index) => item?.appointment_slot));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchAppointment();
  }, [formatDate, Clinic_id]);

  const fetchslots = async () => {
    const response = await fetchApi(URL.SlotsAvailable(Clinic_id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const jsonData = await response.json();

      setSlotDetails(jsonData.data?.map(val => JSON.parse(val?.slot)));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchslots();
  }, []);

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
        if (!bookedSlot.includes(slot)) {
          if (formatDate === Today) {
            if (startTime >= PresentTime) {
              timeList.push({
                slot: slot,
                duration: item.duration,
              });
            }
          } else {
            timeList.push({
              slot: slot,
              duration: item.duration,
            });
          }
        }
      }
    });
    return timeList;
  };
  // console.log('---------slotsdetails', slotDetails[0]?.[Day]);
  let list = getTimeList(slotDetails[0]?.[Day]);
  const token = useSelector(state => state.authenticate.auth.access);

  const renderItems = ({item}) => {
    return (
      <View style={styles.item}>
        <SelectionTab
          label={item?.slot}
          onPress={() => handleSelectSlot(item)}
          selected={selectedSlot?.slot === item?.slot}
        />
      </View>
    );
  };

  const [loading, setLoading] = useState(false);
  const {patient_phone} = route.params;
  console.log(
    '-----------------params',
    patient_phone,
    Clinic_id,
    phone,
    speciality,
  );
  let today = moment().toISOString().split('T')[0] + 'T';

  const [apiStatus, setApiStatus] = useState({});

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
          appointment_type: selectedTypeAppointment,
          appointment_slot: selectedSlot?.slot,
          clinic_id: Clinic_id,
          complaint: complaint,
          //patient_phone_number: patientPhoneNumber.patient.phone_number,
          patient_phone_number: patient_phone,
          doctor_phone_number: phone,
          meta_data: {
            complaint: complaint,
            patient_reference: patient_phone,
            practitioner_reference: phone,
            start: today + selectedSlot?.slot.split('-')[0] + ':00Z',
            end: today + selectedSlot?.slot.split('-')[1] + ':00Z',
            speciality: speciality,
            type: selectedTypeAppointment,
          },
        }),
      });
      if (response.status === HttpStatusCode.Ok) {
        const jsonData = await response.json();
        // console.log(jsonData);
        if (jsonData.status === 'success') {
          setApiStatus({
            status: 'success',
            message: jsonData.mesaage,
          });
          SuccesRef?.current?.snapToIndex(1);
          setTimeout(() => {
            navigation.navigate('dashboard');
          }, 1000);
          setLoading(false);
          // SuccesRef?.current?.snapToIndex(0);
        } else {
          setApiStatus({
            status: 'warning',
            message: 'Please Enter Complaint and Slot Timings',
          });
          SuccesRef?.current?.snapToIndex(1);
          console.error('API call failed:', response.status);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error occurred:', error);
      setApiStatus({
        status: 'error',
        message: 'Something Went Wrong Please After Sometime',
      });
      SuccesRef?.current?.snapToIndex(1);
      console.error('API call failed:', response.status);
    }
  };
  const SuccesRef = useRef(null);
  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);

  useEffect(() => {
    disableBackButton();
  }, []);

  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.child}>
          <View
            style={styles.date}>
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
          </View>
          <InputText
            required={true}
            label={Language[language]['complaint']}
            placeholder="Enter your complaints"
            value={complaint}
            setValue={setComplaint}
            multiline={true}
          />
          <View style={styles.child}>
            <View style={styles.type}>
              <Option
                label="Offline"
                value="Offline"
                selected={selectedMode === 'offline'}
                onPress={() => handleOptions('offline')}
              />
              <Option
                label="TelePhonic"
                value="TelePhonic"
                selected={selectedMode === 'TelePhonic'}
                onPress={() => handleOptions('TelePhonic')}
              />
            </View>
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
              <Text style={styles.h2}>Available Slots</Text>
              <FlatList data={list} renderItem={renderItems} numColumns={4} />
            </View>
            <View style={styles.btn}>
              <HButton
                label="Book Slot"
                //onPress={() => navigation.navigate('dashboard')}
                onPress={() => {
                  Appointment_Booking();
                }}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomSheetView
        bottomSheetRef={SuccesRef}
        snapPoints={'50%'}
        backgroundStyle={'#fff'}>
        <StatusMessage status={apiStatus.status} message={apiStatus.message} />
      </BottomSheetView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    gap: moderateScale(16),
    flex: moderateScale(1),
    //backgroundColor:CUSTOMCOLOR.primary,
    // paddingHorizontal:24,
    // paddingVertical:24
  },
  date:{
    gap: moderateScale(8),
   paddingHorizontal: horizontalScale(8),
    // paddingVertical: verticalScale(8),
    // height: moderateScale(70),
  },
  type: {
    flexDirection: 'row',
    width: '100%',
    // justifyContent: 'space-around',
    gap: moderateScale(56),
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
    padding: moderateScale(16),
    gap: moderateScale(16),
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: CUSTOMFONTFAMILY.heading,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
  },
  item: {
    margin: moderateScale(8),
    paddingHorizontal: horizontalScale(8),
  },
  btn: {
    height: moderateScale(400),
    alignItems: 'center',
  },
});

export default SlotBook;
