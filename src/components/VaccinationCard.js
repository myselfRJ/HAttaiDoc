import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../utility/scaleDimension';
import {CUSTOMCOLOR} from '../settings/styles';

const VaccinationCard = props => {
  const screenwd = (Dimensions.get('window').width / 3) * 0.9;

  return (
    <Pressable
      style={[styles.container, {width: screenwd}]}
      onPress={() =>
        props.navigation.navigate('vaccination', {
          label: props.label,
          patient_phone: props.patient_phone,
          vacdata: props.Vaccinedata,
        })
      }>
      {/* <View style={{paddingVertical:10}}> */}
      <Image source={props.image} style={styles.image} />
      {/* </View> */}
      <View style={{...styles.txt, ...props.lbl}}>
        <Text
          style={{
            color: CUSTOMCOLOR.primary,
            fontWeight: '500',
            ...props.lbltxt,
          }}>
          {props.label}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: moderateScale(140),
    height: moderateScale(140),
  },
  txt: {
    alignItems: 'center',
    width: '98%',
    // backgroundColor:'black',
    paddingVertical: verticalScale(15),
    // marginBottom: moderateScale(-22),
    // borderRadius: moderateScale(4),
    elevation: moderateScale(1),
    shadowColor: CUSTOMCOLOR.primary,
    paddingHorizontal: horizontalScale(4),
    borderTopStartRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    // borderWidth: moderateScale(2),
    // borderColor: CUSTOMCOLOR.primary
    // backgroundColor: CUSTOMCOLOR.white
  },
  container: {
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: CUSTOMCOLOR.primary,
    // borderWidth: 1,
    borderTopStartRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),

    elevation: moderateScale(2),
    backgroundColor: CUSTOMCOLOR.white,
    shadowColor: CUSTOMCOLOR.primary,
    // width: moderateScale(100),
    // height: moderateScale(230),
    paddingTop: 10,
  },
});

export default VaccinationCard;
