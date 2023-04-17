import { View, StyleSheet, TextInput, Text } from "react-native";
import Icon from'react-native-vector-icons/MaterialCommunityIcons';
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
const VisitOpen = (props) => {
  //props-> label, placeholder , action
  return (
    <>
      <View style={styles.inpcontainer}>
      <Text style={styles.text}>Vitals</Text>
        
        <Icon name={props.icon} color={CUSTOMCOLOR.primary} size={16}/>
       
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  inpcontainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: "700",
    gap: 4,
    borderRadius: 4
  },
  text: {
    
    fontWeight: 600,
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black
  },
 
});

export default VisitOpen;
