import {Pressable, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CUSTOMCOLOR} from '../settings/styles';
const AddImage = props => {
  console.log('urel====>', props.encodedBase64);
  return props?.encodedBase64 ? (
    <Pressable style={styles.url}>
      <Image
        style={styles.image}
        source={{uri: `data:image/jpeg;base64,${props.encodedBase64}`}}
        resizeMode="cover"
      />
    </Pressable>
  ) : (
    <Pressable onPress={props.onPress} style={styles.main}>
      <Icon name="account-plus" size={24} color={CUSTOMCOLOR.primary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 16,
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
    borderRadius: 4,
  },
  url: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:2,
    borderRadius: 8,
    // borderColor:CUSTOMCOLOR.primary
  },
  image: {
    height: 80,
    width: 80,
    borderColor: CUSTOMCOLOR.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
});
export default AddImage;
