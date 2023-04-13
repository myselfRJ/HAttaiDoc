import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CUSTOMCOLOR, CUSTOMFONTFAMILY, CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";

function ModalSelector(props) {
  //props-> value, icon name, icon action
  // const { value, icon, action } = props;
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.leftItem}>{props.value}</Text>
        <Pressable style={styles.rightItem} onPress={props.action}></Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 4
  },
  leftItem: {
    height: 19,
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h3,
    lineHeight: 19,
    alignItems: "center",
    color: "#343434"
  },
  rightItem: {
    width: 24,
    height: 24,
    backgroundColor: CUSTOMCOLOR.background
  }
});

export default ModalSelector;
