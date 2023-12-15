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
        <View style={{flexDirection: 'row', gap: horizontalScale(16)}}>
          <Text style={[styles.text, props.textstyle]}>{props.label}</Text>
          {props.date ? (
            <Text
              style={{fontSize: CUSTOMFONTSIZE.h3, color: CUSTOMCOLOR.primary}}>
              Updated Date: {props.date}
            </Text>
          ) : null}
        </View>

        <View style={{flexDirection: 'row', gap: moderateScale(8)}}>
          {props.doneIcon && (
            <View style={styles.gap}>
              <Icon
                name={props.doneIcon}
                color={CUSTOMCOLOR.success}
                // style={{
                //   borderWidth: 1,
                //   borderColor: CUSTOMCOLOR.borderColor,
                //   borderRadius: moderateScale(100),
                //   // padding: moderateScale(4),
                // }}
                size={moderateScale(16)}
              />
            </View>
          )}
          <View style={[styles.gap, props.iconstyle]}>
            <Icon
              name={props.icon}
              color={CUSTOMCOLOR.primary}
              // style={{
              //   borderWidth: 1,
              //   borderColor: CUSTOMCOLOR.borderColor,
              //   borderRadius: moderateScale(100),
              //   // padding: moderateScale(4),
              // }}
              size={props.size ? props.size : moderateScale(16)}
            />
          </View>
        </View>
        {/* <Icon
            name={'pencil'}
            color={CUSTOMCOLOR.primary}
            style={{
              borderWidth: 1,
              borderColor: CUSTOMCOLOR.borderColor,
              borderRadius: moderateScale(100),
              padding: moderateScale(4),
            }}
            size={moderateScale(16)}
          /> */}
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  inpcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '700',
    gap: moderateScale(4),
    borderRadius: moderateScale(4),

    // borderBottomColor: CUSTOMCOLOR.primary,
  },
  text: {
    fontWeight: '600',
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  gap: {
    flexDirection: 'row',
    height: moderateScale(32),

    width: moderateScale(32),

    borderWidth: moderateScale(1),
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: '#C0DFFC',
    borderRadius: moderateScale(24),
  },
});

export default VisitOpen;
