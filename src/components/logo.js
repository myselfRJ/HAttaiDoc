import React from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';

const Logo=(props)=>{
    return(
      
        <Image style={[styles?.img ,props?.imgstyle]} source={require('../assets/images/logo.png')}/>
    
    )
}
const styles = StyleSheet.create({
    img:{
        width: 56,
        height: 56,
    }
})
export default Logo;
