import {View, Image, StyleSheet, Text} from 'react-native';
import {CUSTOMFONTFAMILY, CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
import {useEffect, useState} from 'react';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
const HeaderAvatar = ({data}) => {
  const imgurl = data?.profile_pic_url;
  // console.log('====================================');
  // console.log('profile pic', imgurl);
  // console.log('====================================');
  return (
    <>
      <View style={styles.avatarmain}>
        <Image
          style={styles.img}
          source={{
            //uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            uri: `data:image/jpeg;base64,${imgurl}`,
          }}
        />
        <View>
          <Text style={styles.name}>{data?.doctor_name}</Text>
          <Text style={styles.speciality}>{data?.specialization}</Text>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  avatarmain: {
    flexDirection: 'row',
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(8),
    alignItems: 'center',
    // backgroundColor: "#454544",
    borderRadius: moderateScale(4),
    gap: moderateScale(8),
    
  },
  img: {
    width:moderateScale(64),
    height:moderateScale(64),
    borderRadius: moderateScale(60 / 2),
  },
  name: {
    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    fontWeight: 500,
    fontSize: CUSTOMFONTSIZE.h4,
    color: '#000000',
    fontFamily:CUSTOMFONTFAMILY.body
  },
  speciality: {
    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h5,
    color: '#a1a1a1',
    fontFamily:CUSTOMFONTFAMILY.body
  },
});

export default HeaderAvatar;
