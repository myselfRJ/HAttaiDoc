import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';

const InfoChip = props => {
  return (
    <View style={styles.main}>
      <Text style={styles.h3}>Hello Word</Text>
      <Text>Bye world</Text>
      <Icon style={styles.icon} name="delete" size={16} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: CUSTOMCOLOR.white,
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 4,
  },
  h3: {
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '600',
  },
  h5: {
    fontSize: CUSTOMFONTSIZE.h5,
    fontWeight: '400',
  },
});

export default InfoChip;
