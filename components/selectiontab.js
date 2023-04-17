import { Pressable, StyleSheet, Text } from "react-native";
import { CUSTOMFONTSIZE, CUSTOMCOLOR } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
const SelectionTab = (props) => {
  return (
    <>
      <Pressable style={styles.tabcontainer}>
        <Text style={styles.tabtext}>{Language[language][props.label]}</Text>
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  tabcontainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: CUSTOMCOLOR.primary,
    borderRadius: 4
  },
  tabtext: {
    fontStyle: "normal",
    fontFamily: "Open Sans",
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.white
  }
});

export default SelectionTab;
