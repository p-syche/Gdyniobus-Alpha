import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import BusItem from './bus-item';
import BusDetails from './bus-details';

// <BusItem item={currentBusRoute} navigation={navigation} />

const StopDetailsBusItem = ({item, navigation, busRoutes}) => {
  // const [currentTrip, setCurrentTrip] = useState(null);

  // // const isCurrentRoute = (value) => {
  // //   return value.routeId === item.routeId && value.tripId === item.tripId;
  // // };

  // const isCurrentRoute = (value) => {
  //   return value.routeId === item.routeId && value.tripId === item.tripId;
  // };

  // useEffect(() => {
  //   const currentBusRoute = busRoutes.filter(isCurrentRoute);
  //   setCurrentTrip(currentBusRoute);
  // }, []);

  // // console.log(
  // //   'can I have a useeffect here?',
  // //   currentTrip,
  // //   item.routeId,
  // //   // busRoutes,
  // // );

  return (
    <View style={styles.item}>
      <Text>{item.delayDesc}</Text>
      <Text>{item.shortName}</Text>
      <Text>{item.headSign}</Text>
      <Text>{item.routeId}</Text>
      <Text>{item.tripId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#bada55',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});

export default StopDetailsBusItem;
