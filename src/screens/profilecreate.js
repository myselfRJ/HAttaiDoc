import React, { useState,useRef } from 'react';
import { Text, View, StyleSheet, Modal, Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import { commonstyles } from '../styles/commonstyle';
import Keyboardhidecontainer from '../components/keyboardhidecontainer';
import InputText from '../components/inputext';
import HButton from '../components/button';
import AddImage from '../components/addimage';
import Option from '../components/option';
import { SelectorBtn } from '../components';
import { CONSTANTS } from '../utility/constant';
import { launchImageLibrary } from 'react-native-image-picker';
import { URL } from '../utility/urls';
import { HttpStatusCode } from 'axios';
import BottomSheetView from '../components/bottomSheet';

const ProfileCreate = ({ navigation }) => {
  const appointmentCardRef = useRef(null);
  const fetchData = async () => {
    try {
      const response = await fetch(URL.profileUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept:
            'application/json, application/xml, multipart/form-data, text/html, text/plain, application/EDI-X12',
        },
        body: JSON.stringify({
          values,
          date_of_birth: selectedDate.toISOString(),
          specialization: selectedSpeciality,
          img_url: selectedImage,
        }),
      });
      if (response.status === HttpStatusCode.Created) {
        const jsonData = await response.json();
        console.log(jsonData);
        navigation.navigate('addclinic');

      } else {
        console.error('API call failed:', response.status);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const [values, setValues] = useState({
    name: '',
    gender: 'male',
    medical_no: '',
    experience: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const handleChangeValue = (field, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSpecialitySelection = speciality => {
    setSelectedSpeciality(speciality);
    handleChangeValue('speciality', speciality);
    appointmentCardRef?.current?.snapToIndex(0);
    console.log(speciality);
  };
  
  const handleOptions = value => {
    handleChangeValue('gender', value);
  };
  const handleDateChange = date => {
    setSelectedDate(date);
    const formattedDate = date.toDateString();
    setValues(prevValues => ({
      ...prevValues,
      dob: formattedDate,
    }));
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  return (
    <Keyboardhidecontainer>
      <View style={commonstyles.content}>
        <View style={styles.alignchild}>
          <Text style={commonstyles.h1}>Fill Profile</Text>
          <AddImage onPress={onImagePress} url={selectedImage} />
        </View>
        <InputText
          label={Language[language]['name']}
          placeholder="Full Name"
          value={values.name}
          setValue={value => handleChangeValue('name', value)}
        />

        <View style={styles.alignchild}>
          <Text>{Language[language]['gender']}</Text>
          <View style={styles.radiogroup}>
            <Option
              label="male"
              value="male"
              selected={values.gender === 'male'}
              onPress={() => handleOptions('male')}
            />
            <Option
              label="female"
              value="female"
              selected={values.gender === 'female'}
              onPress={() => handleOptions('female')}
            />
            <Option
              label="others"
              value="others"
              selected={values.gender === 'others'}
              onPress={() => handleOptions('others')}
            />
          </View>
        </View>

        <View
          style={{
            alignSelf: 'flex-start',
            width: '100%',
            paddingHorizontal: 8,
            height: 80
          }}>
          <SelectorBtn
            label={Language[language]['dob']}
            name="calendar"
            onPress={toggleDatePicker}
            input={values.dob}
          />
        </View>
        {showDatePicker && (
          <DatePicker
            date={selectedDate}
            mode="date"
            onDateChange={handleDateChange}
            minimumDate={new Date(1900, 0, 1)}
            maximumDate={new Date()} 
          />
        )}
        <InputText
          label={Language[language]['medical_number']}
          placeholder="Medical number"
          value={values.medical_no}
          setValue={value => handleChangeValue('medical_no', value)}
        />
        <View
          style={{
            alignSelf: 'flex-start',
            width: '100%',
            paddingHorizontal: 8,
            height: 80,
          }}>
          <SelectorBtn
            label={Language[language]['specialization']}
            name="chevron-down"
            // onPress={toggleModal}
            onPress={() => {
              appointmentCardRef?.current?.snapToIndex(1);
            }}
            input={selectedSpeciality}
          />
        </View>
        <InputText
          label={Language[language]['experience']}
          placeholder="experience in years"
          value={values.experience}
          setValue={value => handleChangeValue('experience', value)}
        />
        <Text
          style={{
            fontFamily: CUSTOMFONTFAMILY.h4,
            fontSize: 12,
            color: CUSTOMCOLOR.black,
            alignSelf: 'flex-start',
          }}>
          Medical Document
        </Text>
        <View style={{ alignSelf: 'flex-start' }}>
          <HButton label="Upload Document" />
        </View>
        <HButton label={Language[language]['save']} onPress={fetchData} />
        <BottomSheetView
        bottomSheetRef={appointmentCardRef}
        snapPoints={'50%'}>
          <View style={styles.modalContainer}>
          <Text
            style={{
              fontFamily: CUSTOMFONTFAMILY.heading,
              fontSize: 18,
              color: CUSTOMCOLOR.black,
            }}>
            Select Speciality
          </Text>
          {CONSTANTS.speciality.map((speciality, index) => (
            <Pressable
              key={index}
              onPress={() => handleSpecialitySelection(speciality)}
              style={{height:30}}
              >
              <Text style={styles.modalfields}>{speciality}</Text>
            </Pressable>
          ))}
        </View>
        </BottomSheetView>
      </View>
   

    </Keyboardhidecontainer>
  );
};

const styles = StyleSheet.create({
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
  modalContainer: {
    //flex: 1,
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: CUSTOMCOLOR.white,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
  },
  modalfields: {
    color: CUSTOMCOLOR.primary,
    fontSize: 14,
    fontWeight: 400,
    fontFamily: CUSTOMFONTFAMILY.body,
    padding: 4,
  },
});

export default ProfileCreate;
