import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';

const Logo = props => {
  return (
    <Image
  style={[styles?.img, props?.imgstyle]}
  source={
    props.src
      ? { uri: `data:image/jpeg;base64,${props.encodedBase64}` }
      : require('../assets/images/logo.png')
  }
/>)}

const styles = StyleSheet.create({
  img: {
    width: moderateScale(56),
    height: moderateScale(56),
  },
});
export default Logo;
