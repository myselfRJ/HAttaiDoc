import React from "react";
import { Image, Text, View,StyleSheet } from "react-native";
import { moderateScale } from "../utility/scaleDimension";


const Gif = (props) => {
    return (
        <View>
          <View>
            <Image source={props.gif} style={[styles.rec,props.style]}/>
          </View>
        </View>
    );
};

const styles=StyleSheet.create({
  rec:{
      width: moderateScale(899),
      height: moderateScale(450),
  },
});

export default Gif;