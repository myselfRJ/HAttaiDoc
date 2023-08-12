import { View, StyleSheet, Text } from 'react-native';
import Notes from '../components/notes';
import { CUSTOMCOLOR, CUSTOMFONTSIZE, CUSTOMFONTFAMILY } from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../redux/features/prescription/prescriptionSlice';
import { useNavigation } from '@react-navigation/native';
import PrescriptionHead from '../components/prescriptionHead';
const NoteScreen = () => {
    const nav=useNavigation();
    const note = useSelector((state) => state.prescription.note);
    const dispatch = useDispatch();
    const handlePress = () => {
        console.log(note);
        nav.goBack();
    };
    const handleNoteChange = (newNote) => {
        dispatch(addNote(newNote));
    };
    return (
        <View style={{ paddingHorizontal: 24,
            paddingVertical: 24,}}>
            <View style={styles.main}>
                <PrescriptionHead heading={Language[language]['notes']}/>
                
            </View>
            <Notes note={note} onChangeText={handleNoteChange} onPress={handlePress} />
        </View>
    )
};
const styles = StyleSheet.create({
    main: {
        justifyContent: "space-around",
        padding: 8,
        gap:8,
        justifyContent:'space-around'
    },
    h2: {
        fontSize: 20,
        fontWeight: 700,
        fontFamily: CUSTOMFONTFAMILY.opensans,
        lineHeight: 20 * 2,
        color: CUSTOMCOLOR.black,
        padding: 16
    },
    notesText: {
        fontFamily: CUSTOMFONTFAMILY.heading,
        fontWeight:600,
        fontSize: 14,
        lineHeight: 19.07,
        color: CUSTOMCOLOR.black,

    },
});
export default NoteScreen;
