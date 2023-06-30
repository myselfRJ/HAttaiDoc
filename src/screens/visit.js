import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import SelectorBtn from '../components/selector';
import SearchBox from '../components/searchBox';
import SelectionTab from '../components/selectiontab';
import AppointmentCard from '../components/appointmentcard';
import PlusButton from '../components/plusbtn';
import PatientSearchCard from '../components/patientsearchcard';
import VisitOpen from '../components/visitopen';
import HeaderAvatar from '../components/headeravatar';
import CSinfo from '../components/CSinfo';
const Visit = ({navigation}) => {
  const dataobject = [
    {label: 'Symptoms', icon: 'chevron-right', navigate: 'symptoms'},
    {label: 'Prescribe', icon: 'chevron-right', navigate: 'prescribe'},
    {label: 'Follow-Up', icon: 'chevron-right', navigate: 'FollowUp'},
  ];
  return (
    <View style={styles.main}>
      <View style={styles.select}>
        <HeaderAvatar />
        {/* <SearchBox label='Patient name/phone number' action={()=>console.log('clicked')}/> */}
      </View>

      <View style={styles.appointment}>
        <Text style={styles.h2}>Consultation</Text>
        {dataobject.map((value, index) => {
          return (
            <>
              <VisitOpen
                label={value.label}
                icon={value.icon}
                navigate={() => navigation.navigate(value.navigate)}
              />
            </>
          );
        })}
      </View>

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
    padding: 24,
    gap: 16,
  },
  select: {
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    gap: 24,
  },
  appointment: {
    gap: 8,
    paddingHorizontal: 8,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
  },
});
export default Visit;
