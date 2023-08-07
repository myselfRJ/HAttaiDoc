import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Image,
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
import {useNavigation} from '@react-navigation/native';
const AbhaExistDetails = ({route}) => {
  const navigation = useNavigation();

  const {
    healthId,
    patient_pic_url,
    patient_name,
    patient_phone_number,
    birth_date,
    gender,
    abha_no,
  } = route.params;

  const token = useSelector(state => state?.authenticate?.auth?.access);
  console.log('--------------token', token);

  const fetchData = async () => {
    try {
      const response = await fetchApi(URL.addPatient, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient_pic_url: patient_pic_url,
          patient_name: patient_name,
          patient_phone_number: patient_phone_number,
          birth_date: birth_date,
          gender: gender,
          // aadhar_no: aadhar_no,
          abha_no: abha_no,
        }),
      });
      if (response.status === HttpStatusCode.Ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        navigation.navigate('success', {patient_phone_number});
      } else {
        console.error('API call failed:', response.status);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.topBar}></View>
      <View style={styles.mainhead}>
        <Text style={styles.mainText}>Abha Details</Text>
        <Icon name="bell" size={24} color={'#fff'} style={styles.bellIcon} />
      </View>
      <View style={styles.AbhaCard}>
        <View style={{gap: 16}}>
          <Text style={styles.text}>Name:{patient_name}</Text>
          <Text style={styles.text}>Gender:{gender}</Text>
          <Text style={styles.text}>DateOfBirth:{birth_date}</Text>
          <Text style={styles.text}>Phone:{patient_phone_number}</Text>
          <Text style={styles.text}>HealthId:{healthId}</Text>
          <Text style={styles.text}>AbhaNo:{abha_no}</Text>
        </View>
        <View>
          <AddImage
            style={styles.image}
            source={{
              encodedBase64: {patient_pic_url},
            }}
          />
        </View>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', top: 56}}>
        <HButton
          label={'Next'}
          onPress={() => {
            fetchData();
          }}
        />
      </View>
    </View>
  );
};

export default AbhaExistDetails;

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
    fontSize: 18,
    lineHeight: 21.79,
    left: 37,
  },
  bellIcon: {
    left: 662,
    bottom: 24,
  },
  AbhaCard: {
    backgroundColor: CUSTOMCOLOR.primary,
    top: 36,
    width: '55%',
    padding: 24,
    left: '18%',
    gap: 16,
    flexDirection: 'row',
  },
  text: {
    fontWeight: '400',
    fontSize: 16,
    color: CUSTOMCOLOR.white,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    left: '100%',
  },
});
