import {Pressable, StyleSheet, Text} from 'react-native';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
const InfoTicket = () => {
  return (
    <>
      <Pressable style={styles.infocontainer}>
        <Text style={styles.numtext}>25</Text>
        <Text style={styles.text}>{Language[language]['total']}</Text>
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  infocontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
    paddingVertical: 24,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '700',
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: 4,
  },
  numtext: {
    fontWeight: 700,
    fontSize: CUSTOMFONTSIZE.h1,
    color: CUSTOMCOLOR.primary,
  },
  text: {
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h5,
    color: CUSTOMCOLOR.primary,
  },
});

export default InfoTicket;
