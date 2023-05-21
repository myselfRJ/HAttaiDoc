import {View,Text,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CUSTOMCOLOR } from "../settings/styles";

const SlotChip=(props)=>{
    return(
        <View style={styles.main}>
            <Text>
                {props.time}

            </Text>
            <Text>
                {props.type}
                
            </Text>
            <Text>
               {props.duration}
                
            </Text>
           <Icon name='delete' size={24} color={CUSTOMCOLOR.white}/>
        </View>
    )
}

const styles=StyleSheet.create({
    main:{
        gap:64,
       
        padding:8,
        borderRadius:4,
        flexDirection:'row',
        backgroundColor:CUSTOMCOLOR.primary,
        alignItems:'center'
    }
})
export default SlotChip;