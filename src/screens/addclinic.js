import React, { useState, useRef } from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';

const AddClinic = ({ navigation }) => {
    const addressRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [value, setValue] = useState({
        clinic: '',
        fees: '',
        slots: [],
    });
    const fetchData=async()=>{
        try {
            const response = await fetch(URL.addclinic,{
                method:'POST',
                headers:{
                    'authorization': 'ghghg',
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({"user-id":'0d515acf-4ebd-4d22-8697-ddc5925e029a',"clinic-name":value.clinic,clinic_address:'',fees:value.fees }), 
            });
            if (response.ok) {
                const jsonData = await response.json();
                console.log(jsonData);
                navigation.navigate('adduser');
              } else {
                navigation.navigate('adduser');
                console.error('API call failed:', response.status,response);
              }
            } catch (error) {
              console.error('Error occurred:', error);
            }

    }
    const [showSlotChip, setShowSlotChip] = useState(false);

    const handlePlusIconClick = () => {
        if (value.clinic) {
            setValue(prevValues => ({
                ...prevValues,
                slots: [...prevValues.slots, value.clinic],
                //clinic: '',
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
        <View style={{flex:1}}>
            <ScrollView>
                <Keyboardhidecontainer>

                    <View style={commonstyles.content}>
                        <View style={styles.alignchild}>
                            <AddImage onPress={onImagePress} url={selectedImage} />
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
                                height: 100,
                            }}
                        >
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
                        <View style={{ alignSelf: 'flex-start' }}>
                            <HButton label="Add Slots" onPress={handlePlusIconClick} />
                        </View>
                        <View
                            style={{ alignSelf: 'flex-end', bottom: 0, paddingVertical: 8 }}
                        >
                            <PlusButton icon="plus" onPress={handlePlusIconClick} />
                        </View>

                        <View style={styles.clinic}>
                            {value?.slots?.length>0 && <Text
                                style={{
                                    fontFamily: CUSTOMFONTFAMILY.heading,
                                    fontSize: CUSTOMFONTSIZE.h2,
                                    color: CUSTOMCOLOR.black,
                                    paddingVertical: 4,
                                }}
                            >
                                Clinics
                            </Text>}

                            {showSlotChip &&
                                value.slots.map((slot, index) => (
                                    <View style={{ margin: 5 }}>
                                        <SlotChip
                                            style={{ justifyContent: 'space-between' }}
                                            key={index}
                                            type={<Text>{slot}</Text>}
                                            onPress={() => handleDeleteSlotChip(index)}
                                        /></View>
                                ))}
                        </View>
                        <View>
                            <HButton label="Next" onPress={fetchData} />
                        </View>
                    </View>
                </Keyboardhidecontainer>
            </ScrollView>
            <BottomSheetView
                            bottomSheetRef={addressRef}
                            snapPoints={'100%'}>
                            <View style={styles.modalcontainer}>
                                <ClinicAddress onPress={() => {
                                    addressRef?.current?.snapToIndex(0);
                                }} />
        

                            </View>
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
        height: "100%",
        borderRadius: 10
    }
});

export default AddClinic;