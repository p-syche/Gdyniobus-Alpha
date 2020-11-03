import fetch from 'cross-fetch';
import {findUpdateDate} from './find-update-date';
import {storeDataInAsyncStorage} from './store-data';

const isRouteInGdyniaPKT = (value) => {
  return value.agencyId === 5;
};

const isRouteInGdyniaPKA = (value) => {
  return value.agencyId === 6;
};

// const isRouteInGdyniaPKM = (value) => {
//   return value.agencyId === 8;
// };

const getRoutesFromApiAsync = async () => {
  try {
    let response = await fetch(
      'http://91.244.248.19/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4128329f-5adb-4082-b326-6e1aea7caddf/download/routes.json',
    );
    let json = await response.json();
    const updateDate = findUpdateDate(json);

    const listOfAllRoutes = json[updateDate].routes;
    let listOfAllRoutesInGdynia = [
      ...listOfAllRoutes.filter(isRouteInGdyniaPKT),
      ...listOfAllRoutes.filter(isRouteInGdyniaPKA),
    ];

    return listOfAllRoutesInGdynia;
  } catch (error) {
    console.error(error);
  }
};

const getAllTripsFromApiAsync = async () => {
  try {
    let response = await fetch(
      // Lista tras
      'http://91.244.248.19/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/33618472-342c-4a4a-ba88-a911ec0ad5a7/download/trips.json',
    );
    let json = await response.json();
    const updateDate = findUpdateDate(json);
    const listOfAllTrips = json[updateDate].trips;

    return listOfAllTrips;
  } catch (error) {
    console.error(error);
  }
};

export const getStopsForTripFromApiAsync = async () => {
  try {
    let response = await fetch(
      // Przystanki w powiązaniu z trasą
      'http://91.244.248.19/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/0f2de200-e78b-4183-ae0d-071d7f07fc3f/download/stopsintrips.json',
    );
    let json = await response.json();
    const updateDate = findUpdateDate(json);
    const listOfStopsForTrips = json[updateDate].stopsInTrip;
    // const currentTrip = listOfAllTrips.map((tripItem) => {
    //   console.log('here here', tripItem);
    //   if (tripItem.routeId === routeId) {
    //     console.log('should be one trip?', tripItem);
    //     return tripItem;
    //   }
    // });

    // console.log('hey, what?', currentTrip);
    storeDataInAsyncStorage('@gdyniobus_stops_for_trips', listOfStopsForTrips);

    return listOfStopsForTrips;
  } catch (error) {
    console.error(error);
  }
};

export const getRouteAndTripData = async () => {
  try {
    let listOfRoutes = await getRoutesFromApiAsync();
    let listOfTrips = await getAllTripsFromApiAsync();

    let merged = [];

    for (let i = 0; i < listOfTrips.length; i++) {
      merged.push({
        ...listOfTrips[i],
        ...listOfRoutes.find(
          (itmInner) => itmInner.routeId === listOfTrips[i].routeId,
        ),
      });
    }

    const mergedWithUniqueIds = merged.map(function (item, value) {
      item.uniqueId = String(
        item.agencyId + '_' + item.routeId + '_' + item.tripId + value,
      );
      return item;
    });

    storeDataInAsyncStorage('@gdyniobus_routes', mergedWithUniqueIds);

    return mergedWithUniqueIds;
  } catch (error) {
    console.error(error);
  }
};

export const getRouteNameFromApiAsync = async (routeId) => {
  try {
    let response = await fetch(
      'http://91.244.248.19/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4128329f-5adb-4082-b326-6e1aea7caddf/download/routes.json',
    );
    let json = await response.json();
    const updateDate = findUpdateDate(json);
    const listOfAllRoutes = json[updateDate].routes;
    const currentRouteName = listOfAllRoutes.map((routeItem) => {
      if (routeItem.routeId === routeId) {
        return routeItem.routeShortName;
      }
    });

    return currentRouteName;
  } catch (error) {
    console.error(error);
  }
};
