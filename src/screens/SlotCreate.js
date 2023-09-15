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
import {useSelector, useDispatch} from 'react-redux';
import {addslots, updateslots} from '../redux/features/slots/slotData';
import {CUSTOMCOLOR} from '../settings/styles';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    dispatch(addslots(slots));
    navigation.goBack();
  };
  // const handleClear = () => {
  //   setVisibleSlot(true);
  // };

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
  console.log('frommmmmmmm', FromformattedTime);
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
      const conflictingSlotExists = slots[selectedDay].some(
        slot =>
          (newSlot.fromTime >= slot.fromTime &&
            newSlot.fromTime < slot.toTime) ||
          (newSlot.toTime > slot.fromTime && newSlot.toTime <= slot.toTime),
      );

      if (!conflictingSlotExists) {
        setAllSlots(prev => [...prev, newSlot]);
        setSlots(prevSlots => ({
          ...prevSlots,
          [selectedDay]: [...prevSlots[selectedDay], newSlot],
        }));
        setConsultValue(consultType[0]);
        setDurationValue(durationMins[0]);
      } else {
        Alert.alert('Warning', 'A slot with conflicting time already exists.');
      }
    }
  };

  const handleAddSlotCopyMonday = () => {
    const weekdaysToUpdate = {
      M: slots.M?.map((slot, index) => ({...slot, index, day: 'Monday'})),
      T: slots.M?.map((slot, index) => ({
        ...slot,
        index: `T-${index}`,
        day: 'Tuesday',
      })),
      W: slots.M?.map((slot, index) => ({
        ...slot,
        index: `W-${index}`,
        day: 'Wednesday',
      })),
      TH: slots.M?.map((slot, index) => ({
        ...slot,
        index: `TH-${index}`,
        day: 'Thursday',
      })),
      F: slots.M?.map((slot, index) => ({
        ...slot,
        index: `F-${index}`,
        day: 'Friday',
      })),
      Sa: [],
      Su: [],
    };
    setSlots(weekdaysToUpdate);
    setConsultValue(consultType[0]);
    setDurationValue(durationMins[0]);
  };
  const slotData = useSelector(state => state?.slotsData?.slots);

  const handleDelete = (dayTodelete, index) => {
    setAllSlots(prevAllSlots =>
      prevAllSlots.filter(slot => slot.index !== index),
    );
    setSlots(prevSlots => {
      const updatedSlots = {};
      for (const day in prevSlots) {
        updatedSlots[day] = prevSlots[day].filter(slot => slot.index !== index);
      }
      Alert.alert('Warning', `Slots are deleted for ${weekdays[dayTodelete]}`);
      return updatedSlots;
    });
    if (slotData) {
      dispatch(updateslots(slotData));
    }
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

  // useEffect(() => {
  //   handlewarnings();
  // }, []);
  // const [iconstyle, setIconStyle] = useState('')
  // const HandleIcon = () => {
  //   const icons = FromformattedTime >= '06:00' && FromformattedTime < '18:00' ? (
  //     <Icon
  //       name="sun"
  //       size={moderateScale(20)}
  //       color={CUSTOMCOLOR.primary}
  //     />) : (<Icon
  //       name="close"
  //       size={moderateScale(20)}
  //       color={CUSTOMCOLOR.primary}
  //     />)
  //     setIconStyle(icons)
  // }
  // useEffect(()=>{
  //   HandleIcon()
  // },[FromformattedTime])

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View style={styles.main}>
          {/* <View style={{position:'absolute',alignSelf:'flex-end',padding:1moderateScale(6})}> */}
          <PlusButton
            icon="close"
            style={styles.Close}
            color="#000000aa"
            size={32}
            onPress={handleSaveSlotData}
          />
          {/* </View> */}

          <View style={styles.alignchild}>
            <Text style={commonstyles.h1}>Add Schedule</Text>
          </View>
          <View style={styles.dayselector}>
            <View
              style={[
                styles.data,
                {
                  backgroundColor:
                    slots.M?.length > 0 ? CUSTOMCOLOR.success : null,
                },
              ]}>
              <SelectionTab
                label="M"
                selected={selectedDay === 'M'}
                onPress={() => onDaySelectionChange('M')}
              />
            </View>
            <View
              style={[
                styles.data,
                {
                  backgroundColor:
                    slots.T?.length > 0 ? CUSTOMCOLOR.success : null,
                },
              ]}>
              <SelectionTab
                label="T"
                selected={selectedDay === 'T'}
                onPress={() => onDaySelectionChange('T')}
              />
            </View>
            <View
              style={[
                styles.data,
                {
                  backgroundColor:
                    slots.W?.length > 0 ? CUSTOMCOLOR.success : null,
                },
              ]}>
              <SelectionTab
                label="W"
                selected={selectedDay === 'W'}
                onPress={() => onDaySelectionChange('W')}
              />
            </View>
            <View
              style={[
                styles.data,
                {
                  backgroundColor:
                    slots.TH?.length > 0 ? CUSTOMCOLOR.success : null,
                },
              ]}>
              <SelectionTab
                label="TH"
                selected={selectedDay === 'TH'}
                onPress={() => onDaySelectionChange('TH')}
              />
            </View>
            <View
              style={[
                styles.data,
                {
                  backgroundColor:
                    slots.F?.length > 0 ? CUSTOMCOLOR.success : null,
                },
              ]}>
              <SelectionTab
                label="F"
                selected={selectedDay === 'F'}
                onPress={() => onDaySelectionChange('F')}
              />
            </View>
            <View
              style={[
                styles.data,
                {
                  backgroundColor:
                    slots.Sa?.length > 0 ? CUSTOMCOLOR.success : null,
                },
              ]}>
              <SelectionTab
                label="Sa"
                selected={selectedDay === 'Sa'}
                onPress={() => onDaySelectionChange('Sa')}
              />
            </View>
            <View
              style={[
                styles.data,
                {
                  backgroundColor:
                    slots.Su?.length > 0 ? CUSTOMCOLOR.success : null,
                },
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
          <View style={styles.ShowSchedule}>
            {Object.entries(slots).map(([day, daySlots]) =>
              daySlots?.map(slot => (
                <SlotChip
                  key={slot.index}
                  index={slot.index}
                  onPress={() => handleDelete(day, slot.index)}
                  time={slot.fromTime + '-' + slot.toTime}
                  type={<Text>Type: {slot.consultType}</Text>}
                  duration={
                    <Text>
                      Duration: {slot.duration} | {slot.day} |{' '}
                      {slot.fromTime >= '06:00' && slot.fromTime <= '18:00' ? (
                        <Icon
                          name="white-balance-sunny"
                          size={moderateScale(20)}
                          color={CUSTOMCOLOR.warn}
                        />
                      ) : (
                        <Icon
                          name="weather-night-partly-cloudy"
                          size={moderateScale(20)}
                          color={CUSTOMCOLOR.primary}
                        />
                      )}
                    </Text>
                  }
                />
              )),
            )}
          </View>
          <View>
            {slots?.M.length > 0 && (
              <TouchableOpacity onPress={() => handleAddSlotCopyMonday()}>
                <View
                  style={{
                    padding: moderateScale(16),
                    backgroundColor: CUSTOMCOLOR.white,
                  }}>
                  <Text style={{color: CUSTOMCOLOR.black}}>
                    Remaining Slots Sames As Monday
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          {selectedDay === 'M' ? (
            <View>
              {Object.entries(slotData).map(([day, daySlots]) =>
                daySlots?.map(slot => (
                  <SlotChip
                    key={slot.index}
                    index={slot.index}
                    onPress={() => handleDelete(day, slot.index)}
                    time={slot.fromTime + '-' + slot.toTime}
                    type={<Text>Type: {slot.consultType}</Text>}
                    duration={
                      <Text>
                        Duration: {slot.duration} | {slot.day}
                      </Text>
                    }
                    icon={iconstyle}
                  />
                )),
              )}
            </View>
          ) : null}
          <View>
            <TouchableOpacity onPress={handleSaveSlotData} style={styles.save}>
              <View style={styles.saveText}>
                <Text style={{color: CUSTOMCOLOR.white}}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>

          <BottomSheetView
            bottomSheetRef={slotTypeRef}
            snapPoints={'40%'}
            backgroundStyle={CUSTOMCOLOR.white}>
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
            backgroundStyle={CUSTOMCOLOR.white}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  save: {top: moderateScale(16), borderRadius: moderateScale(6)},
  saveText: {padding: moderateScale(16), backgroundColor: CUSTOMCOLOR.primary},
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: moderateScale(16),
    padding: moderateScale(24),
  },
  dayselector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(8),
  },
  ShowSchedule: {
    gap: moderateScale(8),
  },
  selector: {
    flexDirection: 'row',
    gap: moderateScale(64),
    width: '100%',
    justifyContent: 'center',
  },
  alignchild: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    gap: moderateScale(8),
    paddingHorizontal: horizontalScale(8),
  },
  bottomSheet: {
    flex: 1,
    alignItems: 'center',
    gap: moderateScale(32),
    paddingVertical: verticalScale(16),
  },
  values: {
    fontSize: CUSTOMFONTSIZE.h4,
    fontWeight: '400',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    color: CUSTOMCOLOR.black,
  },
  valuesContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    //flexDirection:'row',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
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
    paddingHorizontal: horizontalScale(16),
  },
  deletedText: {
    fontFamily: CUSTOMFONTFAMILY.h4,
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
  },
  select1: {
    width: horizontalScale(240),
  },
  Close: {
    zIndex: 4,
    backgroundColor: 'transparent',
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: moderateScale(16),
  },
  data: {
    paddingHorizontal: horizontalScale(4),
    paddingVertical: verticalScale(4),
  },
});

export default SlotCreate;
