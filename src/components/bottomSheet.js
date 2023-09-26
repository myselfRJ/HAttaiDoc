import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';
import {View} from 'react-native';

const BottomSheetView = ({
  children,
  bottomSheetRef,
  snapPoints,
  isOpen,
  backgroundStyle,
}) => {
  return (
    <BottomSheet
      backgroundStyle={{backgroundColor: backgroundStyle}}
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['1%', snapPoints]}
      enablePanDownToClose
      enableOverDrag={false}>
      {children}
    </BottomSheet>
  );
};

export default BottomSheetView;
