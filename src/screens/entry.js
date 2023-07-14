import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import { InputText } from '../components';
import { checkNumber, checkPassword } from '../utility/checks';
import { HButton } from '../components';
import { PostApi } from '../api/api';
import { URL } from '../utility/urls';
import {ScrollView} from 'react-native-gesture-handler';

const Entry = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const token="d0f7aa46-58ce-45f7-892a-af80296fe24d"
    const fetchData = async () => {
      try {
        const response = await fetch(URL.generateOtp,{
            method:'POST',
            headers:{
              'trace-id': '12345',
              'Content-Type':'application/json',
            },
            body: JSON.stringify({ phone: phone,country:"india",code:"+91" }), 
        });
        if (response.ok) {
          const jsonData = await response.json();
          console.log(jsonData);
          navigation.navigate('otpscreen', { phone,token});
        } else {
          console.error('API call failed:', response.status);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };
  
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.Top}></View>
        <View style={styles.bottom}>
          <View style={styles.input}>
            <InputText
              doubleCheck={[true, false]}
              check={checkNumber}
              label={Language[language]['phone_number']}
              placeholder={Language[language]['phone_number']}
              keypad="numeric"
              maxLength={10}
              value={phone}
              setValue={setPhone}
            />
            <View style={{ margin: 30, alignItems: 'center' }}>
              <HButton label={Language[language]['getotp']} onPress={()=> phone? fetchData():null} />
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    Top: {
      height: 503,
      backgroundColor: CUSTOMCOLOR.primary,
    },
    bottom: {
      height: 680,
    },
    input:{
      margin:100
    }
    
  });
  
  export default Entry;
  