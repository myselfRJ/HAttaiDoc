import { Pressable, ActivityIndicator, StyleSheet, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
const PlusButton = (props) => {
  //props -> label, action
  return (
    <>
   <Pressable style={{...styles.plus,...props.style}} onPress={props.onPress}>
    <Icon name={props.icon} size={48} color='#ffffff'/>
   </Pressable>
    </>
  );
};

const styles=StyleSheet.create({
    plus:{
        backgroundColor:CUSTOMCOLOR.primary,
        padding:8,
        borderRadius:40,
        shadowColor: CUSTOMCOLOR.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
    }
})

export default PlusButton;