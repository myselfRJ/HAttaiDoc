import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CUSTOMCOLOR,CUSTOMFONTFAMILY,CUSTOMFONTSIZE } from '../settings/styles'

const ShowChip = (props) => {
    return(
        <View style={{
            // width: '100%',
            borderWidth:1,
            padding:4,
            marginBottom:4,
            marginHorizontal:8
          }} >
        <View
              key={props.ind}
              style={{
                flexDirection: 'row',
                // flex: 1,
                // width: '100%',
                marginBottom: 5,
                //borderWidth:1,
              }}>
                
              <Icon name={props.nameIcon} size={16} color={CUSTOMCOLOR.primary} />
              <View style={{width: '100%',justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingHorizontal:16}}>
                <Text style={{color: CUSTOMCOLOR.black,fontFamily:CUSTOMFONTFAMILY.body}}>
                  {props.text}
                </Text>
             
              <TouchableOpacity  onPress={props.onPress}>
                <Icon name="delete" size={24} color={CUSTOMCOLOR.delete} />
              </TouchableOpacity>
              </View>
            </View>
            </View>
    )
}


export default ShowChip;