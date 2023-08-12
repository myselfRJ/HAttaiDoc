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
import {CUSTOMFONTFAMILY, CUSTOMFONTSIZE} from '../settings/styles';
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
  // console.log('allslots===', allSlots);
  const slotDurationRef = useRef(null);
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const consultType = CONSTANTS.consultTypes;
  const durationMins = CONSTANTS.duration;
  const [visibleSlot, setVisibleSlot] = useState(false);

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

  const days = ['M', 'T', 'W', 'TH', 'F', 'Sa', 'Su'];
  const [selectedDay, setSelectedDay] = useState('M');

  const DaySelection = index => {
    const isSelected = selectedDay.includes(index);
    if (isSelected) {
      setSelectedDay(selectedDay.filter(i => i !== index));
    } else {
      setSelectedDay([...selectedDay, index]);
    }
  };
  const dispatch = useDispatch();

  const handleSaveSlotData = () => {
    dispatch(addSlots.addslots(slots));
    navigation.goBack();
  };
  const handleClear = () => {
    setVisibleSlot(true);
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

  // const handleAddSlot = () => {
  //   if (selectedConsultValue && selectedDurationValue) {
  //     const newSlot = {
  //       index: Date.now().toLocaleString(),
  //       fromTime: FromformattedTime,
  //       toTime: ToformattedTime,
  //       consultType: selectedConsultValue,
  //       duration: selectedDurationValue,
  //     };

  //     setAllSlots(prev => [...prev, newSlot]);

  //     if (selectedDay === 'M') {
  //       const weekdaysToUpdate = ['T', 'W', 'TH', 'F', 'M'];
  //       weekdaysToUpdate.forEach(weekday => {
  //         setSlots(prevSlots => ({
  //           ...prevSlots,
  //           [weekday]: [...prevSlots[selectedDay], newSlot],
  //         }));
  //       });
  //     } else {
  //       setSlots(prevSlots => ({
  //         ...prevSlots,
  //         [selectedDay]: [...prevSlots[selectedDay], newSlot],
  //       }));
  //     }

  //     setFromTime(new Date());
  //     setToTime(new Date());
  //     setConsultValue('');
  //     setDurationValue('');
  //   }
  // };

  // const handleAddSlotAdd = () => {
  //   if (selectedConsultValue && selectedDurationValue) {
  //     const newSlot = {
  //       index: Date.now().toLocaleString(),
  //       fromTime: FromformattedTime,
  //       toTime: ToformattedTime,
  //       consultType: selectedConsultValue,
  //       duration: selectedDurationValue,
  //     };
  //     setAllSlots(prev => [...prev, newSlot]);
  //     setSlots(prevSlots => ({
  //       ...prevSlots,
  //       [selectedDay]: [...prevSlots[selectedDay], newSlot],
  //     }));

  //     setFromTime(new Date());
  //     setToTime(new Date());
  //     setConsultValue('');
  //     setDurationValue('');
  //   }
  // };

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
  const [check, setCheck] = useState(false);
  const handleAddSlotCopyMonday = () => {
    if (slots.M.length > 0) {
      console.log(slots, '------------------------update');
      const newSlot = {
        index: Date.now().toLocaleString(),
        fromTime: FromformattedTime,
        toTime: ToformattedTime,
        consultType: selectedConsultValue,
        duration: selectedDurationValue,
      };

      setAllSlots(prev => [...prev, newSlot]);

      const weekdaysToUpdate = {
        M: slots.M,
        T: slots.M,
        W: slots.M,
        TH: slots.M,
        F: slots.M,
      };
      console.log(slots, '------------------------update');
      setSlots(weekdaysToUpdate);
    }
  };
  // const handleDelete = index => {
  //   setAllSlots(prevAllSlots =>
  //     prevAllSlots.filter(slot => slot.index !== index),
  //   );
  // // const handleDelete = index=>{
  // //   setSlots(prevSlots =>(
  // //     prevSlots.filter(slot => slot.index !== index)
  // //   ))
  // // }
  const handleDelete = index => {
    setAllSlots(prevAllSlots =>
      prevAllSlots.filter(slot => slot.index !== index),
    );
    setSlots(prevSlots => {
      const updatedSlots = {};
      for (const day in prevSlots) {
        updatedSlots[day] = prevSlots[day].filter(slot => slot.index !== index);
      }
      Alert.alert('Warning', '"slots are deleted"');
      // <View style={styles.slotdelete}>
      //           <Text style={styles.deletedText}>Slots deleted</Text>
      //           <PlusButton icon="close" size={12} onPress={handleClear} />
      //         </View>
      return updatedSlots;
    });
  };
  // const handleDelete = index => {
  //   setSlots(prevSlots => {
  //     const updatedSlots = {};
  //     for (const day in prevSlots) {
  //       updatedSlots[day] = prevSlots[day].filter(slot => slot.index !== index);
  //     }
  //     return updatedSlots;
  //   });
  // };
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

  // console.log(slots);

  return (
    <View style={styles.main}>
      {/* <View style={{position:'absolute',alignSelf:'flex-end',padding:16}}> */}
      <PlusButton
        icon="close"
        style={{
          zIndex: 4,
          backgroundColor: 'transparent',
          position: 'absolute',
          alignSelf: 'flex-end',
          padding: 16,
        }}
        color="#000000aa"
        size={32}
        onPress={handleSaveSlotData}
      />
      {/* </View> */}

      <View style={styles.alignchild}>
        <Text style={commonstyles.h1}>Add Schedule</Text>
      </View>
      {/* <View style={{flexDirection: 'row', gap: 48}}>
        {days.map((val, ind) => (
          <TouchableOpacity
            onPress={() => DaySelection(val)}
            key={ind}
            style={{
              padding: 16,
              backgroundColor: selectedDay.includes(val)
                ? CUSTOMCOLOR.primary
                : CUSTOMCOLOR.white,
            }}>
            <Text>{val}</Text>
          </TouchableOpacity>
        ))}
      </View> */}
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
          minuteInterval={15}
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
            Alert.alert('Warning', '"From time" and "To time" are same');
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
              key={slot.index}
              index={slot.index}
              onPress={() => handleDelete(slot.index)}
              time={slot.fromTime + '-' + slot.toTime}
              type={<Text>Type: {slot.consultType}</Text>}
              duration={<Text>Duration: {slot.duration}</Text>}
            />
          )),
        )}
      </View>
      <View>
        {slots?.M.length > 0 && (
          <TouchableOpacity onPress={() => handleAddSlotCopyMonday()}>
            <View style={{padding: 16, backgroundColor: CUSTOMCOLOR.primary}}>
              <Text style={{color: CUSTOMCOLOR.black}}>
                Remaining Slots Sames As Monday
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      {/* <PlusButton
        icon="close"
        style={{position: 'absolute', left: 0, bottom: 0}}
        onPress={handleSaveSlotData}
      /> */}

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
                <View style={styles.valuesContainer}>
                  <Text style={styles.values}>{consTypes}</Text>
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
                <View style={styles.valuesContainer}>
                  <Text style={styles.values}>{mins} minutes</Text>
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
  bottomSheet: {flex: 1, alignItems: 'center', gap: 32, paddingVertical: 16},
  values: {
    fontSize: 14,
    fontWeight: 400,
    fontFamily: CUSTOMFONTFAMILY.opensans,
    color: CUSTOMCOLOR.black,
  },
  valuesContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    //flexDirection:'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#C6E3FF',
  },
  slotdelete: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //borderWidth:1,
    borderRadius: 5,
    borderColor: CUSTOMCOLOR.primary,
    backgroundColor: CUSTOMCOLOR.white,
    paddingHorizontal: 16,
  },
  deletedText: {
    fontFamily: CUSTOMFONTFAMILY.h4,
    fontSize: 14,
    color: CUSTOMCOLOR.black,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default SlotCreate;
