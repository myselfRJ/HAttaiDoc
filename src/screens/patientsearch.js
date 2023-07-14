import {Text, View, StyleSheet} from 'react-native';
import { useState } from 'react';
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
import {ScrollView} from 'react-native-gesture-handler';
import { Icon, InputText } from '../components';
const PatientSearch = ({navigation}) => {
  const [name,setName]=useState('')
    const ChangeNameValue=(e)=>{
      setName(e);
    }
  return (
    <View style={styles.main}>
      <ScrollView>
      <View style={styles.select}>
        <SelectorBtn name="chevron-down" />
        <SelectorBtn name="calendar" />
        {/* <SearchBox label='Patient name/phone number' action={()=>console.log('clicked')}/> */}
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',bottom:16}}>
            <InputText 
            placeholder='Search name'
            value={name}
            setValue={ChangeNameValue}
            textStyle={styles.input}
            keypad="numeric"
            />
            <Icon name='search' size={20} style={styles.searchIcon}/>
            </View>

      <View style={styles.appointment}>
        <Text style={styles.h2}>My Patients</Text>

        <PatientSearchCard onPress={() => navigation.navigate('visit')} />
        <PatientSearchCard onPress={() => navigation.navigate('visit')} />
        <PatientSearchCard onPress={() => navigation.navigate('visit')} />
        <PatientSearchCard onPress={() => navigation.navigate('visit')} />
        <PatientSearchCard onPress={() => navigation.navigate('visit')} />
        <PatientSearchCard onPress={() => navigation.navigate('visit')} />
        <PatientSearchCard onPress={() => navigation.navigate('visit')} />
      </View>
      </ScrollView>

      {/* <PlusButton icon='plus'style={{position:'absolute',right:24,bottom:24}}/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 24,
    gap: 4,
 
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
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
  },
  input:{
    width:556,
    height:51,
    padding:16,
    gap:4

},
searchIcon:{
  top:10,
    height:51,
    right:10,
    padding:16,
},
});

export default PatientSearch;
