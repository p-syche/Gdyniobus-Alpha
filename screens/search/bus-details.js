import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {getTripsFromApiAsync} from '../../utils/fetch-bus-data';

const BusDetails = ({route, navigation}) => {
  const {routeId, routeName, tripHeadsign} = route.params;

  const [currentTrip, setCurrentTrip] = useState({});

  // useEffect(() => {
  //   let isMounted = true; // track whether component is mounted
  //   getTripsFromApiAsync(routeId).then((response) => {
  //     if (isMounted) {
  //       setCurrentTrip(response);
  //     }
  //   });

  //   return () => {
  //     // clean up
  //     isMounted = false;
  //   };
  // }, [routeId]);

  return (
    <View>
      <Text>#{routeName}#</Text>
      <Text>{tripHeadsign}</Text>
      <Text>There will be details here?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default BusDetails;
