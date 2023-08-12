import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';

const Logo = props => {
  return (
    <View>
      <Image
        style={[styles?.img, props?.imgstyle]}
        source={require('../assets/images/logo.png')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: horizontalScale(56),
    height: verticalScale(56),
  },
});
export default Logo;
