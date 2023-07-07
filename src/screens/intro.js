import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import { HButton } from '../components';


const Intro=({navigation})=>{
    return(
     <View style={styles.container}>
        <View style={styles.Top}></View>
        <View style={styles.bottom}>
         <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur. Phasellus velit nunc id rhoncus consectetur.</Text>
        <View style={{margin:200,alignItems:'center'}}><HButton label='Get Start' onPress={() => navigation.navigate('entry')}/></View>
        </View>

     </View>
    );
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        
    },
    Top:{
        height:503,
        backgroundColor:CUSTOMCOLOR.primary
    },
    bottom:{
        height:680,
        backgroundColor:CUSTOMCOLOR.white,
        
    },
    text:{
       width:593,
       height:120,
       top:100,
       left:80,
       fontFamily:CUSTOMFONTFAMILY.heading,
       fontSize:32,
       fontWeight:400,
        
    },
   
})
export default Intro;