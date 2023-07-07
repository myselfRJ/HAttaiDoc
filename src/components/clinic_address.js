import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import {
    CUSTOMCOLOR,
    CUSTOMFONTFAMILY,
    CUSTOMFONTSIZE,
} from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import InputText from '../components/inputext';
import HButton from '../components/button';


const ClinicAddress = (props) => {
    
    const [input, setInput] = useState({
        buildingno: '',
        street: ''
    })
    const handleChangeValue = (field, value) => {
        setInput(prevValues => ({
            ...prevValues,
            [field]: value,
        }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}></View>
            <View style={styles.bottom}>
                <View style={styles.addressContainer}>
                    <InputText
                        label={Language[language]['buildingno']}
                        placeholder="Building No"
                        value={input.buildingno}
                        setValue={value => handleChangeValue('buildingno', value)}
                    />
                    <InputText
                        label={Language[language]['street']}
                        placeholder="Street Address"
                        value={input.street}
                        setValue={value => handleChangeValue('street', value)}
                    />
                    <View style={{ alignSelf: 'center' }}>
                    <HButton label="Save"  onPress={props.onPress}/>
                </View>
                </View>
                
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        height: 500,
        width: "100%",
        top: 43,
        backgroundColor: CUSTOMCOLOR.primary
    },
    bottom: {
        backgroundColor: CUSTOMCOLOR.white
    },
    addressContainer: {
        width: 635,
        height: 250,
        top: 100,
        alignSelf: 'center',
        // gap:24,
        //borderWidth:1,
        borderRadius: 5
    }
})
export default ClinicAddress;