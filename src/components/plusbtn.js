import {Pressable, ActivityIndicator, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';

const PlusButton = props => {
  return (
    <>
      <Pressable
        style={{...styles.plus, ...props.style}}
        onPress={props.onPress}>
        <Icon
          name={props.icon}
          size={props.size ? props.size : moderateScale(48)}
          color={props.color ? props.color : '#ffffff'}
        />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  plus: {
    backgroundColor: CUSTOMCOLOR.primary,
    padding: moderateScale(8),
    borderRadius: moderateScale(40),
    elevation: 8,
    shadowColor: CUSTOMCOLOR.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});

export default PlusButton;
