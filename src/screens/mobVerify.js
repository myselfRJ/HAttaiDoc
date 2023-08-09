import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import InputText from '../components/inputext';
import HButton from '../components/button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import {useSelector} from 'react-redux';

const MobileVerify = ({navigation}) => {
  const CELL_COUNT = 6;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [loading, setLoading] = useState(false);
  const [otploading, setOtpLoading] = useState(false);

  const AbhaAccessToken = useSelector(state => state.abha.auth.access);
  const AbhaTxnId = useSelector(state => state.abha.auth.txnid);
  const aadhar_no = useSelector(state => state?.abha?.auth?.aadharNo);

  console.log('====================================');
  console.log('aaaadhar no ', aadhar_no, '-----------------');
  console.log('====================================');

  const postPhone = async () => {
    setLoading(true);
    try {
      const response = await fetchApi(URL.AbhaGenerateMobileOtp, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AbhaAccessToken}`,
        },
        body: JSON.stringify({
          mobile: phoneNumber,
          txnId: AbhaTxnId,
        }),
      });
      if (response.ok) {
        const jsonData = await response.json();
        console.log('======,AAdharMOBILE', jsonData);
        setLoading(false);
      } else {
        console.error('API call failed:', response.status, response);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setLoading(false);
    }
  };

  const postOtp = async () => {
    setOtpLoading(true);
    try {
      const response = await fetchApi(URL.AbhaMobileVerifyOtp, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AbhaAccessToken}`,
        },
        body: JSON.stringify({
          otp: value,
          txnId: AbhaTxnId,
        }),
      });
      if (response.ok) {
        const jsonData = await response.json();
        console.log('======,AAdharOtp', jsonData);
        navigation.navigate('abhacreate');
        setPhoneNumber();
        setValue();
        setLoading(false);
      } else {
        console.error('API call failed:', response.status, response);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={{gap: 32}}>
        <View
          style={{
            paddingVertical: 24,
            paddingHorizontal: 24,
            backgroundColor: CUSTOMCOLOR.primary,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}>
          <Text style={{fontSize: CUSTOMFONTSIZE.h1, color: CUSTOMCOLOR.white}}>
            {' '}
            {Language[language]['addnew']}
          </Text>
          <Icon name="bell" size={24} color={'#fff'} style={styles.bellIcon} />
        </View>
        <View style={{paddingHorizontal: 48, gap: 32}}>
          <View style={{gap: 16}}>
            <Text
              style={{
                fontSize: CUSTOMFONTSIZE.h2,
                color: CUSTOMCOLOR.black,
                fontWeight: '600',
              }}>
              {Language[language]['phone_number']}
            </Text>
            <View style={{flexDirection: 'row', gap: 160}}>
              <Text>
                Enter the mobile number you want to link with ABHA-ID{' '}
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'center', gap: 16}}>
            <InputText
              label={Language[language]['phone_number']}
              placeholder={Language[language]['phone_number']}
              value={phoneNumber}
              setValue={setPhoneNumber}
              maxLength={12}
            />
            <HButton
              label={Language[language]['getotp']}
              onPress={() => postPhone()}
              loading={loading}
            />
          </View>
          <View style={{paddingHorizontal: '30%', gap: 24}}>
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

            <View style={{alignItems: 'center'}}>
              <HButton
                label={Language[language]['verify']}
                onPress={() => postOtp()}
                loading={otploading}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cellRoot: {
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
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
  bellIcon: {
    left: 662,
    bottom: 24,
  },
});

export default MobileVerify;
