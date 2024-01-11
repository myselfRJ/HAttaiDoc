import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

async function StoreAsyncData(key, body) {
  try {
    const existingValue = await EncryptedStorage.getItem(key);

    if (existingValue) {
      return;
    }
    await EncryptedStorage.setItem(key, JSON.stringify(body));
    console.log('Value saved successfully');
  } catch (error) {
    console.error('Error occurred', error);
    Alert.alert('', 'Something Went Wrong');
  }
}

async function RetriveAsyncData(key) {
  try {
    const session = await EncryptedStorage.getItem(key);

    if (session !== undefined) {
      const data = JSON.parse(session);
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
    existingData.unshift(newElement);
    await EncryptedStorage.setItem(key, JSON.stringify(existingData));
  } catch (error) {
    console.error('Error occurred', error);
    Alert.alert('', 'Something Went Wrong');
  }
}

async function clearStorage() {
  try {
    await EncryptedStorage.clear();
  } catch (error) {}
}
async function RemoveKeyFromAsync(key) {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {}
}

export {
  StoreAsyncData,
  RetriveAsyncData,
  UpdateAsyncData,
  clearStorage,
  RemoveKeyFromAsync,
};
