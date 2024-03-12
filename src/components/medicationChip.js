import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MedicationChip = props => {
  return (
    <View style={styles.main}>
      <View style={styles.text}>
        <Text style={styles.head}>{props.name}</Text>
        <Text style={styles.sub}>{props.text1}</Text>
        <Text style={styles.sub}>{props.text2}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            {
              height: moderateScale(20),
              width: moderateScale(20),
              borderRadius: moderateScale(10),
              justifyContent: 'center',
              alignItems: 'center',
            },
            props.style,
          ]}
          onPress={props.onEdit}>
          <Icon
            name="pencil"
            size={props.size ? props.size : moderateScale(16)}
            color={props.color ? props.color : CUSTOMCOLOR.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              height: moderateScale(20),
              width: moderateScale(20),
              borderRadius: moderateScale(14),
              justifyContent: 'center',
              alignItems: 'center',
            },
            props.style,
          ]}
          onPress={props.onPress}>
          <Icon
            name="close"
            size={props.size ? props.size : moderateScale(16)}
            color={props.color ? props.color : CUSTOMCOLOR.error}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    margin: 1,
    backgroundColor: CUSTOMCOLOR.fadeBlue,
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: moderateScale(8),
  },
  text: {
    width: '80%',
    gap: verticalScale(4),
  },
  actions: {
    flexDirection: 'row',
    gap: horizontalScale(4),
  },
  head: {
    fontWeight: '700',
    fontSize: CUSTOMFONTSIZE.h5,
    color: CUSTOMCOLOR.black,
  },
  sub: {
    fontWeight: '300',
    fontSize: CUSTOMFONTSIZE.h5,
    color: CUSTOMCOLOR.black,
  },
});
export default MedicationChip;
