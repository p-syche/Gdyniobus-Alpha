import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BusDetails from './bus-details';
import SingleTripItem from './single-trip-item';

import {useMachine} from '@xstate/react';
import {busRoutesMachine} from '../../../xstate/lista-linii';

import {defaultTheme} from '../../../assets/color_scheme';
import {createTheming} from '@callstack/react-theme-provider';
const {useTheme} = createTheming(defaultTheme);

const BusTripsPerRoute = ({route, navigation}) => {
  const theme = useTheme(defaultTheme);

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

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.screenTitle,
          styles.busNumber,
          {color: theme.blue.primary},
        ]}>
        {routeNumber}
      </Text>
      <Text style={[styles.screenTitle, {color: theme.orange.primary}]}>
        Lista tras
      </Text>
      {state.matches('dataLoaded') ? (
        <FlatList
          data={tripsForTheRoute}
          renderItem={({item, index}) => (
            <SingleTripItem
              index={index}
              item={item}
              routeId={routeId}
              routeNumber={routeNumber}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Loading... </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(87, 44, 216, 0.09)',
    flex: 1,
    padding: 20,
  },
  screenTitle: {
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    fontSize: 20,
  },
  busNumber: {
    fontFamily: 'Lato-Bold',
    fontSize: 45,
    textAlign: 'center',
  },
});

export default BusTripsPerRoute;
