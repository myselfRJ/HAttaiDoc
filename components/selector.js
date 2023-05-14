import { View,Text,Pressable,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CUSTOMCOLOR, CUSTOMFONTFAMILY, CUSTOMFONTSIZE } from '../settings/styles';

const SelectorBtn=(props)=>{

    return(
        <View>
            <Text style={styles.h3}>{props.label}</Text>
        <Pressable style={styles.select}>
            <Text style={styles.h3}>
                Hello
            </Text>
            <Icon name={props.name} size={24} color={CUSTOMCOLOR.primary}/>
        </Pressable>
        </View>
    )
}

const styles=StyleSheet.create({

    select:{
        flexDirection:'row',
        paddingVertical:8,
        paddingHorizontal:16,
        alignItems:'center',
        justifyContent:"space-between",
        backgroundColor:CUSTOMCOLOR.white,
        minWidth:160
    },
    h3:{
        fontSize:CUSTOMFONTSIZE.h3,
        color:CUSTOMCOLOR.black,
        fontFamily:CUSTOMFONTFAMILY.opensan,
        lineHeight: CUSTOMFONTSIZE.h3*2

    }
})

export default SelectorBtn;