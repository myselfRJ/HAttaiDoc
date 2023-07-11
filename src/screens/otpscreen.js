import {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { checkNumber, checkOtp, checkPassword } from '../utility/checks';
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
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {SafeAreaView} from 'react-native-safe-area-context';



const OtpScreen=({route})=>{
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
    const [otp,setOtp]=useState('');
    const handleOptions = value => {
      setSelected(value);
    };
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
      <SafeAreaView>
     <View style={styles.container}>
        <View style={styles.Top}></View>
        <View style={styles.bottom}>
         <Text style={styles.text}>OTP Verification</Text>
         <View style={{alignItems:'center'}}>
          {/* <InputText
              doubleCheck={[true, false]}
              check={checkOtp}
              placeholder=' _ _ _ _ _ _'
              keypad="numeric"
              maxLength={6}
              value={otp}
              setValue={changeText}
            /> */}
            <View style={{paddingHorizontal: 8, gap: 24, top: 16}}>
            <CodeField
                  ref={ref}
                  {...props}
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFiledRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({index, symbol, isFocused}) => (
                    <View
                      onLayout={getCellOnLayoutHandler(index)}
                      key={index}
                      style={[styles.cellRoot, isFocused && styles.focusCell]}>
                      <Text style={styles.cellText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    </View>
                  )}
                />
                </View>
           
            </View>
        <View style={{top:50,alignItems:'center'}}><HButton label={Language[language]['submit']} onPress={fetchData}/></View>
        </View>

     </View>
     </SafeAreaView>
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
       top:50,
       left:10,
       fontFamily:CUSTOMFONTFAMILY.heading,
       fontSize:32,
       fontWeight:400,
        
    },
    cellRoot: {
      width: 70,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#000',
      borderBottomWidth: 1,
    },
    cellText: {
      color: '#000',
      fontSize: 24,
      textAlign: 'center',
    },
    focusCell: {
      borderBottomColor: '#007AFF',
      borderBottomWidth: 1,
    },
   
})
export default OtpScreen;