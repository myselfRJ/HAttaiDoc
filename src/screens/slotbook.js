import { Text, View, StyleSheet, FlatList } from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import SelectorBtn from '../components/selector';
import Option from '../components/option';
import SelectionTab from '../components/selectiontab';
import SuggestionTab from '../components/suggestiontab';
import HButton from '../components/button';
import { useState, useEffect } from 'react';
import moment, { min } from 'moment';
import DatePicker from 'react-native-date-picker';
import { CONSTANTS } from '../utility/constant';
import { URL } from '../utility/urls';
import { Icon } from '../components';
import { fetchApi } from '../api/fetchApi';
import { HttpStatusCode } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { addPatient } from '../redux/features/patient/patientslice';
import { addPhone } from '../redux/features/authenticate/PhoneNumber';
import { forceTouchGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/ForceTouchGestureHandler';
import InputText from '../components/inputext';
const SlotBook = ({ navigation }) => {
  const [complaint, setComplaint] = useState('')
  const changeComplaint = (e) => {
    setComplaint(e)
  }
  const patientPhoneNumber = useSelector(state => state.patient);
  //console.log('phone----', patientPhoneNumber.patient.phone_number);
  const dispatch = useDispatch();
  const doctorphoneNumber = useSelector(state => state.phone);
  console.log('doctor phone=====', doctorphoneNumber);
  const [slotDetails, setSlotDetails] = useState({});
  const [selectedSlot, setSelectedSlot] = useState();
  console.log(
    'slots....',
    selectedSlot?.slot.split('-')[0] + 'T' + selectedSlot?.slot.split('-')[1],
  );
  const selections = CONSTANTS.selections;
  
  const [selectedTypeAppointment, setSelectedTypeAppointment] = useState(
    selections[0],
  );
  const [slotData, setSlotData] = useState();
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
  console.log(formatDate);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
  console.log('date....', formattedDate);
  const handleConfirm = date => {
    setDate(date);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // const SlotsAvailable = async () => {
  //   const response = await fetch(URL.SlotsAvailable);
  //   const jsonData = await response.json();
  //   setSlotDetails(jsonData);
  // };

  // useEffect(() => {
  //   {
  //     SlotsAvailable();
  //   }
  // }, []);

  const weekDys = {
    0: 'Su',
    1: 'M',
    2: 'T',
    3: 'W',
    4: 'TH',
    5: 'F',
    6: 'Sa',
  };
  const Day = weekDys?.[moment().day()];
  const fetchslots = async () => {
    const response = await fetchApi(URL.SlotsAvailable('8'), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // let list = getTimeList(slotDetails?.slot?.[weekDys?.[moment().day()]]);
    if (response.ok) {
      const jsonData = await response.json();
      console.log('======================', jsonData);
      setSlotDetails(jsonData.data?.map(val => JSON.parse(val?.slot)));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchslots();
  }, []);

  useEffect(() => { }, [selectedSlot]);
  console.log('====================================');
  console.log(slotDetails[0]);
  console.log('====================================');

  const getMinute = time => {
    value = time.split(':');
    hour = parseInt(value[0]);
    minute = parseInt(value[1]);
    totalMin = parseInt(hour * 60 + minute);
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
        timeList.push({
          slot: startTime + '-' + endTime,
          duration: item.duration,
        });
      }
    });
    return timeList;
  };
  const token = useSelector(state => state.authenticate.auth.access);

  let list = getTimeList(slotDetails[0]?.T);

  const renderItems = ({ item }) => {
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
  const Appointment_Booking = async () => {
    try {
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
          clinic_id: '41',
          complaint:complaint,
          //patient_phone_number: patientPhoneNumber.patient.phone_number,
          patient_phone_number:'9003092186',
          meta_data: {
            complaint: 'headache',
            patient_reference: 'ggvvf',
            practitioner_reference: 'hgihfohg',
            start: selectedSlot?.slot.split('-')[0],
            end: selectedSlot?.slot.split('-')[1],
            speciality: 'cardialogist',
            type: 'followup',
          },
        }),
      });
      if (response.status === HttpStatusCode.Ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        navigation.navigate('dashboard');
      } else {
        console.error('API call failed:', response.status);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  useEffect(() => {
    Appointment_Booking();
  }, []);

  // console.log('====================================');
  // console.log(selectedSlot?.duration);
  // console.log('====================================');

  return (
    
    <View style={styles.main}>
      <ScrollView>
      <View style={styles.MainHeadContainer}>
        <Text style={styles.MainText}>Slot Booking</Text>
        <Icon
          name="bell"
          size={24}
          color={CUSTOMCOLOR.white}
          style={{ top: 43, right: 37 }}
        />
      </View>
      <View style={styles.child}>
        <View style={{ gap: 8, paddingHorizontal: 12, paddingVertical: 8, height: 70 }}>
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
            label={Language[language]['complaint']}
            placeholder="enter your complaints"
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
            <FlatList data={list} renderItem={renderItems} numColumns={5} />
          </View>
          <View style={styles.btn}>
            <HButton
              label="Book Slot"
              //onPress={() => navigation.navigate('dashboard')}
              onPress={() => {
                //dispatch(addPatient());
                Appointment_Booking();
              }}
            />
          </View>
        </View>
      </View>
      </ScrollView>
    </View>
    
  );
};

const styles = StyleSheet.create({
  main: {
    gap: 32,
    flex:1,
    //backgroundColor:CUSTOMCOLOR.primary,
    // paddingHorizontal:24,
    // paddingVertical:24
  },
  type: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  MainHeadContainer: {
    height: '15%',
    backgroundColor: CUSTOMCOLOR.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  MainText: {
    color: CUSTOMCOLOR.white,
    top: 43,
    left: 37,
    gap: 33,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 21.79,
  },
  selection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  child: {
    padding: 16,
    gap: 16,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
  },
  item: { margin: 8 },
  btn: {
    height:100,
    alignItems: 'center',
  },
});

export default SlotBook;
