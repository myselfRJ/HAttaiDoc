import React, { useState } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import {
    CUSTOMCOLOR,
    CUSTOMFONTFAMILY,
    CUSTOMFONTSIZE,
} from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import InputText from '../components/inputext';
import HButton from '../components/button';
import { ScrollView } from 'react-native-gesture-handler';

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
            <ScrollView>
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
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        //borderWidth:1,
        height:"100%",
        flex: 1,
        backgroundColor: CUSTOMCOLOR.white,
    },
    top: {
        height: 700,
        width: "100%",
        top: 30,
        backgroundColor: CUSTOMCOLOR.primary
    },
    bottom: {
        backgroundColor: CUSTOMCOLOR.white,
        height:300

    },
    addressContainer: {
        width: 635,
         height: 174,
        top: 50,
        alignSelf: 'center',
        borderRadius: 5
    }
})
export default ClinicAddress;