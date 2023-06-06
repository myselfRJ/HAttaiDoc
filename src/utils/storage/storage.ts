import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (
  key: string,
  value: any,
  isString: boolean = false,
) => {
  await AsyncStorage.setItem(key, isString ? value : JSON.stringify(value));
};

export const fetchFromStorage = (key: string) => {
  return AsyncStorage.getItem(key);
};

export const removeFromStorage = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export const clearStorage = async () => {
  await AsyncStorage.clear();
};
