import { Pressable, View, StyleSheet, Text } from "react-native";
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
const HButton = (props) => {
  //props -> label, action
  return (
    <>
      <Pressable style={styles.btncontainer}>
        <View style={styles.icon}></View>
        <Text style={styles.btntext}>{Language[language][props.label]}</Text>
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  btncontainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: "700",
    backgroundColor: CUSTOMCOLOR.primary,
    borderRadius: 4,
    gap: 8
  },
  btntext: {
    fontWeight: 600,
    fontSize: 14,
    color: CUSTOMCOLOR.white
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    backgroundColor: CUSTOMCOLOR.white
  }
});

export default HButton;
