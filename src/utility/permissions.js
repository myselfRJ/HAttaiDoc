import {Platform, PermissionsAndroid, Alert} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// export const PermmisionStorage = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'External Storage Write Permission',
//           message: 'App needs access to Storage data',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       alert('Write permission err', err);
//       return false;
//     }
//   } else {
//     return true;
//   }
// };

export const PermmisionStorage = async () => {
  try {
    let permissionStatus = await check(
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    );
    return RESULTS.GRANTED;
  } catch (err) {
    Alert.alert('Write permission err', err);
  }
};
