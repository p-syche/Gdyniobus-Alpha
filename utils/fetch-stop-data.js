const isStopInGdynia = (value) => {
  return value.zoneName === null;
};

export const getStopsFromApiAsync = async () => {
  try {
    let response = await fetch(
      'http://91.244.248.19/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/cd4c08b5-460e-40db-b920-ab9fc93c1a92/download/stops.json',
    );
    let json = await response.json();
    const lastUpdateDate = Object.keys(json)[0];
    const listOfAllStops = json[lastUpdateDate].stops;
    let listOfAllStopsInGdynia = listOfAllStops.filter(isStopInGdynia);

    return listOfAllStopsInGdynia;
  } catch (error) {
    console.error(error);
  }
};
