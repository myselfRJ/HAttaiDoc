import {View, Text, StyleSheet} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {moderateScale, verticalScale} from '../utility/scaleDimension';

export default PrescribeHead = props => {
  return (
    <View style={{...styles.main, ...props.head}}>
      <Text style={styles.text}>{props.heading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginBottom: verticalScale(16),
    // borderWidth:1,
  },
  text: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h1,
    color: CUSTOMCOLOR.black,
  },
});
