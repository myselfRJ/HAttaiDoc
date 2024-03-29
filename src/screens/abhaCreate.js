import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
import {SelectorBtn} from '../components';
import {CONSTANTS} from '../utility/constant';
import {launchImageLibrary} from 'react-native-image-picker';
import {URL} from '../utility/urls';
import {HttpStatusCode} from 'axios';

const AbhaCreate = ({navigation}) => {
  const [selected, setSelected] = useState('');

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

  return (
    <ScrollView>
      <Keyboardhidecontainer>
        <View>
          <View style={styles.topBar}></View>
          <View style={styles.mainhead}>
            <Text style={styles.mainText}>Create ABHA Account</Text>
            <Icon
              name="bell"
              size={24}
              color={'#fff'}
              style={styles.bellIcon}
            />
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
                var format =
                  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~11234567890]/;
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
              onPress={() => navigation.navigate('success')}
            />
          </View>
        </View>
      </Keyboardhidecontainer>
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
  CnfAbhaView: {
    flexDirection: 'row',
    width: '100%',
    height: 30,
    justifyContent: 'space-around',
  },
  CnfAbha: {
    width: '50%',
    height: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
  },
  DOBselect: {
    width: '100%',
  },
});

export default AbhaCreate;
