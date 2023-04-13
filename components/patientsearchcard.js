import { View, StyleSheet, Text, Image } from "react-native";
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
const PatientSearchCard = () => {
  return (
    <>
      <View style={styles.maincontainer}>
        <Image
          style={styles.img}
          source={{
            uri:
              "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          }}
        />
        <View style={styles.patientinfo}>
          <Text style={styles.name}>Malumalayi</Text>
          <Text style={styles.age}>Malumalayi</Text>
          <Text style={styles.contact}>Contact: 989787654</Text>
        </View>
        <View style={styles.icon}></View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 12,
    fontSize: CUSTOMFONTSIZE.h3,
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: 4,
    gap: 8
  },
  name: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    padding: 0,
    color: CUSTOMCOLOR.black
  },
  age: {
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 19,
    padding: 0,
    color: CUSTOMCOLOR.black
  },
  contact: {
    fontWeight: 600,
    fontSize: 10,
    lineHeight: 12.5,
    padding: 0,
    color: CUSTOMCOLOR.black
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2
  },
  patientinfo: {},
  icon: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    backgroundColor: CUSTOMCOLOR.primary
  }
});

export default PatientSearchCard;
