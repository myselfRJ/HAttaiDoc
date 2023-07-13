import {useEffect} from 'react';
import {View,Text, StyleSheet, Image} from 'react-native';
import { CUSTOMCOLOR, CUSTOMFONTFAMILY } from '../settings/styles';
const InitScreen=({navigation})=>{
    useEffect(()=>{
        setTimeout(()=>{navigation.navigate('profilecreate')},2000)
    },[])
    return(
        <View style={styles.main}>
            <Image 
            style={{width:180,height:221}}
            source={require('../assets/images/logo.jpeg')}
            />
            <Text style={styles.text}>Wait We are setting Up...</Text>
        </View>

    );
}
const styles= StyleSheet.create({
    main:{
        flex:1,
        alignItems:"center",
        justifyContent:'center',
        backgroundColor:CUSTOMCOLOR.white
    },
    text:{
        fontFamily:CUSTOMFONTFAMILY.opansans,
        color:CUSTOMCOLOR.black,
        fontWeight:600,
        fontSize:24,    
    }
})
export default InitScreen;