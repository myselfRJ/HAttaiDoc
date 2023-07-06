import {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { checkNumber, checkPassword } from '../utility/checks';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import { HButton } from '../components';
import {InputText} from '../components';
import { URL } from '../utility/urls';
import { useNavigation } from '@react-navigation/native';


const OtpScreen=({route})=>{
    const [otp,setOtp]=useState('');
    const changeText=(e)=>{
        setOtp(e);
    }
    const {phone,token} = route.params;
    const nav=useNavigation()
    const fetchData = async () => {
        try {
          const response = await fetch(URL.validateOtp,{
              method:'POST',
              headers:{
                'trace-id': '12345',
                'Content-Type':'application/json',
              },
              body: JSON.stringify({ phone: phone,otp:otp,token_id:token }), 
          });
          if (response.ok) {
            const jsonData = await response.json();
            console.log(jsonData);
          nav.navigate("protected")
            
          } else {
            console.error('API call failed:', response.status);
          }
        } catch (error) {
          console.error('Error occurred:', error);
        }
      };
    return(
     <View style={styles.container}>
        <View style={styles.Top}></View>
        <View style={styles.bottom}>
         <Text style={styles.text}>OTP Verification</Text>
         <View style={{alignItems:'center'}}>
          <InputText
              doubleCheck={[true, false]}
              check={checkNumber}
              placeholder=' _ _ _ _ _ _'
              keypad="numeric"
              maxLength={6}
              value={otp}
              setValue={changeText}
            /></View>
        <View style={{margin:70,alignItems:'center'}}><HButton label={Language[language]['submit']} onPress={fetchData}/></View>
        </View>

     </View>
    );
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        
    },
    Top:{
        height:503,
        backgroundColor:CUSTOMCOLOR.primary
    },
    bottom:{
        height:680,
        backgroundColor:CUSTOMCOLOR.white,
        alignItems:'center'
        
    },
    text:{
       width:593,
       height:120,
       top:100,
       left:10,
       fontFamily:CUSTOMFONTFAMILY.heading,
       fontSize:32,
       fontWeight:400,
        
    },
   
})
export default OtpScreen;