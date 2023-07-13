import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {useState} from 'react';
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
import HButton from '../components/button';
import { Icon, InputText } from '../components';

const SearchAddnew=({navigation})=>{
    const [phone,setPhone]=useState('')
    const ChangePhoneValue=(e)=>{
      setPhone(e);
    }
        return(
        <View style={styles.main}>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
            <InputText 
            placeholder='phone number'
            value={phone}
            setValue={ChangePhoneValue}
            textStyle={styles.input}
            keypad="numeric"
            />
            <Icon name='search' size={20} style={styles.searchIcon}/>
            </View>
            <View style={styles.appointment}>
        <Text style={styles.h2}>Search Results</Text>

        <PatientSearchCard onPress={() => navigation.navigate('visit')} />
        <PatientSearchCard onPress={() => navigation.navigate('visit')} />
        <PatientSearchCard onPress={() => navigation.navigate('visit')} />
      </View>
      <View style={styles.btn}>
        <HButton
          label="Add New"
          icon="plus"
          onPress={() => navigation.navigate('aadharverify')}
        />
      </View>

        </View>

    );
};
const styles=StyleSheet.create({
    main:{
       flex:1,
       padding: 24,
    gap: 16,
    },
    input:{
        width:"100%",
        height:51,
        top:30,
        left:20,
        padding:16,

    },
    searchIcon:{
        height:51,
        top:40,
        right:10,
        padding:16,
    },
    appointment: {
        gap: 8,
    paddingHorizontal: 8,
    paddingVertical:8
      },
      h2: {
        fontSize: 24,
        fontWeight: '700',
        fontFamily: CUSTOMFONTFAMILY.opensans,
        lineHeight: 20 * 2,
        color: CUSTOMCOLOR.primary,
        top:16,
        paddingVertical:16
      },
    btn: {
      gap: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
})
export default SearchAddnew;