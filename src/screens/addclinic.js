import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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
import BottomSheetView from '../components/bottomSheet';
import StatusMessage from '../components/statusMessage';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchApi } from '../api/fetchApi';
import { UseSelector, useSelector } from 'react-redux';

const AddClinic = ({ navigation }) => {
  const addressRef = useRef(null);
  const [apiStatus, setApiStatus] = useState({});
  // const token = useSelector(state => state.authenticate.auth.access);
  const slotData = useSelector(state => state?.slotsData);

  const SuccesRef = useRef(null);
  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);
  // const token = useSelector(state => state.authenticate.auth.access);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwODg1NDgwLCJpYXQiOjE2OTA3OTkwODAsImp0aSI6Ijc4OTZhZmMyYTBhODQ4NTM5MjdjMzhmYmNmODcyMDE3IiwidXNlcl9pZCI6IjkxNzc0Njg1MTEifQ.Gr0WOtTxVqay8QmfxeT7T1wQFTcs2AIUyeQc19DxJC4';
  console.log('====================================');
  console.log(slotData?.slots?.M);
  console.log('====================================');

  const [selectedImage, setSelectedImage] = useState(null);
  const [value, setValue] = useState({
    clinic: '',
    fees: '',
    slots: [],
  });
  const fetchData = async () => {
    try {
      const response = await fetchApi(URL.addclinic, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        body: JSON.stringify([
          {
            'user-id': '0d515acf-4ebd-4d22-8697-ddc5925e029a',
            clinic_name: value.clinic,
            clinic_address: 'Chennai',
            fees: parseInt(value.fees),
            slot: JSON.stringify(slotData.slots),
          },
        ]),
      });
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setApiStatus({ status: 'success', message: 'Successfully created' });
        SuccesRef?.current?.snapToIndex(1);
        setTimeout(() => {
          navigation.navigate('adduser');
        }, 1000);
      } else {
        setApiStatus({ status: 'warning', message: 'Enter all Values' });
        SuccesRef?.current?.snapToIndex(1);
        //navigation.navigate('adduser');
        console.error('API call failed:', response.status, response);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setApiStatus({ status: 'error', message: 'Please try again' });
      SuccesRef?.current?.snapToIndex(1);
    }

    console.log('====================================');
    console.log(slotData?.slots?.M);
    console.log('====================================');

    const [selectedImage, setSelectedImage] = useState(null);
    const [value, setValue] = useState({
      clinic: '',
      fees: '',
      slots: [],
    });
    const fetchData = async () => {
      try {
        const response = await fetchApi(URL.addclinic, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
          body: JSON.stringify([{
            clinic_name: value.clinic,
            clinic_Address: '',
            fees: value.fees,
            clinic_photo_url: selectedImage,
            slot: slots
          }]),
          body: JSON.stringify([
            {
              'user-id': '0d515acf-4ebd-4d22-8697-ddc5925e029a',
              clinic_name: value.clinic,
              clinic_address: 'Chennai',
              fees: parseInt(value.fees),
              slot: slotData.slots.toString(),
            },
          ]),
        });
        if (response.ok) {
          const jsonData = await response.json();
          console.log(jsonData);
          setApiStatus({ status: 'success', message: 'Successfully created' });
          SuccesRef?.current?.snapToIndex(1);
          setTimeout(() => {
            navigation.navigate('adduser');
          }, 1000);
        } else {
          setApiStatus({ status: 'warning', message: 'Enter all Values' });
          SuccesRef?.current?.snapToIndex(1);
          //navigation.navigate('adduser');
          console.error('API call failed:', response.status, response);
        }
      } catch (error) {
        console.error('Error occurred:', error);
        setApiStatus({ status: 'error', message: 'Please try again' });
        SuccesRef?.current?.snapToIndex(1);
      }
    };
    const [showSlotChip, setShowSlotChip] = useState(false);

    const handlePlusIconClick = () => {
      if (value.clinic) {
        setValue(prevValues => ({
          ...prevValues,
          slots: [...prevValues.slots, value.clinic],
          // clinic: '',
          // fees: '',
        }));
      }
      setShowSlotChip(true);
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

    const handleChangeValue = (field, value) => {
      setValue(prevValues => ({
        ...prevValues,
        [field]: value,
      }));
    };

    const handleDeleteSlotChip = index => {
      setValue(prevValues => ({
        ...prevValues,
        slots: prevValues.slots.filter((_, i) => i !== index),
      }));
    };

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Keyboardhidecontainer>
            <View style={commonstyles.content}>
              <View style={styles.alignchild}>
                <View style={styles.alignchild}>
                  <Text style={commonstyles.h1}>Add Clinic</Text>
                  <AddImage onPress={onImagePress} url={selectedImage} />
                </View>
              </View>
              <InputText
                label={Language[language]['clinic']}
                maxLength={30}
                placeholder="Clinic"
                value={value.clinic}
                setValue={value => handleChangeValue('clinic', value)}
              />
              <View
                style={{
                  alignSelf: 'flex-start',
                  width: '100%',
                  paddingHorizontal: 8,
                }}>
                <SelectorBtn
                  label={Language[language]['address']}
                  name="map-marker"
                  onPress={() => {
                    addressRef?.current?.snapToIndex(1);
                  }}
                />
              </View>
              <InputText
                label={Language[language]['fees']}
                placeholder="Consultation Fees"
                value={value.fees}
                setValue={value => handleChangeValue('fees', value)}
              />
              <View
                style={{
                  alignSelf: 'flex-start',
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                }}>
                <HButton label="Add Slots" onPress={() => navigation.navigate("createslot")} />
                <Text>{slotData.slot}</Text>
                <HButton
                  label="Add Slots"
                  onPress={() => navigation.navigate('createslot')}
                />
              </View>
              <View
                style={{
                  alignSelf: 'flex-end',
                  bottom: 0,
                  paddingVertical: 8,
                  paddingHorizontal: 8,
                }}>
                <PlusButton icon="plus" onPress={handlePlusIconClick} />
              </View>

              <View style={styles.clinic}>
                {value?.slots?.length > 0 && (
                  <Text
                    style={{
                      fontFamily: CUSTOMFONTFAMILY.heading,
                      fontSize: CUSTOMFONTSIZE.h2,
                      color: CUSTOMCOLOR.black,
                      paddingVertical: 4,
                    }}>
                    Clinics
                  </Text>
                )}

                {showSlotChip &&
                  value.slots.map((slot, index) => (
                    <View style={{ margin: 5 }}>
                      <SlotChip
                        style={{ justifyContent: 'space-between' }}
                        key={index}
                        type={<Text>{slot}</Text>}
                        onPress={() => handleDeleteSlotChip(index)}
                      />
                    </View>
                  ))}
              </View>
              <View>
                <HButton
                  label="Next"
                  onPress={() => {
                    fetchData();
                    SuccesRef?.current?.snapToIndex(1);
                  }}
                />
              </View>
            </View>
          </Keyboardhidecontainer>
        </ScrollView>
        <BottomSheetView bottomSheetRef={addressRef} snapPoints={'100%'}>
          <View style={styles.modalcontainer}>
            <ClinicAddress
              onPress={() => {
                addressRef?.current?.snapToIndex(0);
              }}
            />
            <View
              style={{
                alignSelf: 'flex-start',
                width: '100%',
                paddingHorizontal: 8,
              }}>
              <SelectorBtn
                label={Language[language]['address']}
                name="map-marker"
                onPress={() => {
                  addressRef?.current?.snapToIndex(1);
                }}
              />
            </View>
            <InputText
              label={Language[language]['fees']}
              placeholder="Consultation Fees"
              value={value.fees}
              setValue={value => handleChangeValue('fees', value)}
            />
            <View
              style={{
                alignSelf: 'flex-start',
                paddingHorizontal: 8,
                paddingVertical: 8,
              }}>
              <HButton
                label="Add Slots"
                onPress={() => navigation.navigate('createslot')}
              />
              <Text>{slotData.slot}</Text>
              <HButton
                label="Add Slots"
                onPress={() => navigation.navigate('createslot')}
              />
            </View>
            <View
              style={{
                alignSelf: 'flex-end',
                bottom: 0,
                paddingVertical: 8,
                paddingHorizontal: 8,
              }}>
              <PlusButton icon="plus" onPress={handlePlusIconClick} />
            </View>

            <View style={styles.clinic}>
              {value?.slots?.length > 0 && (
                <Text
                  style={{
                    fontFamily: CUSTOMFONTFAMILY.heading,
                    fontSize: CUSTOMFONTSIZE.h2,
                    color: CUSTOMCOLOR.black,
                    paddingVertical: 4,
                  }}>
                  Clinics
                </Text>
              )}

              {showSlotChip &&
                value.slots.map((slot, index) => (
                  <View style={{ margin: 5 }}>
                    <SlotChip
                      style={{ justifyContent: 'space-between' }}
                      key={index}
                      type={<Text>{slot}</Text>}
                      onPress={() => handleDeleteSlotChip(index)}
                    />
                  </View>
                ))}
            </View>
            <View>
              <HButton
                label="Next"
                onPress={() => {
                  fetchData();
                  SuccesRef?.current?.snapToIndex(1);
                }}
              />
            </View>
          </View>
        </BottomSheetView>
        <BottomSheetView bottomSheetRef={SuccesRef} snapPoints={'50%'}>
          <StatusMessage status={apiStatus.status} message={apiStatus.message} />
        </BottomSheetView>
      </View>
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
    clinic: {
      alignSelf: 'flex-start',
      paddingVertical: 16,
      //width:"100%"
    },
    modalcontainer: {
      //borderWidth:1,
      margin: 20,
      height: '100%',
      borderRadius: 10,
    },
  })};

  export default AddClinic;
