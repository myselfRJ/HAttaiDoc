import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ObstetricField = props => {
  return (
    <View style={styles.main}>
      <View style={styles.fields}>
        <Text style={styles.text}>{props.label}</Text>
        <TextInput
          placeholder="Enter"
          style={styles.input}
          value={props.values}
          onChangeText={props.setvalues}
        />
      </View>
      {props.show == true ? (
        <View style={styles.desc}>
          <TextInput
            placeholder="Description"
            style={styles.main}
            value={props.desc}
            onChangeText={props.setDesc}
          />
          <View
            style={{
              position: 'absolute',
              top: verticalScale(12),
              right: horizontalScale(12),
              // height: verticalScale(30),
              borderRadius: moderateScale(100),
              alignItems: 'center',
              backgroundColor: CUSTOMCOLOR.white,
              elevation: 2,
            }}>
            <TouchableOpacity onPress={props.onPress}>
              <Icon
                name="close"
                size={moderateScale(20)}
                color={CUSTOMCOLOR.delete}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(16),
    gap: moderateScale(16),
  },
  fields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
    paddingHorizontal: horizontalScale(32),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(4),
  },
  desc: {
    borderWidth: 0.5,
    borderRadius: moderateScale(4),
    borderColor: CUSTOMCOLOR.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
  },
  text: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: CUSTOMCOLOR.black,
  },
});
export default ObstetricField;
