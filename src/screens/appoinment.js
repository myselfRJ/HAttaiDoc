import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import PlusButton from '../components/plusbtn';
import SelectionTab from '../components/selectiontab';
import SelectorBtn from '../components/selector';
import {AppointmentCard} from '../components';
import {URL} from '../utility/urls';

const Appointment = ({navigation}) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await fetch(URL.get_all_appointments_of_clinic);
    const jsonData = await response.json();
    jsonData && setData(jsonData);
  };
  useEffect(() => {
    {
      fetchData();
    }
  }, []);
  return (
    <View style={styles.main}>
      <View style={styles.select}>
        <SelectorBtn name="chevron-down" />
        <SelectorBtn name="calendar" />
        {/* <SearchBox label='Patient name/phone number' action={()=>console.log('clicked')}/> */}
      </View>
      <View style={styles.tab}>
        <SelectionTab label="All" selected={true} />
        <SelectionTab label="New" />
        <SelectionTab label="Follow Up" />
        <SelectionTab label="Review Report" />
        <SelectionTab label="Routine" />
      </View>
      <View style={styles.appointment}>
        <Text style={styles.h2}>Appointments</Text>

        {data.length > 0
          ? data?.map((value, index) => {
              return (
                <AppointmentCard
                  key={index}
                  appointment={value}
                  openVisit={() => navigation.navigate('visit')}
                />
              );
            })
          : null}
      </View>

      <PlusButton
        icon="plus"
        style={{position: 'absolute', zIndex: 10, right: 24, bottom: 24}}
        onPress={() => navigation.navigate('addnew')}
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
    paddingHorizontal: 8,
  },
  tab: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 8,
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
export default Appointment;
