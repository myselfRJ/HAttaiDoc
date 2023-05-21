import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import store from '../redux/stores/store';
import {authenticateActions} from '../redux/features/authenticate/authenticateSlice';
import ChartCard from '../components/chart';
import {
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
  CUSTOMCOLOR,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import HeaderAvatar from '../components/headeravatar';
import SelectorBtn from '../components/selector';
import AppointmentCard from '../components/appointmentcard';
import {SvgXml} from 'react-native-svg';
import {hattailogo, viewmore} from '../assets/svgs/svg';
import {CurrentRenderContext} from '@react-navigation/native';
const Dashboard = ({navigation}) => {
  console.log(store.getState());
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 24,
          paddingHorizontal: 8,
        }}>
        <View>
          <SvgXml xml={hattailogo} />
          <Text style={styles.title}>Welcome,Dr.RamaMurthi</Text>
        </View>
        <HeaderAvatar />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 8,
          paddingHorizontal: 8,
          paddingBottom: 8,
        }}>
        <ChartCard data={data} title={Language[language]['total_patient']} />
        <ChartCard
          data={data}
          title={Language[language]['earnings']}
          label="₹ "
        />
      </View>
      <View style={styles.select}>
        <SelectorBtn name="chevron-down" />
        <SelectorBtn name="calendar" />
        {/* <SearchBox label='Patient name/phone number' action={()=>console.log('clicked')}/> */}
      </View>
      <View style={styles.appointment}>
        <Text style={styles.h2}>{Language[language]['appointments']}</Text>

        <AppointmentCard />
        <AppointmentCard />
        <AppointmentCard />
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingHorizontal: 8,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('myappointment')}
          style={{
            borderWidth: 0.5,
            borderRadius: 4,
            borderColor: CUSTOMCOLOR.primary,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <Text style={{color: CUSTOMCOLOR.primary}}>
            {Language[language]['view_more']}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },

  title: {
    color: CUSTOMCOLOR.black,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
  },
  select: {
    gap: 8,
    paddingHorizontal: 8,
  },
  appointment: {
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
  },
});
export default Dashboard;
