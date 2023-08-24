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
    <View>
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
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
    lineHeight: CUSTOMFONTSIZE.h3 * 2,
  },
  indicator: {
    fontSize: CUSTOMFONTSIZE.h4,
    marginRight: 5,
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    flex: 1,
  },
});

export default SelectorBtn;
