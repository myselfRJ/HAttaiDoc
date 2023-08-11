import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import moment, {min} from 'moment';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {commonstyles} from '../styles/commonstyle';
import Keyboardhidecontainer from '../components/keyboardhidecontainer';
import InputText from '../components/inputext';
import HButton from '../components/button';
import AddImage from '../components/addimage';
import Option from '../components/option';
import {SelectorBtn, BottomSheetView, StatusMessage} from '../components';
import {CONSTANTS} from '../utility/constant';
import {launchImageLibrary} from 'react-native-image-picker';
import {URL} from '../utility/urls';
import {HttpStatusCode} from 'axios';
import {fetchApi} from '../api/fetchApi';
import {useSelector, useDispatch} from 'react-redux';
import {addPatient} from '../redux/features/patient/patientslice';
import {Alert} from 'react-native';

const AbhaCreate = ({navigation, route}) => {
  const SuccesRef = useRef(null);

  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);

  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [middleName, setMiddlename] = useState('');
  const [email, setEmail] = useState('');
  const [healthID, setHealthID] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const AbhaTxnId = useSelector(state => state.abha.auth.txnid);
  const AbhaAccessToken = useSelector(state => state.abha.auth.access);
  const aadhar_no = useSelector(state => state?.abha?.auth?.aadharNo);
  const AccesToken = useSelector(state => state.authenticate.auth.access);

  const [selectedImage, setSelectedImage] = useState('');

  const onImagePress = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('response====>', response?.assets?.[0]?.base64);
        setSelectedImage(response?.assets?.[0]?.base64);
      }
    });
  };
  // const UserDetails = [
  //   {
  //     // name: name,
  //     gender: gender,
  //     phone_number: phone_number,
  //     birth_date: birth_date,
  //     image: selectedImage,
  //   },
  // ];

  const [loading, setLoading] = useState(false);
  // const {phone} = useSelector(state => state?.phone?.data);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchApi(URL.CreateAbhaAccount, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AbhaAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          middleName: middleName,
          healthId: healthID,
          profilePhoto: selectedImage,
          password: password,
          txnId: AbhaTxnId,
        }),
      });
      if (response.status === HttpStatusCode.Ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        const patient_phone_number = jsonData?.mobile;
        const postPatientdata = await fetchApi(URL.addPatient, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AccesToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            patient_pic_url: jsonData?.profilePhoto,
            patient_name: jsonData?.name,
            patient_phone_number: jsonData?.mobile,
            birth_date: `${jsonData?.yearOfBirth}+${jsonData?.monthOfBirth}+${jsonData?.dayOfBirth}`,
            gender: jsonData?.gender,
            aadhar_no: aadhar_no,
            //doctor_phone_number:phone,
            abha_no: jsonData?.healthIdNumber,
          }),
        });
        if (postPatientdata.status === HttpStatusCode.Ok) {
          const PatientData = await postPatientdata.json();
          useDispatch(addPatient.addPatient(PatientData))
          console.log('patients', PatientData);
          setTimeout(() => {
            navigation.navigate('success', {patient_phone_number});
          }, 1000);
          SuccesRef?.current?.snapToIndex(1);
          setFirstname();
          setMiddlename();
          setLastname();
          setEmail();
          setPassword();
          setPassword2();
          setSelectedImage();
          setLoading(false);
        } else {
          console.error('API call failed:', postPatientdata.status);
          setLoading(false);
        }
      } else {
        console.error('API call failed:', response.status);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setLoading(false);
    }
  };

  const checkPassword = () => {
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const isPasswordValid = format.test(password);
    const isPasswordLengthValid = password.length >= 8;
    const passwordsMatch = password === password2;

    if (!isPasswordValid || !isPasswordLengthValid) {
      Alert.alert(
        'Password must contain at least one special character and be 8 characters long.',
      );
    } else if (!passwordsMatch) {
      Alert.alert('Passwords do not match. Please check again.');
    }
    return isPasswordValid && isPasswordLengthValid && passwordsMatch;
  };

  console.log('====================================');
  console.log(
    {email: email},
    {firstName: firstName},
    {lastName: lastName},
    {middleName: middleName},
    {healthId: healthID},
    {profilePhoto: selectedImage},
    {txnId: AbhaTxnId},
    {password: password},
  );
  console.log('====================================');

  return (
    <ScrollView>
      <View style={{height: '100%'}}>
        <View style={styles.topBar}></View>
        <View style={styles.mainhead}>
          <Text style={styles.mainText}>Create ABHA Account</Text>
          <Icon name="bell" size={24} color={'#fff'} style={styles.bellIcon} />
        </View>
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 24,
            width: '100%',
            alignItems: 'center',
          }}>
          <View style={styles.alignchild}>
            <Text style={commonstyles.h1}>Add Patient</Text>
            <AddImage onPress={onImagePress} url={selectedImage} />
          </View>
          <InputText
            label={'Enter HealthId'}
            placeholder={'eg : xxxxxxx'}
            value={healthID}
            setValue={setHealthID}
          />
          <InputText
            label={'First Name'}
            placeholder={'First Name'}
            value={firstName}
            setValue={setFirstname}
          />
          <InputText
            label={'Middle Name'}
            placeholder={'Middle Name'}
            value={middleName}
            setValue={setMiddlename}
          />
          <InputText
            label={'Last Name'}
            placeholder={'Last Name'}
            value={lastName}
            setValue={setLastname}
          />
          <InputText
            label={'E-mail'}
            placeholder={'eg:xxxxxxxxxx@xxxx.xxx'}
            value={email}
            setValue={setEmail}
          />
          <InputText
            label={'Password'}
            placeholder={'Password'}
            value={password}
            setValue={setPassword}
            secure={true}
          />
          <InputText
            label={'Confirm Password'}
            placeholder={'Confirm Password'}
            value={password2}
            setValue={setPassword2}
            secure={true}
          />
          <HButton
            label="Save"
            onPress={() => {
              const isPasswordValid = checkPassword();
              if (isPasswordValid) {
                fetchData();
              } else {
                Alert.alert('Please Check Once Again Password');
              }
            }}
          />
        </View>
        <BottomSheetView
          bottomSheetRef={SuccesRef}
          snapPoints={'50%'}
          backgroundStyle={'#fff'}>
          <StatusMessage
            status={'success'}
            message="Sucessfully Created Abha ID"
          />
        </BottomSheetView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: CUSTOMCOLOR.primary,
    height: 24,
    width: '100%',
  },
  mainhead: {
    width: '100%',
    height: 60,
    backgroundColor: CUSTOMCOLOR.primary,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'center',
  },
  mainText: {
    color: CUSTOMCOLOR.white,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 21.79,
    left: 37,
  },
  bellIcon: {
    left: 662,
    bottom: 24,
  },
  radiogroup: {
    padding: 16,
    flexDirection: 'row',
    gap: 48,

    justifyContent: 'flex-start',
  },
  alignchild: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 8,
  },
  DOBselect: {
    width: '100%',
    paddingHorizontal: 8,
  },
});

export default AbhaCreate;
