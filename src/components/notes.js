import { View, StyleSheet, TextInput, Text, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CUSTOMCOLOR, CUSTOMFONTSIZE, CUSTOMFONTFAMILY } from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import { useState, useEffect } from 'react';

const Notes = ({note,onChangeText,onPress}) => {
    return(
        <>
        <View style={styles.inputbox}>
        <TextInput
        style={styles.notes}
        multiline={true}
        placeholder='write your notes'
        value={note}
        onChangeText={onChangeText}
       /></View>
       <TouchableOpacity style={styles.submitbtn} onPress={onPress}>
       <Text style={{ color: CUSTOMCOLOR.primary }}>
                        {Language[language]['submit']}
                    </Text>
       </TouchableOpacity>
        </>
    )
}
   
const styles = StyleSheet.create({
    main: {
        width: 651,
        height: 35,
        justifyContent: "space-around",
        padding: 8
    },
    h2: {
        fontSize: 20,
        fontWeight: 700,
        fontFamily: CUSTOMFONTFAMILY.opensans,
        lineHeight: 20 * 2,
        color: CUSTOMCOLOR.black,
        padding: 10
    },
    notesText: {
        width: 40,
        height: 19,
        fontFamily: CUSTOMFONTFAMILY.heading,
        //fontWeight:600,
        fontSize: 14,
        lineHeight: 19.07,
        color: CUSTOMCOLOR.black

    },
    inputbox: {
        width: 651,
        height: 60,
        padding: 8,
        gap: 4,

    },
    notes: {
        width:635,
        height:44,
        borderRadius:4,
        padding:8,
        gap:10,
        backgroundColor:CUSTOMCOLOR.white
    },
    submitbtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        alignSelf:"center",
        margin:40,
        borderWidth:1,
        borderColor:CUSTOMCOLOR.primary,
        borderRadius:4
    }

});
export default Notes;