import {useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GalleryModel = props => {
  const setVisible = props.Close;
  return (
    <Modal
      animationType="slide"
      // transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        setVisible(!props.visible);
      }}
      transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: CUSTOMCOLOR.white,
            width: '100%',
            padding: moderateScale(20),
            borderTopEndRadius: moderateScale(16),
            borderTopLeftRadius: moderateScale(16),
          }}>
          <TouchableOpacity onPress={props.OnGallery}>
            <Icon
              name="image-multiple"
              size={moderateScale(48)}
              style={styles.icon}
            />
            <Text style={styles.text}>GALLERY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.OnCamera}>
            <Icon name="camera" size={moderateScale(48)} style={styles.icon} />
            <Text style={styles.text}>CAMERA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
// camera - plus;
export default GalleryModel;

const styles = StyleSheet.create({
  text: {
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: 'bold',
    color: CUSTOMCOLOR.black,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: moderateScale(8),
    color: CUSTOMCOLOR.primary,
  },
});
