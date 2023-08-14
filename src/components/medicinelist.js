import {View, StyleSheet, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';

const MedicineList = props => {
  //props-> label, placeholder , action
  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftblock}>
          <Icon name={props.lefticon} color={CUSTOMCOLOR.primary} size={16} />
          <Text style={styles.text}>
            lorem epsum | lorem epsum | lorem epsum
          </Text>
        </View>

        <View style={styles.rightblock}>
          <Icon
            name={props.rightblock[0]}
            color={CUSTOMCOLOR.primary}
            size={16}
          />
          <Icon
            name={props.rightblock[1]}
            color={CUSTOMCOLOR.primary}
            size={16}
          />
          <Icon
            name={props.rightblock[2]}
            color={CUSTOMCOLOR.primary}
            size={16}
          />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
    width: '100%',
    justifyContent: 'space-between',
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '700',
    gap: moderateScale(4),
    borderRadius: moderateScale(4),
  },
  text: {
    fontWeight: 500,
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
  },
  leftblock: {
    flexDirection: 'row',
    gap: moderateScale(16),
  },
  rightblock: {
    flexDirection: 'row',
    gap: moderateScale(8),
  },
});

export default MedicineList;
