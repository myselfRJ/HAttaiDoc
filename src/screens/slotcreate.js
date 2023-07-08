import {Text, View, StyleSheet, Modal, TouchableOpacity} from 'react-native';
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
import {useState, useRef} from 'react';
import {CONSTANTS} from '../utility/constant';
import {BottomSheetView} from '../components';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
const SlotCreate = ({navigation}) => {
  const slotTypeRef = useRef(null);
  const slotDurationRef = useRef(null);
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const consultType = CONSTANTS.consultTypes;
  const durationMins = CONSTANTS.duration;

  const [selectedConsultValue, setConsultValue] = useState('');
  const [selectedDurationValue, setDurationValue] = useState('');
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
  onDaySelectionChange = value => {
    setSelectedDay(value);
  };
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
      <View style={styles.ShowSchedule}>
        {slots[selectedDay]?.map(slot => (
          <SlotChip
            key={slot.index}
            index={slot.index}
            onPress={handleDelete}
            time={slot.fromTime + '-' + slot.toTime}
            type={<Text>Type: {slot.consultType}</Text>}
            duration={<Text>Duration: {slot.duration}</Text>}
          />
        ))}
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
          input={selectedDurationValue}
        />
      </View>
      <HButton label="Add Slot" icon="plus" onPress={handleAddSlot} />

      <PlusButton
        icon="close"
        style={{position: 'absolute', left: 0, bottom: 0}}
        onPress={() => navigation.goBack()}
      />
      <BottomSheetView bottomSheetRef={slotTypeRef} snapPoints={'40%'}>
        <ScrollView>
          <View style={styles.bottomSheet}>
            {consultType.map((consTypes, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleTypeSelect(consTypes)}>
                <View>
                  <Text>{consTypes}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </BottomSheetView>
      <BottomSheetView bottomSheetRef={slotDurationRef} snapPoints={'40%'}>
        <ScrollView>
          <View style={styles.bottomSheet}>
            {durationMins.map((mins, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleDurationSelect(mins)}>
                <View>
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
