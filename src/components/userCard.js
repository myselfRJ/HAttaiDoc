import {View,Text,StyleSheet,Image} from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../utility/scaleDimension';
import { CUSTOMCOLOR,CUSTOMFONTFAMILY,CUSTOMFONTSIZE} from '../settings/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';



const UserCard =({userdata,props})=>{
   return(
    <View style={styles.maincontainer}>
    <View style={styles.container}>
    <Image
          style={styles.img}
          source={{
            uri: `data:image/jpeg;base64,${userdata?.user_profile_pic_url}`,
          }}
        />
    </View>
    <View style={styles.child}>
          <Text style={styles.name}>
            {userdata?.clinic_user_name}
          </Text>
          <Text style={styles.age}>
            {userdata?.clinic_id}
          </Text>
          <Text style={styles.symptom}>{userdata?.role}</Text>
        </View>
        <View style={styles.hseperator}></View>
        <View style={{width:200,
            // borderWidth:1,
            paddingVertical:moderateScale(16),
            gap:moderateScale(8)
            }}>
        <View style={styles.right}>
            <View style={{gap:moderateScale(4),flexDirection:'row'}}>
          <View style={styles.statusinfo}>
            <TouchableOpacity>
           <Icon name='pencil' size={20} color={CUSTOMCOLOR.primary}/>
           </TouchableOpacity>
          </View>
          <View style={styles.statusinfo}>
            <TouchableOpacity>
            <Icon name= 'close' size={20} color={CUSTOMCOLOR.error}/>
            </TouchableOpacity>
          </View>
          </View>
          </View>
          <View style={styles.hrs}>
            <Text style={styles.contact}>
             Visiting Hrs: 9:00 - 5:00
            </Text>
            
          </View>
          </View>
          
        
    </View>
   )
}
const styles = StyleSheet.create({
    maincontainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        padding: moderateScale(12),
        fontSize: CUSTOMFONTSIZE.h3,
        backgroundColor: CUSTOMCOLOR.white,
        borderRadius: moderateScale(4),
        gap: moderateScale(8),
        // borderWidth:1,
      },
      img: {
        width: moderateScale(96),
        height: moderateScale(96),
        borderRadius: moderateScale(8),
      },
      container:{
        // borderWidth:1
      },
      child: {
        width: '40%',

        
        // borderWidth:1
      },
      name: {
        fontWeight: 600,
        fontSize: 18,
        lineHeight: 19,
        padding: moderateScale(0),
        color: CUSTOMCOLOR.black,
        fontFamily: CUSTOMFONTFAMILY.heading,
        paddingVertical:verticalScale(4)
      },
      age: {
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 19,
        padding: moderateScale(0),
        color: CUSTOMCOLOR.black,
        fontFamily: CUSTOMFONTFAMILY.body,
        paddingVertical:verticalScale(4)
      },
      symptom: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: 1.5 * CUSTOMFONTSIZE.h5,
        padding: moderateScale(0),
        color: CUSTOMCOLOR.black,
        fontFamily: CUSTOMFONTFAMILY.body,
        paddingVertical:verticalScale(4)
      },
      hseperator: {
        height: '100%',
        width: horizontalScale(0.5),
        margin: 8,
        backgroundColor: '#f3f4f3',
      },
      right: {
        flexDirection:'row',
        gap: moderateScale(4),
        width:'30%',
        // borderWidth:1,
        alignItems:'flex-end',
        paddingHorizontal:horizontalScale(84),
        bottom:moderateScale(24),
        paddingVertical:verticalScale(8),
      },
      statusinfo: {
        width:moderateScale(45),
        // height:moderateScale(40),
        paddingVertical:moderateScale(10),
        borderWidth:1,
        borderRadius:moderateScale(36),
        // padding:moderateScale(8),
        backgroundColor:CUSTOMCOLOR.white,
        alignItems:'center',
        borderColor:'#C0DFFC'
      },
      contact: {
        height: verticalScale(25),
        width: horizontalScale(200),
        alignSelf:'center',
        fontFamily: CUSTOMFONTFAMILY.body,
        fontSize: CUSTOMFONTSIZE.h3,
        color: CUSTOMCOLOR.black,
      },
      hrs:{
        // borderWidth:1
      }
})
export default UserCard;