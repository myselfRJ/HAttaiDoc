import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
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
const PatientCreate = ({navigation}) => {
  const [selected, setSelected] = useState('male');

  //handle selected state

  const handleOptions = value => {
    setSelected(value);
  };

  return (
    <Keyboardhidecontainer>
      <View style={commonstyles.content}>
        <View style={styles.alignchild}>
          <Text style={commonstyles.h1}>Add Patient</Text>
          <AddImage url="https://www.kauveryhospital.com/doctorimage/recent/Dr.-Kandasamy2022-09-12-06:30:01am.jpg" />
        </View>
        <InputText label="Name" placeholder="Full Name" />
        <InputText label="Phone Number" placeholder="10 digit phone number" />
        <InputText label="Age" placeholder="eg:25" />

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
        <InputText label="Address" placeholder="Full Address" />

        <InputText label="Aadhar Number" placeholder="12-digit Aadhar Number" />

        {/* <InputText label='name' placeholder='Full Name'/>
            <InputText label='name' placeholder='Full Name'/> */}
        <HButton
          label="Create ABHA ID"
          onPress={() => navigation.navigate('bookslot')}
        />
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
});
export default PatientCreate;
