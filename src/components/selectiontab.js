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
        {...styles.tabcontainer,
        backgroundColor: props.selected
          ? CUSTOMCOLOR.primary
          : CUSTOMCOLOR.white,
        borderWidth: props.selected ? 0 : 0.5},
        props.selectContainer
      ]}>
      <Text
        style={[{
          ...styles.tabtext,
          color: props.selected ? CUSTOMCOLOR.white : CUSTOMCOLOR.primary,
        },props.text]}>
        {props.label}
      </Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  tabcontainer: {
    paddingHorizontal: verticalScale(24),
    paddingVertical: verticalScale(16),
    backgroundColor: CUSTOMCOLOR.primary,
    borderWidth: 1,
    borderRadius: 4,
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
