import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {moderateScale} from '../utility/scaleDimension';

const CustomIcon = props => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Icon
        name="table-alert"
        size={moderateScale(80)}
        color={CUSTOMCOLOR.primary}
      />
      <Text
        style={{
          fontWeight: 500,
          fontSize: moderateScale(14),
          color: CUSTOMCOLOR.black,
        }}>
        {props.label}
      </Text>
    </View>
  );
};
export default CustomIcon;
