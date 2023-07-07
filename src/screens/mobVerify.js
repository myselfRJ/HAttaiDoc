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

const MobileVerify = ({navigation}) => {
  const CELL_COUNT = 6;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  //   const getOtp = async () => {
  //     // const url='https://stoplight.io/mocks/destratum/hattai/297407/api/v1/generate_otp'
  //     try {
  //       const response = await fetch(URL.generateOtp, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           phone: phoneNumber,
  //           country: 'india',
  //           code: '+91',
  //         }),
  //       });
  //       if (response.ok) {
  //         const jsonData = await response.json();
  //         console.log(jsonData);
  //         navigation.navigate('bookslot', {phoneNumber});
  //       } else {
  //         console.error('API call failed:', response.status);
  //       }
  //     } catch (error) {
  //       console.error('Error occurred:', error);
  //     }
  //   };
  //   const VerifyOtp = async () => {
  //     // const url='https://stoplight.io/mocks/destratum/hattai/297407/api/v1/generate_otp'
  //     try {
  //       const response = await fetch(URL.generateOtp, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           phone: phoneNumber,
  //           country: 'india',
  //           code: '+91',
  //           otp:value
  //         }),
  //       });
  //       if (response.ok) {
  //         const jsonData = await response.json();
  //         console.log(jsonData);
  //         navigation.navigate('bookslot', {phoneNumber});
  //       } else {
  //         console.error('API call failed:', response.status);
  //       }
  //     } catch (error) {
  //       console.error('Error occurred:', error);
  //     }
  //   };

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
              onPress={() => console.log('Aadhar')}
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
                onPress={() => navigation.navigate('abhacreate')}
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
