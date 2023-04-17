import { View, StyleSheet, TextInput, Text } from "react-native";
import Icon from'react-native-vector-icons/MaterialCommunityIcons';
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
const MedicineList = (props) => {
  //props-> label, placeholder , action
  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftblock}>
        <Icon name={props.lefticon} color={CUSTOMCOLOR.primary} size={16}/>
        <Text style={styles.text}>lorem epsum | lorem epsum | lorem epsum</Text>

        </View>
      
        <View style={styles.rightblock}>
        <Icon name={props.rightblock[0]} color={CUSTOMCOLOR.primary} size={16}/>
        <Icon name={props.rightblock[1]} color={CUSTOMCOLOR.primary} size={16}/>
        <Icon name={props.rightblock[2]} color={CUSTOMCOLOR.primary} size={16}/>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
container: {
   
    flexDirection:'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    width:'100%',
    justifyContent:'space-between',
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: "700",
    gap: 4,
    borderRadius: 4
  },
  text: {
    fontWeight: 500,
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black
  },
  leftblock:{
    flexDirection:'row',
    gap:16
  },
  rightblock:{
    flexDirection:'row',
    gap:8,
   
  }
 
});

export default MedicineList;
