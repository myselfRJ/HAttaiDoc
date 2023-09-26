import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';

const VisitOpen = props => {
  //props-> label, placeholder , action
  return (
    <>
      <TouchableOpacity onPress={props.navigate} style={styles.inpcontainer}>
        <Text style={styles.text}>{props.label}</Text>
        <Icon name={props.icon} color={CUSTOMCOLOR.primary} size={16} />
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  inpcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '700',
    gap: moderateScale(4),
    borderRadius: moderateScale(4),
    //borderBottomWidth: 0.4,
    // borderBottomColor: CUSTOMCOLOR.primary,
  },
  text: {
    fontWeight: ' 600',
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
});

export default VisitOpen;
