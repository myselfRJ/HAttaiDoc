import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

async function StoreAsyncData(key, body) {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(body));
  } catch (error) {
    console.error('error occured', error);
    Alert.alert('', 'Something Went Wrong');
  }
}

async function RetriveAsyncData(key) {
  try {
    const session = await EncryptedStorage.getItem(key);

    if (session !== undefined) {
      const data = JSON.parse(session);
      console.log('dataadata:', data);
      return data;
    }
  } catch (error) {
    Alert.alert('', 'Something Went Wrong');
  }
}

async function UpdateAsyncData(key, newElement) {
  try {
    const existingDataString = await EncryptedStorage.getItem(key);
    let existingData = existingDataString ? JSON.parse(existingDataString) : [];
    existingData.push(newElement);
    await EncryptedStorage.setItem(key, JSON.stringify(existingData));
  } catch (error) {
    console.error('Error occurred', error);
    // Handle errors
    Alert.alert('', 'Something Went Wrong');
  }
}

export {StoreAsyncData, RetriveAsyncData, UpdateAsyncData};
