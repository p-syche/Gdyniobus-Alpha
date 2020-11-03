import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataInAsyncStorage = async (key, value) => {
  console.log('tell me the key pls', key);
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};
