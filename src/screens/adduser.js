import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Modal, Pressable } from 'react-native';
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
import { PlusButton, SelectorBtn, SlotChip } from '../components';
import { CONSTANTS } from '../utility/constant';
import { launchImageLibrary } from 'react-native-image-picker';
import { URL } from '../utility/urls';
import { HttpStatusCode } from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ClinicAddress from '../components/clinic_address';


const AddUser = () => {
  const [showRoleModal, setRoleModal] = useState(false);
  const [ShowClinicModal, setClinicModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedClinic, setSelectedClinic] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [values, setValues] = useState({
    name: '',
    phone: '',
    gender: 'male',
    role:'',
    clinic:'',
    slots: [],
  });
  const [showSlotChip, setShowSlotChip] = useState(false);

  const handlePlusIconClick = () => {
    if (values.name && values.role && values.clinic) {
      setValues(prevValues => ({
        ...prevValues,
        slots: [
          ...prevValues.slots,
          {
            name: prevValues.name,
            role: prevValues.role,
            clinic: prevValues.clinic,
          },
        ],
        name: '',
        phone:'',
        gender:'',
        role:'',
        clinic:''
      }));
      setShowSlotChip(true);
    }
  };


  const handleDeleteSlotChip = index => {
    setValues(prevValues => ({
      ...prevValues,
      slots: prevValues.slots.filter((_, i) => i !== index),
    }));
  };

  const handleChangeValue = (field, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleOptions = value => {
    handleChangeValue('gender', value);
  };

  const toggleModal1 = () => {
    setRoleModal(!showRoleModal);
  };

  const toggleModal2 = () => {
    setClinicModal(!ShowClinicModal);
  };

  const handleRoleSelection = role => {
    setSelectedRole(role);
    handleChangeValue('role', role);
    toggleModal1();
  };

  const handleClinicSelection = clinic => {
    setSelectedClinic(clinic);
    handleChangeValue('clinic', clinic);
    toggleModal2();
  };

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Keyboardhidecontainer>
        <View style={commonstyles.content}>
          <View style={styles.alignchild}>
            <AddImage onPress={onImagePress} url={selectedImage} />
          </View>
          <InputText
            label={Language[language]['name']}
            placeholder="Name"
            value={values.name}
            setValue={value => handleChangeValue('name', value)}
          />
          <InputText
            label={Language[language]['phone_number']}
            placeholder="Phone Number"
            value={values.phone}
            setValue={value => handleChangeValue('phone', value)}
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
              height: 80,
            }}>
            <SelectorBtn
              label={Language[language]['role']}
              name="chevron-down"
              onPress={toggleModal1}
              input={selectedRole}
            />
            <Modal visible={showRoleModal} animationType="slide" transparent={true}>
              <View style={styles.clinicmodalContainer}>
                <Text
                  style={{
                    fontFamily: CUSTOMFONTFAMILY.heading,
                    fontSize: 18,
                    color: CUSTOMCOLOR.black,
                  }}>
                  Role
                </Text>
                {CONSTANTS.role.map((role, index) => (
                  <Pressable key={index} onPress={() => handleRoleSelection(role)}>
                    <Text style={styles.clinicmodalfields}>{role}</Text>
                  </Pressable>
                ))}
              </View>
            </Modal>
          </View>
          <View
            style={{
              alignSelf: 'flex-start',
              width: '100%',
              paddingHorizontal: 8,
              height: 80,
            }}>
            <SelectorBtn
              label={Language[language]['clinic']}
              name="chevron-down"
              onPress={toggleModal2}
              input={selectedClinic}
            />
            <Modal visible={ShowClinicModal} animationType="slide" transparent={true}>
              <View style={styles.modalContainer}>
                <Text
                  style={{
                    fontFamily: CUSTOMFONTFAMILY.heading,
                    fontSize: 18,
                    color: CUSTOMCOLOR.black,
                  }}>
                  {Language[language]['clinic']}
                </Text>
                {CONSTANTS.clinic.map((clinic, index) => (
                  <Pressable key={index} onPress={() => handleClinicSelection(clinic)}>
                    <Text style={styles.modalfields}>{clinic}</Text>
                  </Pressable>
                ))}
              </View>
            </Modal>
          </View>
          <View style={{ alignSelf: 'flex-end', bottom: 0, paddingVertical: 8 }}>
            <PlusButton icon="plus" onPress={handlePlusIconClick} />
          </View>
          <View style={styles.users}>
          <Text
                    style={{
                      fontFamily: CUSTOMFONTFAMILY.heading,
                      fontSize: CUSTOMFONTSIZE.h2,
                      color: CUSTOMCOLOR.black,
                      paddingVertical: 4,
                    }}>
                    Users
                  </Text>
            {showSlotChip &&
              values.slots.map((slot, index) => (
                <View style={{ margin: 5 }} key={index}>

                  <SlotChip
                    type={<Text>Name:{slot.name}, Role:{slot.role} , Clinic:{slot.clinic}</Text>}
                    onPress={() => handleDeleteSlotChip(index)}
                  />
                </View>
              ))}
          </View>
          <HButton label="Done" />
        </View>
      </Keyboardhidecontainer>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 20,
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
    modalContainer: {
        //flex: 1,
        height: 400,
        width: '100%',
        //justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: CUSTOMCOLOR.white,
        alignSelf: 'center',
        margin: 500,
        borderRadius: 10,
        padding: 16,
    },
    modalfields: {
        color: CUSTOMCOLOR.primary,
        fontSize: 14,
        fontWeight: 400,
        fontFamily: CUSTOMFONTFAMILY.body,
        padding: 4,
    },
    clinicmodalContainer: {
        height: 400,
        width: '100%',
        //justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: CUSTOMCOLOR.white,
        alignSelf: 'center',
        margin: 500,
        borderRadius: 10,
        padding: 16,
    },
    clinicmodalfields: {
        color: CUSTOMCOLOR.primary,
        fontSize: 14,
        fontWeight: 400,
        fontFamily: CUSTOMFONTFAMILY.body,
        padding: 4,
    },
    users: {
        alignSelf: 'flex-start',
        paddingVertical: 16,
    },
})
export default AddUser;