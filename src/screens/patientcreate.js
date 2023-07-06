import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
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
const PatientCreate = ({navigation}) => {
  const [selected, setSelected] = useState('');
  const [selectedAbha, setSelectedAbha] = useState('');
  const Abha = ["Don't Have ABHA_ID", 'Have ABHA_ID'];
  const handleOptions = value => {
    setSelected(value);
  };
  const selectedBtn = value => {
    setSelectedAbha(value);
  };

  const [name, setName] = useState('');
  const gender = selected;
  const [phone_number, setPhone_number] = useState('');
  const [birth_date, setBirth_date] = useState('');
  const [age, setAge] = useState('');
  const [blood_group, setBlood_group] = useState('');
  const [spouse_name, setSpouse_nmae] = useState('');
  const [ABHA_ID, setABHA_ID] = useState('');
  const [aadhar_no, setAadhar_no] = useState('');
  const [address, setAddress] = useState('');

  const patientDetails = [
    {
      name: name,
      gender: gender,
      phone_number: phone_number,
      birth_date: birth_date,
      age: age,
      blood_group: blood_group,
      spouse_name: spouse_name,
      ABHA_ID: ABHA_ID,
      aadhar_no: aadhar_no,
      address: address,
    },
  ];

  console.log('====================================');
  console.log(patientDetails);
  console.log('====================================');

  return (
    <ScrollView>
      <Keyboardhidecontainer>
        <View style={commonstyles.content}>
          <View style={styles.alignchild}>
            <Text style={commonstyles.h1}>Add Patient</Text>
            <AddImage url="https://www.kauveryhospital.com/doctorimage/recent/Dr.-Kandasamy2022-09-12-06:30:01am.jpg" />
          </View>
          <View style={styles.CnfAbhaView}>
            {Abha.map((val, ind) => (
              <TouchableOpacity
                key={ind}
                style={[
                  styles.CnfAbha,
                  {
                    backgroundColor:
                      selectedAbha === val
                        ? CUSTOMCOLOR.primary
                        : CUSTOMCOLOR.white,
                    alignItems: 'center',
                  },
                ]}
                onPress={() => selectedBtn(val)}>
                <View>
                  <Text>{val}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <InputText
            label="Name"
            placeholder="Full Name"
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
            label="Phone Number"
            placeholder="10 digit phone number"
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
          <InputText
            label="Age"
            placeholder="eg:25"
            value={age}
            setValue={setAge}
            keypad={'numeric'}
            doubleCheck={[true, false]}
            check={e => {
              if (e > 100) {
                return false;
              } else {
                return true;
              }
            }}
          />

          <View style={styles.alignchild}>
            <Text>Gender</Text>
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
          <InputText
            label="Date OF Birth"
            placeholder="DD/MM/YYYY"
            value={birth_date}
            setValue={setBirth_date}
          />
          <InputText
            label="Wife/Husband Name"
            placeholder="Enter wife/husband Name"
            value={spouse_name}
            setValue={setSpouse_nmae}
          />
          <InputText
            label="Blood Group"
            placeholder="eg:O+"
            value={blood_group}
            setValue={setBlood_group}
          />
          <InputText
            label="Address"
            placeholder="Full Address"
            value={address}
            setValue={setAddress}
          />

          <InputText
            label="Aadhar Number"
            placeholder="12-digit Aadhar Number"
            value={aadhar_no}
            setValue={setAadhar_no}
            keypad={'numeric'}
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

          {selectedAbha === Abha[1] ? (
            <View style={styles.alignchild}>
              <InputText
                label="ABHA-Id"
                placeholder="Enter your ABHA-ID"
                value={ABHA_ID}
                setValue={setABHA_ID}
              />
              <View style={{left: '40%'}}>
                <HButton
                  label="Create Account"
                  onPress={() => navigation.navigate('bookslot')}
                />
              </View>
            </View>
          ) : null}
          {selectedAbha === Abha[0] ? (
            <HButton
              label="Create ABHA ID"
              onPress={() => navigation.navigate('bookslot')}
            />
          ) : null}
        </View>
      </Keyboardhidecontainer>
    </ScrollView>
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
});
export default PatientCreate;
