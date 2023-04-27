import {StyleSheet, View,Text} from 'react-native';
import { CUSTOMCOLOR } from '../settings/styles';

const NoAccount=(props)=>{

    return(
        <View style={styles.main}>
            <Text style={styles.text1}>
                {props.msg}
            </Text>
            <Text style={styles.text2}>
                {props.text}
            </Text>

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
        color:CUSTOMCOLOR.black,
        fontSize:14,
        fontWeight:'600',

    }

})
export default NoAccount