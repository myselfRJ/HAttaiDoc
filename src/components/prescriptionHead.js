import {View, Text, StyleSheet} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {moderateScale} from '../utility/scaleDimension';

export default PrescribeHead = props => {
  return (
    <View style={{...styles.main, ...props.head}}>
      <Text style={styles.text}>{props.heading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: moderateScale(8),
    marginBottom: moderateScale(12),
  },
  text: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h1,
    color: CUSTOMCOLOR.black,
  },
});
