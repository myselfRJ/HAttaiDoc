import Slider from '@react-native-community/slider';
import {Text, View} from 'react-native';
import {CUSTOMCOLOR} from '../settings/styles';
import {horizontalScale, moderateScale} from '../utility/scaleDimension';
import SubHeadText from './subheadText';
import {useState} from 'react';

export const SliderComponent = ({
  ValueText,
  label,
  value,
  setValue,
  min = 0,
  max,
  text,
}) => {
  const [interval, setinterval] = useState([]);
  return (
    <View style={{gap: 8}}>
      {text == true ? null : <SubHeadText label={label} />}
      <View style={{justifyContent: 'center', width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            // justifyContent: 'space-between',
            gap: horizontalScale(16),
          }}>
          <Text
            style={{
              color: CUSTOMCOLOR.black,
              fontSize: moderateScale(14),
              fontWeight: '400',
              alignSelf: 'center',
            }}>
            {min?.toString()}
          </Text>
          <Text
            style={{
              color: CUSTOMCOLOR.black,
              fontSize: moderateScale(14),
              fontWeight: '400',
              alignSelf: 'center',
            }}>
            {label}: {value?.toString()}
          </Text>
          <Text
            style={{
              color: CUSTOMCOLOR.black,
              fontSize: moderateScale(14),
              fontWeight: '400',
              alignSelf: 'center',
            }}>
            {max?.toString()}
          </Text>
        </View>
        <View
          style={{
            height: moderateScale(36),
            justifyContent: 'center',
            borderRadius: 20,
            // width: horizontalScale(350),
          }}>
          <Slider
            style={{
              slider: {height: moderateScale(100)},
              height: moderateScale(48),
            }}
            minimumValue={min ? min : 0}
            maximumValue={max}
            onValueChange={value => setValue(Math.floor(value))}
            minimumTrackTintColor={CUSTOMCOLOR.success}
            maximumTrackTintColor={CUSTOMCOLOR.disable}
            value={value}
          />
        </View>
      </View>
    </View>
  );
};
