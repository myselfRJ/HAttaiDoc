import {useState, useEffect, Children} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

const CustomModal = ({visible, children, Close}) => {
  const setVisible = Close;
  return (
    <Modal
      animationType="slide"
      // transparent={true}
      visible={visible}
      deviceWidth={1}
      onRequestClose={() => {
        setVisible(!visible);
      }}
      transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          //   alignItems: 'center',
          backgroundColor: '#000000aa',
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setVisible(!visible);
          }}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View
          style={{
            // flexDirection: 'row',
            // justifyContent: 'space-around',
            backgroundColor: CUSTOMCOLOR.white,
            width: '100%',
            padding: moderateScale(40),
          }}>
          {children}
        </View>
      </View>
    </Modal>
  );
};
export default CustomModal;

const styles = StyleSheet.create({
  text: {
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: 'bold',
    color: CUSTOMCOLOR.primary,
    alignSelf: 'center',
  },
  icon: {alignSelf: 'center', marginBottom: moderateScale(8)},
  modalOverlay: {
    position: 'absolute',
    // width:'100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // borderWidth:1
    // backgroundColor: 'rgba(0,0,0,0.5)'
  },
});
