import {View,Text,StyleSheet} from 'react-native';
import { verticalScale } from '../utility/scaleDimension';
import { CUSTOMCOLOR } from '../settings/styles';

const Seperator=(props)=>{
    return(
        <View style={styles.separator}></View>
    )
};
const styles = StyleSheet.create({
    separator:{
        height:verticalScale(0.5),
        marginVertical:verticalScale(6),
    
        backgroundColor:CUSTOMCOLOR.primary,
    }
})
export default Seperator;