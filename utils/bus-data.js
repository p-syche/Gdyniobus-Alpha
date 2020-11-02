import AsyncStorage from '@react-native-async-storage/async-storage';
import {getRouteAndTripData} from './fetch-bus-data';

export const getRoutesData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gdyniobus_routes');
    return jsonValue !== null ? JSON.parse(jsonValue) : getRouteAndTripData();
    // return getRouteAndTripData();
  } catch (e) {
    // error reading value
  }
};
