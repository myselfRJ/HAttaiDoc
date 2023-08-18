import React, { useState } from 'react';
import {View,Text,TextInput,StyleSheet} from 'react-native';
import InputText from './inputext';
import { HButton } from '.';
import { horizontalScale, moderateScale, verticalScale } from '../utility/scaleDimension';
import { TouchableOpacity } from 'react-native';
import { CUSTOMCOLOR } from '../settings/styles';

const PresComponent=(props)=>{
    return(
      <View style={styles.main}>
        <InputText
        label={props.label}
        placeholder={props.placeholder}
        value={props.values}
        setValue={props.onChange}
        />
        {/* <View style={{flexDirection:'row',gap:16}}>
          {props.data?.map((item,index)=>(<TouchableOpacity onpress={props.select(item)} style={[{borderWidth:1,padding:8,borderRadius:8},props.style]}>
            <Text style={{color:CUSTOMCOLOR.black}}>{item}</Text>
          </TouchableOpacity>))} */}
        {/* </View> */}
        <View style={{marginTop:moderateScale(8),marginBottom:moderateScale(8)}}>
          {props.suggestion}
        </View>
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