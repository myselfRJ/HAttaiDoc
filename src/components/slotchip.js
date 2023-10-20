import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';

const SlotChip = props => {
  return (
    <View style={[styles.main, props.style]}>
      <Text style={styles.text}>{props.time}</Text>
      <Text style={styles.text}>{props.type}</Text>
      <Text style={styles.text}>{props.duration}</Text>
      <Text style={styles.text}>{props.icon}</Text>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: horizontalScale(8),
          padding: moderateScale(4),
          borderRadius:moderateScale(24),
          backgroundColor:CUSTOMCOLOR.white,
          
        }}
        onPress={() => {
          props.onPress(props.index);
        }}>
        <Icon name="close" size={20} color={CUSTOMCOLOR.delete} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    gap: horizontalScale(32),
    //padding: moderateScale(8),
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: CUSTOMCOLOR.borderColor,
    borderWidth: 1,
    marginBottom: 4,
    
  },
  text: {
    fontFamily: CUSTOMFONTFAMILY.body,
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
  },
});
export default SlotChip;
