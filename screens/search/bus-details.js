import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapperStyles} from '../../assets/wrapper_stylesheet';

import {State, interpret} from 'xstate';
import {busRoutesMachine} from '../../xstate/lista-linii';
import {simpleGetStopsForTripsData} from '../../utils/async-stored-data';

const BusDetails = ({route, navigation}) => {
  const {routeId, routeName, tripHeadsign} = route.params;
  const [storedTrips, setStoredTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState([]);

  const isCurrentRoute = (value) => {
    return value.routeId === routeId;
  };

  useEffect(() => {
    simpleGetStopsForTripsData()
      .then((result) => {
        return result.filter(isCurrentRoute);
      })
      .then((filteredRoutes) => {
        // console.log('at least tell me this result?', filteredRoutes);
        setCurrentTrip(filteredRoutes);
        console.log('wow man, currentTrip', currentTrip);
      });
  }, [routeId]);

  const renderStopItems = ({item}) => <Text>This will be a stop</Text>;

  // const currentTrip = storedTrips.filter(isCurrentRoute);
  console.log("now we'll see what we shall see", currentTrip);

  return (
    <View style={[wrapperStyles.centered, {padding: 20}]}>
      <Text>#{routeName}#</Text>
      <Text>{tripHeadsign}</Text>
      <Text>There will be details here?</Text>
      <FlatList
        data={currentTrip}
        renderItem={renderStopItems}
        keyExtractor={(item) => item.stopId + '_' + item.agencyId}
      />
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
