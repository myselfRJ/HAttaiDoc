import {Pressable, StyleSheet, Text} from 'react-native';
import {
  CUSTOMFONTSIZE,
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../utility/scaleDimension';

const SelectionTab = props => {
  return (
    <Pressable
      onPress={props?.onPress}
      style={[
        {
          ...styles.tabcontainer,
          backgroundColor: props.selected
            ? CUSTOMCOLOR.primary
            : CUSTOMCOLOR.white,
          borderWidth: props.selected ? 0 : 0.5,
          // borderColor:CUSTOMCOLOR.primary
        },
        props.selectContainer,
      ]}>
      <Text
        style={[
          {
            ...styles.tabtext,
            color: props.selected ? CUSTOMCOLOR.white : CUSTOMCOLOR.primary,
          },
          props.text,
        ]}>
        {props.label}
      </Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  tabcontainer: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    backgroundColor: CUSTOMCOLOR.primary,
    borderWidth: 0.5,
    borderRadius: moderateScale(4),
  },
  tabtext: {
    fontStyle: 'normal',
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.white,
  },
});

export default SelectionTab;
