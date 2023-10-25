import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  CUSTOMFONTSIZE,
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
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
      {props.id ? (<View style={[
        {
          ...styles.tokenContainer,
          backgroundColor: props.selected ? CUSTOMCOLOR.white :CUSTOMCOLOR.primary
        }
      ]}>
        <Text style={[
          {
            ...styles.token,
            color: props.selected ? CUSTOMCOLOR.primary : CUSTOMCOLOR.white,
          }
        ]}>{props.id}</Text>
      </View>) : null}
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
    paddingHorizontal:horizontalScale(6)
  },
  token: {
    color: CUSTOMCOLOR.white
  },
  tokenContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderWidth: 0.5,
    padding: moderateScale(2),
    borderBottomRightRadius: moderateScale(8),
    borderColor: CUSTOMCOLOR.black,
    backgroundColor:CUSTOMCOLOR.primary
  }
});

export default SelectionTab;
