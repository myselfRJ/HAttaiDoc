import {Pressable, ActivityIndicator, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
const HButton = props => {
  //props -> label, action
  return (
    <>
      <Pressable
        style={[styles?.btncontainer, props.btnstyles]}
        onPress={props.loading ? null : props.onPress}>
        {props.icon && (
          <Icon
            style={styles.icon}
            name={props.icon}
            color={CUSTOMCOLOR.white}
            size={moderateScale(24)}
          />
        )}
        {props.loading && (
          <ActivityIndicator size="small" color={CUSTOMCOLOR.white} />
        )}
        <Text style={styles.btntext}>{props.label}</Text>
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  btncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(CUSTOMFONTSIZE.h3),
    fontWeight: '600',
    backgroundColor: CUSTOMCOLOR.primary,
    borderRadius: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
    gap: verticalScale(8),
  },
  btntext: {
    fontWeight: 600,
    fontSize: moderateScale(14),
    color: CUSTOMCOLOR.white,
  },
});

export default HButton;
