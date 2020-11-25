import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapperStyles} from '../../../assets/wrapper_stylesheet';
import BusDetailsStopItem from './bus-details-stop-item';

import {State, interpret} from 'xstate';
import {busRoutesMachine} from '../../../xstate/lista-linii';
import {simpleGetStopsForTripsData} from '../../../utils/async-stored-data';

import {defaultTheme} from '../../../assets/color_scheme';
import {createTheming} from '@callstack/react-theme-provider';
const {useTheme} = createTheming(defaultTheme);

const BusDetails = ({route, navigation}) => {
  const {routeId, routeName, tripHeadsign, tripId} = route.params;
  const theme = useTheme(defaultTheme);

  const [currentTrip, setCurrentTrip] = useState([]);

  const isCurrentRoute = (value) => {
    return value.routeId === routeId && value.tripId === tripId;
  };

  useEffect(() => {
    simpleGetStopsForTripsData().then((result) => {
      const filteredResults = result.filter(isCurrentRoute);
      const sortedResults = filteredResults.sort(
        (a, b) => a.stopSequence - b.stopSequence,
      );
      setCurrentTrip(sortedResults);
    });
  }, []);

  return (
    <View style={[wrapperStyles.centered, styles.container]}>
      <Text
        style={[
          styles.screenTitle,
          styles.busNumber,
          {color: theme.blue.primary},
        ]}>
        {routeName}
      </Text>
      <Text style={[styles.screenTitle, {color: theme.orange.primary}]}>
        {tripHeadsign}
      </Text>
      <FlatList
        data={currentTrip}
        renderItem={({item}) => (
          <BusDetailsStopItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.uniqueId}
      />
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
    paddingBottom: 30,
    width: '60%',
  },
  busNumber: {
    fontFamily: 'Lato-Bold',
    fontSize: 45,
    textAlign: 'center',
    paddingBottom: 5,
  },
});

export default BusDetails;
