import {Pressable, ActivityIndicator, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
const HButton = props => {
  //props -> label, action
  return (
    <>
      <Pressable
        style={styles.btncontainer}
        onPress={props.loading ? null : props.onPress}>
        {props.icon && (
          <Icon
            style={styles.icon}
            name={props.icon}
            color={CUSTOMCOLOR.white}
            size={24}
          />
        )}
        {props.loading ? (
          <ActivityIndicator size="small" color={CUSTOMCOLOR.white} />
        ) : (
          <Text style={styles.btntext}>{props.label}</Text>
        )}
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  btncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '700',
    backgroundColor: CUSTOMCOLOR.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btntext: {
    fontWeight: 600,
    fontSize: 14,
    color: CUSTOMCOLOR.white,
  },
});

export default HButton;
