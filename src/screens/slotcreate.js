import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {commonstyles} from '../styles/commonstyle';
import PlusButton from '../components/plusbtn';
import {CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import HButton from '../components/button';
import SelectionTab from '../components/selectiontab';
import SelectorBtn from '../components/selector';
import SlotChip from '../components/slotchip';
import DatePicker from 'react-native-date-picker';
import {useState, useRef, useEffect} from 'react';
import {CONSTANTS} from '../utility/constant';
import {BottomSheetView} from '../components';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import {UseSelector, useDispatch} from 'react-redux';
import {addSlots} from '../redux/features/slots/slotData';
import {CUSTOMCOLOR} from '../settings/styles';

const SlotCreate = ({navigation, route}) => {
  const slotTypeRef = useRef(null);
  const [allSlots, setAllSlots] = useState([]);
  console.log('allslots===', allSlots);
  const slotDurationRef = useRef(null);
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const consultType = CONSTANTS.consultTypes;
  const durationMins = CONSTANTS.duration;

  const [selectedConsultValue, setConsultValue] = useState(consultType[0]);
  const [selectedDurationValue, setDurationValue] = useState(durationMins[1]);
  const [slots, setSlots] = useState({
    M: [],
    T: [],
    W: [],
    TH: [],
    F: [],
    Sa: [],
    Su: [],
  });
  const [selectedDay, setSelectedDay] = useState('M');
  const dispatch = useDispatch();

  const handleSaveSlotData = () => {
    dispatch(addSlots.addslots(slots));
    navigation.goBack();
  };

  const handleConfirm = time => {
    if (open === 'from') {
      setFromTime(time);
    } else {
      setToTime(time);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const ToformattedTime = moment(toTime).utcOffset(330).format('HH:mm');
  const FromformattedTime = moment(fromTime).utcOffset(330).format('HH:mm');
  const handleTypeSelect = value => {
    setConsultValue(value);
    slotTypeRef?.current?.snapToIndex(0);
  };

  const handleDurationSelect = value => {
    setDurationValue(value);
    slotDurationRef?.current?.snapToIndex(0);
  };

  const handleAddSlot = () => {
    if (selectedConsultValue && selectedDurationValue) {
      const newSlot = {
        index: Date.now().toLocaleString(),
        fromTime: FromformattedTime,
        toTime: ToformattedTime,
        consultType: selectedConsultValue,
        duration: selectedDurationValue,
      };
      setAllSlots(prev => [...prev, newSlot]);
      setSlots(prevSlots => ({
        ...prevSlots,
        [selectedDay]: [...prevSlots[selectedDay], newSlot],
      }));

      setFromTime(new Date());
      setToTime(new Date());
      setConsultValue('');
      setDurationValue('');
    }
  };

  const handleDelete = index => {
    setSlots(prevSlots => ({
      ...prevSlots,
      [selectedDay]: prevSlots[selectedDay].filter(
        slot => slot.index !== index,
      ),
    }));
  };
  const onDaySelectionChange = value => {
    setSelectedDay(value);
  };

  const handlewarnings = () => {
    const TimeCheck = fromTime !== toTime;
    // const timeList =
    //   ToformattedTime.split(':')[0] > FromformattedTime.split(':')[0];
    const difference =
      parseInt(ToformattedTime.split(':')[0]) * 60 +
      parseInt(ToformattedTime.split(':')[1]) -
      (parseInt(FromformattedTime.split(':')[0]) * 60 +
        parseInt(FromformattedTime.split(':')[1]));
    const differenceCheck = difference >= selectedDurationValue;
    if (!TimeCheck && !difference) {
      Alert.alert(
        'please check once again fromTime and toTime should not be equal the minimum difference between timings is selectedDuration',
      );
    }
    return TimeCheck && differenceCheck;
  };

  useEffect(() => {
    handlewarnings();
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.alignchild}>
        <Text style={commonstyles.h1}>Add Schedule</Text>
      </View>
      <View style={styles.dayselector}>
        <SelectionTab
          label="M"
          selected={selectedDay === 'M'}
          onPress={() => onDaySelectionChange('M')}
        />
        <SelectionTab
          label="T"
          selected={selectedDay === 'T'}
          onPress={() => onDaySelectionChange('T')}
        />
        <SelectionTab
          label="W"
          selected={selectedDay === 'W'}
          onPress={() => onDaySelectionChange('W')}
        />
        <SelectionTab
          label="TH"
          selected={selectedDay === 'TH'}
          onPress={() => onDaySelectionChange('TH')}
        />
        <SelectionTab
          label="F"
          selected={selectedDay === 'F'}
          onPress={() => onDaySelectionChange('F')}
        />
        <SelectionTab
          label="Sa"
          selected={selectedDay === 'Sa'}
          onPress={() => onDaySelectionChange('Sa')}
        />
        <SelectionTab
          label="Su"
          selected={selectedDay === 'Su'}
          onPress={() => onDaySelectionChange('Su')}
        />
      </View>

      <View style={styles.selector}>
        <SelectorBtn
          label="From"
          name="clock"
          onPress={() => setOpen('from')}
          input={FromformattedTime}
        />
        <SelectorBtn
          label="To"
          name="clock"
          onPress={() => setOpen('to')}
          input={ToformattedTime}
        />
        <DatePicker
          modal
          open={open !== false}
          date={open === 'from' ? fromTime : toTime}
          theme="auto"
          mode="time"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </View>

      <View style={styles.selector}>
        <SelectorBtn
          label="Type"
          name="alpha-t-box"
          onPress={() => {
            slotTypeRef?.current?.snapToIndex(1);
          }}
          input={selectedConsultValue}
        />
        <SelectorBtn
          label="Duration"
          name="timer-sand-full"
          onPress={() => {
            slotDurationRef?.current?.snapToIndex(1);
          }}
          input={<Text>{selectedDurationValue} Mins</Text>}
        />
      </View>
      <HButton
        label="Add Slot"
        icon="plus"
        onPress={() => {
          const isOk = handlewarnings();
          if (isOk) {
            handleAddSlot();
          } else {
            Alert.alert(
              `please check once again fromTime and toTime should not be equal the minimum difference between timings is ${selectedDurationValue} mins`,
            );
          }
        }}
      />

      {/* <HButton label="Add Slot" icon="plus" onPress={handleAddSlot} /> */}
      {/* <View style={styles.ShowSchedule}>
        {slots[selectedDay] && slots[selectedDay]?.map(slot => (
          <SlotChip
            key={slot.index}
            index={slot.index}
            onPress={handleDelete}
            time={slot.fromTime + '-' + slot.toTime}
            type={<Text>Type: {slot.consultType}</Text>}
            duration={<Text>Duration: {slot.duration}</Text>}
          />
        ))}
      </View> */}
      <View style={styles.ShowSchedule}>
        {Object.entries(slots).map(([day, daySlots]) =>
          daySlots.map(slot => (
            <SlotChip
              style={{
                borderColor: CUSTOMCOLOR.primary,
                backgroundColor: CUSTOMCOLOR.white,
                borderWidth: 1,
              }}
              key={slot.index}
              index={slot.index}
              onPress={handleDelete}
              time={slot.fromTime + '-' + slot.toTime}
              type={<Text>Type: {slot.consultType}</Text>}
              duration={<Text>Duration: {slot.duration}</Text>}
            />
          )),
        )}
      </View>
      <PlusButton
        icon="close"
        style={{position: 'absolute', left: 0, bottom: 0}}
        onPress={handleSaveSlotData}
      />
      <BottomSheetView
        bottomSheetRef={slotTypeRef}
        snapPoints={'40%'}
        backgroundStyle={'#fff'}>
        <ScrollView>
          <View style={styles.bottomSheet}>
            {consultType.map((consTypes, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleTypeSelect(consTypes)}>
                <View
                  style={{
                    width: 80,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>{consTypes}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </BottomSheetView>
      <BottomSheetView
        bottomSheetRef={slotDurationRef}
        snapPoints={'40%'}
        backgroundStyle={'#fff'}>
        <ScrollView>
          <View style={styles.bottomSheet}>
            {durationMins.map((mins, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleDurationSelect(mins)}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>{mins}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </BottomSheetView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    padding: 24,
    borderWidth: 1,
  },
  dayselector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  ShowSchedule: {
    gap: 8,
  },
  selector: {
    flexDirection: 'row',
    gap: 64,
    width: '100%',
  },
  alignchild: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    gap: 8,
    paddingHorizontal: 8,
  },
  bottomSheet: {flex: 1, alignItems: 'center', gap: 16},
});

export default SlotCreate;
