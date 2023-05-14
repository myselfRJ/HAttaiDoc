import {View, Text, TouchableOpacity,Alert} from 'react-native';
import {useState} from 'react';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {commonstyles} from '../styles/commonstyle';
import {Language} from '../settings/customlanguage';
import InputText from '../components/inputext';
import HButton from '../components/button';
import { checkOtp,checkNumber } from '../utility/checks';
import { PostApi } from '../api/api';
const Otp = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(5);
  const [loading, setLoading] = useState(false);
  const requestFailed = () => {
    setLoading(false);
  };
  const showToast = (title, message) => {
    setLoading(false);
    Alert.alert(title, message, [
      {
        text: 'OK',
        style: 'cancel',
      },
    ]);
  };
  {
    counter > 0
      ? setTimeout(() => {
          setCounter(counter - 1);
          console.log(counter);
        }, 1000)
      : console.log('over');
  }
  const submitbtn = async (phone, otp) => {
    setLoading(!loading);
    console.log(phone, otp, 'phone otp');
    {
      phone && otp
        ? PostApi('signup/otp',
              {
                phone: phone,
                otp: otp,
              },false
            )
            .then(function (response) {
              console.log(response.data);
              if (response.data['status'] === 'success') {
                showToast("Success","OTP verification successful.");
                navigation.navigate('protected',{screen:'profilecreate'})
              } else {
                showToast("Warning",response.data.message);
                navigation.navigate('protected',{screen:'authloading'})
              }
            })
            .catch(function (error) {
              showToast("Error","OTP verification failed.");
             
              requestFailed();
            })
        : requestFailed();
    }
    //
  };
  const onPress = () => {
    console.log(otp,"otp",checkOtp(otp),checkNumber(1212121212))
    if (
      checkNumber("7121212878") &&
      checkOtp(otp)
    ) {
      submitbtn(7878,otp);
    } else {
      showToast(
        'Warning',
        'Please enter valid 4 digit OTP',
      );
    }
  };
  return (
    <View style={commonstyles.main}>
      <View style={commonstyles.img}></View>
      <View style={commonstyles.content}>
        <InputText
          label={Language[language]['otp']}
          placeholder={Language[language]['otp_placeholder']}
          doubleCheck={[true, false]}
          check={checkOtp}
          setValue={setOtp}
          keypad="numeric"
          maxLength={4}
          textAlign="center"
          textStyle={{fontSize:20,lineHeight:26}}
        />

        <View style={{flexDirection: 'row'}}>
          {counter == 0 ? (
            <TouchableOpacity
              onPress={() => {
                setCounter(5);
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: CUSTOMFONTSIZE.h4,
                  lineHeight: 24,
                  fontWeight: 400,
                  textAlign: 'center',
                }}>
                {Language[language]['resend_otp']}{'    '}
              </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <Text
            style={{
              fontSize: CUSTOMFONTSIZE.h4,
              lineHeight: 24,
              color: '#4BA5FA',
              fontWeight: 700,
            }}>
            {counter} sec
          </Text>
        </View>
        <HButton loading={loading} label={Language[language]['submit']} onPress={onPress} />
      </View>
    </View>
  );
};

export default Otp;
