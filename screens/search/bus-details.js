import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapperStyles} from '../../assets/wrapper_stylesheet';
import BusDetailsStopItem from './bus-details-stop-item';

import {State, interpret} from 'xstate';
import {busRoutesMachine} from '../../xstate/lista-linii';
import {simpleGetStopsForTripsData} from '../../utils/async-stored-data';

const BusDetails = ({route}) => {
  const {routeId, routeName, tripHeadsign, tripId} = route.params;
  const [currentTrip, setCurrentTrip] = useState([]);

  const isCurrentRoute = (value) => {
    return value.routeId === routeId && value.tripId === tripId;
  };

  useEffect(() => {
    simpleGetStopsForTripsData().then((result) => {
      const filteredResults = result.filter(isCurrentRoute);
      setCurrentTrip(filteredResults);
    });
  }, []);

  return (
    <View style={[wrapperStyles.centered, {padding: 20}]}>
      <Text>#{routeName}#</Text>
      <Text>{tripHeadsign}</Text>
      <Text>There will be details here?</Text>
      <FlatList
        data={currentTrip}
        renderItem={BusDetailsStopItem}
        keyExtractor={(item) => item.uniqueId}
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
