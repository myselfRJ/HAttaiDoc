import {View, Text, StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';

const AppointmentStatusCard = props => {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>{props.text}</Text>
      <View style={styles.count}>
        <Text style={styles.text}>{props.count}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    gap: moderateScale(4),
    backgroundColor: CUSTOMCOLOR.backgroundColor,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems: 'center',
    borderRadius: moderateScale(8),
  },
  text: {
    fontSize: CUSTOMFONTSIZE.h2,
    fontWeight: '400',
    color: CUSTOMCOLOR.primary,
  },
  count: {
    backgroundColor: CUSTOMCOLOR.white,
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AppointmentStatusCard;
