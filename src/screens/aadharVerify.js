import React, {useState, useEffect} from 'react';
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
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {commonstyles} from '../styles/commonstyle';
import Keyboardhidecontainer from '../components/keyboardhidecontainer';
import InputText from '../components/inputext';
import HButton from '../components/button';
import AddImage from '../components/addimage';
import Option from '../components/option';
import style from '../components/Searchbar/style';
import {CONSTANTS} from '../utility/constant';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
import {
  UpdatetxnId,
  updateAbhaAccess,
  addAadhar,
} from '../redux/features/Abha/AbhaAccesToken';
import OtpEncryption from '../utility/encryption';

const AadharVerify = ({navigation}) => {
  const CELL_COUNT = 6;
  const [selected, setSelected] = useState('No');
  const [aadhar_no, setAadhar_no] = useState('');
  const [loading, setLoading] = useState(false);
  const [otploading, setotpLoading] = useState(false);
  const [value, setValue] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const token = useSelector(state => state.authenticate.auth.access);

  const handleOptions = value => {
    setSelected(value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const PostAbha = async () => {
      try {
        const response = await fetchApi(URL.AbhaGatewayAuth, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            clientId: 'SBX_002532',
            clientSecret: 'd085d1cb-a80b-416f-9d96-5f335f833549',
          }),
        });
        if (response.ok) {
          const jsonData = await response.json();
          dispatch(updateAbhaAccess(jsonData.accessToken));
        } else {
          console.log('API call failed:', response.status);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    PostAbha();
  }, []);
  const AbhaAccessToken = useSelector(state => state.abha.auth.access);

  const fetchData = async () => {
    const url =
      selected === 'No' ? URL.AbhaAadhargenerateOtp : URL.AbhaExitsMobileGetOtp;
    const body =
      selected === 'No'
        ? {
            aadhaar: aadhar_no,
          }
        : {mobile: phone};
    setLoading(!loading);
    try {
      const response = await fetchApi(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AbhaAccessToken}`,
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const jsonData = await response.json();
        dispatch(UpdatetxnId(jsonData.txnId));
        dispatch(addAadhar(aadhar_no));
        setLoading(!loading);
      } else {
        console.error('API call failed:', response.status, response);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  const AbhaTxnId = useSelector(state => state.abha.auth.txnid);


  const PostOtp = async () => {
    const url =
      selected === 'No' ? URL.AbhaVerifyAadharOtp : URL.AbhaEsistsValIdateOtp;
    const body =
      selected === 'No'
        ? {
            otp: value,
            txnId: AbhaTxnId,
          }
        : {
            otp: OtpEncryption(value),
            txnId: AbhaTxnId,
          };
    setotpLoading(true);
    try {
      const response = await fetchApi(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AbhaAccessToken}`,
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        if (selected === 'Yes') {
          const jsonData = await response.json();
          // console.log('======,aadharOtp', jsonData?.token);
          // console.log(
          //   '======,aadharOtp',
          //   jsonData?.mobileLinkedHid?.[0].healthIdNumber,
          // );
          // console.log('======,aadharOtp', jsonData?.txnId);
          let headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AbhaAccessToken}`,
            'T-Token': `Bearer ${jsonData?.token}`,
            mobileLoginWebRequest: 'mobileLoginWebRequest',
          };
          // console.log('---------------------', {
          //   healthId: jsonData?.mobileLinkedHid?.[0].healthIdNumber,
          //   txnId: jsonData?.txnId,
          // });
      
          const UserTokenResponse = await fetchApi(URL.AbhaExistsGetUserToken, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              healthId: jsonData?.mobileLinkedHid[0]?.healthIdNumber,
              txnId: jsonData?.txnId,
            }),
          });
          const UserTokenData = await UserTokenResponse.json();
          let headersProfile = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AbhaAccessToken}`,
            'X-Token': `Bearer ${UserTokenData?.token}`,
          };
          const UserAbhaProfile = await fetchApi(URL.AbhaExistsGetProfile, {
            method: 'GET',
            headers: headersProfile,
          });
          const jsonDataProfile = await UserAbhaProfile.json();
          const firstName = jsonDataProfile?.firstName;
          const lastName = jsonDataProfile?.lastName;
          const middleName = jsonDataProfile?.middleName;
          const healthId = jsonDataProfile?.healthId;
          const patient_pic_url = jsonDataProfile?.profilePhoto;
          const patient_name = jsonDataProfile?.name;
          const patient_phone_number = jsonDataProfile?.mobile;
          const birth_date = `${jsonDataProfile?.dayOfBirth}-${jsonDataProfile?.monthOfBirth}-${jsonDataProfile?.yearOfBirth}`;
          const gender = jsonDataProfile?.gender;
          const abha_no = jsonDataProfile?.healthIdNumber;
          navigation.navigate('abhaexist', {
            firstName,
            lastName,
            middleName,
            healthId,
            patient_pic_url,
            patient_name,
            patient_phone_number,
            birth_date,
            gender,
            abha_no,
          });
          setPhoneNumber();
          setValue();
          setotpLoading(false);
        } else {
          const jsonData = await response.json();
          navigation.navigate('mobileverify');
          setAadhar_no();
          setValue();
          setotpLoading(false);
        }
      }
    } catch (error) {
      console.error('Error occurred:', error);
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
            Add New
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
              {Language[language]['abha']}
            </Text>
            <View style={{flexDirection: 'row', gap: 160}}>
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
          <View>
            <View style={{alignItems: 'center', gap: 16}}>
              <InputText
                label={
                  selected === 'No'
                    ? Language[language]['aadhar']
                    : Language[language]['phone_number']
                }
                placeholder={
                  selected === 'No'
                    ? Language[language]['aadhar']
                    : Language[language]['phone_number']
                }
                value={selected === 'No' ? aadhar_no : phone}
                setValue={selected === 'No' ? setAadhar_no : setPhoneNumber}
                maxLength={12}
              />
              <HButton
                loading={loading}
                label={Language[language]['getotp']}
                onPress={() => fetchData()}
              />
            </View>
            <View style={{paddingHorizontal: '30%', gap: 24, top: 16}}>
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
                  onPress={() => PostOtp()}
                  loading={otploading}
                />
              </View>
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

export default AadharVerify;
