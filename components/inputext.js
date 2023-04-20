import { View, StyleSheet, TextInput, Text } from "react-native";
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
const InputText = (props) => {
  //props-> label, placeholder , action
  return (
    <>
      <View style={styles.inpcontainer}>
        <Text style={styles.labeltext}>{Language[language][props.label]}</Text>
        <TextInput
          style={styles.textinput}
          // underlineColorAndroid="transparent"
          placeholder={props.placeholder}
        />
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
  }
});

export default InputText;
