import {Text, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CUSTOMCOLOR} from '../settings/styles';
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
        <Text>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});
export default Option;
