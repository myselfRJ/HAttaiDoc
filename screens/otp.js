import {View,Text,StyleSheet} from 'react-native';
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {commonstyles} from '../styles/commonstyle';
import {Language} from "../settings/customlanguage";
import InputText from '../components/inputext';
import HButton from '../components/button';
const Otp=({navigation})=>{

    return (
        <View style={commonstyles.main}>
            <View style={commonstyles.img}>

            </View>
            <View style={commonstyles.content}>
            <InputText label='otp' placeholder='4 digit OTP'/>
            <HButton label='submit'/>
            </View>
            
        </View>
    )
}



export default Otp