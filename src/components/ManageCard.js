import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import style from './Searchbar/style';

const ManageCard = props => {
  return (
    <View style={[props?.style, styles.style]}>
      <View style={{flexDirection: 'row'}}>
        {/* {props.label && <Text style={styles.h3}>{props.label}</Text>} */}
        <Icon name={props.nameIcon} size={24} color={CUSTOMCOLOR.primary} />
        <Text
          style={{color: CUSTOMCOLOR.black, fontWeight: '700', marginLeft: 8}}>
          {props.Dataname}:
        </Text>
        <View style={{flexDirection: 'row', gap: 32, marginLeft: 16}}>
          {props?.data?.map((val, ind) => (
            <Text key={ind} style={{color: CUSTOMCOLOR.black}}>
              {val[props?.dta]}
            </Text>
          ))}
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={props.onPress}>
          <Icon name={props.name} size={24} color={CUSTOMCOLOR.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  style: {
    flexDirection: 'row',
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: CUSTOMCOLOR.white,
    // minWidth: verticalScale(160),
    borderRadius: moderateScale(4),
    // width: '100%',
    marginBottom: 8,
  },
  h3: {
    fontSize: CUSTOMFONTSIZE.h1,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.opensan,
    lineHeight: CUSTOMFONTSIZE.h3 * 2,
  },
  // style:{
  //     width:'100%',
  //     flexDirection:'row'
  // }
});

export default ManageCard;
