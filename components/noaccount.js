import {StyleSheet, View,Text,TouchableOpacity} from 'react-native';
import { CUSTOMCOLOR } from '../settings/styles';

const NoAccount=(props)=>{

    return(
        <View style={styles.main}>
            
            <Text style={styles.text1}>
                {props.msg}
            </Text>
            <TouchableOpacity onPress={()=>props.navigation.navigate(props.action)} >
            <Text style={styles.text2}>
                {props.text}
            </Text>
            </TouchableOpacity>
        </View>
    )
}


const styles=StyleSheet.create({
    main:{
        flexDirection:'row',
        gap:4,
        alignItems:'center'
    },
    text1:{

    },
    text2:{
        color:CUSTOMCOLOR.primary,
        fontSize:14,
        fontWeight:'600',

    },


})
export default NoAccount