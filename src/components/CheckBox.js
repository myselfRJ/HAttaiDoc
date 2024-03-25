import {Text, TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '../utility/scaleDimension';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';

export const CheckBox = ({label, selected, onPress, value}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.main}>
        {selected ? (
          <Icon
            name="checkbox-outline"
            size={moderateScale(24)}
            color={CUSTOMCOLOR.primary}
          />
        ) : (
          <Icon
            name="checkbox-blank-outline"
            size={moderateScale(24)}
            color={CUSTOMCOLOR.primary}
          />
        )}
        <Text style={styles.options}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    gap: moderateScale(4),
    alignItems: 'center',
  },
  options: {
    fontFamily: CUSTOMFONTFAMILY.body,
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
  },
});
