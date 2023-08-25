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

const Intro = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.Top}>
        <Image
          style={styles.img}
          source={require('../assets/images/intro.png')}
        />
      </View>
      <View style={styles.bottom}>
        <View style={styles.textcontainer}>
          <Text style={styles.text}>Touch & Handwriting Prescriptions,</Text>
          <Text style={styles.text}>Instant Digitization, Limitless </Text>
          <Text style={styles.text}>Possibilities</Text>
        </View>

        <HButton
          label="Get Start"
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
    gap: verticalScale(48),
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
