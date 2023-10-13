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
  const [visible, setVisible] = React.useState(props.secure || true);
  return (
    <View style={[styles.selectContainer, props.selectContainer]}>
      {props.label && (
        <Text style={styles.h3}>
          {props.label}{' '}
          {props.required ? (
            <Text
              style={[
                styles.indicator,
                props.required && visible && styles.required,
              ]}>
              *
            </Text>
          ) : null}
        </Text>
      )}
      <Pressable
        style={{...styles.select, ...props.select}}
        onPress={props.onPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name={props.Bname}
            size={props.size ? props.size : moderateScale(24)}
            color={CUSTOMCOLOR.white}
          />
          <Text style={{...styles.h3, ...props.inputstyle}}>{props.input}</Text>
        </View>
        <Icon
          name={props.name}
          size={props.size ? props.size : moderateScale(24)}
          color={CUSTOMCOLOR.primary}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    gap: verticalScale(4),
    paddingVertical: verticalScale(8),
  },

  select: {
    flexDirection: 'row',
    backgroundColor: '#F4F7Fa',
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: CUSTOMCOLOR.white,
    // width: horizontalScale(240),
    borderRadius: moderateScale(4),
    borderColor: CUSTOMCOLOR.primary,
  },
  h3: {
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
    // lineHeight: CUSTOMFONTSIZE.h3 * 1.75,
  },
  indicator: {
    fontSize: CUSTOMFONTSIZE.h3,
    marginRight: 5,
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: moderateScale(8),
    flex: 1,
  },
});

export default SelectorBtn;
