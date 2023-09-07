import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import InputText from './inputext';
import {HButton} from '.';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {TouchableOpacity} from 'react-native';
import {CUSTOMCOLOR} from '../settings/styles';
import {useNavigation} from '@react-navigation/native';

const PresComponent = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <InputText
        label={props.label}
        placeholder={props.placeholder}
        value={props.values}
        setValue={props.onChange}
      />
      <View
        style={{marginTop: moderateScale(8), marginBottom: moderateScale(8)}}>
        {props.suggestion}
      </View>
      <HButton
        label="Add"
        btnstyles={{alignSelf: 'center'}}
        onPress={props.onPress}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: moderateScale(10),
        }}>
        <HButton
          label={'Next'}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    // paddingHorizontal:24,
    // paddingVertical:24,
    gap: moderateScale(16),
  },
});
export default PresComponent;
