import {Text,View,StyleSheet, ScrollView} from 'react-native';
import { CUSTOMCOLOR, CUSTOMFONTFAMILY, CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
import SelectorBtn from '../components/selector';
import SearchBox from '../components/searchBox';
import SelectionTab from '../components/selectiontab';
import AppointmentCard from '../components/appointmentcard';
import PlusButton from '../components/plusbtn';
import PatientSearchCard from '../components/patientsearchcard';
import HButton from '../components/button';
const Patientlookup=({navigation})=>{

    return (
        <View style={styles.main}>
     
       <View style={styles.select}>
        <SelectorBtn name='chevron-down'/>
        <SelectorBtn name='calendar'/>
        {/* <SearchBox label='Patient name/phone number' action={()=>console.log('clicked')}/> */}
       </View>
      
       <View style={styles.appointment}>
        <Text style={styles.h2}>
            Search Results
        </Text>
     
        <PatientSearchCard onPress={()=>navigation.navigate('visit')}/>
        <PatientSearchCard onPress={()=>navigation.navigate('visit')}/>
        <PatientSearchCard onPress={()=>navigation.navigate('visit')}/>
      
       
       
       </View>
       <View style={styles.btn}>
        <HButton label='Add New' icon='plus' onPress={()=>navigation.navigate('patientcreate')} />
       </View>

       {/* <PlusButton icon='plus'style={{position:'absolute',right:24,bottom:24}}/> */}

       </View>
    )
}

const styles=StyleSheet.create({
    main:{
        flex:1,
        padding:24,
        gap:16
    },
    select:{
        gap:8,
    },
    btn:{
        gap:8,
        justifyContent:'center',
        alignItems:'center'
    },
    tab:{
        flexDirection:'row',
        gap:24
    },
    appointment:{
        gap:8
    },
    h2:{
        fontSize:24,
        fontWeight:'700',
        fontFamily:CUSTOMFONTFAMILY.opensans,
        lineHeight:20*2,
        color:CUSTOMCOLOR.black
    }

})
export default Patientlookup