import {Text, View, StyleSheet} from 'react-native';
import {commonstyles} from '../styles/commonstyle';
import PlusButton from '../components/plusbtn';
import {CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import HButton from '../components/button';
import SelectionTab from '../components/selectiontab';
import SelectorBtn from '../components/selector';
import SlotChip from '../components/slotchip';
const SlotCreate = ({navigation}) => {
  return (
    <View style={styles.main}>
      <View style={styles.alignchild}>
        <Text style={commonstyles.h1}>Add Schedule</Text>
      </View>
      <View style={styles.dayselector}>
        <SelectionTab label="M" selected={true} />
        <SelectionTab label="T" selected={false} />
        <SelectionTab label="W" selected={false} />
        <SelectionTab label="TH" selected={false} />
        <SelectionTab label="F" selected={false} />
        <SelectionTab label="Sa" selected={false} />
        <SelectionTab label="Su" selected={false} />
      </View>
      <View style={styles.selector}>
        <SlotChip time="9.00am-10:00am" type="Consultaion" duration="15min" />
      </View>

      <View style={styles.selector}>
        <SelectorBtn label="To" name="clock" />
        <SelectorBtn label="From" name="clock" />
      </View>
      <View style={styles.selector}>
        <SelectorBtn label="Type" name="alpha-t-box" />
        <SelectorBtn label="Duration" name="timer-sand-full" />
      </View>
      <HButton label="Add Slot" icon="plus" />

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
  selector: {
    flexDirection: 'row',
    gap: 64,
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
