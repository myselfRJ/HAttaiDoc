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
import {useState, useEffect} from 'react';
import moment, {min} from 'moment';
import DatePicker from 'react-native-date-picker';
import {CONSTANTS} from '../utility/constant';
import {URL} from '../utility/urls';
import {Icon} from '../components';

const SlotBook = ({navigation}) => {
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

  const SlotsAvailable = async () => {
    const response = await fetch(URL.SlotsAvailable);
    const jsonData = await response.json();
    setSlotDetails(jsonData);
  };

  useEffect(() => {
    {
      SlotsAvailable();
    }
  }, []);
  useEffect(() => {}, [selectedSlot]);

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

  let list = getTimeList(slotDetails?.slot?.M);

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

  const Appointment_Booking = async () => {
    try {
      const response = await fetch(URL.Appointment_Booking, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: formattedDate + 'T' + selectedSlot?.slot.split('-')[0],
          minutes_duration: selectedSlot?.duration,
          appointment_type: selectedTypeAppointment,
          mode_of_consultation: selectedMode,
        }),
      });
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        navigation.navigate('bookslot');
      } else {
        console.error('API call failed:', response.status);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  console.log('====================================');
  console.log(selectedSlot?.duration);
  console.log('====================================');

  return (
    <View style={styles.main}>
      <View style={styles.MainHeadContainer}>
        <Text style={styles.MainText}>Slot Booking</Text>
        <Icon
          name="bell"
          size={24}
          color={CUSTOMCOLOR.white}
          style={{top: 43, right: 37}}
        />
      </View>
      <View style={styles.child}>
        <View style={{width: '100%', height: 60, bottom: 8}}>
          <SelectorBtn
            label="Date"
            name="calendar"
            onPress={() => setOpen('to')}
            input={formattedDate}
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
            <FlatList data={list} renderItem={renderItems} numColumns={3} />
          </View>
          <View style={styles.btn}>
            <HButton
              label="Book Slot"
              onPress={() => navigation.navigate('dashboard')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    gap: 32,
  },
  type: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  MainHeadContainer: {
    height: '10%',
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
    paddingHorizontal:24,
    paddingVertical:24,
    gap: 32,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
  },
  item: {margin: 8},
  btn: {
    alignItems: 'center',
  },
});

export default SlotBook;
