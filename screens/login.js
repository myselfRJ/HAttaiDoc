import {View,Alert} from 'react-native';
import {commonstyles} from '../styles/commonstyle';
import {Language} from '../settings/customlanguage';
import { useState } from 'react';
import InputText from '../components/inputext';
import HButton from '../components/button';
import NoAccount from '../components/noaccount';
import store from '../redux/stores/store';
import {authenticateActions} from '../redux/features/authenticate/authenticateSlice';
import {useSelector, useDispatch} from 'react-redux';
import KeyboardAvoidContainer from '../components/keyboardhidecontainer';
import {language} from '../settings/userpreferences';
import {checkPassword, checkNumber} from '../utility/checks';
import { PostApi } from '../api/api';

const Login = ({navigation}) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
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
    const loginbtn = () => {
        data = {
          phone_number: phone,
          password: password,
        };
        setLoading(!loading);
        PostApi('signup/token/', data, false)
          .then(function (response) {
            console.log(response.data);
            if (response.status === 201) {
              showToast('Success', response.data.message);
              navigation.navigate('otp');
            } else {
              showToast('Warning', response.data.message);
              requestFailed();
            }
          })
          .catch(function (error) {
            showToast('Login failed : ', `${error.response.data.detail}`);
            requestFailed();
            console.log(error.response.data, 'l');
          });
      };
    const onPress = () => {
        console.log(phone,password)
        if (
          checkNumber(phone) &&
          checkPassword(password)
        ) {
          loginbtn();
        } else {
          showToast(
            'Warning',
            'Phone number must be valid.\n\nPassword must contain Uppercase, lowercase, number, contain special character and 6-20 length.',
          );
        }
      };
  return (
    <KeyboardAvoidContainer>
      <View style={commonstyles.main}>
        <View style={commonstyles.img}></View>
        <View style={commonstyles.content}>
          <InputText
          doubleCheck={[true, false]}
          check={checkNumber}
            label={Language[language]['phone_number']}
            placeholder={Language[language]['phone_number']}
            keypad="numeric"
            maxLength={10}
            setValue={setPhone}
            value={phone}
          />
          <InputText
          doubleCheck={[true, false]}
          check={checkPassword}
            label={Language[language]['password']}
            placeholder={Language[language]['password']}
            keypad="text"
            secure={true}
            setValue={setPassword}
            value={password}
          />
          <HButton
          loading={loading}
            label={Language[language]['login']}
            onPress={onPress}
          />
          <NoAccount
            action={'signup'}
            navigation={navigation}
            text={Language[language]['signup']}
            msg={Language[language]['no_account']}
          />
          <NoAccount
            action={'login'}
            navigation={navigation}
            text={Language[language]['forgot_placeholder']}
            msg={Language[language]['forgot_password']}
          />
        </View>
      </View>
    </KeyboardAvoidContainer>
  );
};

export default Login;
