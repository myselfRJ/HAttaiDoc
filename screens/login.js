import {View,Text,StyleSheet} from 'react-native';
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
import {commonstyles} from '../styles/commonstyle';
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
import InputText from '../components/inputext';
import HButton from '../components/button';
import NoAccount from '../components/noaccount';
const Login=({navigation})=>{

    return (
        <View style={commonstyles.main}>
            <View style={commonstyles.img}>
            </View>
            <View style={commonstyles.content}>
            <InputText label='phone_number'  placeholder='Phone Number'/>
            <HButton label='login' onPress={()=>navigation.navigate('protected')}/>

            <NoAccount text='Signup' msg="Don't have an account?"/>
            </View>
            
        </View>
    )
}



export default Login