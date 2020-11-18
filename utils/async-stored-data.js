import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getRouteData,
  getTripData,
  getStopsForTripFromApiAsync,
} from './fetch-bus-data';
import {getStopsFromApiAsync} from './fetch-stop-data';

export const getRoutesData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gdyniobus_routes');
    // return jsonValue !== null ? JSON.parse(jsonValue) : getRouteData();
    return getRouteData();
  } catch (e) {
    // error reading value
  }
};

export const getTripsData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gdyniobus_trips');
    // return jsonValue !== null ? JSON.parse(jsonValue) : getTripData();
    return getTripData();
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
    return jsonValue !== null
      ? JSON.parse(jsonValue)
      : getStopsForTripFromApiAsync();
    // return getStopsForTripFromApiAsync();
  } catch (e) {
    // error reading value
  }
};

export const simpleGetStopsForTripsData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gdyniobus_stops_for_trips');
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const simpleGetStops = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gdyniobus_stops');
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
