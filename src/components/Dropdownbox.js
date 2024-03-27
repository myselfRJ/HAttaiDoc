import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {
  CUSTOMCOLOR,
  CUSTOMFONTSIZE,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';

const DropdownComponent = props => {
  const data = props.data;
  const setValue = props.select;
  const [visible, setVisible] = React.useState(props.secure || true);
  return (
    <View style={{gap: moderateScale(4.5), ...props.container}}>
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
      <Dropdown
        // itemContainerStyle={{borderWidth:1,margin:0}}
        style={{...styles.dropdown, ...props.style}}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={props.search}
        searchPlaceholder={props.searchPlaceholder}
        maxHeight={moderateScale(300)}
        labelField="value"
        valueField="label"
        placeholder={props.placeholder}
        value={props.value}
        onChange={item => {
          setValue(item.label);
        }}
        itemTextStyle={{color: CUSTOMCOLOR.black, lineHeight: 16}}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: CUSTOMCOLOR.white,
    // marginTop: verticalScale(4),
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(2),
    // paddingBottom: verticalScale(4.2),
    fontWeight: '400',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: CUSTOMCOLOR.primary,
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(8),
    fontSize: CUSTOMFONTSIZE.h3,
    fontFamily: CUSTOMFONTFAMILY.body,
    // marginHorizontal: 3,
    // marginVertical: 15,
  },
  placeholderStyle: {
    fontSize: CUSTOMCOLOR.h3,
    color: CUSTOMCOLOR.disable,
  },
  selectedTextStyle: {
    // margin: moderateScale(5),
    fontSize: CUSTOMCOLOR.h3,
    color: CUSTOMCOLOR.black,
  },
  iconStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  inputSearchStyle: {
    height: moderateScale(40),
    fontSize: CUSTOMCOLOR.h3,
    color: CUSTOMCOLOR.black,
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
});
