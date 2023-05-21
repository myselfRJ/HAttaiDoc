import {Text,View,StyleSheet, ScrollView} from 'react-native';
import { CUSTOMCOLOR, CUSTOMFONTFAMILY, CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
import SelectorBtn from '../components/selector';
import SearchBox from '../components/searchBox';
import SelectionTab from '../components/selectiontab';
import AppointmentCard from '../components/appointmentcard';
import PlusButton from '../components/plusbtn';
const Appointment=({navigation})=>{

    return (
        <View style={styles.main}>
     
       <View style={styles.select}>
        <SelectorBtn name='chevron-down'/>
        <SelectorBtn name='calendar'/>
        {/* <SearchBox label='Patient name/phone number' action={()=>console.log('clicked')}/> */}
       </View>
       <View style={styles.tab}>
        <SelectionTab label='All' selected={true}/>
        <SelectionTab label='New'/>
        <SelectionTab label='Follow Up'/>
        <SelectionTab label='Review Report'/>
        <SelectionTab label='Routine'/>
       </View>
       <View style={styles.appointment}>
        <Text style={styles.h2}>
            Appointments
        </Text>
     
        <AppointmentCard/>
        <AppointmentCard/>
        <AppointmentCard/>
        <AppointmentCard/>
        <AppointmentCard/>
        <AppointmentCard/>
        <AppointmentCard/>
       
       
       </View>

       <PlusButton icon='plus'style={{position:'absolute',zIndex:10,right:24,bottom:24}} onPress={()=>navigation.navigate('patientlookup')}/>

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
        paddingHorizontal:8
    },
    tab:{
        flexDirection:'row',
        gap:16,
        paddingHorizontal:8
    },
    appointment:{
        gap:8,
        paddingHorizontal:8
    },
    h2:{
        fontSize:24,
        fontWeight:'700',
        fontFamily:CUSTOMFONTFAMILY.opensans,
        lineHeight:20*2,
        color:CUSTOMCOLOR.black
    }

})
export default Appointment