import {View,Text,StyleSheet,TextInput} from 'react-native';
import InputText from './inputext';
// import { TextInput } from 'react-native-gesture-handler';
import style from './Searchbar/style';
import { horizontalScale, moderateScale } from '../utility/scaleDimension';
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from '../settings/styles';

const VitalField  = props =>{
    return(
     <View style={styles.main}>
        <Text style={styles.name}>{props.name}</Text>
        <TextInput
        style={styles.inputContainer}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.setvalue}
        />
     </View>
    )
};
const styles = StyleSheet.create({
    main:{
       width:moderateScale(177),
       paddingHorizontal:horizontalScale(8),
       paddingVertical:horizontalScale(8),
       flexDirection:'row',
       gap:moderateScale(4),
       alignItems:'center'
    },
    name:{
        width:moderateScale(65),
        fontWeight:'400',
        fontSize:CUSTOMFONTSIZE.h3,
        color: CUSTOMCOLOR.black,
    },
    inputContainer:{
        width:moderateScale(100),
        paddingHorizontal:moderateScale(8),
        paddingVertical:moderateScale(8),
        borderWidth:0.5,
        borderColor:CUSTOMCOLOR.primary,
        borderRadius:moderateScale(4),
        backgroundColor:CUSTOMCOLOR.white
    }
})
export default VitalField;