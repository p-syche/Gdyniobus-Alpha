import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapperStyles} from '../../assets/wrapper_stylesheet';
import StopDetailsBusItem from './stop-details-bus-item';

import {State, interpret} from 'xstate';
import {busRoutesMachine} from '../../xstate/lista-linii';
import {simpleGetStops} from '../../utils/async-stored-data';
import {getEstimatedArrivalsFromApiAsync} from '../../utils/fetch-stop-data';

const StopDetails = ({route, navigation}) => {
  const {stopItem, stopId, busRoutes} = route.params;
  const [estimatedArrivals, setEstimatedArrivals] = useState([]);

  // console.log('what is the stopItem?', stopItem);

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
    <View style={[wrapperStyles.centered, {padding: 20}]}>
      <Text style={styles.title}>{stopItem.stopDesc}</Text>
      <FlatList
        data={estimatedArrivals}
        renderItem={({item}) => (
          <StopDetailsBusItem
            item={item}
            navigation={navigation}
            busRoutes={busRoutes}
          />
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
