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
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';

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
  const [roundedTime, setRoundedTime] = useState('');

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

  // const RoundTime=()=>{
  //   const currentDateTime = new Date();
  //   console.log('time',currentDateTime)
  //   const roundedDate = new Date(currentDateTime);

  //    const minutes = roundedDate.getMinutes();

  //    if (minutes >=0 && minutes <15){
  //     roundedDate.setMinutes(15);
  //   }else if(minutes >=15 && minutes <30){
  //     roundedDate.setMinutes(30)
  //   }
  //   else if(minutes >=30 && minutes<45){
  //     roundedDate.setMinutes(45)
  //   }
  //   else{
  //     roundedDate.setMinutes(0)
  //   }

  //   const formattedTime = roundedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  //   console.log('time', formattedTime)
  //   setFromTime(formattedTime);
  // }
  // useEffect(()=>{
  //   RoundTime()
  // },[])

  // const From=()=>{
  //   const roundedDate = new Date();
  //   const minutes = roundedDate.getMinutes();
  //   //const to = minutes +15
  //   // console.log('mins===',minutes)
  //   if (minutes >=0 && minutes <15){
  //         roundedDate.setMinutes(15);
  //       }else if(minutes >=15 && minutes <30){
  //         roundedDate.setMinutes(30)
  //       }
  //       else if(minutes >=30 && minutes<45){
  //         roundedDate.setMinutes(45)
  //       }
  //       else{
  //         roundedDate.setMinutes(0)
  //         const currentHour = roundedDate.getHours();
  //         roundedDate.setHours(currentHour + 1);
  //       }
  //      setFromTime(roundedDate);
  //      const to = roundedDate.getMinutes() +15
  //      setToTime(roundedDate.setMinutes(roundedDate.getMinutes()+15))
  //      console.log('from===',fromTime)
  //       console.log('too',(roundedDate.setMinutes(roundedDate.getMinutes()+15)))
  // }
  // useEffect(()=>{
  //   From()
  // },[fromTime,toTime])
  // const To=()=>{
  //   const totime = new Date(fromTime)
  //   const minutes = totime.getMinutes();
  //   console.log('to mins==',minutes);
  //   toTime.setMinutes(minutes + 15)
  //   setToTime(toTime)
  //   console.log('tooooo',totime)
  // }
  // useEffect(()=>{
  //   To()
  // },[])
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
  const [weekdays, setWeekdays] = useState({
    M: 'Monday',
    T: 'Tuesday',
    W: 'Wednesday',
    TH: 'Thursday',
    F: 'Friday',
    Sa: 'Saturday',
    Su: 'Sunday',
  });

  console.log('nowwww', Date.now());
  const handleAddSlot = () => {
    if (selectedConsultValue && selectedDurationValue) {
      const newSlot = {
        index: Date.now().toLocaleString(),
        fromTime: FromformattedTime,
        toTime: ToformattedTime,
        consultType: selectedConsultValue,
        duration: selectedDurationValue,
        day: weekdays[selectedDay],
      };

      setAllSlots(prev => [...prev, newSlot]);
      setSlots(prevSlots => ({
        ...prevSlots,
        [selectedDay]: [...prevSlots[selectedDay], newSlot],
      }));
      setFromTime(new Date());
      setToTime(new Date());
      setConsultValue(consultType[0]);
      setDurationValue(durationMins[0]);
    }
  };
  const [check, setCheck] = useState(false);
  const changeDay = (slot, day) => {
    let newslot = [...slot];
    newslot.forEach((item, index) => (item.day = day));
    return slot;
  };
  const handleAddSlotCopyMonday = () => {
    const weekdaysToUpdate = {
      M: slots.M,
      T: changeDay(slots.M, 'Tuesday'),
      W: slots.M,
      TH: slots.M,
      F: slots.M,
      Sa: slots.M,
      Su: slots.M,
    };
    console.log(slots, '------------------------update');
    setSlots(weekdaysToUpdate);
    setFromTime(new Date());
    setToTime(new Date());
    setConsultValue(consultType[0]);
    setDurationValue(durationMins[0]);
  };

  const handleDelete = index => {
    setAllSlots(prevAllSlots =>
      prevAllSlots.filter(slot => slot.index !== index),
    );
    setSlots(prevSlots => {
      const updatedSlots = {};
      for (const day in prevSlots) {
        updatedSlots[day] = prevSlots[day].filter(slot => slot.index !== index);
      }
      Alert.alert('Warning', '"Slots are deleted"');
      return updatedSlots;
    });
  };
  const onDaySelectionChange = value => {
    setSelectedDay(value);
  };

  const handlewarnings = () => {
    const TimeCheck = fromTime !== toTime;
    const difference =
      parseInt(ToformattedTime.split(':')[0]) * 60 +
      parseInt(ToformattedTime.split(':')[1]) -
      (parseInt(FromformattedTime.split(':')[0]) * 60 +
        parseInt(FromformattedTime.split(':')[1]));
    const differenceCheck = difference >= selectedDurationValue;
    return TimeCheck && differenceCheck;
  };

  useEffect(() => {
    handlewarnings();
  }, []);
  console.log(slots);
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
        <View
          style={[
            {
              paddingHorizontal: 8,
              paddingVertical: 8,
            },
            {backgroundColor: slots.M?.length > 0 ? '#2CBB15' : null},
          ]}>
          <SelectionTab
            label="M"
            selected={selectedDay === 'M'}
            onPress={() => onDaySelectionChange('M')}
          />
        </View>
        <View
          style={[
            {
              paddingHorizontal: 8,
              paddingVertical: 8,
            },
            {backgroundColor: slots.T?.length > 0 ? '#2CBB15' : null},
          ]}>
          <SelectionTab
            label="T"
            selected={selectedDay === 'T'}
            onPress={() => onDaySelectionChange('T')}
          />
        </View>
        <View
          style={[
            {
              paddingHorizontal: 8,
              paddingVertical: 8,
            },
            {backgroundColor: slots.W?.length > 0 ? '#2CBB15' : null},
          ]}>
          <SelectionTab
            label="W"
            selected={selectedDay === 'W'}
            onPress={() => onDaySelectionChange('W')}
          />
        </View>
        <View
          style={[
            {
              paddingHorizontal: 8,
              paddingVertical: 8,
            },
            {backgroundColor: slots.TH?.length > 0 ? '#2CBB15' : null},
          ]}>
          <SelectionTab
            label="TH"
            selected={selectedDay === 'TH'}
            onPress={() => onDaySelectionChange('TH')}
          />
        </View>
        <View
          style={[
            {
              paddingHorizontal: 8,
              paddingVertical: 8,
            },
            {backgroundColor: slots.F?.length > 0 ? '#2CBB15' : null},
          ]}>
          <SelectionTab
            label="F"
            selected={selectedDay === 'F'}
            onPress={() => onDaySelectionChange('F')}
          />
        </View>
        <View
          style={[
            {
              paddingHorizontal: 8,
              paddingVertical: 8,
            },
            {backgroundColor: slots.Sa?.length > 0 ? '#2CBB15' : null},
          ]}>
          <SelectionTab
            label="Sa"
            selected={selectedDay === 'Sa'}
            onPress={() => onDaySelectionChange('Sa')}
          />
        </View>
        <View
          style={[
            {
              paddingHorizontal: 8,
              paddingVertical: 8,
            },
            {backgroundColor: slots.Su?.length > 0 ? '#2CBB15' : null},
          ]}>
          <SelectionTab
            label="Su"
            selected={selectedDay === 'Su'}
            onPress={() => onDaySelectionChange('Su')}
          />
        </View>
      </View>

      <View style={styles.selector}>
        <SelectorBtn
          select={styles.select1}
          label="From"
          name="clock"
          onPress={() => setOpen('from')}
          input={FromformattedTime}
        />
        <SelectorBtn
          select={styles.select1}
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
          select={styles.select1}
          label="Type"
          name="alpha-t-box"
          onPress={() => {
            slotTypeRef?.current?.snapToIndex(1);
          }}
          input={selectedConsultValue}
        />
        <SelectorBtn
          select={styles.select1}
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
        btnstyles={{marginTop: verticalScale(24)}}
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
              duration={
                <Text>
                  Duration: {slot.duration} | {slot.day}
                </Text>
              }
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
    justifyContent: 'center',
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
  select1: {
    width: horizontalScale(240),
  },
});

export default SlotCreate;