import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapperStyles} from '../../assets/wrapper_stylesheet';
import BusItem from './bus-item';

import {State, interpret} from 'xstate';
import {busRoutesMachine} from '../../xstate/lista-linii';
import {simpleGetStops} from '../../utils/async-stored-data';
import {getEstimatedArrivalsFromApiAsync} from '../../utils/fetch-stop-data';

const StopDetails = ({route, navigation}) => {
  const {stopId} = route.params;
  const [currentStop, setCurrentStop] = useState([]);
  const [estimatedArrivals, setEstimatedArrivals] = useState([]);

  // console.log('do i have the navigation prop here?', navigation);

  const isCurrentStop = (value) => {
    return value.stopId === stopId;
  };

  useEffect(() => {
    simpleGetStops().then((result) => {
      const filteredResults = result.find(
        (element) => element.stopId === stopId,
      );
      setCurrentStop(filteredResults);
    });
  }, []);

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

  const renderStopItems = ({item}) => (
    <View style={styles.item}>
      <Text>{item.delayDesc}</Text>
      <Text>{item.shortName}</Text>
      <Text>{item.headSign}</Text>
      <BusItem item={item} navigation={navigation} />
    </View>
  );

  return (
    <View style={[wrapperStyles.centered, {padding: 20}]}>
      <Text style={styles.title}>{currentStop && currentStop.stopDesc}</Text>
      <FlatList
        data={estimatedArrivals}
        renderItem={renderStopItems}
        keyExtractor={(item) => item.routeId + '_' + item.tripId}
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
