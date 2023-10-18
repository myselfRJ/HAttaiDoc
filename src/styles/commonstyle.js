import {StyleSheet} from 'react-native';
import {CUSTOMCOLOR} from '../settings/styles';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';

export const commonstyles = StyleSheet.create({
  main: {
    // justifyContent:'center',
    // alignItems:'center',
    gap: moderateScale(16),
  },
  img: {
    width: '100%',
    height: moderateScale(450),
    backgroundColor: CUSTOMCOLOR.primary,
  },
  content: {
    paddingHorizontal: moderateScale(24),
    //paddingVertical: 24,
    width: '100%',
    alignItems: 'center',
    gap: moderateScale(4),
    // borderWidth:1
  },
  h1: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: moderateScale(32),
    color: CUSTOMCOLOR.black,
    fontWeight: '500',
    lineHeight: verticalScale(72),
  },
  h2: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 24,
    color: CUSTOMCOLOR.black,
    fontWeight: '500',
    lineHeight: verticalScale(64),
  },
});
