import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CUSTOMCOLOR} from '../settings/styles';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';

const SlotChip = props => {
  return (
    <View style={[styles.main, props.style]}>
      <Text>{props.time}</Text>
      <Text>{props.type}</Text>
      <Text>{props.duration}</Text>
      <TouchableOpacity
        onPress={() => {
          props.onPress(props.index);
        }}>
        <Icon name="delete" size={24} color={CUSTOMCOLOR.delete} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    gap: moderateScale(64),

    padding: moderateScale(8),
    borderRadius: moderateScale(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#2CBB15',
    borderWidth: 1,
  },
});
export default SlotChip;
