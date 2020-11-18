import fetch from 'cross-fetch';
import {findUpdateDate} from './find-update-date';
import {storeDataInAsyncStorage} from './store-data';

// const isRouteInGdynia = (value, index, something) => {
//   // console.log('something?', something);
//   return value.agencyId === something.agencyId;
// };

const checkIsRouteInGdynia = (listOfRoutes) => {
  const routesInGdynia = [
    ...listOfRoutes.filter(isRouteInGdyniaPKT),
    ...listOfRoutes.filter(isRouteInGdyniaPKA),
    ...listOfRoutes.filter(isRouteInGdyniaGryf),
    ...listOfRoutes.filter(isRouteInGdyniaPKM),
    ...listOfRoutes.filter(isRouteInGdyniaWarbus),
    ...listOfRoutes.filter(isRouteInGdyniaIrex),
    ...listOfRoutes.filter(isRouteInGdyniaBP),
  ];

  return routesInGdynia;
};

const isRouteInGdyniaPKT = (value) => {
  return value.agencyId === 5;
};

const isRouteInGdyniaPKA = (value) => {
  return value.agencyId === 6;
};

const isRouteInGdyniaGryf = (value) => {
  return value.agencyId === 7;
};

const isRouteInGdyniaPKM = (value) => {
  return value.agencyId === 8;
};

const isRouteInGdyniaWarbus = (value) => {
  return value.agencyId === 11;
};

const isRouteInGdyniaIrex = (value) => {
  return value.agencyId === 17;
};

const isRouteInGdyniaBP = (value) => {
  return value.agencyId === 18;
};

const getRoutesFromApiAsync = async () => {
  try {
    let response = await fetch(
      'http://91.244.248.19/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4128329f-5adb-4082-b326-6e1aea7caddf/download/routes.json',
    );
    let json = await response.json();
    const updateDate = findUpdateDate(json);

    const listOfAllRoutes = json[updateDate].routes;
    const listOfAllRoutesInGdynia = checkIsRouteInGdynia(listOfAllRoutes);

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

    const listOfStopsForTripsInGdynia = checkIsRouteInGdynia(
      listOfStopsForTrips,
    );
    // console.log('tell me the list here pls', listOfStopsForTripsInGdynia);

    const listOfStopsForTripsWithUniqueIds = listOfStopsForTripsInGdynia.map(
      function (item, value) {
        item.uniqueId = String(
          item.agencyId + '_' + item.routeId + '_' + item.tripId + value,
        );
        return item;
      },
    );

    storeDataInAsyncStorage(
      '@gdyniobus_stops_for_trips',
      listOfStopsForTripsWithUniqueIds,
    );

    return listOfStopsForTripsWithUniqueIds;
  } catch (error) {
    console.error(error);
  }
};

export const getRouteData = async () => {
  try {
    let listOfRoutes = await getRoutesFromApiAsync();
    // let listOfTrips = await getAllTripsFromApiAsync();

    // let merged = [];

    // for (let i = 0; i < listOfTrips.length; i++) {
    //   merged.push({
    //     ...listOfTrips[i],
    //     ...listOfRoutes.find(
    //       (itmInner) => itmInner.routeId === listOfTrips[i].routeId,
    //     ),
    //   });
    // }

    const mergedWithUniqueIds = listOfRoutes.map(function (item, value) {
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

export const getTripData = async () => {
  try {
    let listOfTrips = await getAllTripsFromApiAsync();

    storeDataInAsyncStorage('@gdyniobus_trips', listOfTrips);

    return listOfTrips;
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
