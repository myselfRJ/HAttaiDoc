import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
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
import {ScrollView} from 'react-native-gesture-handler';
import { Icon, InputText } from '../components';

const Appointment = ({navigation}) => {
  const [name,setName]=useState('')
  const ChangeNameValue=(e)=>{
    setName(e);
  }
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
      <ScrollView>
      <View style={styles.select}>
        <SelectorBtn name="chevron-down" />
        <SelectorBtn name="calendar" />
        {/* <SearchBox label='Patient name/phone number' action={()=>console.log('clicked')}/> */}
        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',bottom:24,width:'103%'}}>
            <InputText 
            placeholder='Search name'
            value={name}
            setValue={ChangeNameValue}
            textStyle={styles.input}
            keypad="numeric"
            />
            <Icon name='search' size={20} style={styles.searchIcon}/>
            </View>
      <View style={styles.tab}>
        <SelectionTab label="All" selected={true} />
        <SelectionTab label="New" />
        <SelectionTab label="Follow Up" />
        <SelectionTab label="Review Report" />
        <SelectionTab label="Routine" />
      </View>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 24,
  },
  select: {
    gap: 8,
    paddingHorizontal: 8,
  },
  tab: {
    bottom:16,
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
  input:{
    gap:4,
    paddingVertical:16,
    left:4
    

},
searchIcon:{
  top:10,
    height:51,
    right:24,
    padding:16,
},
});
export default Appointment;
