import { View, StyleSheet, Text, Image } from "react-native";
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import { Language } from "../settings/customlanguage";
const AppointmentCard = () => {

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
        <View>
          <Text style={styles.name}>Malumalayi</Text>
          <Text style={styles.age}>Malumalayi</Text>
          <View style={styles.seperator}></View>
          <Text style={styles.symptom}>
            Lorem ipsum dolor sit amet consectetur. Nec porttitor tincidunt
            ultricies nisl.
          </Text>
        </View>
        <View style={styles.hseperator}></View>
        <View style={styles.patientinfo}>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>{Language[language]["type"]}:</Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>{Language[language]["time"]}:</Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>{Language[language]["status"]}:</Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>{Language[language]["bill"]}:</Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
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
  symptom: {
    flexWrap: "wrap",
    fontWeight: 600,
    fontSize: 10,
    lineHeight: 12.5,
    padding: 0,
    color: CUSTOMCOLOR.black
  },
  img: {
    width: 96,
    height: 96,
    borderRadius: 96 / 2
  },
  patientinfo: {
    gap: 4
  },
  icon: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    backgroundColor: CUSTOMCOLOR.primary
  },
  seperator: {
    height: 0.5,
    margin: 8,
    backgroundColor: "#f3f4f3"
  },
  hseperator: {
    height: "100%",
    width: 0.5,
    margin: 8,
    backgroundColor: "#f3f4f3"
  },
  statusinfo: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    justifyContent: "space-between"
  },
  statustext: {
    textAlign: "right",
    fontWeight: "600"
  }
});

export default AppointmentCard;
