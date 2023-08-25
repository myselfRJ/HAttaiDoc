import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTSIZE,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {useState, useEffect} from 'react';
import HButton from '../components/button';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';

const Notes = ({note, onChangeText, onPress}) => {
  return (
    <>
      <View style={styles.inputbox}>
        <TextInput
          style={styles.notes}
          multiline={true}
          placeholder="write your notes"
          value={note}
          onChangeText={onChangeText}
        />
      </View>
      <View style={{alignItems: 'center', padding: moderateScale(16)}}>
        <HButton label={Language[language]['save']} onPress={onPress} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputbox: {
    width: '100%',
    height: moderateScale(60),
    padding: moderateScale(8),
    gap: moderateScale(4),
  },
  notes: {
    borderRadius: moderateScale(4),
    padding: moderateScale(8),
    gap: moderateScale(10),
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
export default Notes;
