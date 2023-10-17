import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {moderateScale} from '../utility/scaleDimension';
import {mode} from '../redux/features/prescription/prescribeslice';

const Gif = props => {
  return (
    <View style={styles.rec}>
      <Image
        source={props.gif}
        style={{
          ...props.style,
          resizeMode: 'center',
          height: moderateScale(400),
          width: moderateScale(400),
          aspectRatio: 0.6,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rec: {
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(899),
    height: moderateScale(300),
  },
});

export default Gif;
