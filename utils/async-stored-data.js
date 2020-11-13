import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getRouteAndTripData,
  getStopsForTripFromApiAsync,
} from './fetch-bus-data';
import {getStopsFromApiAsync} from './fetch-stop-data';

export const getRoutesData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gdyniobus_routes');
    return jsonValue !== null ? JSON.parse(jsonValue) : getRouteAndTripData();
    // return getRouteAndTripData();
  } catch (e) {
    // error reading value
  }
};

export const getStopsData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gdyniobus_stops');
    return jsonValue !== null ? JSON.parse(jsonValue) : getStopsFromApiAsync();
    // return getStopsFromApiAsync();
  } catch (e) {
    // error reading value
  }
};

export const getStopsForTripsData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gdyniobus_stops_for_trips');
    // return jsonValue !== null
    //   ? JSON.parse(jsonValue)
    //   : getStopsForTripFromApiAsync();
    return getStopsForTripFromApiAsync();
  } catch (e) {
    // error reading value
  }
};

export const simpleGetStopsForTripsData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gdyniobus_stops_for_trips');
    // console.log('so what is the thing?', jsonValue);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
