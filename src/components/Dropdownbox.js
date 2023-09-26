import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
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

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={moderateScale(300)}
      labelField="value"
      valueField="label"
      placeholder={props.placeholder}
      value={props.value}
      onChange={item => {
        setValue(item.label);
      }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: CUSTOMCOLOR.white,
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(2),
    fontWeight: '400',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: CUSTOMCOLOR.primary,
    paddingLeft: moderateScale(15),
    fontSize: CUSTOMFONTSIZE.h3,
    fontFamily: CUSTOMFONTFAMILY.body,
    marginHorizontal: 3,
    // marginVertical: 15,
  },
  placeholderStyle: {
    fontSize: moderateScale(16),
    color: CUSTOMCOLOR.background,
  },
  selectedTextStyle: {
    margin: moderateScale(5),
    fontSize: moderateScale(16),
    color: CUSTOMCOLOR.primary,
  },
  iconStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  inputSearchStyle: {
    height: moderateScale(40),
    fontSize: moderateScale(16),
  },
});
