import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import {fileurl} from '../utility/urls';
import {verticalScale} from '../utility/scaleDimension';

const ImageViewer = ({route}) => {
  console.log(
    Dimensions.get('window').width,
    Dimensions.get('window').height - verticalScale(100),
  );
  const {path} = route.params;
  return (
    <View style={styles.main}>
      <Image
        style={styles.img}
        source={{
          uri: `${fileurl}${path}`,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height - 500,
    resizeMode: 'contain',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ImageViewer;
