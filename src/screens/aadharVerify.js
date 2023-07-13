import React, { useState } from 'react';
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
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import { commonstyles } from '../styles/commonstyle';
import Keyboardhidecontainer from '../components/keyboardhidecontainer';
import InputText from '../components/inputext';
import HButton from '../components/button';
import AddImage from '../components/addimage';
import Option from '../components/option';
import style from '../components/Searchbar/style';
import { CONSTANTS } from '../utility/constant';
import { SafeAreaView } from 'react-native-safe-area-context';

const AadharVerify = ({ navigation }) => {
  const CELL_COUNT = 6;
  const [selected, setSelected] = useState('No');
  const [aadhar_no, setAadhar_no] = useState('');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleOptions = value => {
    setSelected(value);
  };

  //   const getOtp = async () => {
  //     // const url='https://stoplight.io/mocks/destratum/hattai/297407/api/v1/generate_otp'
  //     try {
  //       const response = await fetch(URL.generateOtp, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           aadharNumber: aadhar_no,
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
  //           aadharNumber: aadhar_no,
  //           otp: value,
  //         }),
  //       });
  //       if (response.ok) {
  //         const jsonData = await response.json();
  //         console.log(jsonData);
  //         navigation.navigate('bookslot', {aadhar_no});
  //       } else {
  //         console.error('API call failed:', response.status);
  //       }
  //     } catch (error) {
  //       console.error('Error occurred:', error);
  //     }
  //   };

  return (
    <SafeAreaView>
      <View style={{ gap: 32 }}>
        <View
          style={{
            paddingVertical: 24,
            paddingHorizontal: 24,
            backgroundColor: CUSTOMCOLOR.primary,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}>
          <Text style={{ fontSize: CUSTOMFONTSIZE.h1, color: CUSTOMCOLOR.white }}>
            {' '}
            Add New
          </Text>
          <Icon name="bell" size={24} color={'#fff'} style={styles.bellIcon} />
        </View>
        <View style={{ paddingHorizontal: 48, gap: 32 }}>
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontSize: CUSTOMFONTSIZE.h2,
                color: CUSTOMCOLOR.black,
                fontWeight: '600',
              }}>
              {Language[language]['abha']}
            </Text>
            <View style={{ flexDirection: 'row', gap: 160 }}>
              <Option
                label="Yes"
                value="Yes"
                selected={selected === 'Yes'}
                onPress={() => handleOptions('Yes')}
              />
              <Option
                label="No"
                value="No"
                selected={selected === 'No'}
                onPress={() => handleOptions('No')}
              />
            </View>
          </View>
          {selected === 'No' ? (
            <View>
              <View style={{ alignItems: 'center', gap: 16 }}>
                <InputText
                  label={Language[language]['aadhar']}
                  placeholder={Language[language]['aadhar']}
                  value={aadhar_no}
                  setValue={setAadhar_no}
                  maxLength={12}
                />
                <HButton
                  label={Language[language]['getotp']}
                  onPress={() => console.log('Aadhar')}
                />
              </View>
              <View style={{ paddingHorizontal: '30%', gap: 24, top: 16 }}>
                <CodeField
                  ref={ref}
                  {...props}
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFiledRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
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

                <View style={{ alignItems: 'center' }}>
                  <HButton
                    label={Language[language]['verify']}
                    onPress={() => navigation.navigate('mobileverify')}
                  />
                </View>
              </View>
            </View>
          ) : null}
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

export default AadharVerify;
