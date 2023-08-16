import React, { useState } from 'react';
import {View,Text,TextInput,StyleSheet} from 'react-native';
import InputText from './inputext';
import { HButton } from '.';
import { horizontalScale, verticalScale } from '../utility/scaleDimension';

const PresComponent=(props)=>{
    return(
      <View style={styles.main}>
        <InputText
        label={props.label}
        placeholder={props.placeholder}
        value={props.values}
        setValue={props.onChange}
        />
        <HButton label='Add' btnstyles={{alignSelf:'center'}} onPress={props.onPress}/>
      </View>
    )
}
const styles = StyleSheet.create({
    main:{
        // paddingHorizontal:24,
        // paddingVertical:24,
        gap:16
    }
})
export default PresComponent;