import { Pressable, StyleSheet, Text } from "react-native";
import { CUSTOMFONTSIZE } from "../settings/styles";
const SuggestionTab = () => {
  return (
    <>
      <Pressable style={styles.tabcontainer}>
        <Text style={styles.tabtext}>Add Me</Text>
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  tabcontainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#4BA5FA",
    borderRadius: 24
  },
  tabtext: {
    fontStyle: "normal",
    fontFamily: "Open Sans",
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h4,
    color: "#4BA5FA"
  }
});

export default SuggestionTab;
