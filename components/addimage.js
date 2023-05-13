import {Pressable,Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CUSTOMCOLOR } from '../settings/styles';
const AddImage=(props)=>{
    return(
        props.url?<Pressable style={styles.url}>

        <Image style={styles.image} source={{uri:props.url}} resizeMode='center'/>
        
        </Pressable>:
        <Pressable style={styles.main}>

        <Icon name='account-plus' size={24} color={CUSTOMCOLOR.primary}/>
        
        </Pressable>
    )
}

const styles=StyleSheet.create({
    main:{
        padding:16,
        borderWidth:0.5,
        borderColor:CUSTOMCOLOR.primary,
        borderRadius:4,
    },
    url:{
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        height:60,
        width:60, borderRadius:4,
    }
})
export default AddImage;