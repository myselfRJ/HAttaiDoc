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

const AbhaCreate = ({navigation}) => {
  const dispatch = useDispatch();
  const patientData = useSelector(state => state.patient.patient);
  console.log('redux data---', patientData);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMDU5MzQwLCJpYXQiOjE2OTA5NzI5NDAsImp0aSI6ImMzNThiODcwNDJlOTQyMDE4OWY3ZTZlNGNkYzU5ZGMwIiwidXNlcl9pZCI6IjkxNzc0Njg1MTEifQ.-fTXhuaLDMCKH8jh1UZmHJ06Sp36bnHtHr5FZnOiUN0';
  const [selected, setSelected] = useState('');
  const formatDate = moment(DOB).format('YYYY-MM-DD');
  const SuccesRef = useRef(null);
  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);

  const handleOptions = value => {
    setSelected(value);
  };

  const [DOB, setDOB] = useState(new Date());
  const [open, setOpen] = useState(false);

  const formattedDate = DOB.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const [name, setName] = useState('');
  const gender = selected;
  const [phone_number, setPhone_number] = useState('');
  const birth_date = formattedDate;
  const handleSaveData = () => {
    dispatch(
      addPatient.addPatient({
        name,
        phone_number,
        birth_date,
        gender,
        image: selectedImage,
      }),
    );
  };

  const handleConfirm = date => {
    setDOB(date);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const onImagePress = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('response====>', response?.assets?.[0]?.uri);
        setSelectedImage(response?.assets?.[0]?.uri);
      }
    });
  };
  const UserDetails = [
    {
      name: name,
      gender: gender,
      phone_number: phone_number,
      birth_date: birth_date,
      image: selectedImage,
    },
  ];
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(URL.profileUrl, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept:
  //             'application/json, application/xml, multipart/form-data, text/html, text/plain, application/EDI-X12',
  //         },
  //         body: JSON.stringify({
  //           name: name,
  //           gender: gender,
  //           phone_number: phone_number,
  //           birth_date: birth_date,
  //           image: selectedImage,
  //         }),
  //       });
  //       if (response.status === HttpStatusCode.Created) {
  //         const jsonData = await response.json();
  //         console.log(jsonData);
  //       } else {
  //         console.error('API call failed:', response.status);
  //       }
  //     } catch (error) {
  //       console.error('Error occurred:', error);
  //     }
  //   };
  const fetchData = async () => {
    try {
      const response = await fetchApi(URL.addPatient, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient_pic_url: selectedImage,
          patient_name: name,
          patient_phone_number: phone_number,
          birth_date: formatDate,
          gender: selected,
          aadhar_no: '999999',
          abha_no: '8888',
          spouse_name: 'bbsv',
          bloodgroup: 'A',
        }),
      });
      if (response.status === HttpStatusCode.Ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        //navigation.navigate('success');
      } else {
        console.error('API call failed:', response.status);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
            label={Language[language]['name']}
            placeholder={Language[language]['name']}
            value={name}
            setValue={setName}
            doubleCheck={[true, false]}
            check={e => {
              var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~11234567890]/;
              if (format.test(e)) {
                return false;
              } else {
                return true;
              }
            }}
          />
          <InputText
            label={Language[language]['phone_number']}
            placeholder={Language[language]['phone_number']}
            value={phone_number}
            setValue={setPhone_number}
            keypad={'numeric'}
            maxLength={10}
            doubleCheck={[true, false]}
            check={e => {
              var format = /[(A-Z)(a-z)]/;
              if (format.test(e)) {
                return false;
              } else {
                return true;
              }
            }}
          />
          <SelectorBtn
            label={Language[language]['dob']}
            name="calendar"
            onPress={() => setOpen('to')}
            input={formattedDate}
            style={styles.DOBselect}
          />
          <DatePicker
            modal
            open={open !== false}
            date={DOB}
            theme="auto"
            mode="date"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
          <View style={styles.alignchild}>
            <Text> {Language[language]['gender']}</Text>
            <View style={styles.radiogroup}>
              <Option
                label="male"
                value="male"
                selected={selected === 'male'}
                onPress={() => handleOptions('male')}
              />
              <Option
                label="female"
                value="female"
                selected={selected === 'female'}
                onPress={() => handleOptions('female')}
              />
              <Option
                label="others"
                value="others"
                selected={selected === 'others'}
                onPress={() => handleOptions('others')}
              />
            </View>
          </View>

          <HButton
            label={Language[language]['save']}
            onPress={() => {
              handleSaveData();
              fetchData();
              navigation.navigate('success');
              SuccesRef?.current?.snapToIndex(1);
            }}
          />
        </View>
        <BottomSheetView bottomSheetRef={SuccesRef} snapPoints={'50%'}>
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
