import {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';

const Introduction = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('intro');
    }, 2000);
  }, []);
  return (
    <View style={styles.main}>
      <Image
        style={styles.images}
        source={require('../assets/images/first.png')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: CUSTOMCOLOR.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    width: moderateScale(472),
    height: moderateScale(439),
  },
});
export default Introduction;
