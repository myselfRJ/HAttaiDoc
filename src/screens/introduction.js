import {useEffect} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import {
    CUSTOMCOLOR,
    CUSTOMFONTFAMILY,
    CUSTOMFONTSIZE,
  } from '../settings/styles';
const Introduction=({navigation})=>{
    useEffect(()=>{
        setTimeout(()=>{navigation.navigate('intro')},2000)
    },[])
    return(
     <View style={styles.main}>
       <Image  style={{
                width: 472,
                height: 439,
              }}
            source={require('../assets/images/first.png')}/> 
     </View>
    );

};
const styles=StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:CUSTOMCOLOR.primary,
        alignItems:'center',
        justifyContent:'center'
    },
})
export default Introduction;