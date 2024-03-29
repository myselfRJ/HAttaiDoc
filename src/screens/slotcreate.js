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
import {useState} from 'react';
import {CONSTANTS} from '../utility/constant';
import SlotModal from '../components/SlotModal';

const SlotCreate = ({navigation}) => {
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
  const ToformattedTime = toTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const FromformattedTime = fromTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalDurationVisible, setModalDurationVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeDurationModal = () => {
    setModalDurationVisible(false);
  };
  const openModal = () => {
    setModalVisible(true);
  };
  const openDurationModal = () => {
    setModalDurationVisible(true);
  };

  const handleTypeSelect = value => {
    setConsultValue(value);
    closeModal();
  };

  const handleDurationSelect = value => {
    setDurationValue(value);
    closeDurationModal();
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
            time={FromformattedTime + '-' + ToformattedTime}
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
      <View>
        <SlotModal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
          data={consultType}
          onValueSelect={handleTypeSelect}
        />
        <SlotModal
          visible={modalDurationVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeDurationModal}
          data={durationMins}
          onValueSelect={handleDurationSelect}
        />
      </View>
      <View style={styles.selector}>
        <SelectorBtn
          label="Type"
          name="alpha-t-box"
          onPress={openModal}
          input={selectedConsultValue}
        />
        <SelectorBtn
          label="Duration"
          name="timer-sand-full"
          onPress={openDurationModal}
          input={selectedDurationValue}
        />
      </View>
      <HButton label="Add Slot" icon="plus" onPress={handleAddSlot} />

      <PlusButton
        icon="close"
        style={{position: 'absolute', left: 0, bottom: 0}}
        onPress={() => navigation.goBack()}
      />
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
});

export default SlotCreate;
