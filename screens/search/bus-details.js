import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapperStyles} from '../../assets/wrapper_stylesheet';

import {getStopsForTripFromApiAsync} from '../../utils/fetch-bus-data';

const BusDetails = ({route, navigation}) => {
  const {routeId, routeName, tripHeadsign} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [currentTrip, setCurrentTrip] = useState({});

  useEffect(() => {
    //   let isMounted = true; // track whether component is mounted
    getStopsForTripFromApiAsync(routeId)
      .then((response) => setCurrentTrip(response))
      .then(() => setIsLoading(false));
    //     if (isMounted) {
    //       setCurrentTrip(response);
    //     }
    //   });

    //   return () => {
    //     // clean up
    //     isMounted = false;
    //   };
    console.log('and the trip is?', currentTrip);
  }, [routeId]);

  return (
    <View style={[wrapperStyles.centered, {padding: 20}]}>
      <Text>#{routeName}#</Text>
      <Text>{tripHeadsign}</Text>
      <Text>There will be details here?</Text>
      {isLoading ? <Text>Loading...</Text> : <Text>DONE!</Text>}
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
