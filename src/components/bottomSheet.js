import BottomSheet from '@gorhom/bottom-sheet';
import React, {useEffect} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import StatusMessage from './statusMessage';

const BottomSheetView = ({children, message, visible, setVisible, status}) => {
  useEffect(() => {
    setTimeout(() => {
      console.log('sheet close');
      setVisible(false);
    }, 2000);
  }, [visible]);
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
          justifyContent: 'flex-end',
          alignItems: 'center',
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
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: CUSTOMCOLOR.white,
            width: '100%',
            height: '20%',
            padding: moderateScale(40),
            borderTopEndRadius: moderateScale(16),
            borderTopLeftRadius: moderateScale(16),
          }}>
          {children ? (
            {children}
          ) : (
            <StatusMessage status={status} message={message} />
          )}
        </View>
      </View>
    </Modal>
    // <BottomSheet
    //   backgroundStyle={{backgroundColor: backgroundStyle}}
    //   ref={visible}
    //   // index={0}
    //   snapPoints={['1%', snapPoints]}
    //   enablePanDownToClose
    //   enableOverDrag={false}>
    //   {children}
    // </BottomSheet>
  );
};

export default BottomSheetView;
const styles = StyleSheet.create({
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
