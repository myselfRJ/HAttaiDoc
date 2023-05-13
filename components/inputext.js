import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";

import React from "react";
import Icon from'react-native-vector-icons/MaterialCommunityIcons';
const InputText = (props) => {
  //props-> check, label, placeholder , action, secure, padtype
  const [visible,setVisible] = React.useState(props.secure||true)
  const [errorStyles,setErrorStyle] = React.useState({})
  const toggleVisible =()=>{
    setVisible(!visible)
  }

  const passtoParent=(e)=>{

    props.setValue(e)
    if(props.doubleCheck[0]){!props.check(e)?setErrorStyle({borderColor:CUSTOMCOLOR.error,borderWidth:1}):setErrorStyle({})}
    if(props.doubleCheck[1]){!props.check2[0](props.check2[1],e)?setErrorStyle({borderColor:CUSTOMCOLOR.error,borderWidth:1}):setErrorStyle({})}
  }

  
  return (
    <>
      <View style={styles.inpcontainer}>
        <Text style={styles.labeltext}>{props.label}</Text>
        <View>
        <TextInput
          style={[styles.textinput,errorStyles]}
          // underlineColorAndroid="transparent"
          placeholder={props.placeholder}
          secureTextEntry={props.secure?visible:false}
          inputMode={props.keypad??"default"}
          maxLength={props.maxLength??20}
          onChangeText={passtoParent}
          value={props.value}
        />
        {props.secure!==undefined?visible?(<TouchableOpacity style={{...styles.eye}} onPress={toggleVisible}><Icon  name={"eye-off"} color={CUSTOMCOLOR.primary} size={16}/></TouchableOpacity>):(<TouchableOpacity style={styles.eye} onPress={toggleVisible}><Icon  name={"eye"} color={CUSTOMCOLOR.primary} size={16}/></TouchableOpacity>):<></>}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  inpcontainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    width:'100%',
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: "700",
    gap: 4,
    // backgroundColor: CUSTOMCOLOR.white,
    borderRadius: 4
  },
  labeltext: {
    fontWeight: '500',
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black
  },
  textinput: {
    backgroundColor: CUSTOMCOLOR.white,

    paddingHorizontal: 8,
    paddingVertical: 12,
    fontWeight: "400",
    fontSize: CUSTOMFONTSIZE.h3,
    // outlinedStyle: "none",
    borderRadius: 4
  },
  eye:{
    position:"absolute",
    top:19,//12+fontsize.h3/2
    right:10,

  }
});

export default InputText;
