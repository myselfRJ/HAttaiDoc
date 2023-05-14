import {View, Alert, ScrollView} from 'react-native';
import {useState, useEffect} from 'react';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {commonstyles} from '../styles/commonstyle';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import InputText from '../components/inputext';
import HButton from '../components/button';
import NoAccount from '../components/noaccount';
import {checkPassword, checkNumber, samePassword} from '../utility/checks';
import {PostApi} from '../api/api';
const Signup = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
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
  const otpbtn = () => {
    data = {
      phone: phone,
      password: password,
      password2: password2,
    };
    setLoading(!loading);
    console.log(data);
    PostApi('signup/doctor', data, false)
      .then(function (response) {
        console.log(response.data);
        if (response.status === 201) {
          showToast('Success', response.data.message);
          navigation.navigate('otp');
        } else {
          showToast('Warning', response.data.message);
          requestFailed();
          navigation.navigate('otp');//remove
        }
      })
      .catch(function (error) {
        showToast('Error', 'Signup failed.');
        requestFailed();
        console.log(error, 'l');
        navigation.navigate('otp');//r5emove
      });
  };

  const onPress = () => {
    if (
      checkNumber(phone) &&
      checkPassword(password) &&
      samePassword(password, password2)
    ) {
      otpbtn();
    } else {
      showToast(
        'Warning',
        'Phone number must be valid.\n\nPassword must contain Uppercase, lowercase, number and 8-20 length. \n\nPasswords should be same.',
      );
    }
  };
  return (
    <KeyboardAvoidContainer>
      <ScrollView>
        <View style={commonstyles.main}>
          <View style={commonstyles.img}></View>
          <View style={commonstyles.content}>
            <InputText
              doubleCheck={[true, false]}
              check={checkNumber}
              setValue={setPhone}
              label={Language[language]['phone_number']}
              placeholder={Language[language]['phone_number']}
              maxLength={10}
              keypad="numeric"
              value={phone}
            />
            <InputText
              doubleCheck={[true, false]}
              check={checkPassword}
              setValue={setPassword}
              label={Language[language]['password']}
              placeholder={Language[language]['password']}
              keypad="text"
              secure={true}
              value={password}
            />
            <InputText
              doubleCheck={[true, true]}
              check2={[samePassword, password]}
              check={checkPassword}
              password={password}
              setValue={setPassword2}
              label={Language[language]['password_2']}
              placeholder={Language[language]['password_2']}
              keypad="text"
              secure={true}
              value={password2}
            />
            <HButton loading={loading} label="signup" onPress={onPress} />
            <NoAccount
              action={'login'}
              navigation={navigation}
              text={Language[language]['login']}
              msg={Language[language]['yes_account']}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidContainer>
  );
};

export default Signup;
