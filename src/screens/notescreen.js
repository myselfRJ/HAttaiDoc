import {View, StyleSheet, Text} from 'react-native';
import Notes from '../components/notes';
import {
  CUSTOMCOLOR,
  CUSTOMFONTSIZE,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {useDispatch, useSelector} from 'react-redux';
import {addNote} from '../redux/features/prescription/prescriptionSlice';
import {useNavigation} from '@react-navigation/native';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';

import PrescriptionHead from '../components/prescriptionHead';
const NoteScreen = () => {
  const nav = useNavigation();
  const note = useSelector(state => state.prescription.note);
  const dispatch = useDispatch();
  const handlePress = () => {
    nav.goBack();
  };
  const handleNoteChange = newNote => {
    dispatch(addNote(newNote));
  };
  return (
    <View
      style={{
        paddingHorizontal: horizontalScale(24),
        paddingVertical: verticalScale(24),
      }}>
      <View style={styles.main}>
        <PrescriptionHead heading={Language[language]['notes']} />
      </View>
      <Notes
        note={note}
        onChangeText={handleNoteChange}
        onPress={handlePress}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-around',
    padding: moderateScale(8),
    gap: moderateScale(8),
  },
});
export default NoteScreen;
