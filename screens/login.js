import {View} from 'react-native';
import {commonstyles} from '../styles/commonstyle';
import { Language } from '../settings/customlanguage';

import InputText from '../components/inputext';
import HButton from '../components/button';
import NoAccount from '../components/noaccount';
import store from '../redux/stores/store';
import { authenticateActions } from '../redux/features/authenticate/authenticateSlice';
import { useSelector, useDispatch } from 'react-redux';
import KeyboardAvoidContainer from '../components/keyboardhidecontainer';
import { language } from '../settings/userpreferences';


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
            <InputText label='phone_number'  placeholder={Language[language]["phone_number"]} keypad="numeric" maxLength={10} />
            <InputText label='password'  placeholder={Language[language]["password"]} secure={true}  />
            <HButton label='login' onPress={()=>navigation.navigate('protected',{screen:'profilecreate'})}/>
            <NoAccount action={"signup"} navigation={navigation} text={Language[language]["signup"]} msg={Language[language]["no_account"]}/>
            </View>
        </View>
        </KeyboardAvoidContainer>
    )
}



export default Login