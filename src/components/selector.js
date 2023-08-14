import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';

const SelectorBtn = props => {
  return (
    <View>
      {props.label && <Text style={styles.h3}>{props.label}</Text>}
      <Pressable style={{...styles.select,...props.select}} onPress={props.onPress}>
        <Text style={styles.h3}>{props.input}</Text>
        <Icon name={props.name} size={24} color={CUSTOMCOLOR.primary} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  select: {
    flexDirection: 'row',
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: CUSTOMCOLOR.white,
    // width: horizontalScale(240),
    borderRadius: moderateScale(4),
  },
  h3: {
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
    lineHeight: CUSTOMFONTSIZE.h3 * 2,
  },
});

export default SelectorBtn;
