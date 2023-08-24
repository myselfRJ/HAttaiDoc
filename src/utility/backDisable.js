import {BackHandler} from 'react-native';

let backButtonListener = null;

export const disableBackButton = () => {
  if (!backButtonListener) {
    backButtonListener = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
  }
};
