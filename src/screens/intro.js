import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {HButton} from '../components';
import {horizontalScale} from '../utility/scaleDimension';
import {verticalScale, moderateScale} from '../utility/scaleDimension';
import Logo from '../components/logo';
import Gif from '../components/gif';

const Intro = ({navigation}) => {
  return (
    // <View style={styles.container}>
    //   <View style={styles.Top}>
    //     <Image
    //       style={styles.img}
    //       source={require('../assets/images/intro.png')}
    //     />
    //   </View>
    //   <View style={styles.bottom}>
    //     <View style={styles.textcontainer}>
    //       <Text style={styles.text}>The Easiest Way to manage your </Text>
    //       <Text style={styles.text}>Clinic digitally</Text>
      
    //     </View>

    //     <HButton
    //       label="Get Started"
    //       onPress={() => navigation.navigate('entry')}
    //       btnstyles={styles.btn}
    //     />
    //   </View>
    // </View>
    <View style={styles.container}>
      <View style={{top:moderateScale(32)}}>
      <Text style={styles.text}>Welcome to</Text>
      <View style={styles.logo}>
      <Logo imgstyle={styles.imgstyle}/>
      </View>
      </View>
      <View style={{top:moderateScale(64)}}>
      <View style={{justifyContent:'center'}}>
                <Gif gif={require('../assets/gif/home.gif')} style={{alignSelf:'center'}} />
            </View>
      </View>
      <View style={styles.bottom}>
      <View style={styles.textcontainer}>
      <Text style={styles.text}>The Easiest Way to manage your </Text>
      <Text style={styles.text}>Clinic digitally</Text>
      
        </View>

         <HButton
          label="Get Started"
          onPress={() => navigation.navigate('entry')}
          btnstyles={styles.btn}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    // top:moderateScale(64),
    // gap:moderateScale(64)
    backgroundColor:CUSTOMCOLOR.white
    
  },
  text:{
     fontSize:CUSTOMFONTSIZE.h1,
     color:CUSTOMCOLOR.black,
     fontWeight:'400',
     fontFamily:CUSTOMFONTFAMILY.heading
  },
  imgstyle:{
     width:moderateScale(119),
     height:moderateScale(120),
  },
  logo:{
     top:moderateScale(12)
   
  },
  tinyLogo:{
    width:moderateScale(600),
    height:moderateScale(400)
  },
  Top: {
    height: verticalScale(503),
    backgroundColor: CUSTOMCOLOR.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    // height:680,
    // backgroundColor:CUSTOMCOLOR.white,
    alignItems: 'center',
    gap: verticalScale(24),
  },
  textcontainer: {
    // width: horizontalScale(00,)
    // height:164,
    // top:100,
    alignItems: 'center',
    //left:61,
    paddingHorizontal: horizontalScale(24),

    gap: verticalScale(8),
  },
  text: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: moderateScale(28),
    // fontWeight: 400,
    color: CUSTOMCOLOR.black,
  },
  img: {width: moderateScale(224), height: moderateScale(261)},
});
export default Intro;
