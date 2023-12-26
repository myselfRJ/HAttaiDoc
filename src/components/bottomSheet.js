import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';
import {View, Modal, Text, TouchableWithoutFeedback} from 'react-native';
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
  console.log('.............value', visible);
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
          <View />
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
