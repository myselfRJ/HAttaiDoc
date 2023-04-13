import { View, Image, StyleSheet, Text } from "react-native";
import { CUSTOMFONTFAMILY, CUSTOMFONTSIZE } from "../settings/styles";
const HeaderAvatar = () => {
  return (
    <>
      <View style={styles.avatarmain}>
        <Image
          style={styles.img}
          source={{
            uri:
              "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          }}
        />
        <View>
          <Text style={styles.name}>Dr.RamaMurthi</Text>
          <Text style={styles.speciality}>Cardiologist</Text>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  avatarmain: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    // backgroundColor: "#454544",
    borderRadius: 4,
    gap: 8
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2
  },
  name: {
    fontStyle: "normal",
    fontFamily: "Open Sans",
    fontWeight: 500,
    fontSize: CUSTOMFONTSIZE.h4,
    color: "#000000"
  },
  speciality: {
    fontStyle: "normal",
    fontFamily: "Open Sans",
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h5,
    color: "#a1a1a1"
  }
});

export default HeaderAvatar;
