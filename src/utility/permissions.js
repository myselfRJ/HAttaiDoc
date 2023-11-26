import {Platform, PermissionsAndroid, Alert} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';


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

export const NotificationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } catch (error) {
    }
  }}
