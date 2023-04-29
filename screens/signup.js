import {View,Text,StyleSheet} from 'react-native';
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
import {commonstyles} from '../styles/commonstyle'
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
import InputText from '../components/inputext';
import HButton from '../components/button';
import NoAccount from '../components/noaccount';
const Signup=({navigation})=>{

    return (
        <View style={commonstyles.main}>
            <View style={commonstyles.img}>

            </View>
            <View style={commonstyles.content}>
            <InputText label='phone_number' placeholder={Language[language]["password"]}/>
            <HButton label='signup' onPress={()=>navigation.navigate('otp')}/>
            <NoAccount action={"login"} navigation={navigation} text={Language[language]["login"]} msg={Language[language]["yes_account"]}/>
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