import { View, StyleSheet, TextInput, Text, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CUSTOMCOLOR, CUSTOMFONTSIZE, CUSTOMFONTFAMILY } from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import { useState, useEffect } from 'react';

const Notes = () => {
    const [notes, setNotes] = useState('')
    const ChangeNotes = (value) => {
        setNotes(value)
    }
    const handlePress=()=>{
        console.log(notes)
    }
    return (
        <View>
            <Text style={styles.h2}>{Language[language]['consultation']}</Text>
            <View style={styles.main}>
                <Text style={styles.notesText}>{Language[language]['notes']}</Text>
            </View>
            <View style={styles.inputbox}>
                <TextInput
                    placeholder="write  your notes"
                    multiline={true}
                    style={styles.notes}
                    value={notes}
                    onChangeText={ChangeNotes}
                />
            </View>
            <View style={styles.submitbtn}>
                <TouchableOpacity
                    onPress={handlePress}
                    style={{
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: CUSTOMCOLOR.primary,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        width: 100,
                        alignItems:"center"
                    }}>
                    <Text style={{ color: CUSTOMCOLOR.primary }}>
                        {Language[language]['submit']}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

    );


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
        width: 700,
        height: 44,
        borderRadius: 4,
        padding: 8,
        gap: 10,
        borderWidth: 0.5,
        borderColor: CUSTOMCOLOR.primary,
    },
    submitbtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        alignSelf:"center",
        margin:40
    }

});
export default Notes;