import {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {InputText} from '../components';
import {checkNumber, checkPassword} from '../utility/checks';
import {HButton} from '../components';
import {PostApi} from '../api/api';
import {URL} from '../utility/urls';
import {ScrollView} from 'react-native-gesture-handler';
import {fetchApi} from '../api/fetchApi';
import {useDispatch, useSelector} from 'react-redux';
import {addLogin_phone} from '../redux/features/phoneNumber/LoginPhoneNumber';
import OtpEncryption from '../utility/encryption';

const Entry = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [Trace_id, setTrace_id] = useState();
  const dispatch = useDispatch();
  const logindata = useSelector(state => state?.phone);
  console.log('===logindata===', logindata);
  // const fetchtrace = async () => {
  //   const response = await fetchApi(URL.validateOtp);
  //   const jsonData = await response.json();
  //   jsonData && setTrace_id(.trace_id);
  // };
  // useEffect(() => {
  //   {
  //     fetchtrace();
  //   }
  // }, []);
  console.log('====================================');
  console.log(OtpEncryption(), '---------------------------------------');
  console.log('====================================');
  const fetchData = async () => {
    try {
      const response = await fetchApi(URL.generateOtp, {
        method: 'POST',
        headers: {
          'trace-id': '12345',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone: phone, country: 'india', code: '+91'}),
      });
      if (response?.ok) {
        const jsonData = await response.json();
        console.log('generateResponse', jsonData.data);
        dispatch(addLogin_phone.addLogin_phone({...jsonData.data, phone}));
        // console.log("login DATA",logindata)
        //setTrace_id(jsonData.data.trace_id);
        // {
        navigation.navigate('otpscreen');
        // }
      } else {
        console.error('API call failed:', response?.status);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  // useEffect(() => {
  // if (Trace_id) {
  //   navigation.navigate('otpscreen', {phone, Trace_id});
  // }
  //   fetchData()
  // }, [fetchData]);

  // const handlePhone = () => {
  //   dispatch(addLogin_phone.addLogin_phone(phone));
  // };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.Top}>
          <Image
            style={{width: 352, height: 496}}
            source={require('../assets/images/entry.jpeg')}
          />
        </View>
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
            <View style={{margin: 30, alignItems: 'center'}}>
              <HButton
                label={Language[language]['getotp']}
                onPress={() => {
                  phone ? fetchData() : null;
                }}
              />
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
    alignItems: 'center',
    justifyContent: 'center',
    height: 503,
    backgroundColor: CUSTOMCOLOR.primary,
  },
  bottom: {
    height: 680,
  },
  input: {
    paddingHorizontal: 64,
    paddingVertical: 64,
    //margin:100
  },
});

export default Entry;
