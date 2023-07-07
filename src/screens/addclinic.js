import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Modal } from 'react-native';
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

const AddClinic = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState({
        clinic: '',
        fees: '',
        slots: [],
    });
    const [showSlotChip, setShowSlotChip] = useState(false);

    const handlePlusIconClick = () => {
        if (value.clinic) {
            setValue(prevValues => ({
                ...prevValues,
                slots: [...prevValues.slots, value.clinic],
                clinic: '',
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
    const toggleModal = () => {
        setShowModal(!showModal);
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
        <ScrollView contentContainerStyle={styles.container}>
            <Keyboardhidecontainer>

                <View style={commonstyles.content}>
                    <View style={styles.alignchild}>
                        <AddImage onPress={onImagePress} url={selectedImage} />
                    </View>
                    <InputText
                        label={Language[language]['clinic']}
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
                            onPress={toggleModal}
                        />

                        <Modal visible={showModal} animationType="slide" transparent={false} >
                            <View style={styles.modalcontainer}>
                                <ClinicAddress onPress={() => setShowModal(!showModal)} />

                            </View>
                        </Modal>


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

                        {showSlotChip &&
                            value.slots.map((slot, index) => (
                                 <View style={{ margin: 5 }}>
                                    <Text
                                        style={{
                                            fontFamily: CUSTOMFONTFAMILY.heading,
                                            fontSize: CUSTOMFONTSIZE.h2,
                                            color: CUSTOMCOLOR.black,
                                            paddingVertical: 4,
                                        }}
                                    >
                                        Clinics
                                    </Text><SlotChip
                                        key={index}
                                        type={<Text>{slot}</Text>}
                                        onPress={() => handleDeleteSlotChip(index)}
                                    /></View>
                            ))}
                    </View>
                    <HButton label="Next" onPress={() => navigation.navigate('adduser')} />
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
    clinic: {
        alignSelf: 'flex-start',
        paddingVertical: 16,
        //width:"100%"
    },
    modalcontainer: {
        //borderWidth:1,
        margin: 20,
        height: 900,
        borderRadius: 10
    }
});

export default AddClinic;
