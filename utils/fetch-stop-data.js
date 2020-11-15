import fetch from 'cross-fetch';
import {findUpdateDate} from './find-update-date';
import {storeDataInAsyncStorage} from './store-data';

const isStopInGdynia = (value) => {
  return value.zoneName === null;
};

export const getStopsFromApiAsync = async () => {
  try {
    let response = await fetch(
      'http://91.244.248.19/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/cd4c08b5-460e-40db-b920-ab9fc93c1a92/download/stops.json',
    );
    let json = await response.json();
    const updateDate = findUpdateDate(json);

    const listOfAllStops = json[updateDate].stops;
    let listOfAllStopsInGdynia = listOfAllStops.filter(isStopInGdynia);

    storeDataInAsyncStorage('@gdyniobus_stops', listOfAllStopsInGdynia);
    return listOfAllStopsInGdynia;
  } catch (error) {
    console.error(error);
  }
};

export const getEstimatedArrivalsFromApiAsync = async (stopId) => {
  try {
    let response = await fetch(
      'https://zkmgdynia.pl/stopsAPI/getDisplay/' + stopId,
    );
    let json = await response.json();
    // console.log('hey ho hey ho hey ho!', json, stopId);
    // const updateDate = findUpdateDate(json);

    // const listOfAllStops = json[updateDate].stops;
    // let listOfAllStopsInGdynia = listOfAllStops.filter(isStopInGdynia);

    // storeDataInAsyncStorage('@gdyniobus_estimated_arrivals', listOfAllStopsInGdynia);
    return json;
  } catch (error) {
    console.error(error);
  }
};
