import {View,Text,StyleSheet} from 'react-native';
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
import {commonstyles} from '../styles/commonstyle'
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
import InputText from '../components/inputext';
import HButton from '../components/button';
const Signup=({navigation})=>{

    return (
        <View style={commonstyles.main}>
            <View style={commonstyles.img}>

            </View>
            <View style={commonstyles.content}>
            <InputText label='phone_number' placeholder='Phone Number'/>
            <HButton label='signup' onPress={()=>navigation.navigate('otp')}/>
            </View>
            
        </View>
    )
}

const styles=StyleSheet.create({
    main:{
       
        // justifyContent:'center',
        alignItems:'center',
        gap:16
    },
    img:{
        width:'100%',
        height:'50%',
        backgroundColor:CUSTOMCOLOR.primary
    },
    content:{
        padding:32,
        width:'100%',
        alignItems:'center',
        gap:16,
    }

})

export default Signup