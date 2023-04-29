import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
import React from "react";
import Icon from'react-native-vector-icons/MaterialCommunityIcons';
const InputText = (props) => {
  //props-> label, placeholder , action, secure, padtype
  const [visible,setVisible] = React.useState(props.secure||true)
  const toggleVisible =()=>{
    setVisible(!visible)
  }
  console.log(props.secure,visible)
  return (
    <>
      <View style={styles.inpcontainer}>
        <Text style={styles.labeltext}>{Language[language][props.label]}</Text>
        <View>
        <TextInput
          style={styles.textinput}
          // underlineColorAndroid="transparent"
          placeholder={props.placeholder}
          secureTextEntry={props.secure?visible:false}
          inputMode={props.keypad??"default"}
          maxLength={props.maxLength??20}
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
