import {BaseToast, ErrorToast} from 'react-native-toast-message';
import {moderateScale} from './scaleDimension';

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'green', width: '50%', flexWrap: 'wrap'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: moderateScale(15),
        fontWeight: '400',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{width: '50%', borderColor: 'red', flexWrap: 'wrap'}}
      text1Style={{
        fontSize: moderateScale(15),
      }}
      text2Style={{
        fontSize: moderateScale(15),
      }}
    />
  ),
};
