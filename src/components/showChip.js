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
import {mode} from '../redux/features/prescription/prescribeslice';

const ShowChip = props => {
  return (
    <View style={{...styles.main, ...props.main}}>
      {/* <View key={props.ind} style={styles.child}> */}

      {props.nameIcon && (
        <Icon
          name={props.nameIcon}
          size={moderateScale(16)}
          color={CUSTOMCOLOR.primary}
        />
      )}
      <View style={styles.alignchild}>
        <Text
          style={{
            color: CUSTOMCOLOR.primary,
            fontFamily: CUSTOMFONTFAMILY.body,
            fontWeight: '400',
            fontSize: CUSTOMFONTSIZE.h3,
          }}>
          {props.text}
        </Text>
      </View>
      {props.onPress && (
        <TouchableOpacity
          style={{
            height: moderateScale(28),
            width: moderateScale(28),

            backgroundColor: CUSTOMCOLOR.white,
            borderRadius: moderateScale(28),
            // borderWidth:1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={props.onPress}>
          <Icon
            name="close"
            size={moderateScale(24)}
            color={CUSTOMCOLOR.delete}
          />

          {/* </View> */}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ShowChip;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: moderateScale(1),
    padding: moderateScale(4),
    marginBottom: moderateScale(4),
    marginHorizontal: horizontalScale(8),
    backgroundColor: '#EAF3FC',
    justifyContent: 'space-between',
    borderRadius: moderateScale(4),
    // gap:64,
    borderColor: CUSTOMCOLOR.borderColor,
  },
  child: {
    flexDirection: 'row',
    paddingVertical: verticalScale(4),
  },
  alignchild: {
    // width:"100%",
    // flex:10,
    justifyContent: 'space-between',
    // borderWidth:1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
  },
});
