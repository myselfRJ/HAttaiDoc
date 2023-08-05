import React from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';

const Logo=(props)=>{
    return(
      <View>
        <Image style={[styles?.img ,props?.imgstyle]} source={require('../assets/images/logo.jpg')}/>
      </View>
    )
}
const styles = StyleSheet.create({
    img:{
        width: 48,
        height: 48,
    }
})
export default Logo;
