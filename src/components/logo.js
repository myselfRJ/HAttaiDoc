import React from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';

const Logo=(props)=>{
    return(
      <View>
        <Image style={[styles?.img ,props?.imgstyle]} source={require('../assets/images/logo.png')}/>
      </View>
    )
}
const styles = StyleSheet.create({
    img:{
        width: 56,
        height: 56,
    }
})
export default Logo;
