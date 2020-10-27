const isRouteInGdyniaPKT = (value) => {
  return value.agencyId === 5;
};

const isRouteInGdyniaPKA = (value) => {
  return value.agencyId === 6;
};

// const isRouteInGdyniaPKM = (value) => {
//   return value.agencyId === 8;
// };

export const getRoutesFromApiAsync = async () => {
  try {
    let response = await fetch(
      'http://91.244.248.19/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4128329f-5adb-4082-b326-6e1aea7caddf/download/routes.json',
    );
    let json = await response.json();
    const lastUpdateDate = Object.keys(json)[0];
    const listOfAllRoutes = json[lastUpdateDate].routes;
    let listOfAllRoutesInGdynia = [
      ...listOfAllRoutes.filter(isRouteInGdyniaPKT),
      ...listOfAllRoutes.filter(isRouteInGdyniaPKA),
    ];
    const listOfAllRoutesInGdyniaWithUniqueIds = listOfAllRoutesInGdynia.map(
      function (item, value) {
        item.uniqueId = String(
          item.agencyId + '_' + item.routeId + '_' + value,
        );
        return item;
      },
    );
    return listOfAllRoutesInGdyniaWithUniqueIds;
  } catch (error) {
    console.error(error);
  }
};
