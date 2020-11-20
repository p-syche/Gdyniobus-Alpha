import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BusDetails from './bus-details';

import {useMachine} from '@xstate/react';
import {busRoutesMachine} from '../../../xstate/lista-linii';

const BusTripsPerRoute = ({route, navigation}) => {
  const {routeId, routeNumber} = route.params;
  const [tripsForTheRoute, setTripsForTheRoute] = useState([]);

  const [state] = useMachine(busRoutesMachine);
  const {trips} = state.context;

  const checkRouteIdForTrip = (value) => {
    return value.routeId === routeId;
  };

  useEffect(() => {
    if (state.matches('dataLoaded')) {
      const filteredTrips = trips.filter(checkRouteIdForTrip);
      setTripsForTheRoute(filteredTrips);
    }
  }, [state]);

  const renderTripItem = ({item}) => (
    <Pressable
      style={styles.pressable}
      onPress={() => {
        navigation.navigate('BusDetails', {
          routeId: routeId,
          routeName: routeNumber,
          tripHeadsign: item.tripHeadsign,
          tripId: item.tripId,
        });
      }}>
      <Text style={styles.title}>{routeNumber}</Text>
      <Text style={styles.title}>{routeId}</Text>
      <Text style={styles.title}>info {item.tripHeadsign}</Text>
    </Pressable>
  );

  return (
    <View style={styles.item}>
      <Text>Lista tras autobusu {routeNumber}</Text>
      <Text>Lista tras autobusu {routeId}</Text>
      {state.matches('dataLoaded') ? (
        <FlatList
          data={tripsForTheRoute}
          renderItem={renderTripItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Loading... </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  pressable: {
    padding: 20,
    backgroundColor: '#f9c2ff',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 32,
  },
});

export default BusTripsPerRoute;
