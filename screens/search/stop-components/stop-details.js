import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapperStyles} from '../../../assets/wrapper_stylesheet';
import StopDetailsBusItem from './stop-details-bus-item';

import {getEstimatedArrivalsFromApiAsync} from '../../../utils/fetch-stop-data';

import {useMachine} from '@xstate/react';
import {busRoutesMachine} from '../../../xstate/lista-linii';

import {defaultTheme} from '../../../assets/color_scheme';
import {createTheming} from '@callstack/react-theme-provider';
const {useTheme} = createTheming(defaultTheme);

const StopDetails = ({route, navigation}) => {
  const theme = useTheme(defaultTheme);

  const {stopId} = route.params;
  const [estimatedArrivals, setEstimatedArrivals] = useState([]);
  const [currentStop, setCurrentStop] = useState([]);

  const [state] = useMachine(busRoutesMachine);
  const {stops, routes} = state.context;

  useEffect(() => {
    if (state.matches('dataLoaded')) {
      const filteredStops = stops.find((element) => element.stopId === stopId);
      setCurrentStop(filteredStops);
    }
  }, [state]);

  useEffect(() => {
    let mounted = true;

    const getData = () => {
      return getEstimatedArrivalsFromApiAsync(stopId).then((result) => {
        if (mounted) {
          setEstimatedArrivals(result.delay);
        }
      });
    };

    getData();

    const interval = setInterval(() => {
      getData();
    }, 60000);

    return function cleanup() {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <View
      style={[
        wrapperStyles.centered,
        {padding: 20, color: theme.blue.primary},
      ]}>
      <Text style={styles.title}>{currentStop.stopDesc}</Text>
      <FlatList
        data={estimatedArrivals}
        renderItem={({item}) => (
          <StopDetailsBusItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item, key) =>
          item.routeId + '_' + item.tripId + '_' + key
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#E33CC7',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default StopDetails;
