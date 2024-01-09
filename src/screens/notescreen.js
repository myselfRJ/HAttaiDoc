import {View, StyleSheet, Text} from 'react-native';
import Notes from '../components/notes';
import {TextInput} from 'react-native';
import {HButton} from '../components';
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
import {useEffect, useState} from 'react';
import {commonstyles} from '../styles/commonstyle';
const NoteScreen = () => {
  const nav = useNavigation();
  const appointmentID = useSelector(state => state?.address?.appointment_id);
  const note = useSelector(state => state.prescription.note);
  const [illness, setIllness] = useState('');
  const dispatch = useDispatch();
  const handleNoteChange = () => {
    dispatch(
      addNote([...note, {note: illness, appointment_id: appointmentID}]),
    );
    nav.goBack();
  };
  useEffect(() => {
    setIllness(
      note?.length > 0
        ? note
            ?.filter(item => item?.appointment_id === appointmentID)
            ?.slice(-1)?.[0]?.['note']
        : '',
    );
  }, []);
  return (
    <View
      style={{
        paddingHorizontal: horizontalScale(24),
        paddingVertical: verticalScale(16),
        flex: 1,
        backgroundColor: CUSTOMCOLOR.background,
      }}>
      <PrescriptionHead heading={'Present Illness'} />

      <View style={styles.inputbox}>
        <TextInput
          style={styles.notes}
          placeholderTextColor={CUSTOMCOLOR.disable}
          multiline={true}
          placeholder="write your notes"
          value={illness}
          onChangeText={val => setIllness(val)}
        />
      </View>
      <View style={{justifyContent: 'flex-end', flex: 1}}>
        <HButton
          label={Language[language]['save']}
          onPress={handleNoteChange}
          btnstyles={commonstyles.activebtn}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    // flex:1,
    justifyContent: 'space-around',
    padding: moderateScale(8),
    gap: moderateScale(8),
    // backgroundColor:CUSTOMCOLOR.background
  },
  inputbox: {
    // flex:1,
    width: '100%',
    // height: moderateScale(60),
    // padding: moderateScale(8),
    // gap: moderateScale(4),
    borderWidth: 0.75,
    borderColor: CUSTOMCOLOR.primary,
    paddingHorizontal: horizontalScale(8),
    borderRadius: moderateScale(4),
  },
  notes: {
    borderRadius: moderateScale(4),
    padding: moderateScale(8),
    gap: moderateScale(10),
    color: CUSTOMCOLOR.black,
    backgroundColor: CUSTOMCOLOR.white,
  },
  submitbtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(8),
    alignSelf: 'center',
    margin: moderateScale(40),
    borderWidth: 1,
    borderColor: CUSTOMCOLOR.primary,
    borderRadius: moderateScale(4),
  },
});
export default NoteScreen;
