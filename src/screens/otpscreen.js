import {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
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
// import {updateauthenticate} from '../redux/features/authenticate/authenticateSlice';

const OtpScreen = ({route}) => {
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const {phone, Trace_id} = route.params;
  console.log('route.params:', route.params);
  const nav = useNavigation();
  const fetchData = async () => {
    try {
      const response = await fetchApi(URL.validateOtp, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone: phone, otp: value, trace_id: Trace_id}),
      });
      console.log(Trace_id);
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        dispatch(authenticateActions.updateauthenticate(jsonData));
        nav.navigate('protected');
      } else {
        console.error('API call failed:', response.status);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.Top}>
            <Image
              style={{
                width: 230,
                height: 496,
              }}
              source={require('../assets/images/otp.jpeg')}
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
              <View style={{paddingHorizontal: 8}}>
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
            <View style={{top: 50, alignItems: 'center'}}>
              <HButton
                label={Language[language]['submit']}
                onPress={fetchData}
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
  },
  Top: {
    height: 503,
    backgroundColor: CUSTOMCOLOR.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    height: 680,
    backgroundColor: CUSTOMCOLOR.white,
    //alignItems:'center'
  },
  text: {
    //  width:593,
    //  height:120,
    //  top:50,
    //  left:10,
    paddingHorizontal: 64,
    paddingVertical: 64,
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
    marginLeft: 10,
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
});
export default OtpScreen;
