import {StyleSheet} from 'react-native';
import {CUSTOMCOLOR} from '../settings/styles';

export const commonstyles = StyleSheet.create({
  main: {
    // justifyContent:'center',
    // alignItems:'center',
    gap: 16,
  },
  img: {
    width: '100%',
    height: 450,
    backgroundColor: CUSTOMCOLOR.primary,
  },
  content: {
    paddingHorizontal: 24,
    //paddingVertical: 24,
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  h1: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 32,
    color: CUSTOMCOLOR.black,
    fontWeight: '500',
    lineHeight: 72,
  },
  h2:{
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 24,
    color: CUSTOMCOLOR.black,
    fontWeight: '500',
    lineHeight: 64,
  }
});
