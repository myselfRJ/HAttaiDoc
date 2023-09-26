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
      style={{
        ...styles.tabcontainer,
        backgroundColor: props.selected
          ? CUSTOMCOLOR.primary
          : CUSTOMCOLOR.white,
      }}>
      <Text
        style={{
          ...styles.tabtext,
          color: props.selected ? CUSTOMCOLOR.white : CUSTOMCOLOR.black,
        }}>
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
    borderRadius: 4,
  },
  tabtext: {
    fontStyle: 'normal',
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.white,
  },
});

export default SelectionTab;
