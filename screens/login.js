import {View,Text,StyleSheet,TouchableWithoutFeedback,Keyboard, KeyboardAvoidingView} from 'react-native';
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
import {commonstyles} from '../styles/commonstyle';
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
import InputText from '../components/inputext';
import HButton from '../components/button';
import NoAccount from '../components/noaccount';
const Login=({navigation})=>{
import store from '../redux/stores/store';
import { authenticateActions } from '../redux/features/authenticate/authenticateSlice';
import { useSelector, useDispatch } from 'react-redux';
import KeyboardAvoidContainer from '../components/keyboardhidecontainer';



const Login=({navigation})=>{
console.log(store.getState(),"initial state")
const count = useSelector((state) => state.authenticate)
console.log(count,"count")
const unsubscribe=store.subscribe(()=>console.log(store.getState(),"store refresh",count))
if (count.auth.access===null){
    store.dispatch(authenticateActions.tokenupdate(
      {  access : "null",
        refresh : "null",
        lastLogin : "111"
    }))
}
   
return (
    <KeyboardAvoidContainer>
        <View style={commonstyles.main}>
            <View style={commonstyles.img}>
            </View>
            <View style={commonstyles.content}>
            <InputText label='phone_number'  placeholder='Phone Number'/>
            <InputText label='password'  placeholder='Password' secure={true} />
            <HButton label='login' onPress={()=>navigation.navigate('otp')}/>
            <NoAccount text='Signup' msg="Don't have an account?"/>
            </View>
        </View>
        </KeyboardAvoidContainer>
    )
}



export default Login