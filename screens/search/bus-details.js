import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {getTripsFromApiAsync} from '../../utils/fetch-bus-data';

const BusDetails = ({route, navigation}) => {
  const {item} = route.params;

  const [currentTrip, setCurrentTrip] = useState({});

  useEffect(() => {
    getTripsFromApiAsync(item).then((response) => setCurrentTrip(response));
  });

  return (
    <View>
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
