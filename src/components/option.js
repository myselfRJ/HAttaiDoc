import {Text, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CUSTOMCOLOR, CUSTOMFONTFAMILY} from '../settings/styles';
import {moderateScale} from '../utility/scaleDimension';

const Option = ({label, selected, onPress, value}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.main}>
        {selected ? (
          <Icon
            name="radio-button-checked"
            size={24}
            color={CUSTOMCOLOR.primary}
          />
        ) : (
          <Icon
            name="radio-button-unchecked"
            size={24}
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
    fontSize: 12,
    color: CUSTOMCOLOR.black,
    paddingRight: moderateScale(8),
  },
});
export default Option;
