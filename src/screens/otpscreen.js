import {useState, useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {checkNumber, checkOtp, checkPassword} from '../utility/checks';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {HButton} from '../components';
import {InputText} from '../components';
import {URL} from '../utility/urls';
import {useNavigation} from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchApi} from '../api/fetchApi';
import {useDispatch, useSelector} from 'react-redux';
import {authenticateActions} from '../redux/features/authenticate/authenticateSlice';
import {addLogin_phone} from '../redux/features/phoneNumber/LoginPhoneNumber';
// import {updateauthenticate} from '../redux/features/authenticate/authenticateSlice';

const OtpScreen = ({route}) => {
  const [timer, setTimer] = useState(30); // Set the initial timer value (in seconds)
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [loading, setLoading] = useState(false);

  const {phone, trace_id} = useSelector(state => state?.phone?.data);
  console.log(phone);
  //console.log("..........",data)
  // const {phone, Trace_id} = route.params;
  // console.log('route.params:', route.params);
  const nav = useNavigation();

  const startTimer = () => {
    setIsTimerRunning(true);
    timerRef.current = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 1) {
          clearInterval(timerRef.current);
          setIsTimerRunning(false);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };
  const resetTimer = () => {
    setTimer(30);
    setIsTimerRunning(false);
    clearInterval(timerRef.current);
  };
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const handleResendOTP = async () => {
    resetTimer();
    startTimer();
    resendOtp();
  };

  const resendOtp = async () => {
    setLoading(!loading);
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
        console.log('generateResponse', jsonData);
        dispatch(addLogin_phone.addLogin_phone(jsonData.data));
        setLoading(!loading);
      } else {
        console.error('API call failed:', response?.status);
        setLoading(loading);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setLoading(loading);
    }
  };
  const fetchData = async () => {
    setLoading(!loading);
    try {
      const response = await fetchApi(URL.validateOtp, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone: phone, otp: value, trace_id: trace_id}),
      });
      console.log(trace_id);
      if (response.ok) {
        const jsonData = await response.json();
        console.log('...... update navigation===>', jsonData);
        dispatch(authenticateActions.updateauthenticate(jsonData));
        nav.navigate('protected');
        setValue('');
        setLoading(!loading);
      } else {
        console.error('API call failed:', response.status);
        setLoading(loading);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setLoading(loading);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.Top}>
            <Image
              style={{
                width: 234,
                height: 288,
              }}
              source={require('../assets/images/otp.png')}
            />
          </View>
          <View style={styles.bottom}>
            <Text style={styles.text}>OTP Verification</Text>
            <View style={{alignItems: 'center'}}>
              {/* <InputText
              doubleCheck={[true, false]}
              check={checkOtp}
              placeholder=' _ _ _ _ _ _'
              keypad="numeric"
              maxLength={6}
              value={otp}
              setValue={changeText}
            /></View>
        <View style={{margin:70,alignItems:'center'}}>
          <HButton label={Language[language]['submit']} onPress={fetchData}/>
          </View>
            /> */}
              <View>
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
                <View style={{alignSelf: 'flex-end', paddingVertical: 8}}>
                  <TouchableOpacity
                    onPress={handleResendOTP}
                    disabled={isTimerRunning}>
                    <Text
                      style={[
                        styles.resendButtonText,
                        isTimerRunning && styles.disabledButtonText,
                      ]}>
                      {isTimerRunning ? `Resend OTP : ${timer}s` : 'Resend OTP'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <HButton
                label={Language[language]['submit']}
                onPress={() => {
                  fetchData();
                  setIsTimerRunning(false);
                  clearInterval(timerRef.current);
                }}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 48,
  },
  Top: {
    height: 503,
    backgroundColor: CUSTOMCOLOR.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    gap: 24,
  },
  text: {
    //  width:593,
    //  height:120,
    //  top:50,
    //  left:10,
    paddingHorizontal: 24,
    gap: 8,
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: 32,
    fontWeight: 600,
    color: CUSTOMCOLOR.black,
  },
  cellRoot: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginLeft: 8,
  },
  cellText: {
    color: '#000',
    fontSize: 24,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
  resendButtonText: {
    color: CUSTOMCOLOR.primary, // Default color for the resend OTP button text
    fontSize: 16,
  },
  disabledButtonText: {
    color: 'gray', // Color when the timer is out (timer reaches 0)
  },
});
export default OtpScreen;
