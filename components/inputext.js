import { View, StyleSheet, TextInput, Text } from "react-native";
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
const InputText = () => {
  return (
    <>
      <View style={styles.inpcontainer}>
        <Text style={styles.labeltext}>Add Me</Text>
        <TextInput
          style={styles.textinput}
          underlineColorAndroid="transparent"
          placeholder="Hello hattai"
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  inpcontainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: "700",
    gap: 4,
    // backgroundColor: CUSTOMCOLOR.white,
    borderRadius: 4
  },
  labeltext: {
    fontWeight: 50,
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black
  },
  textinput: {
    backgroundColor: CUSTOMCOLOR.white,

    paddingHorizontal: 8,
    paddingVertical: 12,
    fontWeight: "400",
    fontSize: CUSTOMFONTSIZE.h3,
    outlineStyle: "none",
    borderRadius: 4
  }
});

export default InputText;
