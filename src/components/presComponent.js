import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import InputText from './inputext';
import {HButton, PlusButton} from '.';
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
        <PlusButton
      // btnstyles={{alignSelf}}
      icon={'plus'}
        // label="Add"
        size={moderateScale(32)}
        style={{alignSelf: 'flex-end',}}
        onPress={props.onPress}
      />
      <View
        style={{marginTop: moderateScale(4), marginBottom: moderateScale(8)}}>
        {props.suggestion}
      </View>
    
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: moderateScale(10),
        }}>
        <HButton
          label={'Save'}
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
