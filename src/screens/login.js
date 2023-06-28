import {useState} from 'react';
import {Alert, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {PostApi} from '../api/api';
import {
  HButton,
  InputText,
  KeyboardAvoidContainer,
  NoAccount,
} from '../components';
import {authenticateActions} from '../redux/features/authenticate/authenticateSlice';
import store from '../redux/stores/store';
import {Language} from '../settings/customlanguage';
import {language} from '../settings/userpreferences';
import {commonstyles} from '../styles/commonstyle';
import {checkNumber, checkPassword} from '../utility/checks';

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
    console.log(phone, password);
    if (checkNumber(phone) && checkPassword(password)) {
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
