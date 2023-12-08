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
  const setValue = props.setvalues;
  const handleNumericInput = input => {
    // (/[^a-zA-Z]/g, '') for only strings
    const numericValue = input.replace(/[^0-9]/g, '');
    setValue(numericValue);
  };
  const numeric = props.numeric;
  return (
    <View style={styles.main}>
      <View style={styles.fields}>
        <View
          style={{
            flexDirection: 'row',
            gap: horizontalScale(4),
            alignItems: 'center',
          }}>
          <Text style={styles.text}>{props.label}</Text>
          <Text style={styles.def}>{props.definition}</Text>
        </View>
        <TextInput
          placeholderTextColor={CUSTOMCOLOR.disable}
          placeholder="Enter"
          style={styles.input}
          value={props.values}
          onChangeText={numeric ? handleNumericInput : setValue}
        />
      </View>
      {props.show == true || (props.values && props.values.length > 0) ? (
        <View style={styles.desc}>
          {/* Your existing code */}
          <TextInput
            placeholder="Description"
            placeholderTextColor={CUSTOMCOLOR.disable}
            style={styles.main}
            value={props.desc}
            onChangeText={props.setDesc}
          />
          <View
            style={{
              position: 'absolute',
              top: verticalScale(12),
              right: horizontalScale(12),
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
    color: CUSTOMCOLOR.black,
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
    color: CUSTOMCOLOR.black,
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
  def: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: CUSTOMCOLOR.disable,
  },
});
export default ObstetricField;
